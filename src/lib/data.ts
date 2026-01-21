import { API_URL } from '@/lib/constants';
import axios from 'axios';

export interface Notification {
    id: number;
    title: string;
    date: string;
    category: string;
    link: string;
    file_path?: string;
}

const API_PARAMS = (endpoint: string) => `${API_URL}/api/${endpoint}`;

const NOTIFICATIONS_API_URL = API_PARAMS('notifications');

export async function getNotifications(): Promise<Notification[]> {
    try {
        const res = await axios.get(NOTIFICATIONS_API_URL);
        return res.data;
    } catch (error) {
        console.error('Error fetching notifications:', error);
        return [];
    }
}

export async function addNotification(formData: FormData, token: string) {
    try {
        const res = await axios.post(NOTIFICATIONS_API_URL, formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error: any) {
        console.error('Error adding notification:', error.message);
        throw new Error(error.response?.data?.error || error.message);
    }
}

export async function deleteNotification(id: number, token: string) {
    try {
        const res = await axios.delete(`${NOTIFICATIONS_API_URL}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.status === 200;
    } catch (error) {
        console.error('Error deleting notification:', error);
        return false;
    }
}

export async function updateNotification(id: number, formData: FormData, token: string) {
    try {
        const res = await axios.put(`${NOTIFICATIONS_API_URL}/${id}`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error: any) {
        console.error('Error updating notification:', error.message);
        throw new Error(error.response?.data?.error || error.message);
    }
}
