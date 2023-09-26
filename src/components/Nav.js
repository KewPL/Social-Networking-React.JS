import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import WhiteLogo from '../images/LinkMeLogoWhite.png';
import ColorLogo from '../images/LinkMeLogo.png';

const Nav = ({ authToken, minimal, setShowModal, showModal, setIsSignUp }) => {
  const logoRef = useRef(null);

  useEffect(() => {
    const timeline = gsap.timeline({ repeat: -1, yoyo: true });
    timeline
      .to(logoRef.current, { opacity: 0.5, duration: 1, ease: "power1.inOut" })
      .to(logoRef.current, { opacity: 1, duration: 1, ease: "power1.inOut" });
  }, []);

  const handleClick = () => {
    setShowModal(true);
    setIsSignUp(false);
  };

  return (
    <nav>
      <div className="logo-container">
      {minimal ? <img src={ColorLogo} className="logo" ref={logoRef} alt="Colored Logo" /> : <img src={WhiteLogo} className="logo" ref={logoRef} alt="White Logo" />}

      </div>
      {!authToken && !minimal && (
        <button
          className="nav-button"
          onClick={handleClick}
          disabled={showModal}
        >
          Log in
        </button>
      )}
    </nav>
  );
};

export default Nav;
