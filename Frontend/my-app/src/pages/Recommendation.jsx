import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaGlobeAsia, FaMoneyBillWave, FaAward, FaFilter, FaExternalLinkAlt } from 'react-icons/fa';

const Recommendations = () => {
  const navigate = useNavigate();
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rate, setRate] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  
  // --- ANIMATED HEADER STATE ---
  const [headerText, setHeaderText] = useState("");
  const fullText = " Top Matches! 🚀";

  // Typewriter Effect Logic
  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i < fullText.length) {
        setHeaderText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typing);
      }
    }, 50); // Speed of typing

    return () => clearInterval(typing);
  }, []);

  // Fetch Data Logic
  useEffect(() => {
    const fetchRecommendations = async () => {
      // Get preferences or use defaults
      const storedPrefs = localStorage.getItem('userPreferences');
      const prefs = storedPrefs ? JSON.parse(storedPrefs) : { country: 'India', type: 'Govt', specialization: 'CS' };
      
      try {
        // NOTE: Ensure port matches your backend (5000 or 5001)
        const res = await axios.post('http://127.0.0.1:5001/api/colleges/recommend', prefs || {});
        
        if (res.data && res.data.success) {
          setColleges(res.data.data);
          setRate(res.data.meta.liveRate);
        } else {
          setErrorMsg("Could not fetch recommendations.");
        }
      } catch (err) {
        console.error(err);
        setErrorMsg("Failed to connect to server. Ensure Backend is running.");
      } finally {
        // Small delay to make the loading transition smooth
        setTimeout(() => setLoading(false), 500);
      }
    };

    fetchRecommendations();
  }, [navigate]);

  return (
    <div style={{ padding: '3rem 8%', minHeight: '100vh', maxWidth: '1400px', margin: '0 auto' }}>
      
      {/* --- HEADER SECTION --- */}
      <div style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          {/* Animated Header */}
          <h1 style={{ fontSize: '2.5rem', color: '#0f172a', marginBottom: '8px', fontWeight: '800', letterSpacing: '-1px', height: '60px' }}>
            <span className="typing-cursor">{headerText}</span>
          </h1>
          
          {/* Currency Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1rem', color: '#64748b' }}>
            <span>Live Currency:</span>
            <span style={{ background: '#dcfce7', color: '#166534', padding: '4px 10px', borderRadius: '6px', fontWeight: 'bold', fontSize: '0.9rem' }}>
              1 USD = ₹{rate}
            </span>
          </div>
        </div>
        
        {/* Filter Button */}
        <button className="filter-glass-btn" onClick={() => navigate('/onboarding')}>
          <FaFilter size={14} /> Adjust Filters
        </button>
      </div>

      {/* --- ERROR MESSAGE --- */}
      {errorMsg && (
        <div style={{ padding: '16px', background: '#fee2e2', color: '#991b1b', borderRadius: '8px', border: '1px solid #fecaca', marginBottom: '30px' }}>
          <strong>Error:</strong> {errorMsg}
        </div>
      )}

      {/* --- CARDS GRID --- */}
      {/* Using the new 'recommendations-grid' class for better spacing */}
      <div className="recommendations-grid">
        
        {loading ? (
           <h3 style={{color: '#64748b', gridColumn: '1/-1', textAlign: 'center'}}>
             🤖 AI is finding the best colleges for you...
           </h3>
        ) : colleges.length > 0 ? (
          colleges.map((col, index) => (
            <div key={index} className="college-card">
              
              {/* IMAGE HEADER */}
              <div 
                className="card-image-container"
                style={{ backgroundImage: `url(${col.image})` }}
              >
                <div className="card-image-overlay"></div>
              </div>

              {/* CARD CONTENT */}
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                
                {/* Badges Row */}
                <div className="badge-container">
                  <span className="badge-blue">{col.specialization}</span>
                  {col.isTopTier && (
                    <span className="badge-gold">
                      <FaAward /> Top Tier
                    </span>
                  )}
                </div>

                {/* College Name */}
                <h3 style={{ fontSize: '1.35rem', margin: '0 0 8px 0', color: '#0f172a', fontWeight: '700' }}>
                  {col.name}
                </h3>

                {/* Location Subtitle */}
                <div style={{ color: '#64748b', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '1.5rem' }}>
                  <FaGlobeAsia color="#94a3b8" /> 
                  <span>{col.country} • Rank #{col.ranking}</span>
                </div>

                {/* Fees Box */}
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '600' }}>Est. Annual Fees</span>
                    <strong style={{ color: '#0f172a', fontSize: '1.1rem' }}>₹{col.liveFees}</strong>
                  </div>
                  <div style={{ background: '#dcfce7', padding: '8px', borderRadius: '50%', color: '#15803d' }}>
                    <FaMoneyBillWave />
                  </div>
                </div>

                {/* Visit Website Button */}
                <button
                  className="visit-site-btn"
                  onClick={() => {
                    const website = col.website && col.website.trim().startsWith('http') 
                      ? col.website.trim() 
                      : `https://${col.website?.trim()}`;
                    
                    if (col.website) window.open(website, '_blank', 'noopener,noreferrer');
                    else alert('Official website link not available');
                  }}
                >
                  Visit Website <FaExternalLinkAlt size={12} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: '#64748b' }}>
            <h3>No colleges match your specific filters.</h3>
            <p>Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommendations;