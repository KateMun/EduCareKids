import React from 'react';

export default function Footer() {
  return (
    <footer style={{ background: '#0f172a', color: '#94a3b8', padding: '24px 16px', marginTop: 'auto', borderTop: '1px solid #334155', fontSize: '13px', textAlign: 'center' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <p style={{ margin: '0 0 6px 0' }}>
          <strong>EduCare Kids</strong> — Sistema Integral de Centro Infantil y Pedagógico
        </p>
        <p style={{ margin: 0, color: '#64748b' }}>
          Proyecto de Ingeniería de Software (VIU) | Arquitectura en 3 Capas (Next.js / Node.js / SQLite 3FN)
        </p>
      </div>
    </footer>
  );
}
