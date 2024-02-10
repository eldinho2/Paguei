import { jwtDecode } from "jwt-decode";
import { useSession } from "next-auth/react";
import { Login } from '@/utils/api'

export function JwtIsExpired(token: string | undefined) {
  const { data: session } = useSession();
  const user = session?.user;
  

  if (!token) {
    return
  } else {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    
    if ((decoded.exp ?? 0) < currentTime) {
      console.log("Token expired");
      const newToken = Login(user);
      console.log("newToken", newToken);
      
      return newToken;
    } else {
      return token;
    }
  }
}
