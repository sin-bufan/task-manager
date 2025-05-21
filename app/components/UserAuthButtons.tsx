'use client'
import React from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';

const UserAuthButtons: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="flex items-center space-x-4">
      {user ? (
        <>
          <span className="text-gray-600">欢迎, {user.email}</span>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 text-sm text-red-600 hover:text-red-800"
          >
            退出登录
          </button>
        </>
      ) : (
        <Link
          href="/login"
          className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800"
        >
          登录
        </Link>
      )}
    </div>
  );
};

export default UserAuthButtons; 