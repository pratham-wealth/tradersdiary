'use client';

import { useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
    onImagesChange: (images: string[]) => void;
    existingImages?: string[];
    maxImages?: number;
}

export function ImageUpload({ onImagesChange, existingImages = [], maxImages = 5 }: ImageUploadProps) {
    const [images, setImages] = useState<string[]>(existingImages);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        if (images.length + files.length > maxImages) {
            setError(`Maximum ${maxImages} images allowed`);
            return;
        }

        setUploading(true);
        setError(null);

        const formData = new FormData();
        Array.from(files).forEach((file) => {
            formData.append('files', file);
        });

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.error) {
                setError(data.error);
            } else {
                const newImages = [...images, ...data.urls];
                setImages(newImages);
                onImagesChange(newImages);
            }
        } catch (err) {
            setError('Failed to upload images');
        } finally {
            setUploading(false);
        }
    }

    function removeImage(index: number) {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
        onImagesChange(newImages);
    }

    return (
        <div className="space-y-3">
            {/* Upload Button */}
            {images.length < maxImages && (
                <label className="block">
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center cursor-pointer hover:border-long transition-colors">
                        {uploading ? (
                            <div className="flex flex-col items-center gap-2">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-long"></div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Uploading...</p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-2">
                                <Upload className="w-8 h-8 text-gray-400" />
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Click to upload images
                                </p>
                                <p className="text-xs text-gray-500">
                                    PNG, JPG up to 5MB ({images.length}/{maxImages})
                                </p>
                            </div>
                        )}
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                        disabled={uploading}
                    />
                </label>
            )}

            {/* Error Message */}
            {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
            )}

            {/* Image Grid */}
            {images.length > 0 && (
                <div className="grid grid-cols-2 gap-3">
                    {images.map((image, index) => (
                        <div key={index} className="relative group">
                            <img
                                src={image}
                                alt={`Upload ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg"
                            />
                            <button
                                onClick={() => removeImage(index)}
                                className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                type="button"
                                aria-label="Remove Image"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
