/**
 * @file Highcharts plugin that shows the legend boxes (rects) bellow the yAxis area.
 * Usage: Set showRects: false in the yAxis options to disable.
 * Default: true
 *
 * @author Milton Mazzarri <milmazz@gmail.com>
 * @copyright Milton Mazzarri 2014
 * @version 0.2.2
 */
(function (H) {
  'use strict';

  /**
   * @function positionElements
   *
   * @param {Object} obj - Represents the chart container.
   * @param {Object} yAxisGroup - Container of the rects per y-Axis.
   */
  var positionElements = function (obj, yAxisGroup) {
    var chart = obj;
    var renderer = chart.renderer;
    var yAxis = chart.yAxis;
    var baselineOffset = 3; // Vertical offset from the baseline
    var itemMarginTop = 5;
    var rect = {
      width: 15,
      height: 3,
      radius: 0
    };

    yAxisGroup.add();

    H.each(yAxis, function (yAxis) {
      var opposite = (yAxis.opposite === undefined) ? false : yAxis.opposite;
      var showRects = (yAxis.options.showRects === undefined) ? [] : yAxis.options.showRects;
      var headerText = yAxis.options.headerText;
      var skipped = 0;
      var i;

      if (headerText && yAxis.visible) {
        rect.x = yAxis.left + yAxis.offset + (yAxis.options.headerTextX || 0);
        rect.x = (opposite) ? rect.x + yAxis.width : rect.x - rect.width;

        rect.y = yAxis.top + yAxis.height + (yAxis.options.headerTextY || 0);

        yAxis.yaxisHeaderText = renderer.label(headerText, rect.x, rect.y)
          .attr({
            zIndex: 8
          })
          .add(yAxisGroup);
      }

      if (showRects && yAxis.visible) {
        for (i = 0; i < showRects.length; i++) {
          rect.x = yAxis.left + yAxis.offset + (yAxis.options.showRectsX || 0);
          rect.x = (opposite) ? rect.x + yAxis.width : rect.x - rect.width;

          rect.y = yAxis.top + yAxis.height + baselineOffset + itemMarginTop * (i - skipped + 1) + (yAxis.options.showRectsY || 0);

          renderer.rect(rect.x,
              rect.y,
              rect.width,
              rect.height,
              rect.radius)
            .attr({
              fill: showRects[i],
              zIndex: 8
            })
            .add(yAxisGroup);
        }
      }
    });
  };

  H.wrap(H.Chart.prototype, 'init', function (proceed) {
    // jscs:disable safeContextKeyword
    var chart = this;
    // jscs:enable safeContextKeyword
    var group, series, events;

    // Run the original proceed method
    proceed.apply(chart, Array.prototype.slice.call(arguments, 1));

    group = chart.renderer.g('yaxis-group');
    series = chart.series;
    events = {
      'endResize': chart,
      'hide': series,
      'show': series,
      'redraw': chart
    };

    function redraw() {
      removeEvents();
      group.destroy(); // Destroy the container and free up memory
      chart.yaxisGroup = group = chart.renderer.g('yaxis-group');
      positionElements(chart, group);
      addEvents();
    }

    function addEvents() {
      for (var ev in events) {
        if (events.hasOwnProperty(ev)) {
          H.addEvent(events[ev], ev, redraw);
        }
      }
    }

    function removeEvents() {
      for (var ev in events) {
        if (events.hasOwnProperty(ev)) {
          H.removeEvent(events[ev], ev, redraw);
        }
      }
    }

    redraw();
  });
}(Highcharts));
