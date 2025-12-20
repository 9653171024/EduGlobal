import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {FaGlobeAmericas,FaBuilding,FaUniversity} from 'react-icons/fa';
import {toast} from 'react-toastify';


const Onboarding =()=>{
    const navigate=useNavigate();

    const [step,setStep]=useState(1)

    const [preferences,setPreferences]=useState({
        country:'',
        type:'',
        specialization:''
    })

    const handleSelection= (field,value)=>{
        setPreferences({
            ...preferences,
            [field]:value
        });
        setStep(step+1);
    }

    const finishOnboarding =async () =>{
        try{
            // 1.Save preferences to local Storage
            localStorage.setItem('userPreference',JSON.stringify(preferences))

            // Redirect to Recommendation page
            toast.success("Profile setup complete!! Finding colleges...")
            setTimeout(()=> navigate('/recommendation'),1500)
        }catch(error){
            console.log(error);
        }
    }

    return(
        <>
        <div className="hero-container" style={{ minHeight: '100vh', flexDirection: 'column' }}>
      
        {/* Progress Bar */}
        <div style={{ width: '200px', height: '4px', background: '#e2e8f0', marginBottom: '2rem', borderRadius: '2px' }}>
        <div style={{ width: `${(step / 3) * 100}%`, height: '100%', background: '#2563eb', transition: 'width 0.3s' }}></div>
        </div>

        <div className="auth-card" style={{ textAlign: 'center', padding: '3rem' }}>
            {/* STEP1: Country */}
            {step === 1 && (
            <div className="animation-fade-in">
                <h2>Let's get started! 🌍</h2>
                <p style={{ color: '#64748b', marginBottom: '2rem' }}>Where are you planning to study??</p>
                <div>
                    <button className='onboarding-btn' onClick={ ()=>handleSelection('country',"India")}><FaUniversity /> Study in India</button>
                    <button className='onboarding-btn'onClick={ ()=>handleSelection('country','Abroad')}><FaGlobeAmericas />Study in Abroad</button>
                </div>
            </div>
            )}
            

            {/* Institute type */}
            {step === 2 && (
            <div className="animation-fade-in">
                <h2>Preferences? 🏛️</h2>
                <p style={{ color: '#64748b', marginBottom: '2rem' }}>What are kind of institute you are looking for??</p>
                <div>
                    <button className='onboarding-btn' onClick={ ()=>handleSelection('type',"Govt")}> Government</button>
                    <button className='onboarding-btn'onClick={ ()=>handleSelection('type','Private')}>Private</button>
                </div>
            </div>
            )}

            {/* Specialization  */}
            {step === 3 && (
            <div className="animation-fade-in">
                <h2>Last step! 🎓</h2>
                <p style={{ color: '#64748b', marginBottom: '2rem' }}>What do you wany to specialize in??</p>
                <div>
                    <button className='onboarding-btn' onClick={ ()=>{ setPreferences({...preferences,specialization: 'CS'}); finishOnboarding();}}>CS/IT</button>
                    <button className='onboarding-btn' onClick={ ()=>{setPreferences({...preferences,specialization: 'Medical'}); finishOnboarding();}}>Medical</button>
                    <button className='onboarding-btn' onClick={ ()=>{ setPreferences({...preferences,specialization: 'MBA'}); finishOnboarding();}}>Management</button>
                </div>
            </div>
            )}




        </div>
        </div>
        </>
    );
}

export default Onboarding;