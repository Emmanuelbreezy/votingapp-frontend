import React from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from './NavigationBar/NavigationBar';
import MainContent from './MainContent/MainContent';

const NotFound = () => {
  return (
    <>
      <NavigationBar />
      <MainContent>
        <div>
          <h1>404 - Not Found!</h1>
          <Link to='/'>Go Home</Link>
        </div>
      </MainContent>
    </>
  );
};

export default NotFound;
