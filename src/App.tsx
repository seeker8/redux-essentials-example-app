import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Navbar } from './components/Navbar';
import { useEffect } from 'react';
import { SinglePostPage } from './features/posts/SinglePostPage';
import { PostMainPage } from './features/posts/PostMainPage';

function App() {
  useEffect(() => console.log('app render'))
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <PostMainPage />
            }
          ></Route>
          <Route
            path='/posts/:postId'
            element={<SinglePostPage />}
          ></Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
