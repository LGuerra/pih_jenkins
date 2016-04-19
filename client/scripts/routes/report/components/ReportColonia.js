import React, { Component } from 'react';

import ColoniaInfo            from '../../../containers/reporte/ColoniaInfo';
import ComparativoColonias    from '../../../containers/reporte/ComparativoColonias';
import FormatBarChart         from '../../../containers/reporte/FormatBarChart';
import FormatGoogleMaps       from '../../../containers/reporte/FormatGoogleMaps';
import FormatLineChart        from '../../../containers/reporte/FormatLineChart';
import FormatStackedBarChart  from '../../../containers/reporte/FormatStackedBarChart';
import FormatStickyNavbar     from '../../../containers/reporte/FormatStickyNavbar';
import OfertaDisponible       from '../../../containers/reporte/OfertaDisponible';

import { connect } from 'react-redux';

class ReporteColonia extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <FormatStickyNavbar
          viewType={'Colonia'}/>
        <div style={{padding: '10px'}} className={'MainSection'}>
          <div className={'max-width-container'}>
            <div>
              <h3 className={'SectionTitle'}>{'Información de la colonia ' + this.props.coloniaName}</h3>
              <div className={'LineDivider'}></div>
            </div>
            <div className={'BlockContainer row'}>
              <div className={'col-sm-12'}>
                <ColoniaInfo
                  ref={'coloniaInfo'}
                  zoneID={this.props.coloniaID}
                  viewType={'Colonia'}/>
              </div>
            </div>
          </div>
        </div>
        <div style={{padding: '10px'}} className={'info-colonia MainSection'}>
          <div className={'max-width-container'}>
            <div>
              <OfertaDisponible
                ref={'ofertaDisponible'}
                zoneID={this.props.coloniaID} />
            </div>
            <div>
              <h4 className={'SubsectionTitle'}>{'Distribución de Tipología'}<img width={'5px'} style={{marginBottom: '10px', marginLeft: '3px'}}src={IMAGES.asterisk} /></h4>
              <FormatStackedBarChart
                ref={'distribucionTipologia'}
                id={'distribucion_tipologia'}
                zoneID={this.props.coloniaID}/>
            </div>
            <div className={'BlockContainer row'}>
              <div style={{paddingLeft: '0px', borderRight: '1px solid #c9c9c9'}} className={'col-sm-6'}>
                <h4 className={'SubsectionTitle'}>Precio Histórico por m²</h4>
                <FormatLineChart
                  ref={'precioHistorico'}
                  id={'precio_historico'}
                  zoneID={this.props.coloniaID} />
              </div>
              <div className={'col-sm-6 barchart-section'}>
                <h4 className={'SubsectionTitle'}>Distribución de Precio por m²<img width={'5px'} style={{marginBottom: '10px', marginLeft: '3px'}}src={IMAGES.asterisk} /></h4>
                <FormatBarChart
                  ref={'distribucionPrecio'}
                  id={'distribucion_precio'}
                  zoneID={this.props.coloniaID}/>
              </div>
            </div>
          </div>
        </div>
        <div className={'BlockContainer MainSection'} style={{marginTop: '10px'}}>
          <div className={'max-width-container'}>
            <ComparativoColonias
              ref={'comparativoColonias'}
              zoneID={this.props.coloniaID} />
            <div className={'Footnote'}>
              <img width={'7px'} src={IMAGES.asterisk} />
              <p style={{textAlign: 'right', margin: '5px 0 0 3px'}}>{'Información de mercado con base en datos de los últimos 6 meses.'}</p>
            </div>
          </div>
        </div>
        <div style={{margin: '10px 0px'}}>
          <FormatGoogleMaps
            viewType={'Vivienda'}
            viviendaInfo={{}}
            zoneID={this.props.coloniaID}
            ref={'formatGoogleMaps'}/>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  let coloniaName = state.report.coloniaInfo.length
    ? state.report.coloniaInfo[2].nombre
    : '';

  return {
    coloniaName: coloniaName
  }
}

export default connect(mapStateToProps)(ReporteColonia);
