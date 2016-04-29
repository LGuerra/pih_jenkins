// import { expect } from 'chai';
// import reportReducers from '../../client/scripts/reducers/report_reducers';
// import {
//   // Action descriptors
//   SET_VIVIENDA_INFO,
//   SET_COLONIA_INFO,
//   SELECT_COMPARATIVO_COLONIAS,
//   SELECT_POLYGON,
//   SET_LOADING_FRAME
// } from '../../client/scripts/actions/report_actions';

// const INITIAL_STATE = {
//   viewType: 'Vivienda',
//   urlParams: {
//     longitud: 0,
//     latitud: 0,
//     recamaras: 1,
//     banos: 1,
//     estacionamientos: 0,
//     edad: 1,
//     id_tipo_propiedad: 2,
//     area_construida: 100,
//     address: '',
//     tipo_operacion: 0,
//     colonia: ''
//   },
//   viviendaInfo: {},
//   coloniaInfo: [],
//   ofertaDisponible: {},
//   distribucionTipologia: {},
//   precioHistorico: [],
//   distribucionPrecio: {},
//   propiedadesComparables: {},
//   coloniasComparables: [],
//   viviendasComparables: [],
//   coloniasMap: [],
//   actualColoniaMap: null,
//   centroid: null,
//   selectedComparativoColonias: null,
//   selectedPolygon: null,
//   isLoadingFrame: false
// };

// describe('reducers', () => {
//   it('should return the initial state', () => {
//     expect(
//       reportReducers(undefined, {})
//     ).to.eql(INITIAL_STATE);
//   });
// });
