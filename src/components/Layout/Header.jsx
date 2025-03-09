import React from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

const Header = () => {
  const { authState } = useAuthContext();

  return (
    <header className="h-16 shadow-lg px-8 flex items-center justify-end bg-primary-300 ">
      <nav className="flex items-center gap-2">
        <Link to="/admin/perfil" className="flex items-center gap-2">
          <FaRegUserCircle className="text-secondary-700 text-4xl" />
          <span className="text-secondary-500 text-xl">{authState.email}</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;