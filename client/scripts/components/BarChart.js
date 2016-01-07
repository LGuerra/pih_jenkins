import d3 from 'd3';
import React from 'react';
import _ from 'lodash';

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

    this.conf.tooltip = d3.select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('display', 'none');

    this.conf.svgContainer = d3.select('#' + this.props.idContainer)
      .append('svg')
      .attr('height', this.conf.height)
      .attr('width', this.conf.width);

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
      .rangeRoundBands([0, this.conf.width - props.margin.left - props.margin.right], 0.2);

    this.conf.yScale = d3.scale.linear()
      .domain([0, minMaxY[1]])
      .range([this.conf.height - props.margin.top, props.margin.bottom]);

    //Define axis configuration
    this.conf.xAxis = d3.svg.axis()
      .scale(this.conf.xScale)
      .ticks(10)
      .orient('bottom');

    this.conf.yAxis = d3.svg.axis()
      .scale(this.conf.yScale)
      .ticks(5)
      .orient('left');

    //Append graphic container
    this.conf.gContent = this.conf.svgContainer
      .append('g')
      .attr('id', 'g-content')
      .attr('transform', 'translate(' + (props.margin.left) + ', -10)');

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
      .attr('stroke', '#000')
      .style('shape-rendering', 'crispEdges');

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
      .attr('y',(d) => {
        return _this.conf.yScale(0);
      })
      .style('cursor', 'pointer')
      .attr('height', 0)
      .on('mouseover', function(d, i) {
        _this.conf.tooltip
          .style('display', 'inline')
          .style('opacity', 0.9)
          .html(_this.props.tooltipFormat(d, i));

        let tooltipWidth = _this.conf.tooltip[0][0].offsetWidth;
        let tooltipHeigth = _this.conf.tooltip[0][0].offsetHeight;

        let posx = (d3.mouse(this)[0] > ((_this.conf.width) / 2))
          ? d3.event.pageX - tooltipWidth - 10
          : d3.event.pageX + 10;

        let posy = (d3.mouse(this)[1] > ((_this.conf.height) / 2))
          ? d3.event.pageY - tooltipHeigth - 10
          : d3.event.pageY + 10;

        _this.conf.tooltip
          .style('left', (posx) + 'px')
          .style('top',  (posy) + 'px');

        d3.select(this)
          .transition()
          .duration(400)
          .attr('fill', _this.props.hoverColor);
      })
      .on('mouseout', function(d, i) {
        _this.conf.tooltip
          .style('display', 'none');

        d3.select(this)
          .transition()
          .duration(400)
          .attr('fill', _this.props.color);
      });

    this.conf.bars
      .transition()
      .duration(1000)
      .attr('y',(d) => {
        return _this.conf.yScale(d.value);
      })
      .attr('height',(d) => {
        return (_this.conf.height - _this.conf.yScale(d.value) - _this.props.margin.bottom);
      });
  }
  componentDidMount () {
    this._initChart();
  }
  render () {
    return (
      <div id={this.props.idContainer}>
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
