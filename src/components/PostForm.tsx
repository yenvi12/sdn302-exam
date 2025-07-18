import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { uploadToCloudinary } from '../utils/cloudinary';

export default function PostForm({ initialData = {}, onSubmit }: any) {
  const [name, setName] = useState(initialData.name || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(initialData.image_url || null);
  const router = useRouter();

  useEffect(() => {
    if (!image) return;
    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let imageUrl = initialData.image_url || '';
    if (image) {
      imageUrl = await uploadToCloudinary(image);
    }
    onSubmit({ name, description, image_url: imageUrl });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100 space-y-6"
    >
      <h1 className="text-2xl font-semibold text-center flex items-center justify-center gap-2">
        📝 {initialData.id ? 'Edit Post' : 'Create New Post'}
      </h1>

      {/* Post Name */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Post Name</label>
        <input
          type="text"
          placeholder="Enter post name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          placeholder="Write a description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={4}
          className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>

      {/* Image Upload */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {preview && (
          <div>
            <label className="text-sm text-gray-500 block mb-1">Preview</label>
            <img
              src={preview}
              alt="Preview"
              className="w-full h-64 object-contain rounded-md border border-gray-200"
            />
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row justify-between gap-4 pt-4">
        <button
          type="submit"
          className="flex-1 bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700 transition"
        >
          {initialData.id ? 'Update Post' : 'Save Post'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/')}
          className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-md font-semibold hover:bg-gray-300 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
