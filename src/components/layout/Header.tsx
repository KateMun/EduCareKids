import React from 'react';

export default function Header() {
  return (
    <header style={{ background: '#1e293b', color: '#ffffff', padding: '16px 24px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '24px' }}>🏫</span>
          <span style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.5px' }}>EduCare Kids</span>
        </div>
        <nav style={{ display: 'flex', gap: '20px', fontSize: '14px' }}>
          <span style={{ color: '#94a3b8' }}>Módulos M01-M08</span>
          <span style={{ color: '#94a3b8' }}>3FN SQLite</span>
          <span style={{ color: '#38bdf8', fontWeight: 600 }}>Solo-Scrum</span>
        </nav>
      </div>
    </header>
  );
}
