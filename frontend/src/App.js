import React, { useState } from 'react';
import './App.css';

function App() {
  const [roomWidth, setRoomWidth] = useState('');
  const [roomHeight, setRoomHeight] = useState('');
  const [insects, setInsects] = useState([]);
  const [output, setOutput] = useState('');

  const handleRoomWidthChange = (e) => {
    setRoomWidth(e.target.value);
  };

  const handleRoomHeightChange = (e) => {
    setRoomHeight(e.target.value);
  };

  const handleInsectInputChange = (index, field, value) => {
    const updatedInsects = [...insects];
    updatedInsects[index][field] = value;
    setInsects(updatedInsects);
  };

  const handleAddInsect = () => {
    setInsects([...insects, { x: '', y: '', heading: '', commands: '' }]);
  };

  // const handleNavigate = async () => {
  //   try {
  //     if (!roomWidth || !roomHeight) {
  //       console.error('Please enter room dimensions.');
  //       return;
  //     }

  //     const parsedRoomWidth = parseInt(roomWidth);
  //     const parsedRoomHeight = parseInt(roomHeight);

  //     if (isNaN(parsedRoomWidth) || isNaN(parsedRoomHeight)) {
  //       console.error('Invalid room dimensions. Please enter numbers only.');
  //       return;
  //     }

  //     const roomSize = [parsedRoomWidth, parsedRoomHeight];
  //     const response = await fetch('http://localhost:3001/insects/navigate', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ roomSize, insects }),
  //     });
  //     const data = await response.json();
  //     setOutput(data.join('\n'));
  //   } catch (error) {
  //     console.error('Error navigating insects:', error);
  //   }
  // };
  const handleNavigate = async () => {
    try {
      if (!roomWidth || !roomHeight) {
        console.error('Please enter room dimensions.');
        return;
      }
  
      const parsedRoomWidth = parseInt(roomWidth);
      const parsedRoomHeight = parseInt(roomHeight);
  
      if (isNaN(parsedRoomWidth) || isNaN(parsedRoomHeight)) {
        console.error('Invalid room dimensions. Please enter numbers only.');
        return;
      }
  
      
      const validInsects = insects.filter((insect) => (
        insect.x !== '' && insect.y !== '' && insect.heading !== '' && insect.commands !== ''
      ));
  
      if (validInsects.length === 0) {
        console.error('Please provide details for at least one insect.');
        return;
      }
  
      const formattedInsects = validInsects.map((insect) => ({
        x: parseInt(insect.x),
        y: parseInt(insect.y),
        heading: insect.heading,
        commands: insect.commands,
      }));
  
      const roomSize = [parsedRoomWidth, parsedRoomHeight];

      const response = await fetch('http://localhost:3001/insects/navigate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ roomSize, insects: formattedInsects }),
      });
      const data = await response.json();
      setOutput(data.join('\n'));
    } catch (error) {
      console.error('Error navigating insects:', error);
    }
  };
  

  return (
    <div className="App">
      <h1>Insect Navigation</h1>
      <div>
        <label htmlFor="roomWidth">Room Width:</label>
        <input
          type="text"
          id="roomWidth"
          value={roomWidth}
          onChange={handleRoomWidthChange}
        />
      </div>
      <div>
        <label htmlFor="roomHeight">Room Height:</label>
        <input
          type="text"
          id="roomHeight"
          value={roomHeight}
          onChange={handleRoomHeightChange}
        />
      </div>
      {insects.map((insect, index) => (
        <div key={index}>
          <h2>Insect {index + 1}:</h2>
          <div>
            <label htmlFor={`x${index}`}>X:</label>
            <input
              type="text"
              id={`x${index}`}
              value={insect.x}
              onChange={(e) => handleInsectInputChange(index, 'x', e.target.value)}
            />
            <label htmlFor={`y${index}`}>Y:</label>
            <input
              type="text"
              id={`y${index}`}
              value={insect.y}
              onChange={(e) => handleInsectInputChange(index, 'y', e.target.value)}
            />
            <label htmlFor={`heading${index}`}>Heading:</label>
            <input
              type="text"
              id={`heading${index}`}
              value={insect.heading}
              onChange={(e) => handleInsectInputChange(index, 'heading', e.target.value)}
            />
            <label htmlFor={`commands${index}`}>Commands:</label>
            <input
              type="text"
              id={`commands${index}`}
              value={insect.commands}
              onChange={(e) => handleInsectInputChange(index, 'commands', e.target.value)}
            />
          </div>
        </div>
      ))}
      <button onClick={handleAddInsect}>Add Insect</button>
      {/* Conditionally render the button only if room dimensions are provided */}
      <button onClick={roomWidth && roomHeight ? handleNavigate : null}>Navigate</button>
      <div>
        <h2>Output:</h2>
        <pre>{output}</pre>
      </div>
      <div>
      <p>I am Ankit Kumar</p>
      <p>My github:</p>
      <a href="https://github.com">
        <button>GitHub</button>
      </a>
    </div>
    </div>
  );
}

export default App;
