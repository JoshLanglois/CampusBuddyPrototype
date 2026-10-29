import { createContext, useContext, useEffect, useState } from "react";
import { sampleClasses, todayKey } from "./data/mockData";

const key = "campus-buddy-v1";
const defaults = {
  profile: null,
  signedIn: false,
  classes: [],
  selected: { date: todayKey(), ids: [] },
  reports: [],
};
const AppContext = createContext(null);

function load() {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    if (
      !value ||
      !Array.isArray(value.classes) ||
      !Array.isArray(value.reports)
    )
      return defaults;
    return {
      ...defaults,
      ...value,
      signedIn: Boolean(
        value.signedIn && value.profile?.name && value.profile?.email,
      ),
    };
  } catch {
    return defaults;
  }
}

export function AppProvider({ children }) {
  const [data, setData] = useState(load);
  const [storageError, setStorageError] = useState(false);
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch {
      setStorageError(true);
    }
  }, [data]);
  function update(change) {
    setData((previous) =>
      typeof change === "function"
        ? change(previous)
        : { ...previous, ...change },
    );
  }
  function signIn(profile, { demo = false, register = false } = {}) {
    update((previous) => {
      const sameProfile = previous.profile?.email === profile.email;
      return {
        ...previous,
        profile,
        signedIn: true,
        ...(!sameProfile || register
          ? {
              classes: demo ? structuredClone(sampleClasses) : [],
              reports: [],
              selected: { date: todayKey(), ids: [] },
            }
          : {}),
      };
    });
  }
  const selectedIds =
    data.selected?.date === todayKey() ? data.selected.ids : [];
  function toggleClass(id) {
    update((previous) => {
      const ids =
        previous.selected?.date === todayKey() ? previous.selected.ids : [];
      return {
        ...previous,
        selected: {
          date: todayKey(),
          ids: ids.includes(id)
            ? ids.filter((item) => item !== id)
            : [...ids, id],
        },
      };
    });
  }
  function removeClass(id) {
    update((previous) => ({
      ...previous,
      classes: previous.classes.filter((item) => item.id !== id),
      selected: {
        ...previous.selected,
        ids: (previous.selected?.ids || []).filter((item) => item !== id),
      },
    }));
  }
  function resetDemo() {
    update((previous) => ({
      ...previous,
      classes: structuredClone(sampleClasses),
      selected: { date: todayKey(), ids: [] },
      reports: [],
    }));
  }
  return (
    <AppContext.Provider
      value={{
        ...data,
        storageError,
        selectedIds,
        update,
        signIn,
        toggleClass,
        removeClass,
        resetDemo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
