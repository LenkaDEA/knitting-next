import App from 'App/App';
import ProtectedRoute from 'components/ProtectedRoute';
import About from 'pages/About';
import AuthLayout from 'pages/AuthLayout';
import LoginForm from 'pages/AuthLayout/components/LoginForm';
import RegisterForm from 'pages/AuthLayout/components/RegisterForm';
import Home from 'pages/Home';
import NotFound from 'pages/NotFound';
import PatternDetails from 'pages/PatternDetails';
import UserProfile from 'pages/UserProfile';
import { ScrollRestoration, type RouteObject } from 'react-router';
import { CategoriesProvider } from 'stores/context/CategoriesContext';
import { PatternDetailsProvider } from 'stores/context/PatternDetailsContext';
import { PatternsProvider } from 'stores/context/PatternsContext';

export const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: (
      <>
        <App />
        <ScrollRestoration
          getKey={(location) => {
            return location.pathname;
          }}
        />
      </>
    ),
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: (
          <PatternsProvider>
            <CategoriesProvider>
              <Home />
            </CategoriesProvider>
          </PatternsProvider>
        ),
      },
      {
        path: '/patterns/:documentId',
        element: (
          <PatternDetailsProvider>
            <PatternDetails />
          </PatternDetailsProvider>
        ),
      },
      {
        element: <AuthLayout />,
        children: [
          { path: '/login', element: <LoginForm /> },
          { path: '/signup', element: <RegisterForm /> },
        ],
      },
      {
        path: '/profile',
        element: (
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];
