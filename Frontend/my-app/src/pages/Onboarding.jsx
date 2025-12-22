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

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [preferences, setPreferences] = useState({
    country: '',
    type: '',
    specialization: ''
  });

  const handleSelection = (field, value) => {
    setPreferences({ ...preferences, [field]: value });
    setStep(step + 1);
  };

  const finishOnboarding = async () => {
    try {
      localStorage.setItem('userPreference', JSON.stringify(preferences));
      toast.success('Profile setup complete!! Finding colleges...');
      setTimeout(() => navigate('/recommendation'), 1500);
    } catch (err) {
      console.log(err);
    }
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
                      setPreferences({ ...preferences, specialization: 'CS' });
                      finishOnboarding();
                    }}
                  >
                    <FaBookOpen /> Computer Science / IT
                  </button>

                  <button
                    className="onboarding-btn"
                    onClick={() => {
                      setPreferences({ ...preferences, specialization: 'Medical' });
                      finishOnboarding();
                    }}
                  >
                    <FaUsers /> Medical
                  </button>

                  <button
                    className="onboarding-btn"
                    onClick={() => {
                      setPreferences({ ...preferences, specialization: 'MBA' });
                      finishOnboarding();
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