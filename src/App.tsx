import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import { Navbar } from './components/Navbar';
import { useEffect } from 'react';
import { SinglePostPage } from './features/posts/SinglePostPage';
import { PostMainPage } from './features/posts/PostMainPage';
import { EditPostForm } from './features/posts/EditPostForm';
import { LoginPage } from './features/auth/LoginPage';
import { useAppSelector } from './app/hooks';
import { selectCurrentUsername } from './features/auth/authSlice';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const username = useAppSelector(selectCurrentUsername);
  if (!username) {
    return <Navigate to="/" replace />
  }

  return children;
}


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
              <LoginPage />
            }></Route>
          <Route
            path='/*'
            element={
              <ProtectedRoute>
                <Routes>
                  <Route path="/posts" element={<PostMainPage />}></Route>
                  <Route path='/posts/:postId' element={<SinglePostPage />}></Route>
                  <Route path='/editPost/:postId' element={<EditPostForm />} ></Route>
                </Routes>
              </ProtectedRoute>
            }></Route>
        </Routes>
      </div >
    </Router >
  )
}

export default App
