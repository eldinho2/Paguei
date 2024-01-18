import AuthWithGoogle from "@/components/AuthWithGoogle";
import { auth } from "@/lib/auth"

export default function Login() {
  const session = auth()

  if (session?.user) {
    console.log(session.user);
  }

  return (
    <div>
      {session?.user?.email}
      <div>Login</div>
      <AuthWithGoogle />
    </div>
  );
}
