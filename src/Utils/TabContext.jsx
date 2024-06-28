import { createContext, useState } from "react";

export const TabContext = createContext();

// eslint-disable-next-line react/prop-types
export const TabProvider = ({ children }) => {
  const [currentTab, setCurrentTab] = useState("Home");

  return (
    <TabContext.Provider value={{ currentTab, setCurrentTab }}>
      {children}
    </TabContext.Provider>
  );
};
