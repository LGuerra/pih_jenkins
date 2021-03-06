import React, { Component } from 'react';
import _                    from 'lodash';
import { connect }          from 'react-redux';

import { setLoadingFrame }  from '../../actions/report_actions'
import { printInfo, downloadPDFReport } from '../../PDFReport';

import {
  formatPrecioHistorico,
  formatDistribucionPrecio,
  formatComparativoViviendas,
  formatComparativoColonias
} from '../../data_formatters';

class DownloadPDFReport extends Component {
  constructor(props) {
    super(props);

    this._generateInfo = this._generateInfo.bind(this);
  }

  _generateInfo(url) {
    let report = this.props.report;
    //Initial variables
    let viviendaInfo = {};
    let viviendasComparables = [];
    let coloniasComparables = [];

    //Getting data from refered components
    let coloniaInfo = {
      averageOffer: report.coloniaInfo[0].avg,
      averageM2: report.coloniaInfo[1].avg,
      coloniaInfo: report.coloniaInfo[2],
      apreciacion: report.coloniaInfo[3].apreciacion_anualizada
    };

    coloniaInfo.coloniaInfo.SHF = report.coloniaInfo[2].precio_m2_shf;

    let ofertaDisponible = {
      monthlyListing: report.ofertaDisponible[0].count,
      semesterListing: report.ofertaDisponible[1].count,
      averageTime: report.ofertaDisponible[2].avg
    };

    let dataTokens = this._getImages().map((element) => {
      return ({
        identifier: element.nombre + '.png',
        dataType: 'image',
        data: element.image
      });
    });

    if (this.props.viewType === 'Vivienda') {
      viviendaInfo = _.merge({
        confianza:  report.viviendaInfo.confianza || 1,
        precioM2:   report.viviendaInfo.valuacion_m2 || 0,
        valuacion:  report.viviendaInfo.valuacion || 0
      }, _.pick(this.props.urlParams,
        ['longitud',
          'latitud',
          'recamaras',
          'banos',
          'estacionamientos',
          'edad',
          'id_tipo_propiedad',
          'area_construida',
          'address',
          'tipo_operacion']));

      viviendasComparables = formatComparativoViviendas(report.viviendasComparables, viviendaInfo, report.coloniaInfo[2].nombre);
    } else {
      coloniasComparables = formatComparativoColonias(report.coloniasComparables, this.props.urlParams.colonia);
    }

    dataTokens = dataTokens.concat([
      {
        identifier: 'viviendas_comparables.json',
        dataType: 'json',
        data: viviendasComparables
      },
      {
        identifier: 'colonias_comparables.json',
        dataType: 'json',
        data: coloniasComparables
      },
      {
        identifier: 'info_colonia.json',
        dataType: 'json',
        data: coloniaInfo
      },
      {
        identifier: 'oferta_disponible.json',
        dataType: 'json',
        data: ofertaDisponible
      },
      {
        identifier: 'info_vivienda.json',
        dataType: 'json',
        data: viviendaInfo
      },
      {
        identifier: 'distribucion_precio.json',
        dataType: 'json',
        data: formatDistribucionPrecio(report.distribucionPrecio)
      },
      {
        identifier: 'precio_historico.json',
        dataType: 'json',
        data: formatPrecioHistorico(report.precioHistorico)
      }
    ]);

    downloadPDFReport(url, dataTokens)
      .then(() => {
        this.props.setLoadingFrame(false);
      });
  }

  _downloadReport() {
    let host = 'https://reportspdf.intelimetrica.com/reporter/reporte_vivienda/';
    //let host = 'http://192.168.0.225:4567/reporter/reporte_vivienda/';
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();

    if (mm < 10) mm = '0' + mm;
    if (dd < 10) dd = '0' + dd;

    let date = dd + '-' + mm + '-' + yyyy;

    if (this.props.viewType === 'Vivienda') {
      let randomText = Math.random().toString(36).substr(2, 10);
      this.reportUrl = `${host}${this.props.viewType.toLowerCase()}/${this.props.urlParams.colonia}-${randomText}/${date}`;
    } else {
      this.reportUrl = `${host}${this.props.viewType.toLowerCase()}/${this.props.urlParams.colonia}/${date}`;
    }


    $.get(this.reportUrl)
      .done(() => {
        printInfo(this.reportUrl);
      })
      .fail(() => {
        this.props.setLoadingFrame(true);
        this._generateInfo(this.reportUrl);
      });
  }

  _getImages() {
    let images = [];

    $('svg.printable-chart').each((index, svg) => {
      let svgXml = (new XMLSerializer).serializeToString(svg);
      canvg('canvas', svgXml);
      let canvas = document.getElementById('canvas');

      images.push({
        nombre: $(svg).attr('id'),
        image: canvas.toDataURL()
      });
    });

    return (images);
  }

  render() {
    var descarga = require('file!images-banca/descarga.svg');
    return (
      <div style={{margin: '0px', cursor: 'pointer', textAlign: 'right', paddingRight: '15px'}} onClick={this._downloadReport.bind(this)}>
        <img height={'15px'} src={descarga} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { report: state.report };
}

export default connect(mapStateToProps, { setLoadingFrame })(DownloadPDFReport);
