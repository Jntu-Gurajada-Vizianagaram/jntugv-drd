export interface Notification {
    id: number;
    title: string;
    date: string;
    category: string;
    link: string;
}

// In-memory mock data (resets on server restart)
let notifications: Notification[] = [
    { id: 1, title: 'Ph.D. Admission Notification 2024-25', date: '2024-12-15', category: 'Admissions', link: '#' },
    { id: 2, title: 'Circular regarding Pre-Ph.D. Examinations', date: '2024-12-10', category: 'Examinations', link: '#' }
];

export async function getNotifications() {
    return notifications;
}

export async function addNotification(note: Omit<Notification, 'id' | 'date'>) {
    const newNote = {
        ...note,
        id: Math.floor(Math.random() * 10000), // Simple random ID
        date: new Date().toISOString().split('T')[0]
    };
    notifications.unshift(newNote);
    return newNote;
}

export async function deleteNotification(id: number) {
    notifications = notifications.filter(n => n.id !== id);
    return true;
}
