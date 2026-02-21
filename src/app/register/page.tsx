'use client';

import { useState } from 'react';
import Link from 'next/link';
import GoogleSignInButton from '@/components/auth/GoogleSignInButton';
import { Truck, Users, Shield, TrendingUp, BarChart3 } from 'lucide-react';

export default function RegisterPage() {
  const [error, setError] = useState('');

  const roles = [
    { 
      name: 'Manager', 
      icon: Users, 
      description: 'Full system access and oversight',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      name: 'Dispatcher', 
      icon: Truck, 
      description: 'Manage trips and fleet operations',
      color: 'from-[#FFC229] to-[#FFD666]'
    },
    { 
      name: 'Safety Officer', 
      icon: Shield, 
      description: 'Monitor compliance and safety',
      color: 'from-emerald-500 to-emerald-600'
    },
    { 
      name: 'Financial Analyst', 
      icon: BarChart3, 
      description: 'Track expenses and analytics',
      color: 'from-purple-500 to-purple-600'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#0a0a0a] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#FFC229]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-[#4A2B5E]/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Main card */}
      <div className="w-full max-w-2xl relative z-10">
        <div className="bg-[#1E1E24]/80 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8 md:p-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          {/* Logo and branding */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#FFC229] to-[#FFD666] rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-[#FFC229]/20">
              <Truck className="w-8 h-8 text-[#0a0a0a]" strokeWidth={2.5} />
            </div>
            <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Join FleetFlow</h1>
            <p className="text-gray-400 text-center text-sm max-w-md">
              Create your account and start managing your fleet operations efficiently
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 rounded-xl bg-red-500/10 border border-red-500/20 p-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <p className="text-sm text-red-400 text-center font-medium">{error}</p>
            </div>
          )}

          {/* Role selection info */}
          <div className="mb-6 bg-[#0a0a0a]/40 rounded-2xl p-5 border border-white/5">
            <h3 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#FFC229]" />
              Available Roles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {roles.map((role) => {
                const Icon = role.icon;
                return (
                  <div 
                    key={role.name}
                    className="bg-[#1E1E24]/60 rounded-xl p-3 border border-white/5 hover:border-white/10 transition-all duration-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${role.color} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-xs mb-0.5">{role.name}</p>
                        <p className="text-gray-500 text-[10px] leading-tight">{role.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-gray-500 text-xs mt-3 text-center">
              You'll select your role after signing in with Google
            </p>
          </div>

          {/* Google Sign-In Button */}
          <div className="space-y-4">
            <GoogleSignInButton mode="register" onError={setError} />
            
            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#1E1E24] px-3 text-gray-500 font-semibold tracking-wider">
                  Quick & Secure
                </span>
              </div>
            </div>

            {/* Login link */}
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                Already have an account?{' '}
                <Link 
                  href="/login" 
                  className="text-[#FFC229] hover:text-[#FFD666] font-semibold transition-colors duration-200 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          {/* Security badge */}
          <div className="mt-8 pt-6 border-t border-white/5">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="font-medium">Secured by Firebase Authentication</span>
            </div>
          </div>
        </div>

        {/* Footer text */}
        <p className="text-center text-gray-500 text-xs mt-6">
          By creating an account, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
