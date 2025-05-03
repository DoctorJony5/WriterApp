import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './themes/ThemeContext';
import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/project/:id" element={<Editor />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
