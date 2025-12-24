import React from 'react';
import { FaCalendarAlt, FaBell } from 'react-icons/fa';

const exams = [
  { name: "JEE Mains 2025", date: "Jan 24, 2025", type: "Engineering", status: "Open" },
  { name: "NEET UG", date: "May 05, 2025", type: "Medical", status: "Upcoming" },
  { name: "CAT 2025", date: "Nov 26, 2025", type: "Management", status: "Closed" },
  { name: "GRE (General)", date: "Flexible", type: "Study Abroad", status: "Open" },
  { name: "IELTS", date: "Monthly", type: "Language", status: "Open" },
];

const EntranceExams = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ color: '#1e293b', marginBottom: '20px' }}>Entrance Exam Schedules 📅</h1>
      
      <div style={{ display: 'grid', gap: '15px' }}>
        {exams.map((exam, index) => (
          <div key={index} style={{ 
            background: 'white', padding: '20px', borderRadius: '12px', 
            border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
          }}>
            <div>
              <h3 style={{ margin: '0 0 5px 0', color: '#2563eb' }}>{exam.name}</h3>
              <span style={{ background: '#f1f5f9', padding: '4px 10px', borderRadius: '20px', fontSize: '0.85rem', color: '#64748b' }}>
                {exam.type}
              </span>
            </div>
            
            <div style={{ textAlign: 'right' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontWeight: 'bold' }}>
                <FaCalendarAlt /> {exam.date}
              </div>
              <div style={{ 
                color: exam.status === 'Open' ? '#16a34a' : exam.status === 'Closed' ? '#dc2626' : '#ea580c', 
                fontSize: '0.9rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '5px', justifyContent: 'flex-end'
              }}>
                <FaBell /> {exam.status === 'Open' ? 'Registration Open' : exam.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EntranceExams;