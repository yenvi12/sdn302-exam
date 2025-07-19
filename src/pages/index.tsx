import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import ContactCard from '@/components/ContactCard';
import { useRouter } from 'next/router';

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  group?: string;
  created_at?: string;
}

export default function HomePage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [search, setSearch] = useState('');
  const [group, setGroup] = useState('');
  const [sort, setSort] = useState<'asc' | 'desc'>('asc');
  const router = useRouter();

  const fetchContacts = async () => {
    let query = supabase.from('contacts').select('*');

    if (search) query = query.ilike('name', `%${search}%`);
    if (group) query = query.eq('group', group);
    if (sort) query = query.order('name', { ascending: sort === 'asc' });

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching contacts:', error.message);
    }

    setContacts(data || []);
  };

  useEffect(() => {
    fetchContacts();
  }, [search, group, sort]);

  const handleDelete = async (id: string) => {
    const confirm = window.confirm('Are you sure you want to delete this contact?');
    if (!confirm) return;

    await supabase.from('contacts').delete().eq('id', id);
    fetchContacts();
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 bg-[#F5F5EB] min-h-screen">
      {/* Header */}
      <div className="relative text-center mb-6">
        <h1 className="text-3xl font-bold text-[#6F5D4F] inline-flex items-center gap-2">
          <span>📇</span> Contact List
        </h1>
        <button
          onClick={() => router.push('/create')}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#B3907A] hover:bg-[#A37E68] text-white px-4 py-2 rounded-md transition"
        >
          + Add Contact
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-[#C1B6A3] bg-[#EFE7DA] px-3 py-2 rounded w-full md:w-1/3 placeholder:text-[#B3907A] text-[#6F5D4F]"
        />

        <select
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          className="border border-[#C1B6A3] bg-[#EFE7DA] px-3 py-2 rounded w-full md:w-1/3 text-[#6F5D4F]"
        >
          <option value="">All Groups</option>
          <option value="Friends">Friends</option>
          <option value="Work">Work</option>
          <option value="Family">Family</option>
          <option value="Others">Others</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as 'asc' | 'desc')}
          className="border border-[#C1B6A3] bg-[#EFE7DA] px-3 py-2 rounded w-full md:w-1/3 text-[#6F5D4F]"
        >
          <option value="asc">Sort: A-Z</option>
          <option value="desc">Sort: Z-A</option>
        </select>
      </div>

      {/* Contact Grid */}
      {contacts.length === 0 ? (
        <p className="text-center text-gray-500">No contacts found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {contacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onEdit={() => router.push(`/edit/${contact.id}`)}
              onDelete={() => handleDelete(contact.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
