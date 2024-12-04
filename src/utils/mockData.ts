import { Threat } from '../types/threat';
import { Application, ApplicationMetrics } from '../types/application';

const threatTypes = [
  'session_hijacking', 'credential_stuffing', 'ddos', 'unauthorized_access',
  'comment_spam', 'content_piracy', 'video_tampering', 'account_impersonation'
] as const;

const severityLevels = ['low', 'medium', 'high', 'critical'] as const;
const statuses = ['active', 'mitigated', 'investigating'] as const;
const endpoints = [
  '/api/auth', '/api/videos', '/api/comments',
  '/api/channels', '/api/likes', '/api/subscriptions',
  '/api/uploads', '/api/live', '/api/analytics'
];

const videoCategories = [
  'Music', 'Gaming', 'Education', 'Technology', 
  'Lifestyle', 'Comedy', 'News', 'Sports', 'Movies'
];

export const mockApplication: Application = {
  id: 'youtube-clone-1',
  name: 'YouTube Streaming Platform',
  environment: 'production',
  status: 'healthy',
  lastDeployment: new Date().toISOString(),
  version: '5.6.0'
};

export function generateMockMetrics(): ApplicationMetrics {
  return {
    totalRequests: Math.floor(Math.random() * 3000000) + 1000000,
    suspiciousRequests: Math.floor(Math.random() * 10000),
    blockedRequests: Math.floor(Math.random() * 5000),
    averageResponseTime: Math.random() * 500 + 200
  };
}

export function generateMockThreat(): Threat {
  const type = threatTypes[Math.floor(Math.random() * threatTypes.length)] as typeof threatTypes[number];
  const endpoint = endpoints[Math.floor(Math.random() * endpoints.length)];
  const affectedCategories: string[] = Array.from(
    { length: Math.floor(Math.random() * 3) + 1 },
    () => videoCategories[Math.floor(Math.random() * videoCategories.length)]
  );
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    type,
    severity: severityLevels[Math.floor(Math.random() * severityLevels.length)],
    timestamp: new Date().toISOString(),
    source: `YouTube-Node-${Math.floor(Math.random() * 1000)}`,
    sourceIp: `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
    endpoint,
    description: getThreatDescription(type, endpoint),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    impact: {
      affectedUsers: Math.floor(Math.random() * 100000),
      affectedServices: [endpoint],
      affectedCategories
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
    comment_spam: `Massive comment spam detected on ${endpoint}. Automated behavior observed.`,
    content_piracy: `Potential content piracy activity on ${endpoint}. Unusual download patterns detected.`,
    video_tampering: `Suspected video tampering on ${endpoint}. Metadata inconsistencies found.`,
    account_impersonation: `Account impersonation attempt detected on ${endpoint}. Multiple location access detected.`
  };
  return descriptions[type] || `Security threat detected at ${endpoint}`;
}

function getMitigation(type: string): string {
  const mitigations: Record<string, string> = {
    session_hijacking: 'Session invalidated. Multi-factor authentication enforced.',
    credential_stuffing: 'IP-based rate limiting enabled. Account security notifications sent.',
    ddos: 'Traffic filtering enabled. Cloud-based DDoS protection activated.',
    unauthorized_access: 'Access blocked. Security audit initiated.',
    comment_spam: 'Spam comments removed. Captcha verification enforced.',
    content_piracy: 'Access restricted. DMCA takedown initiated.',
    video_tampering: 'Video restored. Metadata audit in progress.',
    account_impersonation: 'Account locked. Identity verification required.'
  };
  return mitigations[type] || 'Automated defense mechanisms engaged. Under investigation.';
}
