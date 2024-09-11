"use client";
import { useSelector } from "react-redux";
import { RootState } from "../lib/store";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import LoginPage from "./login/page";
const HomePage: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const { t } = useTranslation();

  return (
    <>
      {!user.isLoggedIn ? (
        <LoginPage />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen ">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent">
            {t("Hello")} {user.name}!
          </h1>
          <div className="flex flex-row space-x-4 mt-4">
            <Link href="/chart">
              <button className="w-48 bg-gradient-start text-white p-4 rounded-lg shadow-lg hover:bg-primary-dark transition duration-300">
                {t("goToChart")}
              </button>
            </Link>
            <Link href="/">
              <button className="w-48 bg-gradient-end  text-white p-4 rounded-lg shadow-lg hover:bg-primary-dark transition duration-300">
                {t("Home")}
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
