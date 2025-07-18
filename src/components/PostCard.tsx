import React from 'react';
import { useRouter } from 'next/router';

export default function PostCard({ post, onDelete }: any) {
  const router = useRouter();

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row mb-6">
      {/* Image Section */}
      {post.image_url && (
        <div className="md:w-1/3 w-full aspect-[3/2] bg-white flex items-center justify-center">
          <img
            src={post.image_url}
            alt={post.name}
            className="object-contain max-h-full max-w-full"
          />
        </div>
      )}

      {/* Content Section */}
      <div className="p-6 flex flex-col justify-between md:w-2/3">
        <div>
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded mb-2">
            Blog
          </span>

          <h2 className="text-2xl font-semibold text-gray-800 mb-1">{post.name}</h2>
          <p className="text-sm text-gray-500 mb-4">
            Posted on {new Date(post.created_at).toLocaleDateString()}
          </p>

          <p className="text-gray-700 text-sm line-clamp-3 mb-4">
            {post.description}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => router.push(`/edit/${post.id}`)}
            className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md transition"
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => {
              if (confirm('Are you sure you want to delete this post?')) {
                onDelete(post.id);
              }
            }}
            className="text-sm bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md transition"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
}
