import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "../components/Navigation";

export default function MainLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin", { replace: true });
    }
  }, [navigate]);

  return (
    <>
      <Navigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}
