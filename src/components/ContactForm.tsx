import React, { useState } from 'react';
import { useRouter } from 'next/router';

const groups = ['Friends', 'Family', 'Work', 'Others'];

export default function ContactForm({ initialData = {}, onSubmit }: any) {
  const [name, setName] = useState(initialData.name || '');
  const [email, setEmail] = useState(initialData.email || '');
  const [phone, setPhone] = useState(initialData.phone || '');
  const [group, setGroup] = useState(initialData.group || '');
  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!name || !email || !/\S+@\S+\.\S+/.test(email)) {
      alert('Name and valid email are required');
      return;
    }
    onSubmit({ name, email, phone, group });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-[#EFE7DA] p-6 rounded-2xl border border-[#C1B6A3] shadow-md"
    >
      <div>
        <label className="block font-medium text-[#6F5D4F] mb-1">Name *</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border border-[#C1B6A3] px-4 py-2 rounded-md text-[#6F5D4F] placeholder:text-[#B3907A] bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B3907A]"
          placeholder="Enter name"
        />
      </div>

      <div>
        <label className="block font-medium text-[#6F5D4F] mb-1">Email *</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-[#C1B6A3] px-4 py-2 rounded-md text-[#6F5D4F] placeholder:text-[#B3907A] bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B3907A]"
          placeholder="example@email.com"
        />
      </div>

      <div>
        <label className="block font-medium text-[#6F5D4F] mb-1">Phone</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border border-[#C1B6A3] px-4 py-2 rounded-md text-[#6F5D4F] placeholder:text-[#B3907A] bg-white shadow-sm"
          placeholder="Optional phone"
        />
      </div>

      <div>
        <label className="block font-medium text-[#6F5D4F] mb-1">Group</label>
        <select
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          className="w-full border border-[#C1B6A3] px-4 py-2 rounded-md text-[#6F5D4F] bg-white shadow-sm"
        >
          <option value="">Select group</option>
          {groups.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-4 pt-2">
        <button
          type="submit"
          className="flex-1 bg-[#B3907A] hover:bg-[#9e7d68] text-white py-2 rounded-md font-semibold transition-all"
        >
          {initialData.id ? 'Update Contact' : 'Save Contact'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/')}
          className="flex-1 bg-[#E1DACA] hover:bg-[#d7d0c4] text-[#6F5D4F] py-2 rounded-md font-semibold transition-all"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
