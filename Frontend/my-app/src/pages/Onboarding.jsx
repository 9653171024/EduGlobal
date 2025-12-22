import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGlobeAmericas, FaBuilding, FaUniversity, FaCheckCircle } from 'react-icons/fa';
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
        setPreferences({
            ...preferences,
            [field]: value
        });
        setStep(step + 1);
    };

    const finishOnboarding = async () => {
        try {
            localStorage.setItem('userPreference', JSON.stringify(preferences));
            toast.success("Profile setup complete!! Finding colleges...");
            setTimeout(() => navigate('/recommendation'), 1500);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div
                className="hero-container"
                style={{
                    minHeight: '100vh',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}
            >
                {/* Progress Indicator */}
                <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
                        Step {step} of 3
                    </p>
                    <div
                        style={{
                            width: '240px',
                            height: '6px',
                            background: '#e2e8f0',
                            borderRadius: '6px',
                            marginTop: '0.5rem'
                        }}
                    >
                        <div
                            style={{
                                width: `${(step / 3) * 100}%`,
                                height: '100%',
                                background: 'linear-gradient(90deg,#2563eb,#3b82f6)',
                                borderRadius: '6px',
                                transition: 'width 0.3s ease'
                            }}
                        />
                    </div>
                </div>

                <div
                    className="auth-card"
                    style={{
                        textAlign: 'center',
                        padding: '3rem',
                        maxWidth: '420px',
                        width: '100%'
                    }}
                >
                    {/* STEP 1 */}
                    {step === 1 && (
                        <div className="animation-fade-in">
                            <h2>Let’s get started 🌍</h2>
                            <p style={{ color: '#64748b', marginBottom: '2rem' }}>
                                Where are you planning to study?
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
                        </div>
                    )}

                    {/* STEP 2 */}
                    {step === 2 && (
                        <div className="animation-fade-in">
                            <h2>Choose your preference 🏛️</h2>
                            <p style={{ color: '#64748b', marginBottom: '2rem' }}>
                                What type of institute are you looking for?
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
                        </div>
                    )}

                    {/* STEP 3 */}
                    {step === 3 && (
                        <div className="animation-fade-in">
                            <h2>Final step 🎓</h2>
                            <p style={{ color: '#64748b', marginBottom: '2rem' }}>
                                What do you want to specialize in?
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <button
                                    className="onboarding-btn"
                                    onClick={() => {
                                        setPreferences({ ...preferences, specialization: 'CS' });
                                        finishOnboarding();
                                    }}
                                >
                                    <FaCheckCircle /> Computer Science / IT
                                </button>

                                <button
                                    className="onboarding-btn"
                                    onClick={() => {
                                        setPreferences({ ...preferences, specialization: 'Medical' });
                                        finishOnboarding();
                                    }}
                                >
                                    <FaCheckCircle /> Medical
                                </button>

                                <button
                                    className="onboarding-btn"
                                    onClick={() => {
                                        setPreferences({ ...preferences, specialization: 'MBA' });
                                        finishOnboarding();
                                    }}
                                >
                                    <FaCheckCircle /> Management (MBA)
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Onboarding;
