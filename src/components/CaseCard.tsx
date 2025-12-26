import { CourtCase } from '@/types/court';
import { StatusBadge } from './StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, FileText, Scale } from 'lucide-react';
import { format } from 'date-fns';

interface CaseCardProps {
  courtCase: CourtCase;
  onClick?: () => void;
  showDetails?: boolean;
}

const caseTypeLabels: Record<string, string> = {
  civil: 'Civil',
  criminal: 'Criminal',
  commercial: 'Commercial',
  family: 'Family',
  administrative: 'Administrative',
};

export const CaseCard: React.FC<CaseCardProps> = ({ courtCase, onClick, showDetails = true }) => {
  return (
    <Card 
      className={`group transition-all duration-300 hover:shadow-lg border-border/50 ${onClick ? 'cursor-pointer hover:border-primary/30' : ''}`}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-mono font-semibold text-primary">
                {courtCase.caseNumber}
              </span>
              <Badge variant="outline" className="text-xs">
                {caseTypeLabels[courtCase.caseType]}
              </Badge>
            </div>
            <CardTitle className="text-base font-serif line-clamp-1 group-hover:text-primary transition-colors">
              {courtCase.title}
            </CardTitle>
          </div>
          <StatusBadge status={courtCase.status} />
        </div>
      </CardHeader>
      
      {showDetails && (
        <CardContent className="pt-0 space-y-3">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {courtCase.description}
          </p>
          
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="h-4 w-4" />
              <span className="truncate">{courtCase.plaintiff.fullName}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Scale className="h-4 w-4" />
              <span className="truncate">{courtCase.defendant.fullName}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/50">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>Filed: {format(new Date(courtCase.filingDate), 'MMM dd, yyyy')}</span>
            </div>
            {courtCase.nextHearingDate && (
              <div className="flex items-center gap-1.5 text-primary">
                <FileText className="h-3.5 w-3.5" />
                <span>Next: {format(new Date(courtCase.nextHearingDate), 'MMM dd')}</span>
              </div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
};
