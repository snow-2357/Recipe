import { useContext } from "react";
import { TabContext } from "../Utils/TabContext";

const NavBar = ({ tabs }) => {
  const { currentTab, setCurrentTab } = useContext(TabContext);

  return (
    <nav className="flex gap-8 justify-center sm:items-center mt-4">
      {tabs.map((tab) => (
        <span
          key={tab}
          className={`cursor-pointer mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0 ${
            currentTab === tab ? "font-bold" : ""
          }`}
          onClick={() => setCurrentTab(tab)}
        >
          {tab}
        </span>
      ))}
    </nav>
  );
};

export default NavBar;
