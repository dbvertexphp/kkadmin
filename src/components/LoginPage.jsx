import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send login credentials to the backend API
      const response = await axios.post(`${BASE_URL}/api/users/login`, {
        email,
        password,
      });

			const token = response.data.token;
			
      // If login is successful, store JWT token
      localStorage.setItem('authToken', token);

      // Navigate to the dashboard or another protected route
      navigate('/dashboard');
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: '100vh', background: 'linear-gradient(to right, #333333,rgb(106, 95, 95))' }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          backgroundColor: '#f5f5f5',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h3 className="text-center" style={{ color: '#333' }}>Admin Login</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label" style={{ color: '#555' }}>
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                backgroundColor: '#fff',
                borderColor: '#ccc',
                borderRadius: '5px',
                padding: '10px',
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label" style={{ color: '#555' }}>
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                backgroundColor: '#fff',
                borderColor: '#ccc',
                borderRadius: '5px',
                padding: '10px',
              }}
            />
          </div>

          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{
              backgroundColor: '#333',
              borderColor: '#333',
              padding: '12px',
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
