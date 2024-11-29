export interface Threat {
  id: string;
  type: 'session_hijacking' | 'credential_stuffing' | 'ddos' | 'unauthorized_access' | 
        'content_scraping' | 'assessment_breach' | 'grade_tampering' | 'impersonation';
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  source: string;
  sourceIp?: string;
  endpoint?: string;
  description: string;
  status: 'active' | 'mitigated' | 'investigating';
  impact: {
    affectedUsers?: number;
    affectedServices?: string[];
    affectedCourses?: string[];
  };
  mitigation?: string;
}