import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const ProjectImage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [updatingImageId, setUpdatingImageId] = useState(null);

  // Fetch all project images
  const fetchProjectImages = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/get/project`);
      setImages(response.data.images);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchProjectImages();
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle File Selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Upload New Image
  const uploadImage = async () => {
    if (!selectedFile) {
      Swal.fire("Please select an image!", "", "warning");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      await axios.post(`${BASE_URL}/api/upload/project`, formData);
      Swal.fire("Image uploaded successfully!", "", "success");
      setSelectedFile(null);
      fetchProjectImages();
    } catch (error) {
      console.error("Upload error:", error);
      Swal.fire("Invalid file type only [jpeg, jpg, png] Or file is too large try less than 10MB", "", "error");
    }
  };

  // Update Existing Image
  const updateImage = async () => {
    if (!selectedFile || !updatingImageId) {
      Swal.fire("Please select an image and try again!", "", "warning");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      await axios.put(`${BASE_URL}/api/update/project/${updatingImageId}`, formData);
      Swal.fire("Image updated successfully!", "", "success");
      setUpdatingImageId(null);
      setSelectedFile(null);
      fetchProjectImages();
    } catch (error) {
      console.error("Update error:", error);
      Swal.fire("Invalid file type only [jpeg, jpg, png] Or file is too large try less than 10MB", "", "error");
    }
  };

  // Handle Delete Image
  const deleteImage = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this image!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${BASE_URL}/api/deleteProjectImage/${id}`);
          Swal.fire("Deleted!", "Your image has been deleted.", "success");
          fetchProjectImages();
        } catch (error) {
          console.error("Delete error:", error);
          Swal.fire("Failed to delete image!", "", "error");
        }
      }
    });
  };

  return (
    <div className="d-flex flex-column flex-md-row" style={{ minHeight: "100vh" }}>
      <Sidebar />

      <div
        className="main-content container-fluid p-4"
        style={{
          marginLeft: isSidebarOpen ? "250px" : "0",
          marginTop: "60px",
          transition: "margin-left 0.3s ease",
        }}
      >
        <h2 className="mb-4 text-center text-md-start">Project Images</h2>

        {/* Upload New Image */}
        <div className="mb-4">
				<p style={{fontWeight: "500"}}>Upload New Project Images</p>
          <input type="file" className="form-control" onChange={handleFileChange} />
          <button className="btn btn-primary mt-2 w-100 w-md-auto" onClick={uploadImage}>
            Upload Image
          </button>
        </div>

        {/* Update Image Form */}
        {updatingImageId && (
          <div className="mb-4">
					<p style={{fontWeight: "500"}}>Update Project Images</p>
            <input type="file" className="form-control" onChange={handleFileChange} />
            <button className="btn btn-success mt-2 w-100 w-md-auto" onClick={updateImage}>
              Update Image
            </button>
            <button
              className="btn btn-secondary mt-2 ms-md-2 w-100 w-md-auto"
              onClick={() => setUpdatingImageId(null)}
            >
              Cancel
            </button>
          </div>
        )}

        {/* Image Grid */}
        <div className="row">
          {images.length > 0 ? (
            images.map((image) => (
              <div key={image._id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <div className="card shadow-sm">
                  <img
                    src={image.filepath}
                    alt={image.filename}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body text-center">
                    <button className="btn btn-warning me-md-2 w-100 w-md-auto mb-2" onClick={() => setUpdatingImageId(image._id)}>
                      Update
                    </button>
                    <button className="btn btn-danger mt-2 mt-md-0 w-100 w-md-auto" onClick={() => deleteImage(image._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center w-100">No images found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectImage;
