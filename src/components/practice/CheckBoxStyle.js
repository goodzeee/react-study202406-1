import React, { useState } from 'react';
import './CheckBoxStyle.css'; 

function CheckBoxStyle() {
  
  return (
    <div className="checkbox-container">
      <input
        type="checkbox"
        id="styled-checkbox"
      />
      <label
        htmlFor="styled-checkbox"
      >
        Check me!
      </label>
    </div>
  );
}

export default CheckBoxStyle;
