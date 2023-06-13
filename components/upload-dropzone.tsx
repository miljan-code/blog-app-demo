'use client';

import Image from 'next/image';
import { useState, useCallback } from 'react';
import { generateReactHelpers } from '@uploadthing/react/hooks';
import { useDropzone, type FileWithPath } from 'react-dropzone';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import type { OurFileRouter } from '@/app/api/uploadthing/core';

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();

interface UploadDropzoneProps {
  coverUrl: string | null;
  setCoverUrl: React.Dispatch<React.SetStateAction<string | null>>;
}

export const UploadDropzone = ({
  coverUrl,
  setCoverUrl,
}: UploadDropzoneProps) => {
  const [file, setFile] = useState<File>();

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp'],
    },
  });

  const { startUpload } = useUploadThing({
    endpoint: 'imageUploader',
    onClientUploadComplete: file => {
      if (!file) return;
      setCoverUrl(file[0].fileUrl);
    },
    onUploadError: error => {
      toast({
        title: 'Your image is not uploaded',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  if (coverUrl) {
    return (
      <div className="h-40 w-full relative mb-10 group">
        <Image
          src={coverUrl}
          alt="uploaded pic"
          fill
          className="object-cover m-0 rounded-md"
          priority
        />
        <div className="absolute inset-0 w-full h-full bg-background/75 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
          <Button
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();

              setCoverUrl(null);
            }}
            variant="destructive"
          >
            Remove picture
          </Button>
        </div>
      </div>
    );
  }

  const dropzoneLabel = isDragActive
    ? 'Drop the picture here'
    : 'Drag and drop some picture here, or click to select one';

  return (
    <div {...getRootProps()} className="mb-6">
      <input {...getInputProps()} />
      <div
        className={cn(
          'border-dashed border-border border-2 rounded-md p-2 flex flex-col items-center justify-center text-sm transition hover:border-indigo-600 cursor-pointer',
          {
            'border-indigo-600': isDragActive,
          }
        )}
      >
        {file ? (
          <Button
            variant="secondary"
            size="sm"
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
              startUpload([file]);
            }}
            className="my-2"
          >
            Upload picture
          </Button>
        ) : (
          <p>{dropzoneLabel}</p>
        )}
      </div>
    </div>
  );
};
