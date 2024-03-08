import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import '../styles/Mess.css';
import mess1 from '../Images/mess1.jpg';
import mess2 from '../Images/mess2.jpg';
import mess3 from '../Images/mess3.jpg';

const Mess = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMesses, setFilteredMesses] = useState([]);
  const [selectedMess, setSelectedMess] = useState(null);

  // Dummy mess data with images and menus
  const data = [
    { id: 1, name: 'Anapurna Mess', image: mess1, menu: ['Breakfast: Item 1', 'Lunch: Item 4', 'Dinner: Item 7'] },
    { id: 2, name: 'Shivnery Mess', image: mess2, menu: ['Breakfast: Item 2', 'Lunch: Item 5', 'Dinner: Item 8'] },
    { id: 3, name: 'Krupa Mess', image: mess3, menu: ['Breakfast: Item 3', 'Lunch: Item 6', 'Dinner: Item 9'] },
  ];

  // Function to handle search
  const handleSearch = () => {
    // Filter messes based on searchQuery
    const filtered = data.filter(mess =>
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
      <div className="mess-page">
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
