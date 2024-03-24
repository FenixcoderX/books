import './App.css';
import { Route, Routes } from 'react-router-dom';
import BookList from './components/BookList';
import BookSearch from './components/BookSearch';

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<BookList />} />
      <Route path="/search" element={<BookSearch />} />
    </Routes>
  );
};

export default App;
