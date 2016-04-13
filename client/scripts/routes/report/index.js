import Report from './components/Report';

export default {
  path: 'reporte',
  component: Report,
  onEnter: ({ params }, replace) => replace(`/users/login`)
};
