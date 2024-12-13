import React, { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  defaultSrc: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ src, alt, defaultSrc, ...imgProps }) => {
  const [imageSrc, setImageSrc] = useState<string>(src || defaultSrc);

  const handleError = () => {
    if (imageSrc !== defaultSrc) {
      setImageSrc(defaultSrc);
    }
  };

  return (
    <img 
      {...imgProps}
      src={imageSrc} 
      alt={alt} 
      onError={handleError} 
    />
  );
};

export default ImageWithFallback;
