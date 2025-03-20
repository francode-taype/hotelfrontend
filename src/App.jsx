import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AuthRoute from './routes/AuthRoute';

// Pages
import Home from './pages/Home/Home';
import ProfilePage from './pages/Profile/ProfilePage';
import RoomTypesPage from './pages/RoomType/RoomTypesPage';
import RoomTypePage from './pages/RoomType/RoomTypeViewPage';
import RoomTypeCreatePage from './pages/RoomType/RoomTypeCreatePage';
import RoomTypeUpdatePage from './pages/RoomType/RoomTypeUpdatePage';
import FloorRoomsPage from './pages/FloorRoom/FloorRoomsPage';
import FloorRoomViewPage from './pages/FloorRoom/FloorRoomViewPage';
import FloorRoomCreatePage from './pages/FloorRoom/FloorRoomCreatePage';
import FloorRoomUpdatePage from './pages/FloorRoom/FloorRoomUpdatePage';
import RoomPage from './pages/Room/RoomPage';
import RoomCreatePage from './pages/Room/RoomCreatePage';
import ListRoomPage from './pages/Reservation/ListRoomPage';

// Context
import { AuthProvider } from './context/AuthContext';

// Routes
import PrivateRoute from './routes/PrivateRoute';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<MainLayout />}>
            <Route index element={<PrivateRoute component={Home} />} />
            <Route path="perfil" element={<PrivateRoute component={ProfilePage} />} />
            {/* tipos */}
            <Route path="habitaciones/tipos" element={<PrivateRoute component={RoomTypesPage} />} />
            <Route path="habitaciones/tipos/ver/:id" element={<PrivateRoute component={RoomTypePage} />} />
            <Route path="habitaciones/tipos/crear" element={<PrivateRoute component={RoomTypeCreatePage} />} />
            <Route path="habitaciones/tipos/actualizar/:id" element={<PrivateRoute component={RoomTypeUpdatePage} />} />
            {/* pisos */}
            <Route path="habitaciones/pisos" element={<PrivateRoute component={FloorRoomsPage} />} />
            <Route path="habitaciones/pisos/ver/:id" element={<PrivateRoute component={FloorRoomViewPage} />} />
            <Route path="habitaciones/pisos/crear" element={<PrivateRoute component={FloorRoomCreatePage} />} />
            <Route path="habitaciones/pisos/actualizar/:id" element={<PrivateRoute component={FloorRoomUpdatePage} />} />
            {/* habitaciones */}
            <Route path="habitaciones" element={<PrivateRoute component={RoomPage} />} />
            <Route path="habitaciones/crear" element={<PrivateRoute component={RoomCreatePage} />} />
            <Route path="*" element={<Navigate to="/" />} />
            {/* reservaciones */}
            <Route path="reservar" element={<PrivateRoute component={ListRoomPage} />} />
          </Route>

          <Route path="/" element={<AuthRoute />} /> 
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
