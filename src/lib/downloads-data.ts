export interface DownloadItem {
    id: number;
    title: string;
    category: string;
    type: "PDF" | "DOCX" | "Form" | "Link";
    link: string;
    file_path?: string;
    created_at?: string;
}

const API_URL = '/api/downloads';

export async function getDownloads(): Promise<DownloadItem[]> {
    try {
        const res = await fetch(API_URL, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch downloads');
        return res.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function addDownload(formData: FormData, token: string) {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
    });
    if (!res.ok) throw new Error('Failed to add download');
    return res.json();
}

export async function updateDownload(id: number, formData: FormData, token: string) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
    });
    if (!res.ok) throw new Error('Failed to update download');
    return res.json();
}

export async function deleteDownload(id: number, token: string) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
    });
    return res.ok;
}
