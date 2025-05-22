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
          <span className="text-gray-600">{user.email}</span>
          <Button size={"sm"}
            onClick={() => signOut()}
            >
            退出
          </Button>
        </>
      ) : (
        <Button size={"sm"}
          asChild>
          <Link href="/login">
            登录
          </Link>
        </Button>
      )}
    </div>
  );
};

export default UserAuthButtons; 