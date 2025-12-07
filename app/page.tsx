"use client";

import { useUser } from "@clerk/nextjs";

export default function Homepage() {
  const { isSignedIn, user } = useUser();

  if (!isSignedIn) return <div>Belum login</div>;

  return (
    <div>
      <p>Login sebagai: {user.fullName}</p>
      <p>Email: {user.primaryEmailAddress?.emailAddress}</p>
    </div>
  );
}
