import { jwtDecode } from "jwt-decode";
import { Login } from '@/utils/api'

export async function JwtIsExpired(token: string | undefined, user: any) {
  if (!token) {
    return
  } else {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    
    if ((decoded.exp ?? 0) < currentTime) {
      const newToken = await Login(user);      
      return newToken;
    } else {
      return token;
    }
  }
}