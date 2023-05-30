import {
  Home,
  QueryBuilder,
  Rowing,
  LocalDining,
  CardTravel,
} from '@material-ui/icons';

const TripItems = {
  accommodation: {
    id: 'Accommodation',
    icon: <Home />,
    color: '#FF5E45',
  },
  reservation: {
    id: 'Reservation',
    icon: <QueryBuilder />,
    color: '#67F588',
  },
  activity: {
    id: 'Activity',
    icon: <Rowing />,
    color: 'yellow',
  },
  dining: {
    id: 'Dining',
    icon: <LocalDining />,
    color: 'orange',
  },
  other: {
    id: 'Other',
    icon: <CardTravel />,
    color: '#6299F5',
  },
};

export default TripItems;
