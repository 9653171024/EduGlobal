import React from 'react';
import { useParams } from 'react-router-dom';
import hostelsData from '../data/collegeHostels.json';
import jobsData from '../data/studentJobs.json';

const StudentLife = () => {
  const { collegeName } = useParams();
  const decodedName = decodeURIComponent(collegeName);

  const hostelInfo = hostelsData.find(
    h => h.university === decodedName
  );

  const jobInfo = jobsData.find(
    j => j.university === decodedName
  );

  return (
    <div style={{ padding: '3rem 8%', maxWidth: '1200px', margin: '0 auto' }}>
      
      <h1 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '1.5rem' }}>
        {decodedName}
      </h1>

      {/* HOSTELS */}
      <h2>🏠 College Hostels</h2>
      {hostelInfo ? (
        hostelInfo.hostels.map((h, i) => (
          <div key={i} className="info-card">
            <h3>{h.name}</h3>
            <p>💵 ${h.rentPerMonthUSD} / month</p>
            <p>🛏 Rooms: {h.roomTypes.join(', ')}</p>
            <p>📍 {h.distanceKm} km from campus</p>
            <p>✅ {h.amenities.join(', ')}</p>
            <a href={h.website} target="_blank" rel="noreferrer">
              Visit Hostel Page
            </a>
          </div>
        ))
      ) : (
        <p>No hostel data available.</p>
      )}

      {/* JOBS */}
      <h2 style={{ marginTop: '3rem' }}>💼 Part-Time Jobs</h2>
      {jobInfo ? (
        jobInfo.jobs.map((j, i) => (
          <div key={i} className="info-card">
            <h3>{j.title}</h3>
            <p>⏱ {j.hoursPerWeek} hrs/week</p>
            <p>💰 ${j.payPerHourUSD} / hour</p>
            <p>📍 {j.location}</p>
            <p>{j.description}</p>
            <a href={j.applyLink} target="_blank" rel="noreferrer">
              Apply Now
            </a>
          </div>
        ))
      ) : (
        <p>No part-time jobs listed.</p>
      )}
    </div>
  );
};

export default StudentLife;
