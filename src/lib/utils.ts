export const getSafeImageSrc = (src: string | null | undefined) => {
  if (!src) return '/logo.png';
  
  // If it's already a full URL or blob, return it
  if (src.startsWith('http') || src.startsWith('blob:') || src.startsWith('data:')) {
    return src;
  }

  // If it's an uploaded image path, route through our serve API
  if (src.startsWith('/images/products/')) {
    const filename = src.split('/').pop();
    return `/api/images/serve/${filename}`;
  }

  // Fallback for relative paths
  if (src.startsWith('/')) return src;
  return `/${src}`;
};
