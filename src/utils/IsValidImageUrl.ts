async function isValidImageUrl(url: string) {
    try {
      const response = await fetch(url, { method: 'HEAD' });  // 'HEAD' request to get headers without downloading the content
      const contentType = response.headers.get('Content-Type');
      
      // Check if the content type is an image
      return contentType && contentType.startsWith('image/');
    } catch (e) {
      console.error('Error checking image URL:', e);
      return false;
    }
  }

export default isValidImageUrl;