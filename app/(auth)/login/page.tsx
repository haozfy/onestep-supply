import LoginUI from "./ui";
import { login } from "./actions";

export default function LoginPage() {
  return <LoginUI action={login} />;
}