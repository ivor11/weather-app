import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <SearchContainer
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <SearchForm onSubmit={handleSubmit}>
        <SearchInput 
          type="text" 
          placeholder="Search city..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <SearchButton 
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaSearch />
        </SearchButton>
      </SearchForm>
    </SearchContainer>
  );
};

const SearchContainer = styled(motion.div)`
  width: 100%;
  max-width: 500px;
  margin: 0 auto 2rem;
`;

const SearchForm = styled.form`
  display: flex;
  position: relative;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 15px 20px;
  padding-right: 50px;
  border-radius: 30px;
  border: none;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }
`;

const SearchButton = styled(motion.button)`
  position: absolute;
  right: 5px;
  top: 5px;
  background: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
`;

export default SearchBar;