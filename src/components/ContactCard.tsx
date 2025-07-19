import React from 'react';

export default function ContactCard({ contact, onEdit, onDelete }: any) {
  return (
    <div
      className="p-5 rounded-2xl shadow transition-transform hover:shadow-md hover:scale-[1.01] bg-[#EFE7DA] border border-[#C1B6A3] space-y-2"
    >
      <div className="text-xl font-semibold text-[#6F5D4F]">{contact.name}</div>
      <div className="text-sm text-[#6F5D4F]">{contact.email}</div>

      {contact.phone && (
        <div className="text-sm text-[#6F5D4F]">📞 {contact.phone}</div>
      )}

      {contact.group && (
        <span className="inline-block text-xs bg-[#E1DACA] text-[#6F5D4F] px-3 py-1 rounded-full">
          {contact.group}
        </span>
      )}

      <div className="flex gap-2 pt-3">
        <button
          onClick={onEdit}
          className="px-4 py-1 text-sm rounded bg-[#B3907A] text-white hover:bg-[#9e7e69] transition"
        >
          Edit
        </button>
        <button
          onClick={() => {
            if (confirm('Are you sure to delete this contact?')) onDelete();
          }}
          className="px-4 py-1 text-sm rounded bg-[#6F5D4F] text-white hover:bg-[#5a4a3f] transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
