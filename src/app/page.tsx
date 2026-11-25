import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Badge } from '@/components/ui/Badge';
import { GetActiveSedeUseCase } from '@/core/use-cases/GetActiveSedeUseCase';
import { SedeConfigRepository } from '@/infrastructure/repositories/SedeConfigRepository';
import { SedeConfigService } from '@/core/services/SedeConfigService';

// Capa de Presentación consumiendo la Capa de Dominio (Sin SQL directo)
export default function HomePage() {
  let sedeInfo = null;
  try {
    const repository = new SedeConfigRepository();
    const service = new SedeConfigService(repository);
    const useCase = new GetActiveSedeUseCase(service);
    sedeInfo = useCase.execute();
  } catch {
    // Modo inicial / sin sede activa aún
    sedeInfo = null;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, maxWidth: '1100px', margin: '0 auto', padding: '32px 16px', width: '100%' }}>
        <section style={{ background: '#ffffff', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 style={{ margin: 0, fontSize: '28px', color: '#0f172a' }}>Bienvenido a EduCare Kids</h1>
              <p style={{ margin: '8px 0 0', color: '#64748b' }}>
                Sistema Integral de Centro Infantil y Pedagógico (Arquitectura en 3 Capas)
              </p>
            </div>
            <Badge status={sedeInfo ? 'success' : 'warning'}>
              {sedeInfo ? 'Sede Central Operativa' : 'Configuración Pendiente'}
            </Badge>
          </div>
        </section>

        {sedeInfo && (
          <section style={{ background: '#ffffff', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '18px', color: '#0f172a', marginTop: 0 }}>📍 Parámetros Activos de Sede (CRUD 15)</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px' }}>
                <strong style={{ display: 'block', color: '#475569', fontSize: '13px' }}>Nombre de Sede</strong>
                <span style={{ fontSize: '16px', fontWeight: 600 }}>{sedeInfo.nombre_sede}</span>
              </div>
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px' }}>
                <strong style={{ display: 'block', color: '#475569', fontSize: '13px' }}>Dirección</strong>
                <span style={{ fontSize: '16px', fontWeight: 600 }}>{sedeInfo.direccion} ({sedeInfo.ciudad})</span>
              </div>
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px' }}>
                <strong style={{ display: 'block', color: '#475569', fontSize: '13px' }}>Radio Máximo</strong>
                <span style={{ fontSize: '16px', fontWeight: 600 }}>{sedeInfo.radio_max_km} km</span>
              </div>
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px' }}>
                <strong style={{ display: 'block', color: '#475569', fontSize: '13px' }}>Margen Vial (P01)</strong>
                <span style={{ fontSize: '16px', fontWeight: 600 }}>{sedeInfo.margen_minutos} min</span>
              </div>
            </div>
          </section>
        )}

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div style={{ background: '#ffffff', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginTop: 0, color: '#2563eb' }}>Capa 1: Presentación</h3>
            <p style={{ color: '#475569', fontSize: '14px', lineHeight: 1.5 }}>
              Componentes modulares React y páginas Next.js. Las vistas no ejecutan SQL ni acceden directamente a la base de datos.
            </p>
          </div>
          <div style={{ background: '#ffffff', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginTop: 0, color: '#059669' }}>Capa 2: Lógica de Negocio</h3>
            <p style={{ color: '#475569', fontSize: '14px', lineHeight: 1.5 }}>
              Servicios de dominio puros y casos de uso en TypeScript. Aplican las reglas de negocio (radio 25 km, margen 20 min, recargos por edad).
            </p>
          </div>
          <div style={{ background: '#ffffff', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginTop: 0, color: '#7c3aed' }}>Capa 3: Acceso a Datos</h3>
            <p style={{ color: '#475569', fontSize: '14px', lineHeight: 1.5 }}>
              Patrón Repositorio y persistencia relacional en SQLite bajo 3FN con claves foráneas estrictas (<code style={{ background: '#f1f5f9', padding: '2px 4px', borderRadius: '4px' }}>PRAGMA foreign_keys = ON;</code>).
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
