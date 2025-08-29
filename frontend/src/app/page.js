'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LandingPage from '@/components/pages/LandingPage';

const HomePage = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Header />
      <main>
        <LandingPage />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;