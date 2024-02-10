import React, { useState } from "react";

function ImageXY() {
  const [coordinates, setCoordinates] = useState([]);

  const handleImageClick = (event) => {
    const image = event.target;
    const rect = image.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setCoordinates([...coordinates, { x, y }]);
  };

  return (
    <div className="flex flex-row">
      <div
        style={{ position: "relative", display: "inline-block" }}
        className="w-[1024px]"
      >
        <img
          src="https://getsafeandsound.com/wp-content/uploads/2019/12/store-security-in-retail-management.jpg"
          alt="Your Image"
          onClick={handleImageClick}
          style={{ maxWidth: "100%" }}
        />
        {coordinates.map((coord, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              left: coord.x,
              top: coord.y,
              width: 10,
              height: 10,
              backgroundColor: "red",
              borderRadius: "50%",
              transform: "translate(-50%, -50%)", 
            }}
          />
        ))}
      </div>
      <ul>
        {coordinates.map((coord, index) => (
          <li key={index}>
            X: {coord.x}, Y: {coord.y}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ImageXY;
