import { useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useResetPassword } from "../../hooks/useAuth";
import AuthLayout from "../../components/layout/AuthLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const resetPassword = useResetPassword();

  const prefilledEmail = (location.state as { email?: string })?.email || "";

  const [email, setEmail] = useState(prefilledEmail);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      toast.error("Please enter your email address.");
      return;
    }
    if (otp.length !== 6) {
      toast.error("Please enter the 6-digit reset code.");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    resetPassword.mutate(
      { email: trimmedEmail, otp, new_password: newPassword },
      { onSuccess: () => navigate("/auth/login") },
    );
  };

  return (
    <AuthLayout
      title="Reset password"
      subtitle={
        prefilledEmail
          ? `Enter the code sent to ${prefilledEmail} and your new password.`
          : "Enter the code from your email and choose a new password."
      }
      footerText="Didn't get a code?"
      footerLink="/auth/forgot-password"
      footerLinkText="Request again"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {!prefilledEmail && (
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
        )}

        <div>
          <label className="block text-sm font-semibold text-navy-700 mb-1.5">
            Reset code
          </label>
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="000000"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            className="w-full px-6 py-4 rounded-xl bg-white border border-navy-200 text-navy-900 text-center text-3xl font-bold tracking-[0.5em] placeholder:text-navy-300 transition-all duration-200 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 hover:border-navy-300"
          />
        </div>

        <Input
          label="New password"
          type="password"
          placeholder="At least 6 characters"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          }
        />

        <Input
          label="Confirm new password"
          type="password"
          placeholder="Re-enter your new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          }
        />

        <Button type="submit" size="lg" isLoading={resetPassword.isPending} className="w-full">
          Reset password
        </Button>
      </form>
    </AuthLayout>
  );
}
