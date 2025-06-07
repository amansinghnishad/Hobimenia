import React, { useState, useRef, useEffect, memo } from "react";
import { motion } from "framer-motion";

// LazyImage component for performance optimization
const LazyImage = memo(
  ({
    src,
    alt = "",
    className = "",
    placeholder = null,
    onLoad = () => {},
    onError = () => {},
    ...props
  }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const [hasError, setHasError] = useState(false);
    const imgRef = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );

      if (imgRef.current) {
        observer.observe(imgRef.current);
      }

      return () => observer.disconnect();
    }, []);

    const handleLoad = () => {
      setIsLoaded(true);
      onLoad();
    };

    const handleError = () => {
      setHasError(true);
      onError();
    };

    return (
      <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
        {" "}
        {/* Placeholder */}
        {(!src || !src.trim() || (!isLoaded && !hasError)) && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            {placeholder || (
              <svg
                className="w-8 h-8 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
        )}
        {/* Error state */}
        {hasError && (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <svg
                className="w-8 h-8 mx-auto mb-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-xs">Failed to load</p>
            </div>
          </div>
        )}
        {isInView && !hasError && src && src.trim() && (
          <motion.img
            src={src}
            alt={alt}
            onLoad={handleLoad}
            onError={handleError}
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className={`${
              isLoaded ? "block" : "hidden"
            } w-full h-full object-cover`}
            {...props}
          />
        )}
      </div>
    );
  }
);

LazyImage.displayName = "LazyImage";

export default LazyImage;
