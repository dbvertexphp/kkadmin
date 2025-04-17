import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import Sidebar from "./Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const HeroImage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [imageId, setImageId] = useState("");
  const fileInputRef = useRef(null); // Reference for input field

  useEffect(() => {
    const handleResize = () => setSidebarOpen(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch existing hero image on load
  useEffect(() => {
    const fetchHeroImage = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/get/hero`);
        const data = await response.json();
        console.log("Fetched Hero Image Data:", data);

        if (response.ok && data.image) {
          setImageURL(data.image.filepath);
          setImageId(data.image._id);
        } else {
          console.warn("Failed to fetch image:", data.message);
        }
      } catch (error) {
        console.error("Error fetching hero image:", error);
      }
    };

    fetchHeroImage();
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const showAlert = (title, text, icon) => {
    Swal.fire({ title, text, icon, confirmButtonColor: "#3085d6", confirmButtonText: "OK" });
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      showAlert("No File Selected", "Please select an image to upload.", "warning");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      setUploading(true);
      const url = `${BASE_URL}/api/update/hero/${imageId}`;
      const response = await fetch(url, {
        method: "PUT",
        body: formData,
      });

      const data = await response.json();
      setUploading(false);

      if (response.ok) {
        // Update image URL and reset input
        setImageURL(`${BASE_URL}/uploads/heroimage/${data.image.filename}?t=${Date.now()}`);
        setImageId(data.image._id);
        setSelectedFile(null);

        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // Reset file input field
        }

        showAlert("Success", "Hero image updated successfully!", "success");
      } else {
        showAlert("Error", data.message || "Failed to upload/update image.", "error");
      }
    } catch (error) {
      setUploading(false);
      console.error("Upload Error:", error);
      showAlert("Error", "Invalid file type only [jpeg, jpg, png] Or file is too large try less than 10MB", "error");
    }
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar />

      <div className="container mt-5" style={{ marginLeft: isSidebarOpen ? "250px" : "0", transition: "margin-left 0.3s ease" }}>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg border-0 rounded">
              <div className="card-body text-center">
                <h3 className="card-title text-primary">Update Hero Image</h3>

                {/* Show Preview when selecting file, else show existing image */}
                {selectedFile ? (
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="Preview"
                    className="img-thumbnail my-3"
                    style={{ maxWidth: "100%", height: "300px" }}
                    onLoad={(e) => URL.revokeObjectURL(e.target.src)}
                  />
                ) : (
                  imageURL && <img src={imageURL} alt="Current Hero" className="img-thumbnail my-3" style={{ maxWidth: "100%", height: "300px" }} />
                )}

                <div className="mb-3">
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleFileChange}
                    accept="image/*"
                    ref={fileInputRef} // Reference added
                  />
                </div>

                <button className="btn btn-success w-100" onClick={handleUpload} disabled={uploading}>
                  {uploading ? (
                    <span>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Uploading...
                    </span>
                  ) : (
                    imageId ? "Update Image" : "Upload Image"
                  )}
                </button>

                {imageId && <p className="mt-2 text-secondary">Image ID: <strong>{imageId}</strong></p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroImage;
