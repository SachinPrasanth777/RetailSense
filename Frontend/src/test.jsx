import React, { useState } from "react";

const Test = () => {
  const [responseData, setResponseData] = useState(null);

  const gettest = async () => {
    try {
      const data = await fetch('http://127.0.0.1:8000/', { mode: 'cors' });
      const response = await data.json();
      setResponseData(response);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <button onClick={gettest}>hi</button>
      {responseData && (
        <div>
          <h2>Data from API:</h2>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Test;
