import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const ImageUploader = ({ onUpload }) => {
  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/upload`, {
          method: "POST",
          credentials: "include",
          body: formData,
        });

        const data = await res.json();
        if (data.imageUrl) {
          onUpload(data.imageUrl);
        }
      } catch (err) {
        console.error("Upload failed", err);
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
      className={`p-4 border-2 border-dashed rounded text-center cursor-pointer transition ${
        isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-400 bg-white"
      }`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the image here...</p>
      ) : (
        <p>Drag & drop an image or click to select</p>
      )}
    </div>
  );
};

export default ImageUploader;
