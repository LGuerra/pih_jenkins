import React from 'react';
import d3 from 'd3';

function getDummyLineData(numLines, numRegisters) {
  var data = [];
  var line;
  var date;
  for (var i = 0; i < numLines; i++) {
    line = [];
    date = new Date();
    for (var j = 0; j < numRegisters; j++) {
      var newDate = new Date(date.setDate(date.getDate() + 1));
      line.push({
        value: j,
        xVariable: newDate
      });
    }
    data.push({
      label: 'line-' + i,
      data: line,
      color: '#1394BC'
    });
  }

  return (data);
}

class LineChart extends React.Component {
  constructor(props) {
    super(props);
  }
  _getMinMaxY() {
    var data = this.conf.data;
    var upperLimit = 0;
    var lowerLimit = 0;

    var actualUpper = 0;
    var actualLower = 0;

    data.forEach(function(element, index) {
      actualUpper = d3.max(element.data, function(d) {
        return (d.value);
      });
      if (actualUpper > upperLimit) {
        upperLimit = actualUpper;
      }
      actualLower = d3.min(element.data, function(d) {
        return (d.value);
      });
      if (actualLower > lowerLimit) {
        lowerLimit = actualLower;
      }
    });

    return ([lowerLimit, upperLimit]);
  }
  _setupLineGen() {
    var _this = this;
    var lineGen = d3.svg.line()
      .x(function(d) {
        return _this.conf.xScale(d.xVariable);
      })
      .y(function(d) {
        return _this.conf.yScale(d.value);
      })
      .interpolate('monotone');

    return (lineGen);
  }
  _initChart() {
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
    this._appendLines();
  }
  _appendAxis() {
    var props = this.props;
    var minMaxY = this._getMinMaxY();

    var horizontalLowerLimit = d3.min(this.conf.data[0].data, function(d) {
      return d.xVariable;
    });

    var horizontalUpperLimit = d3.max(this.conf.data[0].data, function(d) {
      return d.xVariable;
    });

    //Set scales
    this.conf.xScale = d3.scale.linear()
      .domain([horizontalLowerLimit, horizontalUpperLimit])
      .range([0, this.conf.width - props.margin.left - props.margin.right], 0.2);

    this.conf.yScale = d3.scale.linear()
      .domain([0, minMaxY[1]])
      .range([this.conf.height - props.margin.top, props.margin.bottom]);

    //Define axis configuration
    this.conf.xAxis = d3.svg.axis()
      .scale(this.conf.xScale)
      .tickFormat(function(d, i) {
        return (i);
      })
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
  _appendLines() {
    var _this = this;
    this.conf.lineGen = this._setupLineGen();
    this.conf.lineContent = this.conf.gContent
      .append('g');

    this.conf.markerContainer = this.conf.gContent
      .append('g')
      .attr('id', 'marker-content');

    this.conf.focus = this.conf.markerContainer.append('g')
      .style('display', 'none');

    //Get data for rect mouseover
    var arrayRects = [];
    var rectData = {};
    for (var i = 0; i < this.conf.data[0].data.length; i++) {
      this.conf.data.forEach((line, indexLine) => {
        rectData['data' + indexLine] = {
          color: line.color,
          label: line.label,
          value: line.data[i]
        };
      });
      arrayRects.push(rectData);
      rectData = {};

    }

    _this.conf.data.forEach((line, indexLine) => {
      _this.conf.focus.append('circle')
        .attr('class', 'y' + indexLine + ' ball')
        .style('fill', '#FFF')
        .style('stroke', line.color)
        .attr('r', 3);
    });

    var totalPoints = i;
    this.conf.markerContainer
      .selectAll('rect.rect-mouseover')
      .data(arrayRects)
      .enter()
      .append('rect')
      .attr('class', 'rect-mouseover')
      .attr('height', this.conf.height - 25)
      .attr('width', (d, i) => {
        var width = _this.conf.width - _this.props.margin.left - _this.props.margin.right;
        width = width / totalPoints;
        return (width);
      })
      .attr('x', (d, i) => {
        return (_this.conf.xScale(d.data0.value.xVariable));
      })
      .style('fill', 'none')
      .style('pointer-events', 'all')
      .on('mouseover', function(d,i) {
        _this.conf.tooltip
          .style('display', 'inline')
          .style('opacity', 0.9)
          .html(_this.props.tooltipFormat(d, i));

        var tooltipWidth = _this.conf.tooltip[0][0].offsetWidth;
        var tooltipHeigth = _this.conf.tooltip[0][0].offsetHeight;

        var posx = (d3.mouse(this)[0] > ((_this.conf.width) / 2))
          ? d3.event.pageX - tooltipWidth - 10
          : d3.event.pageX + 10;

        var posy = (d3.mouse(this)[1] > ((_this.conf.height) / 2))
          ? d3.event.pageY - tooltipHeigth - 10
          : d3.event.pageY + 10;

        _this.conf.tooltip
          .style('left', (posx) + 'px')
          .style('top',  (posy) + 'px');

        _this.conf.focus.style('display', null);
        _this.conf.focus.selectAll('circle')
          .style('display', 'none');

        for (i = 0; i < _this.conf.data.length; i++) {
          _this.conf.focus.select('circle.y' + i)
            .style('display', 'inline')
            .attr('transform', () => {
              return ('translate(' + ((_this.conf.xScale(d['data' + i].value.xVariable))) + ',' + _this.conf.yScale(d['data' + i].value.value) + ')');
            });
        }
      })
      .on('mouseout', function(d, i) {
        _this.conf.tooltip
          .style('display', 'none');

        _this.conf.focus
          .style('display', 'none');
      });

    this.conf.lines = this.conf.lineContent
      .selectAll('path')
      .data(this.conf.data)
      .enter()
      .append('path')
      .attr('shape-rendering', 'geometricPrecision')
      .attr('id', (d, i) => {
        var id = d.label.replace(/[%/,.+<>= ]+/g, '');
        return id;
      })
      .attr('stroke', (d, i) => {
        return d.color;
      })
      .attr('fill', (d, i) => {
        return 'none';
      })
      .style('opacity', 0.7)
      .attr('d', (d, i) => {
        return (_this.conf.lineGen(d.data));
      })
      .attr('clip-path', 'url(#clip)')
      .attr('class', function(d, i) {
        return ('line' + i + ' line');
      })
      .attr('stroke-width', 2);

    var totalLength = 0;

    this.conf.lines[0].forEach((element, index) => {
      var length = d3.select(element).node().getTotalLength();
      if (length >= totalLength) {
        totalLength = length;
      }
    });

    this.conf.lineContent.selectAll('path.line')
      .attr('stroke-dasharray', totalLength + ' ' + totalLength)
      .attr('stroke-dashoffset', totalLength)
      .transition()
      .duration(1000)
      .ease('linear')
      .attr('stroke-dashoffset', 0);
  }
  componentDidMount() {
    this._initChart();
  }
  render() {
    return (
      <div id={this.props.idContainer}>
      </div>
    );
  }
}

LineChart.defaultProps = {
  height: '300',
  margin: {
    left: 30,
    right: 10,
    top: 25,
    bottom: 25
  }
};

export default LineChart;
