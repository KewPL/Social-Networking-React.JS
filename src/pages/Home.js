import Nav from '../components/Nav'
import AuthModal from "../components/AuthModal"
import {useState} from 'react'
import {useCookies} from "react-cookie"

const Home = () => {
    const [showModal, setShowModal] = useState(false)
    const [isSignUp, setIsSignUp] = useState(true)
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const authToken = cookies.AuthToken

    const handleClick = () => {
        if (authToken) {
            removeCookie('UserId', cookies.UserId)
            removeCookie('AuthToken', cookies.AuthToken)
            window.location.reload()
            return
        }
        setShowModal(true)
        setIsSignUp(true)
    }

    return (
        <div className="overlay">
            <Nav
                authToken={authToken}
                minimal={false}
                setShowModal={setShowModal}
                showModal={showModal}
                setIsSignUp={setIsSignUp}
            />
            <div className="home">
            <h1 className="primary-title">
                 Where Every Link<br/>Tells a Story
                <span className="waving-hand">👋</span>
            </h1>
            <h3 className="secondary-title">Unlock the Power of Choice. Swipe, Match, Chat, Repeat!</h3>

                <button className="primary-button" onClick={handleClick}>
                    {authToken ? 'Signout' : 'Create Account'}
                </button>

                <p class="primary-text">Unlock the power of choice in a world tailored for you—simply swipe right to say 'yes' and left to say 'no', navigating through an endless realm of profiles. Our proprietary matching algorithm curates a list of potential mates based on your unique preferences, creating an arena where your swipes are more than just fleeting gestures. Engage in meaningful conversations through our robust chat features. Even in a society that embraces technology and online presence, we prioritize your privacy, offering you the power to reveal or conceal as you deem fit. Beyond the swipes, be part of an active community by participating in virtual events, quizzes, and swipe parties. Don't just take our word for it—join now and experience the exhilarating blend of simplicity and sophistication that is Link.Me.</p>


                {showModal && (
                    <AuthModal setShowModal={setShowModal} isSignUp={isSignUp}/>
                )}
            </div>
        </div>
    )
}
export default Home