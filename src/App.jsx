import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import ThemeProvider from './components/ThemeProvider';
import { AuthContext } from './context/context';
import { useEffect, useState } from 'react';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('tok')) {
      setIsAuth(true);
    }
  }, []);

  return (
    <ThemeProvider>
      <AuthContext.Provider value={{ isAuth, setIsAuth }}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

export default App;
