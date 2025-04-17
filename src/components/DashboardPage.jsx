import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Logout from "./Logout";

const DashboardPage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [userCount, setUserCount] = useState(null); // State for user count from API
  const [loading, setLoading] = useState(true); // State to track if data is being loaded
  const [error, setError] = useState(null); // State to hold errors

  const BASE_URL = `${import.meta.env.VITE_BASE_URL}/api/inquiry/count`; // API URL for count

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

  useEffect(() => {
    // Fetch user count from API
    const fetchUserCount = async () => {
      try {
        const response = await axios.get(BASE_URL, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setUserCount(response.data.count); // Set the user count from the API response
        setLoading(false); // Set loading to false after the data is fetched
      } catch (err) {
        setError("Failed to load data"); // Handle error if the API call fails
        setLoading(false); // Set loading to false even if the request fails
      }
    };

    fetchUserCount();
  }, [BASE_URL]);

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
        <h1>Welcome to the Admin Dashboard</h1>

        {/* Display User Count */}
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <div
            className="inquiry-box"
            style={{
              padding: "80px",
              backgroundColor: "#333",
              color: "#fff",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              margin: "20px 0",
              textAlign: "center",
            }}
          >
            <h3>Total Inquiries :- {userCount}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
