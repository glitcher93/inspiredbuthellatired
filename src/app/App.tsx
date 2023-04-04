import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import AdminLogin from '../features/AdminLogin';
import AppContent from '../features/AppContent';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<AppContent />} />
        <Route path='/login' element={<AdminLogin />} />
        <Route element={<ProtectedRoute />}>

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
