import React from 'react';

interface BadgeProps {
  status: 'success' | 'warning' | 'error';
  children: React.ReactNode;
}

export function Badge({ status, children }: BadgeProps) {
  const styles = {
    success: { bg: '#dcfce7', color: '#166534', border: '#bbf7d0' },
    warning: { bg: '#fef9c3', color: '#854d0e', border: '#fef08a' },
    error: { bg: '#fee2e2', color: '#991b1b', border: '#fecaca' },
  }[status];

  return (
    <span
      style={{
        display: 'inline-block',
        padding: '6px 12px',
        borderRadius: '9999px',
        fontSize: '12px',
        fontWeight: 600,
        backgroundColor: styles.bg,
        color: styles.color,
        border: `1px solid ${styles.border}`,
      }}
    >
      {children}
    </span>
  );
}
