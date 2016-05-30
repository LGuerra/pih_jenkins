import d3 from 'd3';
import React from 'react';

import { toPercentage } from '../helpers';

class BarChart extends React.Component {
  constructor(props) {
    super(props);
  }
  _getMinMaxY () {
    var data = this.conf.data;
    var upperLimit = d3.max(data, function(element) {
      return (element.value);
    });

    var lowerLimit = d3.min(data, function(element) {
      return (element.value);
    });

    return [lowerLimit, upperLimit];
  }
  _initChart () {
    var props = this.props;
    this.conf = {
      data: props.data,
      height: props.height,
      width: props.width || $('#' + props.idContainer).outerWidth()
    };

    this.conf.tooltip = d3.select('#' + this.props.idContainer)
      .append('div')
      .attr('class', 'tooltip')
      .style('display', 'none');

    this.conf.svgContainer = d3.select('#' + this.props.idContainer)
      .append('svg')
      .attr('id', props.id)
      .attr('class', props.svgClass)
      .attr('height', this.conf.height)
      .attr('width', this.conf.width);

    if (props.xTitleUnit) {
      this.conf.xTitleUnit = this.conf.svgContainer.append('text')
        .attr('y', this.conf.height - 5)
        .attr('x', (this.conf.width / 2))
        .style('fill', 'rgb(130, 130, 130)')
        .style('font-size', '12px')
        .style('text-anchor', 'middle')
        .style('font', '10px sans-serif')
        .text(props.xTitleUnit);
    }
    this._appendAxis();
    this._appendBars();
  }
  _appendAxis () {
    var props = this.props;
    var minMaxY = this._getMinMaxY();

    //Set scales
    this.conf.xScale = d3.scale.ordinal()
      .domain(props.data.map((el) => {
        return (el.label);
      }))
      .rangeRoundBands([0, this.conf.width - props.margin.left - props.margin.right], 0.4);

    this.conf.yScale = d3.scale.linear()
      .domain([(minMaxY[0] - minMaxY[0] * 0.1), (minMaxY[1] + (minMaxY[1] * 0.1))])
      .range([this.conf.height - props.margin.bottom, props.margin.top]);

    //Define axis configuration
    this.conf.xAxis = d3.svg.axis()
      .scale(this.conf.xScale)
      .ticks(1)
      .tickFormat(function(d) {
        return (d + ' mil');
      })
      .orient('bottom');

    this.conf.yAxis = d3.svg.axis()
      .scale(this.conf.yScale)
      .tickFormat(function(d) {
        return toPercentage(d);
      })
      .ticks(7)
      .orient('left');

    //Append graphic container
    this.conf.gContent = this.conf.svgContainer
      .append('g')
      .attr('id', 'g-content')
      .attr('transform', 'translate(' + (props.margin.left) + ', 0)');

    //Append axis to graphic content
    this.conf.xaxisLine = this.conf.gContent.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + (this.conf.height - props.margin.bottom) + ')')
      .call(this.conf.xAxis);

    this.conf.yaxisLine = this.conf.gContent.append('g')
      .attr('class', 'y axis')
      .call(this.conf.yAxis);

    this.conf.gContent.selectAll('.axis')
      .selectAll('path, line')
      .attr('fill', 'none')
      .attr('stroke', '#B5B5B5')
      .style('shape-rendering', 'crispEdges');

    if (!props.showAxis.x.line) {
      this.conf.gContent.selectAll('.axis.x')
        .selectAll('path, line')
        .style('display', 'none');
    }

    if (!props.showAxis.y.line) {
      this.conf.gContent.selectAll('.axis.y')
        .selectAll('path, line')
        .style('display', 'none');
    }

    if (!props.showAxis.x.ticks) {
      this.conf.gContent.selectAll('.axis.x')
        .selectAll('text')
        .style('display', 'none');
    }

    if (!props.showAxis.y.ticks) {
      this.conf.gContent.selectAll('.axis.y')
        .selectAll('text')
        .style('display', 'none');
    }

    this.conf.gContent.selectAll('.axis')
      .selectAll('text')
      .attr('fill', '#828282')


