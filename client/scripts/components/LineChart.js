import React from 'react';
import d3 from 'd3';
import moment from 'moment';

const months = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Diciembre'
];

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

    this.conf.svgContainer = d3.select('#' + this.props.idContainer)
      .append('svg')
      .attr('height', this.conf.height)
      .attr('width', this.conf.width);

    this.conf.tooltip = d3.select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('display', 'none');

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
        var m = moment(d);
        var date = months[m.month()] + ' ' + m.date();
        return (date);
      })
      .ticks(Math.floor(this.conf.width / 120))
      .orient('bottom');

    this.conf.yAxis = d3.svg.axis()
      .scale(this.conf.yScale)
      .innerTickSize(-(this.conf.width - this.props.margin.right - this.props.margin.left))
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
      .attr('stroke', '#B5B5B5')
      .style('shape-rendering', 'crispEdges');

    this.conf.gContent.selectAll('.axis')
      .selectAll('text')
      .attr('fill', '#828282')
      .style('font', '10px sans-serif');

    if (!props.showAxis.x.line) {
      this.conf.gContent.selectAll('.axis.x')
        .selectAll('path')
        .style('display', 'none');
    }

    if (!props.showAxis.y.line) {
      this.conf.gContent.selectAll('.axis.y')
        .selectAll('path')
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

    this.conf.totalPoints = i;
    this.conf.rectMouseover = this.conf.markerContainer
      .selectAll('rect.rect-mouseover')
      .data(arrayRects)
      .enter()
      .append('rect')
      .attr('class', 'rect-mouseover')
      .attr('height', this.conf.height - 25)
      .attr('width', (d, i) => {
        var width = _this.conf.width - _this.props.margin.left - _this.props.margin.right;
        width = width / this.conf.totalPoints;
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
          .style('opacity', 0);

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
  }
  _updateDimensions () {
    var props = this.props;
    this.conf.width = this.props.width || $('#' + this.props.idContainer).outerWidth();

    this.conf.svgContainer
      .attr('width', this.conf.width);

    //Set scales
    this.conf.xScale
      .range([0, this.conf.width - props.margin.left - props.margin.right], 0.2);

    this.conf.xAxis
      .ticks(Math.floor(this.conf.width / 120))
      .scale(this.conf.xScale)

    this.conf.gContent.selectAll('.axis.y')
      .selectAll('.tick')
      .selectAll('line')
      .attr('x2', this.conf.width - props.margin.left - props.margin.right);

    this.conf.yAxis
      .tickSize(0, (this.conf.width - props.margin.right - props.margin.left));

    //Append axis to graphic content
    this.conf.xaxisLine
      .call(this.conf.xAxis);

    this.conf.gContent.selectAll('.axis')
      .selectAll('path, line')
      .attr('fill', 'none')
      .attr('stroke', '#000')
      .style('shape-rendering', 'crispEdges');

    this.conf.gContent.selectAll('.axis')
      .selectAll('text')
      .style('font', '10px sans-serif');

    this.conf.lineGen = this._setupLineGen();

    this.conf.lines
      .attr('d', (d, i) => {
        return (this.conf.lineGen(d.data));
      });

    this.conf.rectMouseover
      .attr('width', (d, i) => {
        var width = this.conf.width - this.props.margin.left - this.props.margin.right;
        width = width / this.conf.totalPoints;
        return (width);
      })
      .attr('x', (d, i) => {
        return (this.conf.xScale(d.data0.value.xVariable));
      });

    this.conf.gContent.selectAll('.axis')
      .selectAll('path, line')
      .attr('fill', 'none')
      .attr('stroke', '#B5B5B5')
      .style('shape-rendering', 'crispEdges');

    this.conf.gContent.selectAll('.axis')
      .selectAll('text')
      .attr('fill', '#828282')
      .style('font', '10px sans-serif');
  }
  componentDidMount() {
    window.addEventListener('resize', this._updateDimensions.bind(this));
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
    right: 25,
    top: 25,
    bottom: 25
  }
};

export default LineChart;
