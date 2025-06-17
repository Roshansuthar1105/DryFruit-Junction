import React from 'react';

const categories = ['Laddus', 'Barfis', 'Chocolates', 'Dry Fruits', 'Sugar-Free'];

export default function Categories() {
  return (
    <div className="flex gap-4 overflow-x-auto py-4 px-2">
      {categories.map((cat, idx) => (
        <button
          key={idx}
          className="whitespace-nowrap bg-pink-100 text-pink-700 px-4 py-2 rounded-full shadow-sm hover:bg-pink-200 transition"
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
