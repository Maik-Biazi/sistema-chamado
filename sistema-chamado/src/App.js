import { BrowserRouter } from 'react-router-dom'
import RouteApp from './routes';
import AuthProvider from './contexts/auth';
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RouteApp />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
