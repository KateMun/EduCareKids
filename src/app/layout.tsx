import React from 'react';

export const metadata = {
  title: 'EduCare Kids — Sistema Integral de Centro Infantil y Pedagógico',
  description: 'Gestión Integral de Centro Infantil, Niñera a Domicilio, Clases de Apoyo y Tutoría Asíncrona',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, sans-serif', background: '#f8fafc', color: '#1e293b' }}>
        {children}
      </body>
    </html>
  );
}
