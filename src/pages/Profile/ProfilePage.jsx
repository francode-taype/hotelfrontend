import React from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { useAuth } from '../../hooks/useAuth';
const ProfilePage = () => {
  const { authState } = useAuthContext();  
  const { logoutHandler } = useAuth();    

  return (
    <div className="container mx-auto p-6">
  {/* Mi cuenta */}
  <div className="bg-secondary-500 p-8 rounded-xl mb-8">
    <div className='flex justify-between'>
      <h2 className="text-xl text-gray-900">Mi cuenta</h2>
      <button 
        onClick={logoutHandler} 
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
      >
        Cerrar Sesión
      </button>
    </div>
    <hr className="my-8 border-gray-500/30" />

    <div className="flex flex-col gap-y-8">
      {/* Correo */}
      <div className="flex flex-col md:flex-row md:items-center gap-y-2">
        <div className="w-full md:w-1/4">
          <p className="text-gray-900">Correo:</p>
        </div>
        <div className="flex-1">
          <input
            type="text"
            className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-300"
            value={authState.email}
            readOnly
          />
        </div>
      </div>

      {/* Roles */}
      <div className="flex flex-col md:flex-row md:items-center gap-y-2">
        <div className="w-full md:w-1/4">
          <p className="text-gray-900">Roles:</p>
        </div>
        <div className="flex-1">
          <input
            type="text"
            className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-300"
            value={authState.roles.join(', ')}
            readOnly
          />
        </div>
      </div>
    </div>
  </div>

  {/* Datos Personales */}
  <div className="bg-secondary-500 p-8 rounded-xl mb-8">
    <h2 className="text-xl text-gray-900">Datos Personales</h2>
    <hr className="my-8 border-gray-500/30" />

    <div className="flex flex-col gap-y-8">
      {/* Nombre completo */}
      <div className="flex flex-col md:flex-row md:items-center gap-y-2">
        <div className="w-full md:w-1/4">
          <p className="text-gray-900">Nombre completo:</p>
        </div>
        <div className="flex-1 flex items-center gap-4">
          <div className="w-full">
            <input
              type="text"
              className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-300"
              placeholder="Nombre(s)"
              readOnly
            />
          </div>
          <div className="w-full">
            <input
              type="text"
              className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-300"
              placeholder="Apellido(s)"
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Nombre de la empresa */}
      <div className="flex flex-col md:flex-row md:items-center gap-y-2">
        <div className="w-full md:w-1/4">
          <p className="text-gray-900">Empresa:</p>
        </div>
        <div className="flex-1">
          <input
            type="text"
            className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-300"
            placeholder="Nombre de la empresa"
            readOnly
          />
        </div>
      </div>

      {/* Número de contacto */}
      <div className="flex flex-col md:flex-row md:items-center gap-y-2">
        <div className="w-full md:w-1/4">
          <p className="text-gray-900">Número de contacto:</p>
        </div>
        <div className="flex-1">
          <input
            type="text"
            className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-300"
            placeholder="Número de contacto"
            readOnly
          />
        </div>
      </div>
    </div>
  </div>

  {/* Notificaciones */}
  <div className="bg-secondary-500 p-8 rounded-xl mb-8">
    <h1 className="text-xl text-gray-900">Notificaciones</h1>
    <hr className="my-8 border-gray-500/30" />
    <div className="mb-8">
      {/* Notificación 1: Reserva pendiente */}
      <div className="flex items-center gap-4">
        <div className="flex flex-col gap-y-1">
          <label htmlFor="id1" className="text-gray-900">Reserva Pendiente</label>
          <p className="text-gray-700 text-sm">
            Tienes una reserva pendiente para la habitación 101. Por favor, confirma la reserva.
          </p>
        </div>
      </div>
      <hr className="my-8 border-gray-500/30 border-dashed" />

      {/* Notificación 2: Pago Exitoso */}
      <div className="flex items-center gap-4">
        <div className="flex flex-col gap-y-1">
          <label htmlFor="id2" className="text-gray-900">Pago Exitoso</label>
          <p className="text-gray-700 text-sm">
            El pago de la reserva para la habitación 102 se ha realizado con éxito.
          </p>
        </div>
      </div>
      <hr className="my-8 border-gray-500/30 border-dashed" />

      {/* Notificación 3: Nueva solicitud de limpieza */}
      <div className="flex items-center gap-4">
        <div className="flex flex-col gap-y-1">
          <label htmlFor="id3" className="text-gray-900">Solicitud de Limpieza</label>
          <p className="text-gray-700 text-sm">
            Se ha recibido una solicitud de limpieza para la habitación 105. Se asignará a un empleado pronto.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default ProfilePage;
