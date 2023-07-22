const BASE_URL: string = 'http://localhost:8000/api/';

export function apiUrl(endpoint: string): string {
    if (endpoint.startsWith('/')) {
        endpoint = endpoint.substring(1); // Skip the preceding / since the BASE_URL already has it
    }
    return `${BASE_URL}${endpoint}`;
}
