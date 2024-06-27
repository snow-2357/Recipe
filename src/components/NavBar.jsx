import { useContext } from "react";
import { TabContext } from "../Hooks/TabContext";

const NavBar = ({ tabs }) => {
  const { currentTab, setCurrentTab } = useContext(TabContext);

  return (
    <nav className="sm:flex sm:justify-center sm:items-center mt-4">
      <div className="flex flex-col sm:flex-row">
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
      </div>
    </nav>
  );
};

export default NavBar;
