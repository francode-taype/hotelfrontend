import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { validateEmail, validatePassword } from '../../utils/validations/validationAuth'; 
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import MainButton from '../../components/Button/MainButton';
import LOGO from "../../assets/images/logo.png";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { loginHandler, isLoading, error } = useAuth();
  
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {
      email: '',
      password: '',
    };

    if (!validateEmail(email)) {
      errors.email = 'Formato de correo electrónico inválido';
    }

    if (!validatePassword(password)) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setFormErrors(errors);

    if (!errors.email && !errors.password) {
      loginHandler(email, password);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between p-2 bg-secondary-500 rounded-lg shadow-xl">
      <div className="w-full flex justify-center mb-6 md:mb-0">
        <img src={LOGO} alt="Logo de la empresa" className="h-60 md:h-auto" />
      </div>

      <div className="w-full bg-white p-8 ">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500"
            />
            {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500"
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
              </span>
            </div>
            {formErrors.password && <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>}
          </div>

          {error && <p className="text-red-500 text-xs">{error}</p>}

          <MainButton 
            isLoading={isLoading} 
            label="Iniciar sesión" 
            loadingText="Iniciando sesión..."
          />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
