import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Sidebar for large screens */}
      <div
        className={`sidebar  p-3 d-none d-md-block`}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          backgroundColor: "#333",
          width: "250px",
          color: "white",
        }}
      >
        <h4>Admin Panel</h4>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/dashboard"
              style={{ color: "white", fontWeight: "600", fontSize: "20px" }}
            >
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/inquiries"
              style={{ color: "white", fontWeight: "600", fontSize: "20px" }}
            >
              Inquiries
            </Link>
          </li>
          {/* 
					<li className="nav-item">
						<Link className="nav-link" to="/uplodHeroImg" style={{ color: "white", fontWeight:"600", fontSize:"20px" }}>
						UploadheroImage
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/uploadBackgroundImg" style={{ color: "white", fontWeight:"600", fontSize:"20px" }}>
							UploadBackImage
						</Link>
					</li>
					*/}
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/uploadProductImg"
              style={{ color: "white", fontWeight: "600", fontSize: "20px" }}
            >
              UploadProductImage
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/uploadBannerImg"
              style={{ color: "white", fontWeight: "600", fontSize: "20px" }}
            >
              UploadBannerImage
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/uploadGalleryImg"
              style={{ color: "white", fontWeight: "600", fontSize: "20px" }}
            >
              UploadGalleryImage
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/settings"
              style={{ color: "white", fontWeight: "600", fontSize: "20px" }}
            >
              Settings
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Sidebar (for small screens) */}
      <nav
        className={`navbar navbar-expand-lg d-md-none fixed-top ${
          isSidebarOpen ? "sidebar-open" : ""
        }`}
        style={{ backgroundColor: "#333", color: "white" }}
      >
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={isSidebarOpen ? "true" : "false"}
          aria-label="Toggle navigation"
          onClick={toggleSidebar}
          style={{ backgroundColor: "white" }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isSidebarOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav" style={{ margin: "0 40%" }}>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/dashboard"
                style={{ color: "white", fontWeight: "600", fontSize: "20px" }}
              >
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/inquiries"
                style={{ color: "white", fontWeight: "600", fontSize: "20px" }}
              >
                Inquiries
              </Link>
            </li>
            {/* 
						<li className="nav-item">
						<Link className="nav-link" to="/settings" style={{ color: "white", fontWeight:"600", fontSize:"20px" }}>
						UploadheroImage
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/settings" style={{ color: "white", fontWeight:"600", fontSize:"20px" }}>
							UploadBackgroundImage
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/settings" style={{ color: "white", fontWeight:"600", fontSize:"20px" }}>
							UploadProjectImage
						</Link>
					</li>
					*/}
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/uploadProductImg"
                style={{ color: "white", fontWeight: "600", fontSize: "20px" }}
              >
                UploadProjectImage
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/uploadBannerImg"
                style={{ color: "white", fontWeight: "600", fontSize: "20px" }}
              >
                UploadBannerImage
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/uploadGalleryImg"
                style={{ color: "white", fontWeight: "600", fontSize: "20px" }}
              >
                UploadGalleryImage
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/settings"
                style={{ color: "white", fontWeight: "600", fontSize: "20px" }}
              >
                Settings
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
