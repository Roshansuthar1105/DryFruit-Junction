import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-10 py-6 text-center text-gray-600 text-sm">
      <p>© {new Date().getFullYear()} SweetCart. All rights reserved.</p>
      <p>Made with ❤️ for sweet lovers.</p>
    </footer>
  );
}

