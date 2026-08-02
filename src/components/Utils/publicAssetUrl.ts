export const publicAssetUrl = (path: string, baseUrl = import.meta.env.BASE_URL) =>
    `${baseUrl}${path.replace(/^\/+/, '')}`;
