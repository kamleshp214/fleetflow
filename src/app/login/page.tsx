'use client';

import { useState } from 'react';
import Link from 'next/link';
import GoogleSignInButton from '@/components/auth/GoogleSignInButton';
import { Truck } from 'lucide-react';

export default function LoginPage() {
  const [error, setError] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#0a0a0a] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FFC229]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#4A2B5E]/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Main card */}
      <div className="w-full max-w-md relative z-10">
        <div className="bg-[#1E1E24]/80 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8 md:p-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          {/* Logo and branding */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#FFC229] to-[#FFD666] rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-[#FFC229]/20">
              <Truck className="w-8 h-8 text-[#0a0a0a]" strokeWidth={2.5} />
            </div>
            <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Welcome Back</h1>
            <p className="text-gray-400 text-center text-sm">
              Sign in to your FleetFlow account to continue
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 rounded-xl bg-red-500/10 border border-red-500/20 p-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <p className="text-sm text-red-400 text-center font-medium">{error}</p>
            </div>
          )}

          {/* Google Sign-In Button */}
          <div className="space-y-4">
            <GoogleSignInButton mode="login" onError={setError} />
            
            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#1E1E24] px-3 text-gray-500 font-semibold tracking-wider">
                  Secure Authentication
                </span>
              </div>
            </div>

            {/* Register link */}
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                Don't have an account?{' '}
                <Link 
                  href="/register" 
                  className="text-[#FFC229] hover:text-[#FFD666] font-semibold transition-colors duration-200 hover:underline"
                >
                  Create one now
                </Link>
              </p>
            </div>
          </div>

          {/* Security badge */}
          <div className="mt-8 pt-6 border-t border-white/5">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="font-medium">Secured by Firebase Authentication</span>
            </div>
          </div>
        </div>

        {/* Footer text */}
        <p className="text-center text-gray-500 text-xs mt-6">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
