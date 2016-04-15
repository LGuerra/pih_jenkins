import Report from './components/Report';
import { userIsAuthenticated } from 'helpers-banca';

export default {
  path: 'reporte',
  component: Report,
  onEnter: userIsAuthenticated
};
