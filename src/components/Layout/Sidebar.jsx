import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {RiHome2Line, RiMenu3Line, RiCloseLine, RiSettings4Line, RiArrowRightSLine, RiTruckFill, RiUser3Fill, RiStore3Line, RiUserSettingsFill} from "react-icons/ri";
import { PiCalendarBlank, PiBroomFill} from "react-icons/pi";
import { MdOutlineBedroomChild } from "react-icons/md";
import LOGO from "../../assets/images/logo2.png";

export const Sidebar = () => {
  // Estado para manejar los menús desplegables
  const [showMenu, setShowMenu] = useState(false);
  const [reservationsMenuOpen, setReservationsMenuOpen] = useState(false);
  const [roomsMenuOpen, setRoomsMenuOpen] = useState(false);
  const [productsMenuOpen, setProductsMenuOpen] = useState(false);
  const [employeesMenuOpen, setEmployeesMenuOpen] = useState(false);
  const [cleaningMenuOpen, setCleaningMenuOpen] = useState(false);

  // Cerrar el sidebar cuando se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".sidebar") && showMenu) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);

  // Cerrar el sidebar al seleccionar un elemento del menú
  const closeSidebarOnSelect = () => {
    if (window.innerWidth < 1280) setShowMenu(false);
  };

  return (
    <>
      <div
        className={`xl:h-[100vh] p-2 fixed xl:static w-auto  h-full top-0 bg-primary-700 flex flex-col justify-between z-50 sidebar ${
          showMenu ? "left-0" : "-left-full"
        } transition-all duration-200 overflow-y-scroll`}
      >
        <div className="mb-6 flex justify-center items-center -mx-1 border-b-2 border-red1 pb-3 border-secondary-500">
          <NavLink to="/admin" className="flex justify-center items-center gap-1" onClick={closeSidebarOnSelect}>
            <img
              src={LOGO}
              alt="logo de la empresa"
              className="w-16 h-16 rounded-full"
            />
            <h1 className="hidden md:block font-semibold md:text-xl z-40 text-center text-secondary-500">
              O y M Hospedaje
            </h1>
          </NavLink>
        </div>

        <ul className="h-full flex flex-col">
          {/* Menú Inicio */}
          <li>
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                isActive ? 'menu-item bg-primary-300' : 'menu-item'
              }
              onClick={closeSidebarOnSelect}
            >
              <RiHome2Line />
              Inicio
            </NavLink>
          </li>

          {/* Menú Reservas */}
          <li>
            <button
              className="menu-toggle"
              onClick={() => setReservationsMenuOpen(!reservationsMenuOpen)}
            >
              <span className="flex items-center gap-1">
                <PiCalendarBlank />
                Reservas
              </span>
              <RiArrowRightSLine
                className={`transform transition-transform ${
                  reservationsMenuOpen ? 'rotate-90' : 'rotate-0'
                }`}
              />
            </button>
            {reservationsMenuOpen && (
              <ul className="menu-dropdown">
                <li>
                  <NavLink
                    to="/admin/reservar"
                    className={({ isActive }) =>
                      isActive ? 'menu-item bg-primary-300' : 'menu-item'
                    }
                    onClick={closeSidebarOnSelect}
                  >
                    Reservar
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/reservas/calendario"
                    className={({ isActive }) =>
                      isActive ? 'menu-item bg-primary-300' : 'menu-item'
                    }
                    onClick={closeSidebarOnSelect}
                  >
                    Calendario
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/lista-reservas"
                    className={({ isActive }) =>
                      isActive ? 'menu-item bg-primary-300' : 'menu-item'
                    }
                    onClick={closeSidebarOnSelect}
                  >
                    Lista de Reservas
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/clientes"
                    className={({ isActive }) =>
                      isActive ? 'menu-item bg-primary-300' : 'menu-item'
                    }
                    onClick={closeSidebarOnSelect}
                  >
                    Clientes
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          {/* Menú Habitaciones */}
          <li>
            <button
              className="menu-toggle"
              onClick={() => setRoomsMenuOpen(!roomsMenuOpen)}
            >
              <span className="flex items-center gap-1">
                <MdOutlineBedroomChild />
                Habitaciones
              </span>
              <RiArrowRightSLine
                className={`transform transition-transform ${
                  roomsMenuOpen ? 'rotate-90' : 'rotate-0'
                }`}
              />
            </button>
            {roomsMenuOpen && (
              <ul className="menu-dropdown">
                <li>
                  <NavLink
                    to="/admin/habitaciones"
                    end
                    className={({ isActive }) =>
                      isActive ? 'menu-item bg-primary-300' : 'menu-item'
                    }
                    onClick={closeSidebarOnSelect}
                  >
                    Habitaciones
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/habitaciones/tipos"
                    className={({ isActive }) =>
                      isActive ? 'menu-item bg-primary-300' : 'menu-item'
                    }
                    onClick={closeSidebarOnSelect}
                  >
                    Tipos
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/habitaciones/pisos"
                    className={({ isActive }) =>
                      isActive ? 'menu-item bg-primary-300' : 'menu-item'
                    }
                    onClick={closeSidebarOnSelect}
                  >
                    Pisos
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/habitaciones/productos"
                    className={({ isActive }) =>
                      isActive ? 'menu-item bg-primary-300' : 'menu-item'
                    }
                    onClick={closeSidebarOnSelect}
                  >
                    Productos
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          {/* Menú Productos */}
          <li>
            <button
              className="menu-toggle"
              onClick={() => setProductsMenuOpen(!productsMenuOpen)}
            >
              <span className="flex items-center gap-1">
                <RiStore3Line />
                Productos
              </span>
              <RiArrowRightSLine
                className={`transform transition-transform ${
                  productsMenuOpen ? 'rotate-90' : 'rotate-0'
                }`}
              />
            </button>
            {productsMenuOpen && (
              <ul className="menu-dropdown">
                <li>
                  <NavLink
                    to="/admin/categorias"
                    className={({ isActive }) =>
                      isActive ? 'menu-item bg-primary-300' : 'menu-item'
                    }
                    onClick={closeSidebarOnSelect}
                  >
                    Categorías
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/productos"
                    className={({ isActive }) =>
                      isActive ? 'menu-item bg-primary-300' : 'menu-item'
                    }
                    onClick={closeSidebarOnSelect}
                  >
                    Productos
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          {/* Menú Empleados */}
          <li>
            <button
              className="menu-toggle"
              onClick={() => setEmployeesMenuOpen(!employeesMenuOpen)}
            >
              <span className="flex items-center gap-1">
                <RiUser3Fill />
                Empleados
              </span>
              <RiArrowRightSLine
                className={`transform transition-transform ${
                  employeesMenuOpen ? 'rotate-90' : 'rotate-0'
                }`}
              />
            </button>
            {employeesMenuOpen && (
              <ul className="menu-dropdown">
                <li>
                  <NavLink
                    to="/admin/empleados"
                    className={({ isActive }) =>
                      isActive ? 'menu-item bg-primary-300' : 'menu-item'
                    }
                    onClick={closeSidebarOnSelect}
                  >
                    <RiUserSettingsFill />
                    Empleados
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/empleados/roles"
                    className={({ isActive }) =>
                      isActive ? 'menu-item bg-primary-300' : 'menu-item'
                    }
                    onClick={closeSidebarOnSelect}
                  >
                    <RiSettings4Line />
                    Roles
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          {/* Menú Limpieza */}
          <li>
            <button
              className="menu-toggle"
              onClick={() => setCleaningMenuOpen(!cleaningMenuOpen)}
            >
              <span className="flex items-center gap-1">
                <PiBroomFill />
                Limpieza
              </span>
              <RiArrowRightSLine
                className={`transform transition-transform ${
                  cleaningMenuOpen ? 'rotate-90' : 'rotate-0'
                }`}
              />
            </button>
            {cleaningMenuOpen && (
              <ul className="menu-dropdown">
                <li>
                  <NavLink
                    to="/admin/limpieza/incidencias"
                    className={({ isActive }) =>
                      isActive ? 'menu-item bg-primary-300' : 'menu-item'
                    }
                    onClick={closeSidebarOnSelect}
                  >
                    Incidencias
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/limpieza/habitaciones"
                    className={({ isActive }) =>
                      isActive ? 'menu-item bg-primary-300' : 'menu-item'
                    }
                    onClick={closeSidebarOnSelect}
                  >
                    Habitaciones
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          {/* Menú Configuración */}
          <li className="mt-auto">
            <NavLink
              to="/admin/configuracion"
              className={({ isActive }) =>
                isActive ? 'menu-item bg-primary-300' : 'menu-item'
              }
              onClick={closeSidebarOnSelect}
            >
              <RiSettings4Line />
              Configuración
            </NavLink>
          </li>
        </ul>
        
      </div>

      <button
        onClick={() => setShowMenu(!showMenu)}
        className="sidebar-toggle-button"
      >
        {showMenu ? <RiCloseLine className="p-2 text-4xl"/> : <RiMenu3Line className="p-2 text-4xl"/>}
      </button>
    </>
  );
};

export default Sidebar;
