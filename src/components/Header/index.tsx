import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownNotification from "./DropdownNotification";
import { Menu } from "lucide-react";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  return (
    <header className="sticky top-0 z-40 flex w-full bg-white drop-shadow-md dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between mx-auto max-w-screen-xl px-4 py-4 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-50 block rounded-lg border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <Menu size={20} />
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}
        </div>

        <div className="hidden sm:flex gap-6">
        </div>

        <div className="flex items-center gap-3 2xsm:gap-4">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <DarkModeSwitcher />
            <DropdownNotification />
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
