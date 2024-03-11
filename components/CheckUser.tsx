import { useEffect } from 'react';
import { auth } from "../lib/auth";
import { redirect } from 'next/navigation';

export default async function CheckUser() {
  useEffect(() => {
    const checkUser = async () => {
      const session = await auth();

      if (!session?.user) {
        redirect("/login");
      }
    };

    checkUser();
  }, []);

  return(
    <div>
      <h1>CheckUser</h1>
    </div>
  )
}