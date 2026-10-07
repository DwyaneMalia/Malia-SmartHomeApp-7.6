import type { Device, SensorData } from '../models/IoTModels';

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const body = await response.json() as T | { error?: string };
  if (!response.ok) {
    throw new Error(
      typeof body === 'object' && body !== null && 'error' in body && body.error
        ? body.error
        : 'The API request failed.',
    );
  }
  return body as T;
}

export function getSensorData(): Promise<SensorData> {
  return request<SensorData>('/sensors/latest');
}

export function getDevices(): Promise<Device[]> {
  return request<Device[]>('/devices');
}

export function updateDeviceStatus(id: number, status: boolean): Promise<Device> {
  return request<Device>(`/devices/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}
