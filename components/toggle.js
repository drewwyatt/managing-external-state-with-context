import React, { createContext, useContext, useState } from 'react';

const Enabled = {
  none: -1,
  class: 0,
  hooks: 1,
};

const ToggleContext = createContext();

export const ToggleProvider = ({ children }) => {
  const [enabled, set] = useState(Enabled.none)
  return <ToggleContext.Provider value={{ enabled, set }}>{children}</ToggleContext.Provider>
}

export const ClassToggle = ({ children }) => {
  const { enabled, set } = useContext(ToggleContext);
  return enabled === Enabled.class
    ? children
    : <button onClick={() => set(Enabled.class)}>Enable Clock</button>
}

export const HookToggle = ({ children }) => {
  const { enabled, set } = useContext(ToggleContext);
  return enabled === Enabled.hooks
    ? children
    : <button onClick={() => set(Enabled.hooks)}>Enable Clock</button>
}
