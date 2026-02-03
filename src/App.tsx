import "./App.css";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/navbar/navbar";
import SubNavbar from "./components/SubNavbar/subnavbar";
import { Toaster } from "react-hot-toast";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

function App() {
  const location = useLocation();
  const isCentrePage = location.pathname.startsWith("/centre/");

  // Scroll to top when location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
      scriptProps={{ async: true, defer: true }}
    >
      <div className="bg-transparent">
        <Navbar />
        {!isCentrePage && <SubNavbar />}
        <Outlet />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              fontFamily: "Outfit, sans-serif",
              fontWeight: "500",
            },
          }}
        />
      </div>
    </GoogleReCaptchaProvider>
  );
}

export default App;
