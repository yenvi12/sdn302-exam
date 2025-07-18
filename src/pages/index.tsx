import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import PostCard from '../components/PostCard';
import Link from 'next/link';

export default function HomePage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data } = await supabase.from('posts').select('*');
    setPosts(data || []);
  };

  const deletePost = async (id: string) => {
    await supabase.from('posts').delete().eq('id', id);
    fetchPosts();
  };

  const filtered = posts
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">📋 Post List</h1>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
          <input
            type="text"
            placeholder="🔍 Search posts by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 shadow-sm"
            onClick={() => setSortAsc(!sortAsc)}
          >
            {sortAsc ? '⬇️ A-Z' : '⬆️ Z-A'}
          </button>
          <Link
            href="/create"
            className="bg-green-500 text-white px-5 py-2 rounded-md font-medium hover:bg-green-600 transition-all shadow"
          >
            ➕ Add New Post
          </Link>
        </div>

        <div className="space-y-4">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-500">No posts found.</p>
          ) : (
            filtered.map((post) => (
              <PostCard key={post.id} post={post} onDelete={deletePost} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
