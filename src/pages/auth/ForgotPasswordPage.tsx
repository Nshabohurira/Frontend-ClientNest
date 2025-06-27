import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building, ArrowLeft } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { requestPasswordReset } from '@/lib/authApi';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await requestPasswordReset(email);
      setIsSubmitted(true);
      toast({
        title: 'Reset link sent!',
        description: 'Check your email for password reset instructions.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send reset link. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img src="/ChatGPT_Image_Jun_21__2025__03_07_05_PM-removebg-preview.png" alt="Client Nest Logo" className="h-12 w-12 object-contain rounded-lg" />
            <span className="text-2xl font-bold">Client Nest</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            {isSubmitted ? 'Check your email' : 'Forgot password?'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isSubmitted
              ? "We've sent a password reset link to your email address."
              : "Enter your email and we'll send you a reset link"}
          </p>
        </div>

        {!isSubmitted ? (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="mt-1 transition-shadow focus:shadow-outline"
                autoComplete="email"
              />
            </div>

            <Button
              type="submit"
              className="w-full transition-transform duration-150 hover:scale-105 focus:scale-105"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send reset link'}
            </Button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">
                If an account with that email exists, you'll receive a password
                reset link shortly.
              </p>
            </div>
          </div>
        )}

        <div className="text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
