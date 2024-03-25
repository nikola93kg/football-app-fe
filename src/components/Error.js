import React, { useEffect, useRef, useState } from "react";
import "../styles/Error.css";
import { Link } from "react-router-dom";

function Error() {

    const eyeLeftRef = useRef(null);
    const eyeRightRef = useRef(null);

    const [rotation, setRotation] = useState(0);

    const handleMouseMove = (e) => {
        const eye = eyeLeftRef.current; 
        const x = eye.offsetLeft + eye.clientWidth / 2;
        const y = eye.offsetTop + eye.clientHeight / 2;
        const rad = Math.atan2(e.pageX - x, e.pageY - y);
        const rot = (rad * (180 / Math.PI) * -1) + 180;
        setRotation(rot);
      };

      useEffect(() => {
        document.body.addEventListener("mousemove", handleMouseMove);
    
        return () => {
          document.body.removeEventListener("mousemove", handleMouseMove);
        };
      }, []);

      return (
        <div className="error-container">
        <div className="error-eyes">
        <span className="error-num">5</span>
          <div className="eye" ref={eyeLeftRef} style={{ transform: `rotate(${rotation}deg)` }}></div>
          <div className="eye" ref={eyeRightRef} style={{ transform: `rotate(${rotation}deg)` }}></div>
        </div>
          
          <div className="error-text">
          <p className="sub-text">
            Oh eyeballs! Something went wrong. <br /> We're <i>looking</i> to see what
            happened.
          </p>
          <Link to="/">Go back</Link>
          </div>
          
        </div>
      );
}

export default Error;
