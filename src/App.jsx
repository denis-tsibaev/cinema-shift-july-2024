import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routePage } from './RoutePage';
import { store } from './utils/redux/store';

const router = createBrowserRouter(routePage);

export const App = () => (
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
