import React, { useState } from 'react';


import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import GamePage from './views/GamePage';
import UserProfilePage from './views/UserProfilePage';
import SearchResultsPage from './views/SearchResultsPage';
import ProfilePage from './views/ProfilePage';
import DiscussionPage from './views/DiscussionPage';
import DiscussionDetail from './views/DiscussionDetail';

import './app.css';

function App() {

  return (
    <>
      <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/games/:gameId" element={<GamePage />} />
              <Route path="/users/:userId" element={<UserProfilePage />} />
              <Route path="/search" element={<SearchResultsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/discussions" element={<DiscussionPage />} />
              <Route path="/discussions/:discussionId" element={<DiscussionDetail />} />
            </Routes>
          </Router>
        </div>
      </div>
    </>
  );
}

export default App;