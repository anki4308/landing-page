import React, { useState } from 'react';
import axios from 'axios';
import { FaDesktop } from 'react-icons/fa'; // Importing an icon from react-icons

function LandingPage() {
  const [screenName, setScreenName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State to handle loader

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!screenName.trim()) {
      setMessage('Screen name cannot be empty.');
      return;
    }

    setIsLoading(true); // Show loader
    try {
        const response = await axios.post('http://localhost:3001/api/screens/connect', { screenName });
      if (response.status === 200) {
        setIsSubmitted(true);
        setMessage(`Screen "${screenName}" has been successfully connected!`);
      }
    } catch (error) {
      console.error('Error connecting screen:', error);
      setMessage('Failed to connect screen. Please try again.');
    } finally {
      setIsLoading(false); // Hide loader
    }
  };

  return (
    <div style={styles.container}>
      {isSubmitted ? (
        <div style={styles.successContainer}>
          <h2>{message}</h2>
        </div>
      ) : (
        <div style={styles.card}>
          <div style={styles.icon}>
            <FaDesktop size={70} color="#00C853" /> {/* Larger icon with light green color */}
          </div>
          <h2 style={styles.title}>Enter Screen Name</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              placeholder="Screen Name"
              value={screenName}
              onChange={(e) => setScreenName(e.target.value)}
              style={styles.input}
            />
            <button type="submit" style={styles.button} disabled={isLoading}>
              {isLoading ? (
                <div style={styles.loader}></div> // Loader animation
              ) : (
                'Submit'
              )}
            </button>
          </form>
          {message && <p style={styles.error}>{message}</p>}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f4f8',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '60px', // Increased padding for larger card
    borderRadius: '20px', // Slightly more rounded
    boxShadow: '0 6px 25px rgba(0, 0, 0, 0.15)', // Deeper shadow for emphasis
    textAlign: 'center',
    width: '500px', // Wider card
  },
  icon: {
    marginBottom: '30px', // More spacing below the icon
  },
  title: {
    fontSize: '28px', // Larger title font size
    fontWeight: 'bold',
    marginBottom: '25px', // Increased spacing below the title
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    padding: '18px', // Larger input padding
    borderRadius: '10px',
    border: '1px solid #ccc',
    marginBottom: '25px', // More spacing below the input
    width: '100%',
    fontSize: '18px', // Larger font size for input text
    outline: 'none',
    boxSizing: 'border-box',
  },
  button: {
    padding: '18px 35px', // Larger button size
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#00C853', // HPE light green color
    color: '#fff',
    fontSize: '18px', // Larger button text
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    transition: 'background-color 0.3s ease',
  },
  loader: {
    border: '3px solid #ffffff',
    borderTop: '3px solid #00C853', // Same color as button for contrast
    borderRadius: '50%',
    width: '20px', // Larger loader size
    height: '20px',
    animation: 'spin 1s linear infinite',
  },
  error: {
    color: '#dc3545',
    marginTop: '15px',
    fontSize: '16px',
  },
  successContainer: {
    textAlign: 'center',
    padding: '30px',
    backgroundColor: '#e9f5ff',
    borderRadius: '15px',
    fontSize: '18px',
  },
};

export default LandingPage;
