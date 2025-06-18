// src/pages/Signup.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/auth/register', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Left side - Brand Story */}
          <div className="md:w-1/2 bg-gradient-to-b from-amber-100 to-amber-50 p-12 flex flex-col justify-center">
            <h1 className="text-3xl font-serif font-bold text-amber-900 mb-6">Our Sweet Story</h1>
            <p className="text-amber-800 mb-6 leading-relaxed">
              Every sweet we create is made with premium ingredients sourced from
              trusted suppliers, combined with time-honored techniques passed down
              through our family. We believe that the best confections come from the
              heart, and that's exactly what you'll taste in every bite.
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
          
          {/* Right side - Signup Form */}
          <div className="md:w-1/2 p-12">
            <h2 className="text-2xl font-serif font-bold text-amber-900 mb-2">Join Our Family</h2>
            <p className="text-amber-600 mb-8">Create your sweet account</p>
            
            {error && (
              <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-amber-800 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-amber-800 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-amber-800 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                  required
                  minLength="6"
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-amber-800 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                  required
                  minLength="6"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-amber-300 rounded"
                  required
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-amber-700">
                  I agree to the <Link to="/terms" className="text-amber-600 hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-amber-600 hover:underline">Privacy Policy</Link>
                </label>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-70"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </span>
                ) : 'Create Account'}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-amber-700">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-amber-600 hover:text-amber-500">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;