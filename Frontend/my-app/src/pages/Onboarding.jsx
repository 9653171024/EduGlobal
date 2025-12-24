import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaGlobeAmericas,
  FaUniversity,
  FaBuilding,
  FaSearch,
  FaUsers,
  FaBookOpen,
  FaCity,
  FaBriefcase
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import './Onboarding.css'

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [preferences, setPreferences] = useState({
    country: '',
    type: '',
    specialization: ''
  });

  const handleSelection = (field, value) => {
    console.log(`🔹 Step ${step}: User selected ${value}`);
    // Update state
    setPreferences(prev => {
      const newState = { ...prev, [field]: value };
      console.log("📊 Current State:", newState);
      return newState;
    });
    setStep(step + 1);
  };

  const finishOnboarding = (finalSpec) => {
    

    // 1. Construct the final object manually to ensure latest data
    const finalData = {
      country: preferences.country,
      type: preferences.type,
      specialization: finalSpec // Use the argument, not state (state is too slow)
    };

    console.log("💾 SAVING TO DISK:", finalData);

    // 2. Validation: Don't save if empty
    if (!finalData.country || !finalData.type) {
      alert("Something went wrong. Please refresh and try again.");
      return;
    }

    // 3. Save to Local Storage
    localStorage.setItem('userPreferences', JSON.stringify(finalData));

    // 4. Double Check: Read it back
    const saved = localStorage.getItem('userPreferences');
    console.log("✅ READ FROM DISK:", JSON.parse(saved));

    toast.success("Preferences Saved!");
    
    // 5. Navigate
    setTimeout(() => {
      navigate('/Recommendation');
    }, 100);
  };
  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <div className="hero-container onboarding-hero">
        <div className="hero-overlay">
          <div className="hero-content">
            {/* LEFT TEXT */}
            <div className="hero-left">
              <h1>Learn. Grow. Succeed.</h1>
              <p>
                We help students find the right college based on their goals,
                preferences, and aspirations.
              </p>
              <span className="hero-link">
                Explore recognized colleges →
              </span>
            </div>

            {/* RIGHT FINDER CARD */}
            <div className="auth-card finder-card">
              <div className="finder-header">
                <FaSearch />
                <h3>Find the right school for you</h3>
              </div>

              {/* STEP 1 */}
              {step === 1 && (
                <div className="animation-fade-in">
                  <button
                    className="onboarding-btn"
                    onClick={() => handleSelection('country', 'India')}
                  >
                    <FaUniversity /> Study in India
                  </button>

                  <button
                    className="onboarding-btn"
                    onClick={() => handleSelection('country', 'Abroad')}
                  >
                    <FaGlobeAmericas /> Study Abroad
                  </button>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="animation-fade-in">
                  <button
                    className="onboarding-btn"
                    onClick={() => handleSelection('type', 'Govt')}
                  >
                    <FaBuilding /> Government Institute
                  </button>

                  <button
                    className="onboarding-btn"
                    onClick={() => handleSelection('type', 'Private')}
                  >
                    <FaBuilding /> Private Institute
                  </button>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div className="animation-fade-in">
                  <button
                    className="onboarding-btn"
                    onClick={() => {
                      
                      finishOnboarding('CS');
                    }}
                  >
                    <FaBookOpen /> Computer Science / IT
                  </button>

                  <button
                    className="onboarding-btn"
                    onClick={() => {
                      
                      finishOnboarding('Medical');
                    }}
                  >
                    <FaUsers /> Medical
                  </button>

                  <button
                    className="onboarding-btn"
                    onClick={() => {
                      
                      finishOnboarding('MBA');
                    }}
                  >
                    <FaBriefcase /> Management
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ================= SCROLL SECTION ================= */}
      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <FaUsers />
            <h3>Engaged Students</h3>
            <p>
              You’ll have every opportunity to take an active part in your
              learning.
            </p>
          </div>

          <div className="feature-card">
            <FaBookOpen />
            <h3>Great Teaching</h3>
            <p>
              Academic innovation goes hand-in-hand with personalized learning.
            </p>
          </div>

          <div className="feature-card">
            <FaCity />
            <h3>Vibrant Communities</h3>
            <p>
              Speakers, seminars, unique events—you name it, these schools have
              it.
            </p>
          </div>

          <div className="feature-card">
            <FaBriefcase />
            <h3>Successful Outcomes</h3>
            <p>
              You’ll be equipped to find better solutions in the workplace and
              beyond.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Onboarding;