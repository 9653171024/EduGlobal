import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  FaPassport, FaFileAlt, FaUniversity, FaPlane, 
  FaCheckCircle, FaCircle, FaBell, FaShieldAlt, FaBullseye, FaSpinner, FaCalendarAlt 
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const Tools = () => {
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const [target, setTarget] = useState("");
  const [deadline, setDeadline] = useState(""); // NEW: State for Date
  const [sending, setSending] = useState(null); 

  const [checklist, setChecklist] = useState([
    { id: 1, title: "Valid Passport", category: "Identity", completed: false, icon: <FaPassport /> },
    { id: 2, title: "Update CV / Resume", category: "Documents", completed: false, icon: <FaFileAlt /> },
    { id: 3, title: "Draft SOP (Statement of Purpose)", category: "Documents", completed: false, icon: <FaFileAlt /> },
    { id: 4, title: "Secure 2 LORs", category: "Documents", completed: false, icon: <FaFileAlt /> },
    { id: 5, title: "Finalize University List", category: "Research", completed: false, icon: <FaUniversity /> },
    { id: 6, title: "Book Visa Appointment", category: "Visa", completed: false, icon: <FaPlane /> },
  ]);

  useEffect(() => {
    const loadData = async () => {
      if (!user) return;
      try {
        const res = await axios.post('http://127.0.0.1:5001/api/users/get-progress', { email: user.email });
        if (res.data.success && res.data.data) setChecklist(res.data.data);
      } catch (e) { console.log(e); }

      const savedTarget = localStorage.getItem('userTarget');
      if(savedTarget) setTarget(savedTarget);
    };
    loadData();
  }, []);

  const handleTargetUpdate = (e) => {
    setTarget(e.target.value);
    localStorage.setItem('userTarget', e.target.value);
  };

  // --- NEW: SAVE TARGET & DEADLINE ---
  const saveGoal = async () => {
    if (!target || !deadline) {
      toast.error("Please enter a Goal and a Deadline Date");
      return;
    }

    if (user) {
      try {
        await axios.post('http://127.0.0.1:5001/api/tools/set-target', {
          email: user.email,
          target: target,
          deadline: deadline
        });
        toast.success("Goal Set! We'll remind you 4 days before.");
      } catch (e) {
        toast.error("Failed to save goal");
        console.log(e);
      }
    } else {
      toast.error("Please login first");
    }
  };

  const toggleItem = async (id) => {
    const updatedList = checklist.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setChecklist(updatedList);

    if (user) {
      try {
        await axios.post('http://127.0.0.1:5001/api/users/update-progress', {
          email: user.email,
          progressData: updatedList
        });
      } catch (err) { 
        toast.error("Sync failed");
        console.log(err);
      }
    }
  };

  const sendReminder = async (taskName) => {
    if(!user) { toast.error("Login required"); return; }
    
    setSending(taskName);
    try {
      await axios.post('http://127.0.0.1:5001/api/tools/remind', {
        email: user.email,
        userName: user.name,
        task: taskName,
        target: target
      });
      toast.success("Reminder sent to your email! 📧");
    } catch (err) {
      console.log(err);
      toast.error("Failed to send email.");
    } finally {
      setSending(null);
    }
  };

  const completedCount = checklist.filter(i => i.completed).length;
  const percentage = Math.round((completedCount / checklist.length) * 100);

  return (
    <div style={{ padding: '3rem 8%', background: '#f8fafc', minHeight: '100vh' }}>
      
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#1e293b' }}>Application Manager 🧰</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', background: '#dcfce7', width: 'fit-content', padding: '6px 12px', borderRadius: '20px', fontSize: '0.9rem', marginTop: '10px' }}>
          <FaShieldAlt /> <span>Your data is private. We do not store your files.</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
        
        {/* --- CARD 1: TARGET & DEADLINE --- */}
        <div className="college-card" style={{ padding: '2rem' }}>
          
          <h3 style={{ marginBottom: '15px', color: '#1e293b' }}>Admission Goal 🎯</h3>
          
          {/* Target Input */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{display:'block', marginBottom:'8px', color:'#64748b', fontSize:'0.9rem'}}>What is your target?</label>
            <div style={{ display: 'flex', alignItems: 'center', background: '#f1f5f9', borderRadius: '10px', padding: '10px', border: '1px solid #e2e8f0' }}>
              <FaBullseye color="#2563eb" size={20} style={{ marginRight: '10px' }} />
              <input 
                type="text" 
                value={target}
                onChange={handleTargetUpdate}
                placeholder="e.g. Apply to Stanford Fall 2025"
                style={{ background: 'transparent', border: 'none', width: '100%', outline: 'none', fontSize: '1rem', color: '#1e293b' }}
              />
            </div>
          </div>

          {/* Date Picker */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{display:'block', marginBottom:'8px', color:'#64748b', fontSize:'0.9rem'}}>Deadline Date</label>
            <div style={{ display: 'flex', alignItems: 'center', background: '#f1f5f9', borderRadius: '10px', padding: '10px', border: '1px solid #e2e8f0' }}>
              <FaCalendarAlt color="#2563eb" size={18} style={{ marginRight: '10px' }} />
              <input 
                type="date" 
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                style={{ background: 'transparent', border: 'none', width: '100%', outline: 'none', fontSize: '1rem', color: '#334155' }}
              />
            </div>
          </div>

          {/* Activate Button */}
          <button 
            onClick={saveGoal}
            className="submit-btn-primary" 
            style={{ width: '100%', padding: '12px', borderRadius: '8px', fontWeight: 'bold' }}
          >
            Activate Auto-Reminders 🔔
          </button>

          <hr style={{margin: '20px 0', border: 'none', borderTop: '1px solid #e2e8f0'}} />

          {/* Progress Bar */}
          <h4 style={{ marginBottom: '10px', color: '#1e293b', fontSize: '1rem' }}>Overall Progress</h4>
          <div style={{ width: '100%', height: '10px', background: '#e2e8f0', borderRadius: '10px', overflow: 'hidden', marginBottom:'10px' }}>
            <div style={{ width: `${percentage}%`, height: '100%', background: percentage === 100 ? '#10b981' : '#2563eb', transition: 'width 0.5s ease' }}></div>
          </div>
          <span style={{color: '#64748b', fontSize: '0.9rem'}}>{percentage}% Completed</span>
        </div>

        {/* --- CARD 2: SMART CHECKLIST --- */}
        <div className="college-card" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '20px', color: '#1e293b' }}>Document Checklist</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {checklist.map((item) => (
              <div key={item.id} className={`task-item ${item.completed ? 'completed' : ''}`} style={{justifyContent: 'space-between'}}>
                
                <div 
                  onClick={() => toggleItem(item.id)}
                  style={{ display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer', flex: 1 }}
                >
                  <div className="task-icon">
                    {item.completed ? <FaCheckCircle /> : item.icon}
                  </div>
                  <div>
                    <h4 style={{ margin: 0, color: item.completed ? '#94a3b8' : '#334155', textDecoration: item.completed ? 'line-through' : 'none' }}>
                      {item.title}
                    </h4>
                    <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>
                      {item.category}
                    </span>
                  </div>
                </div>

                {!item.completed && (
                  <button 
                    onClick={() => sendReminder(item.title)}
                    disabled={sending === item.title}
                    style={{
                      background: 'white', border: '1px solid #e2e8f0', borderRadius: '50%',
                      width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: sending === item.title ? '#94a3b8' : '#f59e0b', cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    title="Send Email Reminder"
                  >
                    {sending === item.title ? <FaSpinner className="spin" size={14} /> : <FaBell size={14} />}
                  </button>
                )}

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Tools;