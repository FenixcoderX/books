import './App.css';
import { Route, Routes } from 'react-router-dom';
import BookList from './components/BookList';
import BookSearch from './components/BookSearch';

/** 
 * Main component for the Books application
 * @returns {JSX.Element} The rendered App component 
 */
const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<BookList />} />
      <Route path="/search" element={<BookSearch />} />
    </Routes>
  );
};

export default App;
