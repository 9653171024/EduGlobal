import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCalendarAlt, FaExternalLinkAlt, FaUsers, FaClock, FaTrophy, FaArrowRight } from 'react-icons/fa';

const Entrance = () => {
  const [exams, setExams] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  // Fetch Data
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:5001/api/exams');
        setExams(res.data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchExams();
  }, []);

  // Filter Logic
  const filteredExams = filter === 'All' ? exams : exams.filter(e => e.category === filter);

  // Date Calculator
  const getDaysLeft = (deadline) => {
    const today = new Date();
    const end = new Date(deadline);
    if(isNaN(end)) return "Rolling"; // Handle text deadlines like 'Rolling'
    
    const diff = end - today;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? `${days} days left` : "Closed";
  };

  return (
    <div className="entrance-page">
      
      {/* --- 1. MOTIVATIONAL HERO SECTION --- */}
      <div className="exam-hero">
        <div className="hero-overlay">
          <div className="hero-text-content">
            <span className="badge-gold"><FaTrophy /> Shape Your Future</span>
            <h1>Conquer Your Dream Exam.</h1>
            <p>
              Whether it's IIT, AIIMS, or Harvard — your journey starts here.
              Track dates, syllabus, and deadlines in one place.
            </p>
            <button className="hero-cta" onClick={() => window.scrollTo({top: 600, behavior: 'smooth'})}>
              Explore Exams <FaArrowRight />
            </button>
          </div>
        </div>
      </div>

      {/* --- 2. INFINITE SCROLLING TICKER --- */}
      <div className="ticker-wrap">
        <div className="ticker">
          <div className="ticker-item">IIT BOMBAY</div>
          <div className="ticker-item">AIIMS DELHI</div>
          <div className="ticker-item">IIM AHMEDABAD</div>
          <div className="ticker-item">MIT USA</div>
          <div className="ticker-item">STANFORD</div>
          <div className="ticker-item">OXFORD</div>
          <div className="ticker-item">IIT DELHI</div>
          <div className="ticker-item">BITS PILANI</div>
          {/* Duplicate for seamless loop */}
          <div className="ticker-item">IIT BOMBAY</div>
          <div className="ticker-item">AIIMS DELHI</div>
          <div className="ticker-item">IIM AHMEDABAD</div>
          <div className="ticker-item">MIT USA</div>
        </div>
      </div>

      {/* --- 3. EXAM LISTINGS --- */}
      <div className="content-container">
        
        {/* Filter Tabs */}
        <div className="filter-tabs">
          {['All', 'Engineering', 'Medical', 'Management', 'Study Abroad'].map(cat => (
            <button 
              key={cat} 
              className={`tab-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading / Grid */}
        {loading ? (
          <div style={{textAlign: 'center', padding: '50px', color: '#64748b'}}>
            <h2>Loading Schedules...</h2>
          </div>
        ) : (
          <div className="exam-grid">
            {filteredExams.map((exam) => (
              <div key={exam.id} className="exam-card">
                
                <div className="card-top">
                  <img src={exam.logo} alt="logo" className="exam-logo" />
                  <div>
                    <h3>{exam.name}</h3>
                    <span className="organizer">{exam.organizer}</span>
                  </div>
                </div>
                
                <div className="card-tags">
                  {exam.tags.map((t, i) => <span key={i} className="mini-tag">{t}</span>)}
                </div>

                <div className="card-stats">
                  <div className="stat">
                    <FaCalendarAlt /> <span>{exam.examDate}</span>
                  </div>
                  <div className="stat">
                    <FaClock /> <span style={{color: '#e11d48', fontWeight: 'bold'}}>{getDaysLeft(exam.deadline)}</span>
                  </div>
                </div>

                <div className="card-footer">
                  <button className="apply-btn" onClick={() => window.open(exam.website, '_blank')}>
                    Official Website <FaExternalLinkAlt />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Entrance;