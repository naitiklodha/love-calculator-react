import React, { useState } from 'react';

const LoveCalculator = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('male');
  const [result, setResult] = useState(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const calculateLove = () => {
    const loveScore = Math.floor(Math.random() * 101);
    setResult(`${loveScore}%`);
  };

  return (
    <div>
      <h1>Love Calculator</h1>
      <label>
        Your Name:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <br />
      <label>
        Your Gender:
        <select value={gender} onChange={handleGenderChange}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </label>
      <br />
      <button onClick={calculateLove}>Calculate Love</button>
      {result && <p>Your love score is: {result}</p>}
    </div>
  );
};

export default LoveCalculator;