    this.conf.gContent.selectAll('.axis')
      .selectAll('text')
      .style('font', '10px sans-serif');
  }
  _appendBars () {
    var _this = this;

    this.conf.bars = this.conf.gContent
      .selectAll('rect')
      .data(this.conf.data)
      .enter()
      .append('rect')
      .attr('class', 'barchart-bar')
      .attr('id',(d, index) => {
        return 'bar-' + index;
      })
      .attr('x',(d) => {
        return _this.conf.xScale(d.label);
      })
      .attr('width', _this.conf.xScale.rangeBand())
      .attr('fill',(d) => {
        return (_this.props.color);
      })
      .style('cursor', 'pointer')
      .attr('y',(d) => {
        return (_this.conf.yScale(d.value));
      })
      .attr('height',(d) => {
        return (_this.conf.height - _this.conf.yScale(d.value) - _this.props.margin.bottom);
      })
      .on('mouseover', function(d, i) {
        _this.conf.tooltip
          .style('display', 'inline')
          .style('opacity', 0.9)
          .html(_this.props.tooltipFormat(d, i));

        let tooltipWidth = _this.conf.tooltip[0][0].offsetWidth;
        let tooltipHeigth = _this.conf.tooltip[0][0].offsetHeight;

        let posx = (_this.conf.xScale(d.label) + _this.props.margin.left) - (tooltipWidth / 2) + (_this.conf.xScale.rangeBand() / 2);
        let posy = _this.props.margin.top - tooltipHeigth;
        _this.conf.tooltip
          .style('left', (posx) + 'px')
          .style('top',  (posy) + 'px');

        _this.conf.gContent.append('line')
          .attr('x1', (_this.conf.xScale(d.label)) + (_this.conf.xScale.rangeBand() / 2))
          .attr('y1', _this.props.margin.top)
          .attr('x2', (_this.conf.xScale(d.label)) + (_this.conf.xScale.rangeBand() / 2))
          .attr('y2', _this.props.margin.top)
          .attr('class', 'mark-line')
          .style('stroke', '#c3c3c3')
          .style('fill', 'none')
          .style('stroke-width', 2)
          .style('stroke-dasharray', ('3, 3'))
          .style('opacity', 0)
          .transition()
          .duration(375)
          .ease('linear')
          .style('opacity', 1)
          .attr('y2', _this.conf.yScale(d.value));


        d3.select(this)
          .transition()
          .duration(400)
          .attr('fill', _this.props.hoverColor);
      })
      .on('mouseout', function(d, i) {
        _this.conf.tooltip
          .style('display', 'none');

        _this.conf.gContent
          .selectAll('.mark-line')
          .remove();

        d3.select(this)
          .transition()
          .duration(400)
          .attr('fill', _this.props.color);
      });
  }
  _updateDimensions () {
    var props = this.props;
    this.conf.width = this.props.width || $('#' + this.props.idContainer).outerWidth();

    this.conf.svgContainer
      .attr('width', this.conf.width);


    //Set scales
    this.conf.xScale
      .rangeRoundBands([0, this.conf.width - props.margin.left - props.margin.right], 0.4);

    this.conf.xAxis
      .scale(this.conf.xScale)

    //Append axis to graphic content
    this.conf.xaxisLine
      .call(this.conf.xAxis);

    this.conf.gContent.selectAll('.axis')
      .selectAll('path, line')
      .attr('fill', 'none')
      .attr('stroke', '#B5B5B5')
      .style('shape-rendering', 'crispEdges');

    this.conf.gContent.selectAll('.axis')
      .selectAll('text')
      .style('font', '10px sans-serif');

    this.conf.bars
      .attr('x',(d) => {
        return (this.conf.xScale(d.label));
      })
      .attr('width', this.conf.xScale.rangeBand());


    this.conf.xTitleUnit
      .attr('x', (this.conf.width / 2));
  }
  componentDidMount () {
    window.addEventListener('resize', this._updateDimensions.bind(this));
    this._initChart();
  }
  render () {
    return (
      <div style={{position: 'relative'}} id={this.props.idContainer}>
      </div>
    );
  }
}

BarChart.defaultProps = {
  height: '300',
  margin: {
    left: 30,
    right: 35,
    top: 25,
    bottom: 25
  }
}

export default BarChart;
