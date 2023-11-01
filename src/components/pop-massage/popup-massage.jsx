import React, { useState, useEffect } from 'react';
import './popup-massage.style.scss'
import sucsess from '../../assets/qCp0FQF4jY.json'
import Lottie from 'lottie-react';

const Popup = ({props}) => {
  const [showPopup, setShowPopup] = useState(false);
  const {title,text}=props

  useEffect(() => {
    setShowPopup(true);

    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`payment-success-popup ${showPopup ? 'show' : ''}`}>
      <div className="popup-content">
      <div className='empty-message'><Lottie
      animationData={sucsess} 
      loop={false} 
      autoplay={true} 
    />
</div>
        <h3 className="popup-title">{title}</h3>
        <p className="popup-text">{text}</p>
      </div>
    </div>
  );
};

export default Popup;
   // Your payment has been successfully submitted. We’ve sent
          // you an email with all of the details of your order.