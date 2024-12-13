const isValidUrl = (urlString: string | URL) => {
    try {
      return Boolean(new URL(urlString));
    } catch (e) {
      return false;
    }
};

export default isValidUrl;