"use client";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
const Upload = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: any) => {
    // Do something with the files
    const file = acceptedFiles[0];
    var formData = new FormData();
    formData.append("Demo", file);
    setIsLoading(true);
    axios
      .post("http://127.0.0.1:5000/receive_pdf", formData)
      .then((response: any) => {
        if (response.status === 200) {
          alert("File uploaded successfully");
        }
        setIsLoading(false);
      })
      .catch((err) => alert(err));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  return (
    <div className='main-container flex-center'>
      {isLoading ? (
        <>Loading</>
      ) : (
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
      )}
    </div>
  );
};

export default Upload;
