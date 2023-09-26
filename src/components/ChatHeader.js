import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';

const ChatHeader = ({ user }) => {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const navigate = useNavigate();
  
    const logout = () => {
      removeCookie('UserId', cookies.UserId);
      removeCookie('AuthToken', cookies.AuthToken);
      navigate('/'); // Navigate to the Home.js component
      window.location.reload();
    };
  
    return (
      <div className="chat-container-header">
        <button className="log-out-button" onClick={logout}>
          Logout
        </button>
        <div className="profile">
          <div className="img-container">
            <img src={user.url} alt={"photo of " + user.first_name} />
          </div>
          <h2>{user.first_name}</h2>
        </div>
      </div>
    );
  };
  
  export default ChatHeader;
  