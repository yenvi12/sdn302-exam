import { useRouter } from 'next/router';
import PostForm from '../components/PostForm';
import { supabase } from '../lib/supabase';

export default function CreatePost() {
  const router = useRouter();

  const handleSubmit = async (post: any) => {
    await supabase.from('posts').insert([post]);
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-xl mx-auto">
        {/* <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">📝 Create New Post</h1> */}
        <PostForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
