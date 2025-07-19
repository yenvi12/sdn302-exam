import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import ContactForm from '@/components/ContactForm';

export default function EditPage() {
  const router = useRouter();
  const { id } = router.query;
  const [contact, setContact] = useState<any>(null);

  useEffect(() => {
    if (id) {
      supabase
        .from('contacts')
        .select('*')
        .eq('id', id)
        .single()
        .then(({ data }) => {
          setContact(data);
        });
    }
  }, [id]);

  const handleUpdate = async (data: any) => {
    await supabase.from('contacts').update(data).eq('id', id);
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#F5F5EB] px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-[#6F5D4F] mb-10 flex items-center justify-center gap-2">
         Edit Contact
      </h1>

      {contact ? (
        <div className="max-w-xl mx-auto bg-[#EFE7DA] p-6 rounded-2xl shadow border border-[#C1B6A3]">
          <ContactForm initialData={contact} onSubmit={handleUpdate} />
        </div>
      ) : (
        <p className="text-center text-red-500">Contact not found.</p>
      )}
    </div>
  );
}
