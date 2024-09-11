"use client";
import React, { useState } from "react";
// import Image from "next/image";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../lib/userSlice";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { setCookie } from 'cookies-next';


const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Initialize router

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await axios.post("/api/signIn", {
        email,
        password,
      });
      const { accessToken, idToken } = response.data;
      let tokenString = "";

      if (typeof idToken === "object") {
        tokenString = idToken.jwtToken;
      } else {
        tokenString = idToken;
      }
      // Decode the ID token to get user info
      const decodedToken:any = jwtDecode(tokenString);
      // Dispatch the login action to Redux
  
      dispatch(
        login({
          email: decodedToken.email,
          name: decodedToken.name,
          familyName: decodedToken.family_name,
          role: decodedToken["custom:role"], // Correct field
          organizationId: decodedToken["custom:organizationId"], // Correct field
          organizationRole: decodedToken["custom:organizationRole"], // Correct field
          isLoggedIn: true,
        })
      );
   
       // Set the token in cookies
    setCookie('token', accessToken.jwtToken);

      router.push("/"); // Use router.push to navigate
    } catch (err: any) {
      console.error("Error:", err);
      console.error("Error:", error);

      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-primary bg-center bg-[url('/images/bg.png')]">
      <div className="w-full bg-transparent max-w-md p-8 rounded-lg shadow-lg bg-opacity-80">
        <div className="flex items-center justify-center mb-6">
          {/* <Image
            className="dark:invert m-5"
            src="/images/digitopiaLogoWithName.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          /> */}

          <h2 className="text-3xl font-bold text-white">Login</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="relative">
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 p-2 w-full bg-transparent border border-white rounded-md"
              />
            </div>
          </div>
          <div className="mb-6">
            <div className="relative">
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10 p-2 w-full bg-transparent border border-white rounded-md"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-white text-primary p-2 rounded-md hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
