import React from 'react';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';

const IssueBadge = ({ severity }) => {
  const configs = {
    critical: {
      icon: AlertCircle,
      bg: 'bg-red-900/30',
      border: 'border-red-500',
      text: 'text-red-400',
      label: 'Critical'
    },
    warning: {
      icon: AlertTriangle,
      bg: 'bg-yellow-900/30',
      border: 'border-yellow-500',
      text: 'text-yellow-400',
      label: 'Warning'
    },
    info: {
      icon: Info,
      bg: 'bg-blue-900/30',
      border: 'border-blue-500',
      text: 'text-blue-400',
      label: 'Info'
    }
  };

  const config = configs[severity] || configs.info;
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium border ${config.bg} ${config.border} ${config.text}`}>
      <Icon size={12} />
      {config.label}
    </span>
  );
};

export default IssueBadge;
