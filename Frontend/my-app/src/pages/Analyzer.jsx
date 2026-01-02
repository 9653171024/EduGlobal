import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { 
  FaMagic, FaExternalLinkAlt, FaMoneyBillWave, FaCalendarAlt, 
  FaMapMarkerAlt, FaBookOpen, FaBed, FaSearch, FaUniversity, FaExclamationTriangle 
} from 'react-icons/fa';

const Analyzer = () => {
  const location = useLocation();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [redirecting, setRedirecting] = useState(false); // New state for redirect UI

  const performAnalysis = async (targetUrl) => {
    if (!targetUrl) return;
    
    setLoading(true);
    setResult(null);
    setError('');
    setRedirecting(false);
    setUrl(targetUrl);

    try {
      // Use 127.0.0.1
      const res = await axios.post('http://127.0.0.1:5001/api/analyze-url', { url: targetUrl });
      
      if(res.data && res.data.success) {
        setResult(res.data.data);
      } else {
        // Backend said "No" (Success: false)
        handleFailure(targetUrl);
      }
    } catch (err) {
      // Network/Server Error
      console.error(err);
      handleFailure(targetUrl);
    } finally {
      setLoading(false);
    }
  };

  // --- NEW: Handle Redirect Logic ---
  const handleFailure = (targetUrl) => {
    setError("This website has high security (Anti-Bot). Redirecting you to the official site directly...");
    setRedirecting(true);
    
    // Wait 2 seconds so user reads the message, then open site
    setTimeout(() => {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
      setRedirecting(false);
      setError(''); // Clear error after redirect
    }, 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    performAnalysis(url);
  };

  useEffect(() => {
    if (location.state && location.state.targetUrl) {
      performAnalysis(location.state.targetUrl);
    }
  }, [location.state]);

  return (
    <div style={{ padding: '3rem 5%', background: '#f8fafc', minHeight: '100vh' }}>
      
      <div className="analyzer-container">
        {/* HERO HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ color: '#0f172a', marginBottom: '10px', fontSize: '2.8rem', fontWeight: '800' }}>
            AI University Scanner
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.2rem' }}>
            Instantly extract Fees, Deadlines, and Requirements from any official page.
          </p>
        </div>

        {/* SEARCH BAR */}
        <form onSubmit={handleSubmit} className="search-card-modern">
          <input 
            type="url" 
            placeholder="Paste university URL (e.g. https://www.mit.edu/admissions)" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="modern-input"
          />
          <button type="submit" className="modern-btn" disabled={loading || redirecting}>
            {loading ? (
              <><span>⚡</span> Scanning...</>
            ) : redirecting ? (
              <><span>🔄</span> Redirecting...</>
            ) : (
              <><FaSearch /> Analyze</>
            )}
          </button>
        </form>

        {/* REDIRECT MESSAGE */}
        {(error || redirecting) && (
          <div style={{ padding: '20px', background: '#fff7ed', color: '#c2410c', borderRadius: '12px', border: '1px solid #fed7aa', marginBottom: '30px', textAlign: 'center' }}>
            <h3 style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '10px'}}>
              <FaExclamationTriangle />
              {redirecting ? "Redirecting Automatically..." : "Analysis Blocked"}
            </h3>
            <p>{error}</p>
          </div>
        )}

        {/* RESULT DASHBOARD (Bento Grid) */}
        {result && (
          <div className="bento-grid">
            {/* ... Keep the existing Bento Grid code here ... */}
            {/* (I am not repeating the Grid code to save space, stick to the previous Bento code I gave you) */}
            
            <div className="result-header">
              <div>
                <span className="ai-badge"><FaMagic /> AI Analysis Complete</span>
                <h2 className="uni-title">{result.name}</h2>
                <p style={{ color: '#64748b', maxWidth:'600px' }}>{result.summary}</p>
              </div>
              <a href={result.website} target="_blank" rel="noreferrer" className="modern-btn" style={{ background: 'white', color: '#2563eb', border: '1px solid #2563eb' }}>
                Visit Page <FaExternalLinkAlt size={12} style={{marginLeft:'5px'}} />
              </a>
            </div>

            {/* FEES */}
            <div className="bento-card card-fees">
              <div className="bento-icon" style={{ background: '#dcfce7', color: '#16a34a' }}><FaMoneyBillWave /></div>
              <span className="bento-label">Estimated Tuition</span>
              <div className="bento-value">{result.fees}</div>
            </div>

            {/* DEADLINE */}
            <div className="bento-card card-deadline">
              <div className="bento-icon" style={{ background: '#fee2e2', color: '#dc2626' }}><FaCalendarAlt /></div>
              <span className="bento-label">Deadline</span>
              <div className="bento-value">{result.deadline}</div>
            </div>

            {/* LOCATION */}
            <div className="bento-card card-location">
              <div className="bento-icon" style={{ background: '#ffedd5', color: '#ea580c' }}><FaMapMarkerAlt /></div>
              <span className="bento-label">Location</span>
              <div className="bento-value">{result.location}</div>
            </div>

            {/* PROGRAMS */}
            <div className="bento-card card-programs">
              <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'15px' }}>
                <div className="bento-icon" style={{ background: '#f3e8ff', color: '#7c3aed', marginBottom:0 }}><FaBookOpen /></div>
                <span className="bento-label" style={{marginBottom:0}}>Programs</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {result.programs && result.programs.map((p, idx) => (
                  <span key={idx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '6px 12px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '600', color: '#475569' }}>{p}</span>
                ))}
              </div>
            </div>

            {/* HOSTEL */}
            <div className="bento-card card-hostel">
              <div className="bento-icon" style={{ background: '#cffafe', color: '#0891b2' }}><FaBed /></div>
              <span className="bento-label">Accommodation</span>
              <div className="bento-value" style={{fontSize: '1rem', fontWeight:'500'}}>{result.hostel}</div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Analyzer;