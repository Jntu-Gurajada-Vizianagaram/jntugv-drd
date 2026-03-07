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
    try {
        const res = await fetch(NOTIFICATIONS_API_URL, { cache: 'no-store' });
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        return await res.json();
    } catch (error) {
        console.error('Error fetching notifications:', error);
        return [];
    }
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
