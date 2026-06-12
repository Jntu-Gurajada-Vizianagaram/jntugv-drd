import { API_URL } from '@/lib/constants';

export interface Notification {
    id: number;
    title: string;
    date: string;
    category: string;
    link: string;
    file_path?: string;
    external_text?: string;
    external_link?: string;
}

const API_PARAMS = (endpoint: string) => `${API_URL}/api/${endpoint}`;

const NOTIFICATIONS_API_URL = API_PARAMS('notifications');

export async function getNotifications(): Promise<Notification[]> {
    const urls = Array.from(new Set([
        NOTIFICATIONS_API_URL,
        'http://127.0.0.1:6001/api/notifications',
        'http://127.0.0.1:6000/api/notifications',
        'http://127.0.0.1:5000/api/notifications',
    ]));

    for (const url of urls) {
        try {
            const res = await fetch(url, {
                cache: 'no-store',
                signal: AbortSignal.timeout(3000),
            });
            const contentType = res.headers.get('content-type') || '';

            if (!res.ok || !contentType.includes('application/json')) continue;

            const data = await res.json();
            if (Array.isArray(data)) return data;
        } catch (error) {
            console.warn(`Notification fetch failed for ${url}:`, error);
        }
    }

    console.error('Unable to fetch notifications from any configured backend URL.');
    return [];
}

export async function addNotification(formData: FormData, token: string) {
    try {
        const res = await fetch(NOTIFICATIONS_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.error || `Server responded with ${res.status}`);
        }

        return await res.json();
    } catch (error: any) {
        console.error('Error adding notification:', error.message);
        throw error;
    }
}

export async function deleteNotification(id: number, token: string) {
    try {
        const res = await fetch(`${NOTIFICATIONS_API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.ok;
    } catch (error) {
        console.error('Error deleting notification:', error);
        return false;
    }
}

export async function updateNotification(id: number, formData: FormData, token: string) {
    try {
        const res = await fetch(`${NOTIFICATIONS_API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.error || `Server responded with ${res.status}`);
        }

        return await res.json();
    } catch (error: any) {
        console.error('Error updating notification:', error.message);
        throw error;
    }
}
