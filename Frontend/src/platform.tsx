import { useRoutes } from 'react-router-dom';
import AppRoutes from './routes/routes';

function App() {
  const routing = useRoutes(AppRoutes());

  return (
    <>
    <div>
      {routing}
    </div>
    </>
  )
}

export default App
