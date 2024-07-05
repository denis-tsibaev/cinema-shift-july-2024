import { HomePage } from './pages/HomePage';
import { MoviePage } from './pages/MoviePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProfilePage } from './pages/ProfilePage';
import { ScheduleByDayPage } from './pages/ScheduleByDayPage';
import { SchedulePage } from './pages/SchedulePage';
import { ROUTES } from './utils/constants/router';

export const routePage = [
  {
    path: ROUTES.HOME,
    element: <HomePage />,
    errorElement: <NotFoundPage />
  },
  {
    path: ROUTES.PROFILE,
    element: <ProfilePage />
  },
  {
    path: ROUTES.MOVIE,
    element: <MoviePage />
  },
  {
    path: ROUTES.SHEDULE,
    element: <SchedulePage />,
    children: [
      {
        path: ROUTES.SHEDULE,
        element: <ScheduleByDayPage />
      }
    ]
  }
];
