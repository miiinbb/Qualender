// ParentComponent.js
import React, { useState } from "react";
import Favorites from "./Favorites";

function ParentComponent() {
  const handleSaveBoxes = (selectedFavoritesBoxes) => {
    const username = '제발요'; // 실제 사용자명 값으로 변경
    const data = { username, selectedFavoritesBoxes };

    fetch('http://172.30.1.37:3000/saveBoxes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .then(result => {
        console.log(result.message);
      })
      .catch(error => {
        console.error('Error occurred while making the request:', error);
      });
  };

  return (
    <Favorites onSave={handleSaveBoxes} />
  );
}

export default ParentComponent;
