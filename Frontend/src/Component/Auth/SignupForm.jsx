import React, { useState } from 'react';
import InputField from '../InputField';
import { useDispatch } from 'react-redux';
import { Signup } from '../../Services/operations/authAPI';
import { useNavigate } from 'react-router-dom';

function SignupForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password || !formData.confirmPassword) {
      setError('Please fill out all fields');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    dispatch(
      Signup(
        formData.username,
        formData.fullName,
        formData.password,
        formData.confirmPassword,
        navigate
      )
    );
  };

  return (
    <div className="h-[84vh] flex items-center justify-center bg-gray-50 md:bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 md:p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-orange-600 text-center">
          Create an Account
        </h2>

        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        {success && (
          <div className="text-green-500 mb-4 text-center">{success}</div>
        )}

        <InputField
          label="Username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />

        <InputField
          label="Full Name"
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
        />

        <InputField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />

        <InputField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-3 rounded-xl hover:bg-orange-600 transition duration-200"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
