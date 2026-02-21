'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Truck, Users, Shield, BarChart3, CheckCircle2 } from 'lucide-react';

function RoleSelectionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const idToken = searchParams.get('idToken');
  const name = searchParams.get('name');
  const email = searchParams.get('email');

  useEffect(() => {
    if (!idToken || !name || !email) {
      router.push('/register');
    }
  }, [idToken, name, email, router]);

  const roles = [
    {
      name: 'Manager',
      icon: Users,
      description: 'Full system access and oversight',
      color: 'from-blue-500 to-blue-600',
      features: ['Manage all users', 'Full analytics access', 'System configuration'],
    },
    {
      name: 'Dispatcher',
      icon: Truck,
      description: 'Manage trips and fleet operations',
      color: 'from-[#FFC229] to-[#FFD666]',
      features: ['Create trips', 'Assign drivers', 'Track deliveries'],
    },
    {
      name: 'Safety Officer',
      icon: Shield,
      description: 'Monitor compliance and safety',
      color: 'from-emerald-500 to-emerald-600',
      features: ['Safety reports', 'Driver monitoring', 'Compliance tracking'],
    },
    {
      name: 'Financial Analyst',
      icon: BarChart3,
      description: 'Track expenses and analytics',
      color: 'from-purple-500 to-purple-600',
      features: ['Expense tracking', 'ROI analysis', 'Financial reports'],
    },
  ];

  const handleRoleSubmit = async () => {
    if (!selectedRole) {
      setError('Please select a role to continue');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idToken,
          name,
          role: selectedRole,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Now log the user in
      const loginResponse = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });

      if (!loginResponse.ok) {
        throw new Error('Login failed after registration');
      }

      // Redirect to dashboard
      router.push('/dashboard');
      router.refresh();
    } catch (error: any) {
      console.error('Registration Error:', error);
      setError(error.message || 'Failed to complete registration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#0a0a0a] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#FFC229]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-[#4A2B5E]/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Main card */}
      <div className="w-full max-w-4xl relative z-10">
        <div className="bg-[#1E1E24]/80 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8 md:p-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#FFC229] to-[#FFD666] rounded-2xl mb-4 shadow-lg shadow-[#FFC229]/20">
              <Truck className="w-8 h-8 text-[#0a0a0a]" strokeWidth={2.5} />
            </div>
            <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Choose Your Role</h1>
            <p className="text-gray-400 text-sm">
              Welcome, <span className="text-[#FFC229] font-semibold">{name}</span>! Select your role to complete registration
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 rounded-xl bg-red-500/10 border border-red-500/20 p-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <p className="text-sm text-red-400 text-center font-medium">{error}</p>
            </div>
          )}

          {/* Role cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {roles.map((role) => {
              const Icon = role.icon;
              const isSelected = selectedRole === role.name;

              return (
                <button
                  key={role.name}
                  onClick={() => setSelectedRole(role.name)}
                  className={`relative text-left p-6 rounded-2xl border-2 transition-all duration-300 group ${
                    isSelected
                      ? 'border-[#FFC229] bg-[#FFC229]/5 shadow-lg shadow-[#FFC229]/20'
                      : 'border-white/10 bg-[#0a0a0a]/40 hover:border-white/20 hover:bg-[#0a0a0a]/60'
                  }`}
                >
                  {/* Selected indicator */}
                  {isSelected && (
                    <div className="absolute top-4 right-4 animate-in zoom-in duration-200">
                      <CheckCircle2 className="w-6 h-6 text-[#FFC229]" />
                    </div>
                  )}

                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center mb-4 ${
                    isSelected ? 'scale-110' : 'group-hover:scale-105'
                  } transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-white font-bold text-lg mb-2">{role.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{role.description}</p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {role.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-xs text-gray-500">
                        <div className="w-1 h-1 rounded-full bg-gray-600"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>

          {/* Submit button */}
          <button
            onClick={handleRoleSubmit}
            disabled={!selectedRole || isLoading}
            className="w-full bg-gradient-to-r from-[#FFC229] to-[#FFD666] hover:from-[#FFD666] hover:to-[#FFC229] text-[#0a0a0a] font-bold py-4 px-6 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:shadow-[#FFC229]/20 disabled:hover:shadow-lg flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-[#0a0a0a]/30 border-t-[#0a0a0a] rounded-full animate-spin"></div>
                <span>Creating your account...</span>
              </>
            ) : (
              <>
                <span>Complete Registration</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </button>

          {/* Info text */}
          <p className="text-center text-gray-500 text-xs mt-6">
            You can request a role change from your administrator later
          </p>
        </div>
      </div>
    </div>
  );
}

export default function RoleSelectionPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#0a0a0a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#FFC229] border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <RoleSelectionContent />
    </Suspense>
  );
}
