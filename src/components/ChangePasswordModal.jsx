import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      Swal.fire(
        "Error",
        "New password and confirm password do not match!",
        "error"
      );
      return;
    }

    try {
      const token = localStorage.getItem("authToken"); // Retrieve token from storage

      const response = await axios.post(
        `${BASE_URL}/api/users/change-password`,
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token to request headers
          },
        }
      );

      if (response.data.success) {
        Swal.fire("Success", "Password changed successfully!", "success");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        onClose(); // Close modal after success
      } else {
        Swal.fire(
          "Error",
          response.data.message || "Something went wrong!",
          "error"
        );
      }
    } catch (error) {
      Swal.fire("Error", "Failed to change password!", "error");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div
      className={`modal fade ${isOpen ? "show d-block" : "d-none"}`}
      tabIndex="-1"
      role="dialog"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay effect
        display: isOpen ? "flex" : "none",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content shadow-lg p-3">
          {/* Modal Header */}
          <div className="modal-header d-flex justify-content-between align-items-center">
            <h5 className="modal-title">Change Password</h5>
            <button
              type="button"
              className="btn btn-danger text-white"
              style={{
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
              }}
              onClick={onClose}
            >
              &times;
            </button>
          </div>

          {/* Modal Body */}
          <div className="modal-body">
            <form onSubmit={handleChangePassword}>
              <div className="form-group">
                <label>Old Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-group mt-3">
                <label>New Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-group mt-3">
                <label>Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100 mt-4">
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
