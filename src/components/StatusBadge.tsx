import { CaseStatus } from '@/types/court';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: CaseStatus;
  className?: string;
}

const statusConfig: Record<CaseStatus, { label: string; className: string }> = {
  pending: {
    label: 'Pending Review',
    className: 'status-pending',
  },
  open: {
    label: 'Open',
    className: 'status-open',
  },
  suspended: {
    label: 'Suspended',
    className: 'status-suspended',
  },
  closed: {
    label: 'Closed',
    className: 'status-closed',
  },
  declined: {
    label: 'Declined',
    className: 'status-declined',
  },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const config = statusConfig[status];
  
  return (
    <span className={cn('status-badge', config.className, className)}>
      {config.label}
    </span>
  );
};
