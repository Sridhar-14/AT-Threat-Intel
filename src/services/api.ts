import axios from 'axios';
import type { Threat } from '../types/threat';
import type { ApplicationMetrics } from '../types/application';
import { config } from '../config/environment';
import { generateMockThreat, generateMockMetrics } from '../utils/mockData';

const api = config.apiBaseUrl ? axios.create({
  baseURL: config.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  }
}) : null;

export async function fetchThreats(): Promise<Threat[]> {
  // In development, always use mock data
  if (config.isDevelopment || !api) {
    return Array.from({ length: 5 }, () => generateMockThreat());
  }

  try {
    const response = await api.get('/api/security/threats');
    return response.data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Failed to fetch threats:', errorMessage);
    throw error;
  }
}

export async function fetchMetrics(): Promise<ApplicationMetrics> {
  // In development, always use mock data
  if (config.isDevelopment || !api) {
    return generateMockMetrics();
  }

  try {
    const response = await api.get('/api/security/metrics');
    return response.data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Failed to fetch metrics:', errorMessage);
    throw error;
  }
}

export async function fetchHourlyThreatCount(): Promise<number> {
  // In development, always use mock data
  if (config.isDevelopment || !api) {
    return Math.floor(Math.random() * 10);
  }

  try {
    const response = await api.get('/api/security/threats/hourly-count');
    return response.data.count;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Failed to fetch hourly threat count:', errorMessage);
    throw error;
  }
}