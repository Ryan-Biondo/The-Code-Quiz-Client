// The QuizProvider is a React context provider which is used to share state across the application
import { QuizProvider } from './contexts/QuizContext';

// The BrowserRouter, Route and Routes are part of react-router-dom, a third-party routing library for React
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TechQuiz from './pages/TechQuiz';
import Score from './pages/Score';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    // QuizProvider is used here to wrap the application. This allows any nested components to have access to the Quiz context.
    // The Router component is a routing context provider from react-router-dom. It wraps the application and manages the browser history.
    <QuizProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/TechQuiz" element={<TechQuiz />} />
          <Route path="/Score" element={<Score />} />
        </Routes>
      </Router>
    </QuizProvider>
  );
}

export default App;
