import React, { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../lib/store";
import Image from "next/image";
import RightSidePanel from "./RightSidePanel";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from 'react-i18next';
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { logout as logoutAction } from "../lib/userSlice"; // Import the logout action from your Redux slice
import { logout } from "@/actions/userActions";
const TopBar: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const user = useSelector((state: RootState) => state.user);

  const handleProfileMenuToggle = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleProfileClick = () => {
    setIsPanelOpen(true); // Open the right-side panel
    setIsProfileMenuOpen(false); // Close the dropdown
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false); // Close the right-side panel
  };

  const handleLogout = () => {
    // Dispatch the logout action to clear the Redux state
    dispatch(logout());
    dispatch(logoutAction());

    // Redirect the user to the login page
    router.push("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-transparent shadow-md z-50">
      <nav className="flex items-center justify-between p-4 max-w-6xl mx-auto">
        <div className="text-lg font-bold">
          <Link href="/">
            <Image
              className="dark:invert m-5"
              src="/images/digitopiaLogoWithName.svg"
              alt="Logo"
              width={180}
              height={38}
              priority
            />
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          {user.isLoggedIn && (
            <div className="relative">
              <button
                onClick={handleProfileMenuToggle}
                className="flex items-center space-x-2"
              >
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg">
                  <button
                    onClick={handleProfileClick}
                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                  >
                    {t('ViewProfile')}
                  </button>
                  
                  <button
                    onClick={handleLogout} // Trigger logout
                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                  >
                    {t('Logout')}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Right Side Panel */}
      <RightSidePanel
        isVisible={isPanelOpen}
        onClose={handleClosePanel}
        content="profile" 
      />
    </header>
  );
};

export default TopBar;
