
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Clear the token from localStorage
    navigate('/'); // Redirect to login page
  };

  return (
    <button className='btn btn-danger' onClick={handleLogout}>Log Out</button>
  );
};

export default Logout;
