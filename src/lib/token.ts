export const setToken = (token: string) => {
    document.cookie = `admin_token=${token}; path=/; max-age=86400; SameSite=Strict`;
};

export const getToken = (): string | null => {
    if (typeof document === 'undefined') return null;
    const match = document.cookie.match(new RegExp('(^| )admin_token=([^;]+)'));
    if (match) return match[2];
    return null;
};

export const removeToken = () => {
    document.cookie = 'admin_token=; path=/; max-age=0';
};
