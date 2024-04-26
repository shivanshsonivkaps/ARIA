"use client";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
const Upload = () => {
  const onDrop = useCallback((acceptedFiles: any) => {
    // Do something with the files
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  return (
    <div className='main-container flex-center'>
      <div
        {...getRootProps()}
        className='border-2 border-white w-96 p-5 text-center h-80 flex-center'
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag n drop some files here, or click to select files</p>
        )}
      </div>
    </div>
  );
};

export default Upload;
