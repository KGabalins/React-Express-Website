import { Route, Routes } from 'react-router-dom';

import HomePage from './components/pages/HomePage';
import YourMoviesPage from './components/pages/YourMoviesPage';
import LoginPage from './components/pages/LoginPage';
import Layout from './components/layout/Layout';
import ProfilePage from './components/pages/ProfilePage';
import { PrivateRoute, IsLoggedIn } from './components/privateRoutes/PrivateRoutes';


function App() {

  return (
    <>
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<PrivateRoute><HomePage /></PrivateRoute>}/>
        <Route path='/yourMovies' element={<PrivateRoute><YourMoviesPage /></PrivateRoute>} />
        <Route path='/profile' element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
      </Route>
      <Route path='/login' element={<IsLoggedIn><LoginPage /></IsLoggedIn>} />
    </Routes>   
    </>
  );
}

export default App;
