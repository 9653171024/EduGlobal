import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUniversity, FaGlobeAsia, FaMoneyBillWave, FaAward, FaFilter, FaUsers } from 'react-icons/fa';

const Recommendations = () => {
  const navigate = useNavigate();
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rate, setRate] = useState(0);
  const [errorMsg, setErrorMsg] = useState(''); // To show error on screen

  useEffect(() => {
    const fetchRecommendations = async () => {
      console.log(" 1. Component Mounted. Checking Local Storage...");
      
      const storedPrefs = localStorage.getItem('userPreferences');
      // Default preferences if empty
      const prefs = storedPrefs ? JSON.parse(storedPrefs) : { country: 'India', type: 'Govt', specialization: 'CS' };
      
      console.log("2. Sending Request to Backend with:", prefs);

      try {
        // Use 127.0.0.1 to prevent Windows network issues
        const res = await axios.post('http://127.0.0.1:5000/api/colleges/recommend', prefs);
        
        console.log(" 3. Response Received:", res.status, res.data);

        if (res.data && res.data.success) {
          console.log(" 4. Data is Valid. Setting State...");
          console.log("   -> Colleges found:", res.data.data.length);
          setColleges(res.data.data);
          setRate(res.data.meta.liveRate);
        } else {
          console.error("Backend returned success: false", res.data);
          setErrorMsg("Backend returned an error.");
        }

      } catch (err) {
        console.error("3. Request Failed:", err);
        setErrorMsg("Failed to connect to server. Ensure Backend is running.");
      } finally {
        console.log(" 5. Turning off Loading Spinner.");
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [navigate]);

  return (
    <div style={{ padding: '3rem 8%', background: '#f8fafc', minHeight: '100vh' }}>
      
      <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', color: '#1e293b', marginBottom: '10px' }}>
            Top Matches for You 🎯
          </h1>
          <p style={{ color: '#64748b' }}>Real-time fees: <b style={{color:'#10b981'}}>1 USD = ₹{rate}</b></p>
        </div>
        <button onClick={() => navigate('/onboarding')} style={{ padding: '10px 20px', border: '1px solid #cbd5e1', background: 'white', borderRadius: '8px', cursor: 'pointer' }}>
          <FaFilter /> Filters
        </button>
      </div>

      {/* ERROR MESSAGE DISPLAY */}
      {errorMsg && (
        <div style={{ padding: '20px', background: '#fee2e2', color: '#b91c1c', borderRadius: '8px', marginBottom: '20px' }}>
          <strong>Error:</strong> {errorMsg}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '50px', color: '#64748b' }}>
          <h2>🤖 loading..</h2>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {colleges.length > 0 ? (
            colleges.map((col, index) => (
              <div key={index} className="college-card">
                <div style={{ height: '150px', background: `url(${col.image}) center/cover no-repeat`, backgroundColor: '#cbd5e1', borderRadius: '12px 12px 0 0' }}></div>
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                    <span className="badge-blue">{col.specialization}</span>
                    {col.isTopTier && <span className="badge-gold"><FaAward /> Top Tier</span>}
                  </div>
                  <h3 style={{ fontSize: '1.25rem', margin: '0 0 6px 0', color: '#1e293b' }}>{col.name}</h3>
                  <div style={{ color: '#64748b', fontSize: '0.9rem' }}><FaGlobeAsia /> {col.country}</div>
                  
                  <div style={{ marginTop: '1.5rem', padding: '12px', background: '#f0fdf4', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.8rem', color: '#15803d' }}>Fees:</span>
                      <strong style={{ color: '#166534' }}><FaMoneyBillWave /> ₹{col.liveFees}</strong>
                    </div>
                  </div>
                  {/* Apply Button - Redirects to Official Website */}
                <button 
                className="view-btn" 
                style={{ marginTop: '1rem' }}
                onClick={() => window.open(col.website, '_blank')} // <--- THE MAGIC LINE
                >
                Visit Official Website
                </button>
                </div>
              </div>
            ))
          ) : (
            <h3>No colleges found. Check backend logs.</h3>
          )}
        </div>
      )}
    </div>
  );
};

export default Recommendations;