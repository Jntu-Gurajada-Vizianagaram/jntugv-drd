export interface Notification {
    id: number;
    title: string;
    date: string;
    category: string;
    link: string;
    file_path?: string;
}

const API_URL = 'http://localhost:5000/api/notifications';

export async function getNotifications(): Promise<Notification[]> {
    try {
        const res = await fetch(API_URL, { cache: 'no-store' });
        if (!res.ok) {
            throw new Error('Failed to fetch notifications');
        }
        return res.json();
    } catch (error) {
        console.error('Error fetching notifications:', error);
        return [];
    }
}

export async function addNotification(formData: FormData, token: string) {
    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData, // FormData automatically sets multipart/form-data
        });
        if (!res.ok) {
            const err = await res.text();
            throw new Error(`Failed to add notification: ${res.status} ${err}`);
        }
        return res.json();
    } catch (error) {
        console.error('Error adding notification:', error);
        throw error;
    }
}

export async function deleteNotification(id: number, token: string) {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
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
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData,
        });
        if (!res.ok) {
            const err = await res.text();
            throw new Error(`Failed to update notification: ${res.status} ${err}`);
        }
        return res.json();
    } catch (error) {
        console.error('Error updating notification:', error);
        throw error;
    }
}
