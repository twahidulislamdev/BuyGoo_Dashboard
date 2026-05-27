import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

const DashboardLayout = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/admin/getme", {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
        navigate("/login");
      });
  }, [navigate]);

  return (
    <div className="flex h-screen bg-muted/40">
      {/* Now these components will have the user data they need */}
      <Sidebar user={user} />

      <div className="flex flex-col flex-1">
        <Navbar user={user} />

        <main className="p-6 overflow-y-auto">
          <Outlet context={{ user }} />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
