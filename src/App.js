import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Call from './pages/call';
import Form from './pages/form';

function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/details/:name" element={<Call />} />
      </Routes>
    </Router>
  );
}

export default App;
