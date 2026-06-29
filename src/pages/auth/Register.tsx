import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useRegister } from "../../hooks/useAuth";
import AuthLayout from "../../components/layout/AuthLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function Register() {
  const navigate = useNavigate();
  const register = useRegister();

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!nickname || !email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (password.length < 3) {
      toast.error("Password must be at least 3 characters.");
      return;
    }

    register.mutate(
      { nickname, email, password },
      { onSuccess: () => navigate("/auth/verify-email", { state: { email } }) },
    );
  };

  return (
    <AuthLayout
      title="Create account"
      subtitle="Start your writing journey today"
      footerText="Already have an account?"
      footerLink="/auth/login"
      footerLinkText="Sign in"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Nickname"
          type="text"
          placeholder="Your display name"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          }
        />

        <Input
          label="Email address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          }
        />

        <Input
          label="Password"
          type="password"
          placeholder="Min. 3 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          }
        />

        <Button type="submit" size="lg" isLoading={register.isPending} className="w-full">
          Create Account
        </Button>
      </form>
    </AuthLayout>
  );
}
