import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import '../styles/Mess.css'; 

import axios from 'axios'; // Import Axios

const Mess = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMesses, setFilteredMesses] = useState([]);
  const [selectedMess, setSelectedMess] = useState(null);

  useEffect(() => {
    // Fetch mess data from the backend API when the component mounts
    fetchMessData();
  }, []);

  const fetchMessData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/messes');
      setFilteredMesses(response.data);
    } catch (error) {
      console.error('Error fetching mess data:', error);
    }
  };

  // Function to handle search
  const handleSearch = () => {
    // Filter messes based on searchQuery
    const filtered = filteredMesses.filter(mess =>
      mess.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mess.menu.some(item => item.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredMesses(filtered);
    setSelectedMess(null); // Reset selectedMess when performing a new search
  };

  // Function to handle click on a search result
  const handleResultClick = (messId) => {
    setSelectedMess(messId);
  };

  return (
    <Layout>
      <div className="mess-page with-background-image">
        <div className="landing-container">
          <h1 className="landing-title">Welcome to Mess Page</h1>
          <p className="landing-text">Find the mess that suits your cravings today!</p>
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for mess name or menu items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
            className="search-input"
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div className="results-container">
          {selectedMess !== null ? (
            <div className="mess-item" key={filteredMesses[selectedMess].id}>
              <img src={filteredMesses[selectedMess].image} alt={filteredMesses[selectedMess].name} className="mess-image" />
              <div className="mess-details">
                <h2 className="mess-name">{filteredMesses[selectedMess].name}</h2>
                <ul className="menu-list">
                  {filteredMesses[selectedMess].menu.map((menuItem, index) => (
                    <li key={index} className="menu-item">{menuItem}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            filteredMesses.length > 0 ? (
              filteredMesses.map((mess, index) => (
                <div className="mess-item" key={mess.id} onClick={() => handleResultClick(index)}>
                  <img src={mess.image} alt={mess.name} className="mess-image" />
                  <div className="mess-details">
                    <h2 className="mess-name">{mess.name}</h2>
                    <ul className="menu-list">
                      {mess.menu.map((menuItem, index) => (
                        <li key={index} className="menu-item">{menuItem}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-results">No results found</p>
            )
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Mess;
