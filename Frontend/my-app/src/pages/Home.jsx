import React from 'react';
import { FaSearch, FaRocket, FaUserShield, FaChartLine } from 'react-icons/fa';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="hero-container">
        <div className="hero-content">
          
          <div className="hero-text">
            {/* REMOVED: The AI Badge */}
            
            {/* FIXED: Headline with better spacing */}
            <h1>Launch Your <br /> Global Career Today.</h1>
            
            {/* UPDATED: Cleaner Subtext */}
            <p>
              Find universities that value your potential. 
              Search by degree, specialization, or country.
            </p>

            {/* Search Bar */}
            <div className="search-wrapper">
              <FaSearch style={{ color: '#aaa', margin: 'auto 0 auto 15px' }} />
              <input type="text" placeholder="What do you want to study? (e.g. Data Science)" />
              <button className="search-btn">Explore</button>
            </div>

            
            
          </div>

          <div className="hero-image">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Students" 
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2 className="section-title">Why Choose Us?</h2>
        
        <div className="cards-grid">
          <div className="glass-card">
            <div className="card-icon"><FaRocket /></div>
            <h3>Smart Matching</h3>
            <p>Our algorithms match you with universities that have a high probability of accepting you based on your profile.</p>
          </div>

          <div className="glass-card">
            <div className="card-icon"><FaUserShield /></div>
            <h3>Verified Reviews</h3>
            <p>Read authentic reviews from real alumni, secured on a decentralized ledger.</p>
          </div>

          <div className="glass-card">
            <div className="card-icon"><FaChartLine /></div>
            <h3>Real-Time Tracking</h3>
            <p>Track your application status and educational loan processing in real-time.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;