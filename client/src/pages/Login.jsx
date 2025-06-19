// src/pages/Login.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const {login}=useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    const result = await login(email, password); // ✅ use context method
  
    if (result.success) {
      navigate('/'); // ✅ reactivity ensured via context
    } else {
      setError(result.message); // ✅ error from context
    }
  
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Left side - Brand Story */}
          <div className="md:w-1/2 bg-gradient-to-b from-amber-100 to-amber-50 p-12 flex flex-col justify-center">
            <h1 className="text-3xl font-serif font-bold text-amber-900 mb-6">Our Sweet Story</h1>
            <p className="text-amber-800 mb-6 leading-relaxed">
              For over three generations, our family has been crafting exceptional
              confections that bring joy to every celebration. What started as a small
              kitchen operation has grown into a beloved local institution.
            </p>
            
            <div className="flex justify-between mt-8">
              <div className="text-center">
                <p className="text-4xl font-bold text-amber-700">10,000+</p>
                <p className="text-amber-600">Happy Customers</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-amber-700">25+</p>
                <p className="text-amber-600">Awards Won</p>
              </div>
            </div>
          </div>
          
          {/* Right side - Login Form */}
          <div className="md:w-1/2 p-12">
            <h2 className="text-2xl font-serif font-bold text-amber-900 mb-2">Welcome Back</h2>
            <p className="text-amber-600 mb-8">Sign in to your sweet account</p>
            
            {error && (
              <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-amber-800 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-amber-800 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                  required
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-amber-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-amber-700">
                    Remember me
                  </label>
                </div>
                
                <div className="text-sm">
                  <Link to="/forgot-password" className="font-medium text-amber-600 hover:text-amber-500">
                    Forgot password?
                  </Link>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-70"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : 'Sign In'}
              </button>
            </form>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-amber-700">
                Don't have an account?{' '}
                <Link to="/signup" className="font-medium text-amber-600 hover:text-amber-500">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;