import { useQuery } from '@tanstack/react-query';

interface User {
  uid: string;
  email: string;
  name: string;
  role: 'Manager' | 'Dispatcher' | 'Safety Officer' | 'Financial Analyst';
  isActive: boolean;
}

interface AuthResponse {
  authenticated: boolean;
  user: User;
}

export const useAuth = () => {
  return useQuery<AuthResponse>({
    queryKey: ['auth'],
    queryFn: async () => {
      const response = await fetch('/api/auth/verify');
      if (!response.ok) {
        throw new Error('Not authenticated');
      }
      return response.json();
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
