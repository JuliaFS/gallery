import { useState } from "react";

import styles from "./ImageMagnifier.module.css";

export default function ImageMagnifier({imageUrl, title}) {
  //useState is used to manage component state
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  console.log(imageUrl)
  console.log(title)

  //Function to handle mouse hover over the image
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();

    //Calculate the position (x, y) as percentage based on cursor
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setPosition({ x, y });

    //update cursor position to store the current mouse cursor coordinates relative to the image
    setCursorPosition({ x: e.pageX - left, y: e.pageY - top });
  };

  return (
    <div
      className={styles["img-magnifier-container"]}
      onMouseEnter={() => setShowMagnifier(true)}
      onMouseLeave={() => setShowMagnifier(false)}
      onMouseMove={handleMouseMove}
    >

      {/*Display main image*/}
      <img className={styles["magnifier-img"]} src={imageUrl} alt={title} />
  
      {showMagnifier && (
        <div
          style={{
            position: "absolute",
            //Position the magnifier near the cursor
            left: `${cursorPosition.x - 100}px`,
            top: `${cursorPosition.y - 100}px`,
            //Make sure the magnifier doesn't interfere with mouse event
            pointerEvents: "none",
          }}
        >
          <div
            className={styles["magnifier-image"]}
            style={{
              backgroundImage: `url(${imageUrl})`,

              //adjust the background position based on cursor location
              backgroundPosition: `${position.x}% ${position.y}%`,
            }}
          />
        </div>
      )}
    </div>
  );
}