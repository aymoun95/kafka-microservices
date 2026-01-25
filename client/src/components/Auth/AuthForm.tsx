import React, { useState } from "react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Heading, Text } from "../ui/Typography";

interface AuthFormProps {
  onSignup: (email: string) => void;
  message: string;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onSignup, message }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) onSignup(email);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-6">
      <Card className="max-w-md w-full p-10 shadow-sm bg-white">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-black rounded-xl mx-auto mb-6 flex items-center justify-center text-2xl font-bold text-white">
            B
          </div>
          <Heading variant="h2" className="mb-2">
            Welcome Back
          </Heading>
          <Text color="muted">Sign in to your account to continue</Text>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder:text-gray-400 text-black"
              required
            />
          </div>

          <Button type="submit" className="w-full" size="lg">
            Sign In
          </Button>
        </form>

        {message && (
          <div className="mt-6 p-4 bg-rose-50 border border-rose-200 rounded-lg">
            <Text size="sm" className="text-rose-700 font-medium text-center">
              {message}
            </Text>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <Text size="xs" color="muted">
            Secure authentication powered by Kafka
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default AuthForm;
