import React, { useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { AIMessageControl } from './AIMessageControl';

export const Dashboard: React.FC = () => {
  const { loadDashboardData } = useAppStore();

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-12">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#ED1C24] to-[#C41E3A] rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                AI Message Control
              </h1>
              <p className="text-lg text-gray-600 mt-1">
                Orchestrate intelligent communications with travelers worldwide
              </p>
            </div>
          </div>
        </div>

        <AIMessageControl />
      </div>
    </div>
  );
};