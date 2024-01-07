import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/dashboard/app'));
export const BlogPage = lazy(() => import('src/pages/dashboard/blog'));
export const UserPage = lazy(() => import('src/pages/dashboard/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const RegisterPage = lazy(() => import('src/pages/register'));
export const ProductsPage = lazy(() => import('src/pages/dashboard/products'));
export const Page404 = lazy(() => import('src/pages/dashboard/page-not-found'));

// const checkAuth = () => !!localStorage.getItem('user');

export default function Router() {
  const checkAuth = () => !!localStorage.getItem('user');

  const routes = useRoutes([
    {
      element: checkAuth() ? (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ) : (
        <Navigate to="/signin" replace />
      ),
      children: [
        { path: 'dashboard', element: <IndexPage />, index: true },
        { path: 'dashboard/user', element: <UserPage /> },
        { path: 'dashboard/products', element: <ProductsPage /> },
        { path: 'dashboard/blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'signin',
      element: !checkAuth() ? <LoginPage /> : <Navigate to="/" replace />,
    },
    {
      path: 'signup',
      element: !checkAuth() ? <RegisterPage /> : <Navigate to="/" replace />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
