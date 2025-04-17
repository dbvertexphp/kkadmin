import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const InquiriesPage = () => {
	const [isSidebarOpen, setSidebarOpen] = useState(false);
	const [inquiries, setInquiries] = useState([]); // Default to an empty array
	const [loading, setLoading] = useState(true); // Loading state
	const [error, setError] = useState(null); // Error state

	const BASE_URL = `${import.meta.env.VITE_BASE_URL}/api/inquiries`; // Your API URL for fetching inquiries

	useEffect(() => {
		// Function to handle resize logic
		const handleResize = () => {
			if (window.innerWidth >= 768) {
				setSidebarOpen(true); // Open sidebar by default on large screens
			} else {
				setSidebarOpen(false); // Close sidebar by default on small screens
			}
		};

		// Add event listener for window resizing
		window.addEventListener("resize", handleResize);

		// Run handleResize once on mount to set the initial sidebar state
		handleResize();

		// Cleanup the event listener on unmount
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []); // Empty dependency array means the effect runs once on mount

	useEffect(() => {
		const fetchInquiries = async () => {
			try {
				const response = await axios.get(BASE_URL, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("authToken")}`,
					},
				});

				// Ensure that response.data is an array
				if (Array.isArray(response.data)) {
					setInquiries(response.data); // Set inquiries data if it's an array
				} else if (
					response.data.inquiries &&
					Array.isArray(response.data.inquiries)
				) {
					// If the data is wrapped inside another object (e.g., { inquiries: [...] })
					setInquiries(response.data.inquiries);
				} else {
					setError("Unexpected response format.");
				}

				setLoading(false); // Set loading to false after fetching
			} catch (err) {
				setError("Failed to load inquiries"); // Handle error
				setLoading(false); // Set loading to false even if there's an error
			}
		};

		fetchInquiries(); // Fetch the data when the component mounts
	}, [BASE_URL]); // Only run once based on the BASE_URL

	return (
		<>
			<Sidebar />

			{/* Main Content */}
			<div
				className="main-inquirycontent p-3"
				style={{
					marginLeft: isSidebarOpen ? "250px" : "0", // Adjust margin based on sidebar state
					marginTop: "60px", // Adjust for navbar height
					transition: "margin-left 0.3s ease",
				}}
			>
				<h1 style={{ textAlign: "center" }}>Inquiries</h1>
				<p>All inquiries are listed below.</p>

				{/* Loading or Error State */}
				{loading ? (
					<p>Loading...</p>
				) : error ? (
					<p style={{ color: "red" }}>{error}</p>
				) : (
					<div
						className="inquiries-container"
						style={{
							width: "100%", // Set the full width for the table
							overflowX: "auto", // Enable scrolling for large tables
						}}
					>
						{/* Table with Card-like Structure */}
						<table
							style={{
								width: "100%",
								borderCollapse: "collapse",
								marginBottom: "20px",
							}}
						>
							<thead>
								<tr>
									<th style={{ padding: "10px", textAlign: "center" }}>
										Full Name
									</th>
									<th style={{ padding: "10px", textAlign: "center" }}>
										Email
									</th>
									<th style={{ padding: "10px", textAlign: "center" }}>
										Mobile No.
									</th>
									<th style={{ padding: "10px", textAlign: "center" }}>
										Message
									</th>
								</tr>
							</thead>
							<tbody>
								{/* Display inquiries in table rows */}
								{inquiries.map((inquiry) => (
									<tr
										key={inquiry.id}
										style={{
											backgroundColor: "#f9f9f9",
											borderRadius: "8px",
											boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
										}}
									>
										<td
											style={{
												padding: "15px",
												borderBottom: "1px solid #ddd",
												borderRadius: "8px",
											}}
										>
											<div
												style={{
													backgroundColor: "#f9f9f9",
													padding: "20px",
													borderRadius: "8px",
													boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
												}}
											>
												<h4>{inquiry.fullName || "No Title"}</h4>
											</div>
										</td>
										<td
											style={{
												padding: "15px",
												borderBottom: "1px solid #ddd",
												borderRadius: "8px",
											}}
										>
											<div
												style={{
													backgroundColor: "#f9f9f9",
													padding: "20px",
													borderRadius: "8px",
													boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
												}}
											>
												<p>{inquiry.email || "No description available."}</p>
											</div>
										</td>
										<td
											style={{
												padding: "15px",
												borderBottom: "1px solid #ddd",
												borderRadius: "8px",
											}}
										>
											<div
												style={{
													backgroundColor: "#f9f9f9",
													padding: "20px",
													borderRadius: "8px",
													boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
												}}
											>
												<h4>{inquiry.phoneNumber || "No Title"}</h4>
											</div>
										</td>
										<td
											style={{
												padding: "15px",
												borderBottom: "1px solid #ddd",
												borderRadius: "8px",
											}}
										>
											<div
												style={{
													backgroundColor: "#f9f9f9",
													padding: "20px",
													borderRadius: "8px",
													boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
												}}
											>
												<h4>{inquiry.message || "No Title"}</h4>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</>
	);
};

export default InquiriesPage;
