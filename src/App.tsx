import React from 'react';
import Layout from './components/Layout';
import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';
import PostDetails from './components/post/PostDetails';
import CreatePost from './components/CreatePost';

function App() {
  return (
    <Routes>
      <Route path={'/'} element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={'/post/:id'} element={<PostDetails />} />
        <Route path={'createPost'} element={<CreatePost />} />
      </Route>
    </Routes>
  );
}

export default App;
