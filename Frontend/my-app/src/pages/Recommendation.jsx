import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUniversity, FaGlobeAsia, FaMoneyBillWave, FaStar, FaAward } from 'react-icons/fa';

const Recommendations = () => {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rate, setRate] = useState(0);

  useEffect(() => {
    const fetchRecommendations = async () => {
      // 1. Retrieve the choices user made in Onboarding
      const prefs = JSON.parse(localStorage.getItem('userPreferences'));

      try {
        // 2. Send choices to Backend
        // Use 127.0.0.1 to avoid Windows localhost issues
        const res = await axios.post('http://127.0.0.1:5000/api/colleges/recommend', prefs || {});
        
        setColleges(res.data.data);
        setRate(res.data.meta.liveRate);
      } catch (err) {
        console.error("Error fetching colleges:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div style={{ padding: '3rem 8%', background: '#f8fafc', minHeight: '100vh' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#1e293b', marginBottom: '10px' }}>
          Top Matches for You 🎯
        </h1>
        <p style={{ color: '#64748b', fontSize: '1.1rem' }}>
          Real-time fees calculated at <span style={{ color: '#10b981', fontWeight: 'bold' }}>1 USD = ₹{rate}</span>
        </p>
      </div>

      {/* Loading State */}
      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '50px', color: '#64748b' }}>
          <h2>🤖 AI is analyzing your profile...</h2>
        </div>
      ) : (
        /* Grid Layout */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          
          {colleges.map((col, index) => (
            <div key={index} className="college-card">
              
              {/* Image Banner */}
              <div style={{ height: '140px', background: `url(${col.image}) center/cover no-repeat`, borderRadius: '12px 12px 0 0' }}></div>

              <div style={{ padding: '1.5rem' }}>
                
                {/* Badges */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <span className="badge-blue">{col.specialization}</span>
                  {col.isTopTier && <span className="badge-gold"><FaAward /> Top Tier</span>}
                </div>

                {/* Title & Rank */}
                <h3 style={{ fontSize: '1.3rem', margin: '0 0 5px 0', color: '#1e293b' }}>{col.name}</h3>
                <div style={{ color: '#64748b', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <FaGlobeAsia /> {col.country} • Rank #{col.ranking}
                </div>

                {/* Live Fees Section */}
                <div style={{ marginTop: '1.5rem', padding: '10px', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                  <span style={{ fontSize: '0.8rem', color: '#15803d' }}>Live Estimated Fees</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem', fontWeight: 'bold', color: '#166534' }}>
                    <FaMoneyBillWave /> ₹{col.liveFees}
                  </div>
                </div>

                {/* Apply Button */}
                <button className="view-btn" style={{ marginTop: '1rem' }}>
                  View Program
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recommendations;