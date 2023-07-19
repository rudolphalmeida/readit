const BASE_URL: string = 'http://127.0.0.1:8000/api/';

export function apiUrl(endpoint: string): string {
    if (endpoint.startsWith('/')) {
        endpoint = endpoint.substring(1); // Skip the preceding / since the BASE_URL already has it
    }
    return `${BASE_URL}${endpoint}`;
}
