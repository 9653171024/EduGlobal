import React from 'react';
import { FaMoneyBillWave, FaArrowRight } from 'react-icons/fa';

const scholarships = [
  { name: "Tata Trust Scholarship", amount: "₹5,00,000", criteria: "Merit-based", deadline: "Aug 30, 2025" },
  { name: "Fulbright-Nehru Fellowship", amount: "Full Funding", criteria: "Study Abroad (Masters)", deadline: "July 15, 2025" },
  { name: "HDFC Badhte Kadam", amount: "₹1,00,000", criteria: "Need-based", deadline: "Sep 10, 2025" },
  { name: "Erasmus Mundus", amount: "€25,000/yr", criteria: "Europe Study", deadline: "Dec 01, 2025" }
];

const Scholarships = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ color: '#1e293b', marginBottom: '20px' }}>Scholarships & Financial Aid 🎓</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {scholarships.map((sch, index) => (
          <div key={index} style={{ 
            background: 'white', padding: '25px', borderRadius: '16px', 
            border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            transition: 'transform 0.2s'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#1e293b' }}>{sch.name}</h3>
              <FaMoneyBillWave size={24} color="#10b981" />
            </div>
            
            <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Value: <b style={{ color: '#10b981' }}>{sch.amount}</b></p>
            <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Criteria: {sch.criteria}</p>
            
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: '#ef4444', fontWeight: 'bold' }}>Deadline: {sch.deadline}</span>
              <button style={{ 
                background: '#2563eb', color: 'white', border: 'none', padding: '8px 16px', 
                borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' 
              }}>
                Apply <FaArrowRight size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scholarships;