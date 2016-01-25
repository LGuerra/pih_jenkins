import React from 'react';
import d3 from 'd3';
import random from 'lodash/number/random';

function getDummyStackedData(numGroups, numBarsByGroup) {
  var data = new Array();
  var group = {};
  for (var i = 0; i < numGroups; i++) {
    group.label = 'group-' + i;
    group.bars = [];
    for (var j = 0; j < numBarsByGroup; j++) {
      group.bars.push({
        label: 'bar-' + j,
        value: random(0, 100),
        color: '#1394BC',
        hoverColor: '#848484'
      });
    }
    data.push(group);
    group = {};
  }

  return (data);
}

class StackedBarChart extends React.Component {
  constructor(props) {
    super(props);
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
      .attr('id', props.id)
      .attr('class', props.svgClass)
      .attr('height', this.conf.height)
      .attr('width', this.conf.width);

    this._appendAxis();
    this._appendBars();
  }
  _appendAxis() {
    var props = this.props;

    //Set scales
    this.conf.xScale = d3.scale.ordinal()
      .domain(props.data.map(function(el) {
        return (el.label);
      }))
      .rangeRoundBands([this.conf.height, props.margin.bottom], 0.80);

    this.conf.yScale = d3.scale.linear()
      .domain([0, 100])
      .range([0, this.conf.width - props.margin.left - props.margin.right - 20]);

    //Define axis configuration
    this.conf.xAxis = d3.svg.axis()
      .scale(this.conf.xScale)
      .ticks(10)
      .orient('left');

    this.conf.yAxis = d3.svg.axis()
      .scale(this.conf.yScale)
      .ticks(3)
      .tickFormat(function(d) {
        return (d + '%');
      })
      .orient('top');

    //Append graphic container
    this.conf.gContent = this.conf.svgContainer
      .append('g')
      .attr('id', 'g-content')
      .attr('transform', 'translate(' + (props.margin.left + 25) + ', -10)');

    //Append axis to graphic content
    this.conf.xaxisLine = this.conf.gContent.append('g')
      .attr('class', 'x axis')
      .call(this.conf.xAxis);

    this.conf.yaxisLine = this.conf.gContent.append('g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(0,' + (props.margin.bottom + 20) + ')')
      .call(this.conf.yAxis);

    this.conf.gContent.selectAll('.axis')
      .selectAll('path, line')
      .attr('fill', 'none')
      .attr('stroke', '#B5B5B5')
      .style('shape-rendering', 'crispEdges');

    this.conf.gContent.selectAll('.axis')
      .selectAll('text')
      .attr('fill', '#828282')

    this.conf.gContent.selectAll('.axis.x')
      .selectAll('path, line')
      .style('display', 'none');

    this.conf.gContent.selectAll('.axis')
      .selectAll('text')
      .style('font', '10px sans-serif');
  }
  _appendBars() {
    var _this = this;
    var totals = {};
    var acumValue = {};
    var totalOpacity = {};

    this.conf.groups = this.conf.gContent
      .selectAll('g.group')
      .data(this.conf.data)
      .enter()
      .append('g')
      .attr('class', 'group')
      .attr('id', function(d, index) {
        return 'group-' + d.label.replace(' ', '');
      });

    this.conf.data.forEach(function(group, indexGroup) {
      var i = 0;
      group.bars.forEach(function(bar, indexBar) {
        i += bar.value;
      });
      totals[group.label] = i;
      acumValue[group.label] = 0;
      totalOpacity[group.label] = 1;
    });

    this.conf.groups
      .on('mouseover', function(d, i) {
        let data = d;
        let isOneSmaller = false;

        data.bars.forEach((element, index) => {
          if ((element.value * 100) / totals[element.group] < 7) {
            isOneSmaller = true;
          }
        });

        d3.select(this)
          .selectAll('text.value')
          .transition()
          .duration(300)
          .style('opacity', 1);

        d3.select(this)
          .selectAll('rect')
          .transition()
          .duration(300)
          .attr('fill', function(d, i) {
            return (d.hoverColor);
          });
      })
      .on('mouseout', function(d, i) {
        d3.select(this)
          .selectAll('text.value')
          .transition()
          .duration(300)
          .style('opacity', 0);

        d3.select(this)
          .selectAll('text.title')
          .transition()
          .duration(300)
          .style('opacity', (d, i) => {
              if ((d.value * 100) / totals[d.group] < 7) {
                return (0);
              } else {
                return (1);
              }
          });

        d3.select(this)
          .selectAll('rect')
          .transition()
          .duration(300)
          .attr('fill', function(d, i) {
            return (d.color);
          });
      });


    this.conf.bars = this.conf.groups
      .selectAll('rect')
      .data(function(d) {
        var data = d.bars.forEach(function(element, index) {
          element.group = d.label;
        });

        return (d.bars);
      })
      .enter()
      .append('rect')
      .attr('y', function(d) {
        return _this.conf.xScale(d.group);
      })
      .attr('x', function(d) {
        var xPos = _this.conf.yScale(acumValue[d.group]);
        acumValue[d.group] += (d.value * 100) / totals[d.group];
        return (xPos);
      })
      .attr('height', _this.conf.xScale.rangeBand())
      .attr('width', function(d, i) {
        return _this.conf.yScale((d.value * 100) / totals[d.group]);
      })
      .attr('fill', function(d, i) {
        return (d.color);
      })
      .style('cursor', 'pointer')
      .style('opacity', function(d, i) {
        return ((1 / _this.conf.data[0].bars.length) * (i + 1));
      })
      .on('mouseover', function(d, i) {
        let actualData = d;
        d3.select(this.parentNode)
          .selectAll('text.title')
          .transition()
          .duration(300)
          .style('opacity', (d, i) => {
            if ((actualData.value * 100) / totals[actualData.group] < 7) {
              if (d.label === actualData.label) {
                return (1);
              } else {
                return (0);
              }
            } else {
              if ((d.value * 100) / totals[d.group] < 7) {
                return (0);
              } else {
                return (1);
              }
            }
          });
      });

    this._appendValues();
  }
  _appendValues() {
    var _this = this;
    var totals = {};
    var acumValue = {};
    var totalOpacity = {};

    this.conf.data.forEach(function(group, indexGroup) {
      var i = 0;
      group.bars.forEach(function(bar, indexBar) {
        i += bar.value;
      });
      totals[group.label] = i;
      acumValue[group.label] = 0;
      totalOpacity[group.label] = 1;
    });

    this.conf.values = this.conf.groups
      .selectAll('text.value')
      .data(function(d) {
        var data = d.bars.forEach(function(element, index) {
          element.group = d.label;
        });

        return (d.bars);
      })
      .enter()
      .append('text')
      .attr('class', 'value')
      .style('font-size', '11px')
      .style('fill', '#353535')
      .style('cursor', 'pointer')
      .text(function(d, i) {
        return (((d.value * 100) / totals[d.group]).toFixed(0) + '%');
      })
      .attr('text-anchor', 'middle')
      .style('opacity', 0)
      .attr('y', function(d) {
        return (_this.conf.xScale(d.group) - 3);
      })
      .attr('x', function(d) {
        var xPos = acumValue[d.group] + (_this.conf.yScale((d.value * 100) / totals[d.group]) / 2);
        acumValue[d.group] += _this.conf.yScale((d.value * 100) / totals[d.group]);
        return (xPos);
      });

    totals = {};
    acumValue = {};
    totalOpacity = {};

    this.conf.data.forEach(function(group, indexGroup) {
      var i = 0;
      group.bars.forEach(function(bar, indexBar) {
        i += bar.value;
      });
      totals[group.label] = i;
      acumValue[group.label] = 0;
      totalOpacity[group.label] = 1;
    });

    this.conf.titles = this.conf.groups
      .selectAll('text.title')
      .data(function(d) {
        var data = d.bars.forEach(function(element, index) {
          element.group = d.label;
        });

        return (d.bars);
      })
      .enter()
      .append('text')
      .attr('class', 'title')
      .style('font-size', '11px')
      .style('fill', '#5C5C5C')
      .text(function(d, i) {
        return (d.label);
      })
      .attr('text-anchor', 'middle')
      .attr('y', function(d) {
        return (_this.conf.xScale(d.group) + 23);
      })
      .style('opacity', (d, i) => {
        if ((d.value * 100) / totals[d.group] < 7) {
          return (0);
        } else {
          return (1);
        }
      })
      .attr('x', function(d) {
        var xPos = acumValue[d.group] + (_this.conf.yScale((d.value * 100) / totals[d.group]) / 2);
        acumValue[d.group] += _this.conf.yScale((d.value * 100) / totals[d.group]);
        return (xPos);
      });
  }
  _updateDimensions () {
    var props = this.props;
    var totals = {};
    var acumValue = {};
    var totalOpacity = {};
    this.conf.data.forEach(function(group, indexGroup) {
      var i = 0;
      group.bars.forEach(function(bar, indexBar) {
        i += bar.value;
      });
      totals[group.label] = i;
      acumValue[group.label] = 0;
      totalOpacity[group.label] = 1;
    });

    this.conf.width = this.props.width || $('#' + this.props.idContainer).outerWidth();

    this.conf.svgContainer
      .attr('width', this.conf.width);

    //Set scales
    this.conf.yScale
      .range([0, this.conf.width - props.margin.left - props.margin.right - 20]);


    this.conf.yAxis
      .tickFormat(function(d) {
        return (d + '%');
      })
      .scale(this.conf.yScale)

    //Append axis to graphic content
    this.conf.yaxisLine
      .call(this.conf.yAxis);

    this.conf.gContent.selectAll('.axis')
      .selectAll('path, line')
      .attr('fill', 'none')
      .attr('stroke', '#B5B5B5')
      .style('shape-rendering', 'crispEdges');

    this.conf.gContent.selectAll('.axis')
      .selectAll('text')
      .attr('fill', '#828282')

    this.conf.gContent.selectAll('.axis.x')
      .selectAll('path, line')
      .style('display', 'none');

    this.conf.gContent.selectAll('.axis')
      .selectAll('text')
      .style('font', '10px sans-serif');

    this.conf.bars
      .attr('width', (d, i) => {
        return (this.conf.yScale((d.value * 100) / totals[d.group]));
      })
      .attr('x', (d) => {
        var xPos = this.conf.yScale(acumValue[d.group]);
        acumValue[d.group] += (d.value * 100) / totals[d.group];
        return (xPos);
      });

    for (let key in acumValue) {
      acumValue[key] = 0;
    }

    this.conf.values
      .attr('x', (d) => {
        var xPos = acumValue[d.group] + (this.conf.yScale((d.value * 100) / totals[d.group]) / 2);
        acumValue[d.group] += this.conf.yScale((d.value * 100) / totals[d.group]);
        return (xPos);
      });

    for (let key in acumValue) {
      acumValue[key] = 0;
    }

    this.conf.titles
      .attr('x', (d) => {
        var xPos = acumValue[d.group] + (this.conf.yScale((d.value * 100) / totals[d.group]) / 2);
        acumValue[d.group] += this.conf.yScale((d.value * 100) / totals[d.group]);
        return (xPos);
      });
  }
  componentDidMount() {
    window.addEventListener('resize', this._updateDimensions.bind(this));
    this._initChart();
  }
  render() {
    return (
      <div id={this.props.idContainer}>
        <h4>{this.props.title}</h4>
      </div>
    );
  }
}

StackedBarChart.defaultProps = {
  height: '300',
  margin: {
    left: 30,
    right: 35,
    top: 25,
    bottom: 25
  }
};

export default StackedBarChart;
