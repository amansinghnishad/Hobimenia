import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "../css/componentCSS/ImageUploader.css";

const ImageUploader = ({ onUpload }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        onUpload(file);
      }
    },
    [onUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={`image-uploader-container${isDragActive ? " active" : ""}`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`image-uploader-icon${isDragActive ? " active" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 15a4 4 0 004 4h10a4 4 0 004-4M7 15V7a4 4 0 018 0v8"
          />
        </svg>
        {isDragActive ? (
          <p
            className="image-uploader-text"
            style={{
              color: "#3b82f6",
              fontWeight: 600,
            }}
          >
            Drop the image here...
          </p>
        ) : (
          <>
            <p className="image-uploader-text">
              Drag & drop an image or click to select
            </p>
            <span className="image-uploader-subtext">
              (JPG, PNG, GIF, max 1 file)
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
