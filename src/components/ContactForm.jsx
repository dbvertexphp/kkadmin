import { useState, useEffect } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const ContactForm = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    linkedIn: "",
    email: "",
    phone: "",
    website: "",
    address: "",
  });
  // State for loading
  const [loading, setLoading] = useState(true);
  // State for error
  const [error, setError] = useState(null);
  // State for success message
  const [success, setSuccess] = useState(null);

  // Fetch contact data on mount
  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/contact`);
        if (!response.ok) {
          throw new Error("Failed to fetch contact data");
        }
        const data = await response.json();
        setFormData({
          linkedIn: data.linkedIn || "",
          email: data.email || "",
          phone: data.phone || "",
          website: data.website || "",
          address: data.address || "",
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchContactData();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${BASE_URL}/api/contact/6808d2694d5abda975e8ff0d`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update contact details");
      }

      setSuccess("Contact details updated successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  // Render loading state
  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: "600px" }}>
      <h3 className="card-title text-center mb-4">Update Contact Details</h3>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {success && (
        <div className="alert alert-success" role="alert">
          {success}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="linkedIn" className="form-label">
            LinkedIn
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-linkedin"></i>
            </span>
            <input
              type="text"
              id="linkedIn"
              name="linkedIn"
              value={formData.linkedIn}
              onChange={handleChange}
              className="form-control"
              placeholder="/username"
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-envelope"></i>
            </span>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              placeholder="example@domain.com"
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-telephone"></i>
            </span>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="

form-control"
              placeholder="+91 12345 67890"
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="website" className="form-label">
            Website
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-globe"></i>
            </span>
            <input
              type="text"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="form-control"
              placeholder="www.example.com"
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="4"
            className="form-control"
            placeholder="Full address"
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary w-100">
            Update Contact Details
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
