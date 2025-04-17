import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Logout from "./Logout";
import ChangePasswordModal from "./ChangePasswordModal";

const SettingsPage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    // Update the sidebar state based on the window width
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true); // Open sidebar by default on large screens
      } else {
        setSidebarOpen(false); // Close sidebar by default on small screens
      }
    };

    // Add event listener for window resizing
    window.addEventListener("resize", handleResize);
    handleResize(); // Call it initially

    // Cleanup the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content */}
      <div
        className="main-content p-3"
        style={{
          marginLeft: isSidebarOpen ? "250px" : "0", // Dynamically adjust the margin
          marginTop: "60px", // Adjust for navbar height on small screens
          transition: "margin-left 0.3s ease",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <Logout /> {/* Button to Open Modal */}
          <button
            className="btn btn-primary"
            onClick={() => setIsModalOpen(true)}
          >
            Change Password
          </button>
          {/* Change Password Modal */}
          <ChangePasswordModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
