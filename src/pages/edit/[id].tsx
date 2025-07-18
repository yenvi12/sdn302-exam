import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import PostForm from '@/components/PostForm';

export default function EditPage() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch post by ID
  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error('Error fetching post:', error.message);
          router.push('/');
        } else {
          setPost(data);
        }

        setLoading(false);
      };

      fetchPost();
    }
  }, [id, router]);

  const handleUpdate = async (updatedData: any) => {
    const { error } = await supabase.from('posts').update(updatedData).eq('id', id);

    if (error) {
      alert('Failed to update post');
      console.error(error);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      {/* <h1 className="text-3xl font-bold text-center text-gray-800 mb-10 flex items-center justify-center gap-2">
        📝 Edit Post
      </h1> */}

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : post ? (
        <PostForm initialData={post} onSubmit={handleUpdate} />
      ) : (
        <p className="text-center text-red-500">Post not found.</p>
      )}
    </div>
  );
}
