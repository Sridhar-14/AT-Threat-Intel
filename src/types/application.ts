export interface Application {
  id: string;
  name: string;
  environment: 'development' | 'staging' | 'production';
  status: 'healthy' | 'at-risk' | 'critical';
  lastDeployment: string;
  version: string;
}

export interface ApplicationMetrics {
  totalRequests: number;
  suspiciousRequests: number;
  blockedRequests: number;
  averageResponseTime: number;
}