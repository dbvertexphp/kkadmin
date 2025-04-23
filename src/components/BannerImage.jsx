import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const BannerImage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
  });
  const [updatingImageId, setUpdatingImageId] = useState(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const fileInputRef = useRef();
  const fetchProjectImages = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/get/banner`);
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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (
      !selectedFile ||
      !formData.title ||
      !formData.subtitle ||
      !formData.description
    ) {
      Swal.fire("Please fill all fields and select an image!", "", "warning");
      return;
    }

    const form = new FormData();
    form.append("image", selectedFile);
    form.append("title", formData.title);
    form.append("subtitle", formData.subtitle);
    form.append("description", formData.description);

    try {
      await axios.post(`${BASE_URL}/api/upload/banner`, form);
      Swal.fire("Image uploaded successfully!", "", "success");
      setFormData({ title: "", subtitle: "", description: "" });
      setSelectedFile(null);
	  if (fileInputRef.current) {
		fileInputRef.current.value = "";
	  }
      fetchProjectImages();
    } catch (error) {
      console.error("Upload error:", error);
      Swal.fire("Upload failed!", "", "error");
    }
  };

  const updateImage = async () => {
    if (
      !updatingImageId ||
      !formData.title ||
      !formData.subtitle ||
      !formData.description
    ) {
      Swal.fire("Please fill all fields!", "", "warning");
      return;
    }

    const form = new FormData();
    if (selectedFile) form.append("image", selectedFile);
    form.append("title", formData.title);
    form.append("subtitle", formData.subtitle);
    form.append("description", formData.description);

    try {
      await axios.put(
        `${BASE_URL}/api/update/banner/${updatingImageId}`,
        form
      );
      Swal.fire("Image updated successfully!", "", "success");
      setUpdatingImageId(null);
      setSelectedFile(null);
      setFormData({ title: "", subtitle: "", description: "" });
	  if (fileInputRef.current) {
		fileInputRef.current.value = "";
	  }
      fetchProjectImages();
    } catch (error) {
      console.error("Update error:", error);
      Swal.fire("Update failed!", "", "error");
    }
  };

  const deleteImage = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this image!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${BASE_URL}/api/deleteBannerImage/${id}`);
          Swal.fire("Deleted!", "Image has been deleted.", "success");
          fetchProjectImages();
        } catch (error) {
          console.error("Delete error:", error);
          Swal.fire("Delete failed!", "", "error");
        }
      }
    });
  };

  const toggleDescription = (id) => {
    setExpandedDescriptions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const startUpdate = (image) => {
    setUpdatingImageId(image._id);
    setFormData({
      title: image.title || "",
      subtitle: image.subtitle || "",
      description: image.description || "",
    });
    setSelectedFile(null);
  };

  return (
    <div
      className="d-flex flex-column flex-md-row"
      style={{ minHeight: "100vh" }}
    >
      <Sidebar />

      <div
        className="main-content container-fluid p-4"
        style={{
          marginLeft: isSidebarOpen ? "250px" : "0",
          marginTop: "60px",
          transition: "margin-left 0.3s ease",
        }}
      >
        <h2 className="mb-4 text-center text-md-start">Banner Images</h2>

        {/* Upload / Update Form */}
        <div className="mb-4">
          <p style={{ fontWeight: "500" }}>
            {updatingImageId
              ? "Update Banner Image"
              : "Upload New Banner Image"}
          </p>
          <input
            type="text"
            name="title"
            className="form-control mb-2"
            placeholder="Title"
            value={formData.title}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="subtitle"
            className="form-control mb-2"
            placeholder="Subtitle"
            value={formData.subtitle}
            onChange={handleInputChange}
          />
          <textarea
            name="description"
            className="form-control mb-2"
            placeholder="Description"
            rows={3}
            value={formData.description}
            onChange={handleInputChange}
          />
          <input
            type="file"
            className="form-control mb-2"
            onChange={handleFileChange}
			ref={fileInputRef}
          />

          {updatingImageId ? (
            <>
              <button
                className="btn btn-success w-100 w-md-auto me-md-2"
                onClick={updateImage}
              >
                Update Image
              </button>
              <button
                className="btn btn-secondary mt-2 w-100 w-md-auto"
                onClick={() => {
                  setUpdatingImageId(null);
                  setFormData({ title: "", subtitle: "", description: "" });
                  setSelectedFile(null);
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="btn btn-primary w-100 w-md-auto"
              onClick={uploadImage}
            >
              Upload Image
            </button>
          )}
        </div>

        {/* Image Grid */}
        <div className="row">
          {images.length > 0 ? (
            images.map((image) => (
              <div
                key={image._id}
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
              >
                <div className="card shadow-sm h-100 d-flex flex-column">
                  <img
                    src={image.filepath}
                    alt={image.filename}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5>{image.title}</h5>
                    <h6 className="text-muted">{image.subtitle}</h6>
                    <p style={{ fontSize: "14px", minHeight: "72px" }}>
                      {expandedDescriptions[image._id] ||
                      image.description?.length <= 100
                        ? image.description
                        : `${image.description?.slice(0, 100)}... `}
                      {image.description?.length > 100 && (
                        <span
                          onClick={() => toggleDescription(image._id)}
                          style={{ color: "blue", cursor: "pointer" }}
                        >
                          {expandedDescriptions[image._id]
                            ? " Read less"
                            : " Read more"}
                        </span>
                      )}
                    </p>
                    <div className="mt-auto">
                      <button
                        className="btn btn-warning w-100 mb-2"
                        onClick={() => startUpdate(image)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger w-100"
                        onClick={() => deleteImage(image._id)}
                      >
                        Delete
                      </button>
                    </div>
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

export default BannerImage;
