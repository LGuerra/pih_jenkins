
/*
 * File that encapsulates general utilities
 * for encapsulating maps
 */

var lapiz_white = require('file!images-banca/user.svg');
// var lapiz_white = IMAGES.lapiz_white;

var MapUtils = {
  styles: [{
      "featureType": "administrative",
      "elementType": "all",
      "stylers": [{
        "saturation": 0
      }]
    }, {
      "featureType": "administrative.country",
      "elementType": "all",
      "stylers": [{
        "visibility": "simplified"
      }]
    }, {
      "featureType": "administrative.province",
      "elementType": "all",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "landscape",
      "elementType": "all",
      "stylers": [{
        "saturation": -10
      }]
    }, {
      "featureType": "poi",
      "elementType": "all",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [{
        "saturation": -10
      }, {
        "lightness": 30
      }, {
        "visibility": "simplified"
      }]
    }, {
      "featureType": "road",
      "elementType": "all",
      "stylers": [{
        "saturation": -100
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [{
        "saturation": 0
      }, {
        "hue": "#5EAB1F"
      }, {
        "lightness": 0
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "label",
      "stylers": [{
        "visibility": "simplified"
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#ffffff"
          }
      ]
    }, {
      "featureType": "road.arterial",
      "elementType": "all",
      "stylers": [{
        "saturation": -100
      }, {
        "lightness": 20
      }]
    }, {
      "featureType": "road.arterial",
      "elementType": "label",
      "stylers": [{
        "visibility": "on"
      }]
    }, {
      "featureType": "road.local",
      "elementType": "label",
      "stylers": [{
        "visibility": "on"
      }]
    }, {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
    },{
      "featureType": "transit",
      "elementType": "all",
      "stylers": [{
        "saturation": -100
      }]
    }, {
      "featureType": "water",
      "elementType": "all",
      "stylers": [{
        "hue": "#0089CF"
      }, {
        "saturation": -50
      }, {
        "lightness": 30
      }]
    }, {
      "featureType": "administrative.land_parcel",
      "elementType": "all",
      "stylers": [{
        "visibility": "off"
      }]
    },{
        "featureType": "landscape.natural.terrain",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }, {
      "featureType": "landscape.man_made",
      "elementType": "all",
      "stylers": [{
        "visibility": "off"
      }]
    }],

    ControlDiv: function(conf){
        var controlDiv =  conf.node;
        var left = conf.leftMargin || 22;
        var top = conf.topMargin || 10;
        var right = conf.rightMargin || 22;
        var bottom = conf.bottomMargin || 22;
        var height = conf.height || "30px";
        var width = conf.width || "64px";
        // Set CSS for the controls.
        controlDiv.style.margin = top + 'px '+ right + 'px ' + right + 'px ' + left + 'px';
        controlDiv.style.cursor = 'pointer';
        controlDiv.style.border = "1px solid #C7C7C7";
        controlDiv.style.backgroundColor = "#FFFFFF";
        controlDiv.style.borderRadius = '3px';
        controlDiv.style.height = height;
        controlDiv.style.width = width;
        return controlDiv;
    },
    DrawingTool: function(conf){
        var controlDiv = MapUtils.ControlDiv({
            node: conf.node,
            width: "140px",
            topMargin: 10,
            rightMargin: 10
        });
        var drawMessage = 'Dibujar polígono';
        var cancelMessage = 'Cancelar polígono';
        var drawTool = document.createElement('div');
        drawTool.title = "Click to create a polygon search";
        drawTool.style.display = "inline-block";
        drawTool.style.width = "100%";
        drawTool.style.height = "100%";
        controlDiv.appendChild(drawTool);
        controlDiv.style.border = "0px";
        var button = document.createElement("button");
        button.className = "blue-button button-drawpolygon";
        drawTool.appendChild(button);
        if(conf.removalListener !== null && document.getElementById(conf.removalListener) !== null){
            document.getElementById(conf.removalListener).addEventListener("click", function(){
                button.innerHTML = "<img width='13px' height='13px' src='" +lapiz_white+ "'></img> " + drawMessage;
                conf.removePolygon();
                conf.manager.setDrawingMode(null);
                conf.removePolygon();
            });
        }
        google.maps.event.addDomListener(button, 'click', function() {
            if(conf.getPolyState()){
                button.innerHTML = "<img width='13px' height='13px' src='" +lapiz_white+ "'></img> " + drawMessage;
                conf.removePolygon();
                conf.manager.setDrawingMode(null);
                conf.removePolygon();
            }else{
                if(conf.manager.drawingMode === null){
                    button.innerHTML = "<img width='13px' height='13px' src='" +lapiz_white+ "'></img> " + cancelMessage;
                    conf.manager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
                }else{
                    conf.setPolyState(true);
                    button.innerHTML = "<img width='13px' height='13px' src='" +lapiz_white+ "'></img> " + drawMessage;
                    conf.manager.setDrawingMode(null);
                }
            }

        });
    },
    CustomControl: function(conf){
        // Div with special specs
        var controlDiv = MapUtils.ControlDiv({
            node: conf.node,
            width: conf.width || "120px",
            height: conf.height || "30px"
        });
    },
    ZoomControl: function(div, map, top, marginRight) {
        // Get the control DIV. We'll attach our control UI to this DIV.
        var controlDiv = MapUtils.ControlDiv({
            node: div,
            rightMargin: 10 + marginRight,
            topMargin: 0 + top,
            height: "56px",
            width: "28px"
        });
        var zoomin = document.createElement('div');
        zoomin.title = 'Click to zoom in';
        zoomin.style.display = "inline-block";
        zoomin.style.borderBottom = "1px solid #C7C7C7";
        zoomin.style.width = '100%';
        zoomin.style.height = '50%';
        controlDiv.appendChild(zoomin);

        var zoominText = document.createElement('div');
        zoominText.innerHTML = '+';
        zoominText.style.fontSize = '25px';
        zoominText.style.textAlign = 'center';
        zoominText.style.color = "#5C5C5C";
        zoominText.style.position = 'absolute';
        zoominText.style.left = '6px';
        zoominText.style.top = '-2px';
        zoominText.style.height = '48%';
        zoominText.style.lineHeight = '29px';
        zoominText.style.webkitUserSelect   = 'none';
        zoominText.style.webkitTouchCallout = 'none';
        zoominText.style.khtmlUserSelect    = 'none';
        zoominText.style.mozUserSelect      = 'none';
        zoominText.style.msUserSelect       = 'none';
        zoominText.style.userSelect = 'none';
        zoomin.appendChild(zoominText);

        var zoomout = document.createElement('div');
        zoomout.title = 'Click to zoom out';
        zoomout.style.display = "inline-block";
        zoomout.style.width = '100%';
        zoomout.style.height = '50%';
        zoomout.style.marginTop = '-5px';
        controlDiv.appendChild(zoomout);

        var zoomoutText = document.createElement('div');
        zoomoutText.innerHTML = '-';
        zoomoutText.style.fontSize = '35px';
        zoomoutText.style.textAlign = 'center';
        zoomoutText.style.color = "#5C5C5C";
        zoomoutText.style.position = 'absolute';
        zoomoutText.style.left = '8px';
        zoomoutText.style.top = '49%';
        zoomoutText.style.height = '48%';
        zoomoutText.style.lineHeight = '25px';
        zoomoutText.style.webkitUserSelect   = 'none';
        zoomoutText.style.webkitTouchCallout = 'none';
        zoomoutText.style.khtmlUserSelect    = 'none';
        zoomoutText.style.mozUserSelect      = 'none';
        zoomoutText.style.msUserSelect       = 'none';
        zoomoutText.style.userSelect = 'none';
        zoomout.appendChild(zoomoutText);

        // Setup the click event listeners for zoom-in, zoom-out:
        google.maps.event.addDomListener(zoomout, 'click', function() {
        var currentZoomLevel = map.getZoom();
        if(currentZoomLevel !== 0){
            map.setZoom(currentZoomLevel - 1);}
        });

        google.maps.event.addDomListener(zoomin, 'click', function() {
        var currentZoomLevel = map.getZoom();
        if(currentZoomLevel != 21){
            map.setZoom(currentZoomLevel + 1);}
        });
    }
};

module.exports = MapUtils;
