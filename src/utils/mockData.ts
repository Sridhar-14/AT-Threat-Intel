import { Threat } from '../types/threat';
import { Application, ApplicationMetrics } from '../types/application';

const threatTypes = [
  'session_hijacking', 'credential_stuffing', 'ddos', 'unauthorized_access',
  'content_scraping', 'assessment_breach', 'grade_tampering', 'impersonation'
] as const;

const severityLevels = ['low', 'medium', 'high', 'critical'] as const;
const statuses = ['active', 'mitigated', 'investigating'] as const;
const endpoints = [
  '/api/auth', '/api/courses', '/api/assignments',
  '/api/grades', '/api/assessments', '/api/submissions',
  '/api/users', '/api/materials', '/api/lectures'
];

const courses = [
  'Computer Networks', 'Data Structures', 'Operating Systems',
  'Database Management', 'Software Engineering', 'Artificial Intelligence'
];

export const mockApplication: Application = {
  id: 'learn-niit-1',
  name: 'NIIT Learning Platform',
  environment: 'production',
  status: 'healthy',
  lastDeployment: new Date().toISOString(),
  version: '3.2.1'
};

export function generateMockMetrics(): ApplicationMetrics {
  return {
    totalRequests: Math.floor(Math.random() * 15000) + 8000,
    suspiciousRequests: Math.floor(Math.random() * 150),
    blockedRequests: Math.floor(Math.random() * 75),
    averageResponseTime: Math.random() * 300 + 150
  };
}

export function generateMockThreat(): Threat {
  const type = threatTypes[Math.floor(Math.random() * threatTypes.length)];
  const endpoint = endpoints[Math.floor(Math.random() * endpoints.length)];
  const affectedCourses = Array.from(
    { length: Math.floor(Math.random() * 3) + 1 },
    () => courses[Math.floor(Math.random() * courses.length)]
  );
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    type,
    severity: severityLevels[Math.floor(Math.random() * severityLevels.length)],
    timestamp: new Date().toISOString(),
    source: `LMS-Module-${Math.floor(Math.random() * 100)}`,
    sourceIp: `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
    endpoint,
    description: getThreatDescription(type, endpoint),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    impact: {
      affectedUsers: Math.floor(Math.random() * 200),
      affectedServices: [endpoint],
      affectedCourses
    },
    mitigation: getMitigation(type)
  };
}

function getThreatDescription(type: string, endpoint: string): string {
  const descriptions: Record<string, string> = {
    session_hijacking: `Potential session hijacking attempt detected on ${endpoint}. Multiple concurrent logins from different locations.`,
    credential_stuffing: `Credential stuffing attack detected at ${endpoint}. Multiple failed login attempts using different credentials.`,
    ddos: `DDoS attack targeting ${endpoint}. Unusual traffic pattern detected.`,
    unauthorized_access: `Unauthorized access attempt at ${endpoint}. Invalid permissions detected.`,
    content_scraping: `Automated content scraping detected on ${endpoint}. Unusual download patterns observed.`,
    assessment_breach: `Potential assessment security breach at ${endpoint}. Unusual access pattern detected.`,
    grade_tampering: `Suspected grade tampering attempt at ${endpoint}. Unauthorized modification detected.`,
    impersonation: `Student impersonation attempt detected at ${endpoint}. Multiple location access detected.`
  };
  return descriptions[type] || `Security threat detected at ${endpoint}`;
}

function getMitigation(type: string): string {
  const mitigations: Record<string, string> = {
    session_hijacking: 'Session invalidated. Multi-factor authentication enforced.',
    credential_stuffing: 'IP-based rate limiting enabled. Account security notifications sent.',
    ddos: 'Traffic filtering enabled. Cloud-based DDoS protection activated.',
    unauthorized_access: 'Access blocked. Security audit initiated.',
    content_scraping: 'Rate limiting applied. CAPTCHA verification enabled.',
    assessment_breach: 'Assessment temporarily suspended. Security review initiated.',
    grade_tampering: 'Changes reverted. Database audit log analysis in progress.',
    impersonation: 'Account locked. Identity verification required.'
  };
  return mitigations[type] || 'Automated defense mechanisms engaged. Under investigation.';
}