import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Components 
import { Hero } from "./components/index.js";

// Pages
import {
  Addpost,
  AllPosts,
  Editpost,
  Signin,
  Signup,
  Post,  // Import the Post component
} from "./pages/index.js";

import { Provider } from 'react-redux';
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <AllPosts />
      },
      {
        path: "/register",
        element: <Signup />
      },
      {
        path: "/login",
        element: <Signin />
      },
      {
        path: "/update",
        element: <Editpost />
      },
      {
        path: "/addpost",
        element: <Addpost />
      },
      {
        path: "/post/:slug", // New route for single post
        element: <Post /> // Display the Post component
      },
      {
        path: "/post/updation/:slug",
        element: <Editpost/>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
