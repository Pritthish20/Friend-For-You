import React, { useState } from 'react';
import SignupForm from '../Component/Auth/SignupForm';
import LoginForm from '../Component/Auth/LoginForm';

function LandingPage() {
  const [activeTab, setActiveTab] = useState('signup');

  return (
    <div className="h-[100vh] flex flex-col items-center justify-center bg-gray-50 md:p-6">
      <div className="bg-white px-4 md:px-10 py-6 md:py-8 rounded-2xl shadow-xl w-full max-w-lg">
        <div className="flex mb-6 border-b border-gray-300">
          <button
            className={`w-1/2 py-3 text-lg font-semibold ${
              activeTab === 'signup'
                ? 'border-b-4 border-orange-500 text-orange-600'
                : 'text-gray-500'
            } transition-colors duration-300`}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </button>
          <button
            className={`w-1/2 py-3 text-lg font-semibold ${
              activeTab === 'login'
                ? 'border-b-4 border-blue-500 text-blue-600'
                : 'text-gray-500'
            } transition-colors duration-300`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
        </div>
        <header className="w-full text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-orange-600">
            Welcome to Friend For You
          </h1>
        </header>
        {activeTab === 'signup' && <SignupForm />}
        {activeTab === 'login' && <LoginForm />}
      </div>
    </div>
  );
}

export default LandingPage;
