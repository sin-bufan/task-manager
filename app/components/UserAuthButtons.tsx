'use client'
import React from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { Button } from "@/components/ui/button";

const UserAuthButtons: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="flex items-center space-x-4">
      {user ? (
        <>
          <span className="text-gray-600">欢迎, {user.email}</span>
          <Button
            onClick={() => signOut()}
            variant="ghost"
            className="text-red-600 hover:text-red-800 hover:bg-red-50"
          >
            退出登录
          </Button>
        </>
      ) : (
        <Button
          asChild
          variant="ghost"
          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
        >
          <Link href="/login">
            登录
          </Link>
        </Button>
      )}
    </div>
  );
};

export default UserAuthButtons; 