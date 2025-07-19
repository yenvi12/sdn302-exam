import React from 'react';
import { useRouter } from 'next/router';
import ContactForm from '@/components/ContactForm';
import { supabase } from '@/lib/supabase';

export default function CreatePage() {
  const router = useRouter();

  const handleCreate = async (data: any) => {
    await supabase.from('contacts').insert([data]);
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#F5F5EB] px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-[#6F5D4F] mb-10 flex items-center justify-center gap-2">
         Create New Contact
      </h1>

      <div className="max-w-xl mx-auto bg-[#EFE7DA] p-6 rounded-2xl shadow border border-[#C1B6A3]">
        <ContactForm onSubmit={handleCreate} />
      </div>
    </div>
  );
}
