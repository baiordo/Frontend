import React, { ChangeEvent, useState } from "react";
import Image from "next/image";

interface PhotoUploaderProps {
  previewImages: string[];
  onPreviewImagesChange: (previews: string[], files: File[]) => void;
}

const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  previewImages,
  onPreviewImagesChange,
}) => {
  const [allFiles, setFiles] = useState<File[]>();
  const previewImagesHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    if (!input.files) {
      return;
    }

    const files = Array.from(input.files);
    setFiles(files);
    const newImagePreviews = files.map((file) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();

        reader.onload = (event) => {
          const result = event.target?.result as string;
          resolve(result);
        };

        reader.readAsDataURL(file);
      });
    });

    Promise.all(newImagePreviews).then((previews) => {
      onPreviewImagesChange(previews, files);
    });
  };
  const removeImage = (index: number) => {
    const updatedPreviews = [...previewImages];
    updatedPreviews.splice(index, 1);
    const updatedFiles = allFiles;
    if (updatedFiles) {
      updatedFiles.splice(index, 1);
      setFiles(updatedFiles);
    }
    onPreviewImagesChange(updatedPreviews, allFiles ? allFiles : []);
  };

  return (
    <div>
      <button
        type="button"
        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        <label
          className="block text-base font-medium text-gray-900 dark:text-white"
          htmlFor="file_input"
        >
          Выберите фотографии
        </label>
      </button>
      <input
        className="hidden"
        id="file_input"
        type="file"
        multiple
        onChange={previewImagesHandler}
      />
      <div className="flex flex-wrap mt-2 justify-evenly">
        {previewImages.map((preview, index) => (
          <div className="relative" key={index}>
            <button
              type="button"
              className="absolute z-50 top-0 right-0 font-black text-base px-1 text-center bg-zinc-800 text-white"
              onClick={() => removeImage(index)}
            >
              X
            </button>
            <Image
              width={200}
              height={200}
              src={preview}
              alt={`Preview ${index}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoUploader;
