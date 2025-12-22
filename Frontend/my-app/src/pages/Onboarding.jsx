import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGlobeAmericas, FaUniversity } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Recommendations from './Recommendation'; // Ensure CSS is imported

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  // State to hold choices
  const [preferences, setPreferences] = useState({
    country: '',
    type: '',
    specialization: ''
  });

  // STEP 1 & 2: Update State and Next Step
  const handleSelection = (field, value) => {
    console.log(`✅ Selected ${field}: ${value}`); // Debug Log
    setPreferences(prev => ({ ...prev, [field]: value }));
    setStep(step + 1);
  };

  // STEP 3: Handle Final Selection & Save
  const finishOnboarding = (finalSpec) => {
    
    // 1. Create the Final Object immediately (Don't wait for state)
    const finalData = {
      ...preferences,
      specialization: finalSpec
    };

    console.log("🚀 Saving Final Preferences:", finalData); // Debug Log

    // 2. Save to Local Storage
    localStorage.setItem('userPreferences', JSON.stringify(finalData));
    
    // 3. Redirect
    toast.success("Preferences Saved! Finding colleges...");
    setTimeout(() => navigate('/Recommendation'), 500);
  };

  return (
    <div className="hero-container" style={{ minHeight: '100vh', flexDirection: 'column' }}>
      
      {/* Progress Bar */}
      <div style={{ width: '200px', height: '4px', background: '#e2e8f0', marginBottom: '2rem', borderRadius: '2px' }}>
        <div style={{ width: `${(step / 3) * 100}%`, height: '100%', background: '#2563eb', transition: 'width 0.3s' }}></div>
      </div>

      <div className="auth-card" style={{ textAlign: 'center', padding: '3rem' }}>
        
        {/* STEP 1: Country */}
        {step === 1 && (
          <div className="animation-fade-in">
            <h2>Let's get started! 🌍</h2>
            <p style={{ color: '#64748b', marginBottom: '2rem' }}>Where are you planning to study?</p>
            
            <div style={{ display: 'grid', gap: '1rem' }}>
              <button onClick={() => handleSelection('country', 'India')} className="onboarding-btn">
                <FaUniversity /> Study in India
              </button>
              <button onClick={() => handleSelection('country', 'Abroad')} className="onboarding-btn">
                <FaGlobeAmericas /> Study Abroad
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Institute Type */}
        {step === 2 && (
          <div className="animation-fade-in">
            <h2>Preference? 🏛️</h2>
            <p style={{ color: '#64748b', marginBottom: '2rem' }}>What kind of institute are you looking for?</p>
            
            <div style={{ display: 'grid', gap: '1rem' }}>
              <button onClick={() => handleSelection('type', 'Govt')} className="onboarding-btn">
                Government (Low Fees)
              </button>
              <button onClick={() => handleSelection('type', 'Private')} className="onboarding-btn">
                Private / International
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Specialization (THE FIX IS HERE) */}
        {step === 3 && (
          <div className="animation-fade-in">
            <h2>Last step! 🎓</h2>
            <p style={{ color: '#64748b', marginBottom: '2rem' }}>What do you want to specialize in?</p>
            
            <div style={{ display: 'grid', gap: '1rem' }}>
              {/* Note: We pass the value directly to finishOnboarding */}
              <button onClick={() => finishOnboarding('CS')} className="onboarding-btn">
                Computer Science / IT
              </button>
              <button onClick={() => finishOnboarding('Medical')} className="onboarding-btn">
                Medical
              </button>
              <button onClick={() => finishOnboarding('MBA')} className="onboarding-btn">
                Management (MBA)
              </button>
              <button onClick={() => finishOnboarding('Arts')} className="onboarding-btn">
                Arts / Humanities
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Onboarding;