import { useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useVerifyEmail } from "../../hooks/useAuth";
import AuthLayout from "../../components/layout/AuthLayout";
import Button from "../../components/ui/Button";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const verifyEmail = useVerifyEmail();

  const email = (location.state as { email?: string })?.email || "";
  const [otp, setOtp] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }

    verifyEmail.mutate(
      { email, otp },
      { onSuccess: () => navigate("/auth/login") },
    );
  };

  return (
    <AuthLayout
      title="Check your email"
      subtitle={`We sent a 6-digit code to ${email || "your inbox"}`}
      footerText="Didn't receive the code?"
      footerLink="/auth/register"
      footerLinkText="Resend"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-navy-700 mb-1.5">
            OTP Code
          </label>
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="000000"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            className="w-full px-6 py-4 rounded-xl bg-white border-2 border-navy-100 text-navy-900 text-center text-3xl font-bold tracking-[0.5em] placeholder:text-navy-300 transition-all duration-200 focus:outline-none focus:border-navy-500 focus:ring-4 focus:ring-navy-500/10 hover:border-navy-200"
          />
        </div>

        <Button type="submit" size="lg" isLoading={verifyEmail.isPending} className="w-full">
          Verify Email
        </Button>
      </form>
    </AuthLayout>
  );
}
