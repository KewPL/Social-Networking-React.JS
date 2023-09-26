import TinderCard from 'react-tinder-card';
import { useEffect, useState } from 'react';
import ChatContainer from '../components/ChatContainer';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { Emoji } from 'react-emoji-render';


const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [genderedUsers, setGenderedUsers] = useState(null);
  const [lastDirection, setLastDirection] = useState();
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [showPopup, setShowPopup] = useState(true);


  const userId = cookies.UserId;

  const getUser = async () => {
    try {
      const response = await axios.get('http://localhost:8000/user', {
        params: { userId },
      });
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getGenderedUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/gendered-users', {
        params: { gender: user?.gender_interest },
      });
      setGenderedUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      getGenderedUsers();
    }
  }, [user]);

  const updateMatches = async (matchedUserId) => {
    try {
      await axios.put('http://localhost:8000/addmatch', {
        userId,
        matchedUserId,
      });
      getUser();
    } catch (err) {
      console.log(err);
    }
  };

  const swiped = (direction, swipedUserId) => {
    window.scrollTo(0, window.scrollY);
  
    if (direction === 'right') {
      updateMatches(swipedUserId);
    }
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!');
  };

  const matchedUserIds = user?.matches.map(({ user_id }) => user_id).concat(userId);

  const filteredGenderedUsers = genderedUsers?.filter(
    (genderedUser) => !matchedUserIds.includes(genderedUser.user_id)
  );

  const swipeRight = () => {
    if (filteredGenderedUsers && filteredGenderedUsers.length > 0) {
      swiped('right', filteredGenderedUsers[0].user_id);
    }
  };

  const swipeLeft = () => {
    if (filteredGenderedUsers && filteredGenderedUsers.length > 0) {
      swiped('left', filteredGenderedUsers[0].user_id);
    }
  };

  return (
    <>
      {user && (
      <div className="dashboard">
        <ChatContainer user={user} />
        <div className="swipe-container">
          {/* Popup Instruction Message */}
          {showPopup && (
            <div className="popup-instruction">
              <span className="close-button" onClick={() => setShowPopup(false)}>
                &times;
              </span>
              Swipe right to send a friend request or swipe left to ignore.
            </div>
          )}
          <div className="card-container">
            {filteredGenderedUsers?.length === 0 ? (
              <div className="empty-card">
                <h2>
                  Come back later to find new suggestions {'\u{1F44B}'}
                </h2>
              </div>
            ) : (
                filteredGenderedUsers?.map((genderedUser) => (
                  <TinderCard
                    className="swipe"
                    key={genderedUser.user_id}
                    onSwipe={(dir) => swiped(dir, genderedUser.user_id)}
                    onCardLeftScreen={() => outOfFrame(genderedUser.first_name)}
                  >
                    <div
                      style={{ backgroundImage: `url(${genderedUser.url})` }}
                      className="card"
                    >
                      <div className="card-name-container">
                        <h3>{genderedUser.first_name}</h3>
                      </div>
                    </div>
                  </TinderCard>
                ))
              )}
            </div> {/* End of card-container */}
            <div className="swipe-info">
              {lastDirection ? <p>You swiped {lastDirection}</p> : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
                }

export default Dashboard;
