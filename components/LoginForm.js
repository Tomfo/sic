'use client';
import { useState } from 'react';
export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    setLoading(true); // Indicate loading state

    // Basic client-side validation
    if (!email || !password) {
      setError('Please enter both email and password.');
      setLoading(false);
      return;
    }

    try {
      // In a real application, you would make an API call here.
      // Example using fetch (replace with your actual API endpoint)
      const response = await fetch('/api/login', {
        // Assuming you have a /api/login endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful
        console.log('Login successful:', data);
        // Redirect the user to a dashboard or home page
        // Example: router.push('/dashboard');
        alert('Login successful!'); // For demonstration
      } else {
        // Login failed
        setError(
          data.message || 'Login failed. Please check your credentials.'
        );
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
      <h2 className='text-3xl font-bold text-center text-gray-800 mb-6'>
        Login
      </h2>
      <form onSubmit={handleSubmit}>
        {error && (
          <div
            className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4'
            role='alert'
          >
            <span className='block sm:inline'>{error}</span>
          </div>
        )}

        <div className='mb-4'>
          <label
            htmlFor='email'
            className='block text-gray-700 text-sm font-bold mb-2'
          >
            Email
          </label>
          <input
            type='email'
            id='email'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500'
            placeholder='john.doe@example.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className='mb-6'>
          <label
            htmlFor='password'
            className='block text-gray-700 text-sm font-bold mb-2'
          >
            Password
          </label>
          <input
            type='password'
            id='password'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500'
            placeholder='********'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className='flex items-center justify-between'>
          <button
            type='submit'
            className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Logging In...' : 'Login'}
          </button>
          <a
            className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
            href='#' // You can link to a forgot password page here
          >
            Forgot Password?
          </a>
        </div>

        <div className='mt-6 text-center'>
          <p className='text-gray-600 text-sm'>
            Don't have an account?{' '}
            <a
              href='/register'
              className='text-blue-500 hover:text-blue-800 font-bold'
            >
              Register
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
