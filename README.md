# Overview

This plugin enables extra display options for y-axes.

# Boxes

The plugin can show a small colored box for each series on that axis. Boxes to display are controlled using the
`showRects` option on the axis.

### Series Boxes
To show a box for each Highcharts series on the given axis, set `showRects: true` in the options passed to the axis.

### Manually Controlled Boxes
To show a set of colored boxes controlled manually outside of highcharts, set `showRects` to an array of colors to display.

## Adjust X/Y Location
By default, the boxes are drawn just below the bottom of the y-axis. To adjust this location, set the `showRectsX` and
`showRectsY` options with offsets from the default position.

## Stack Up
By default, boxes are drawn stacked vertically, with each successive box drawn below the previous box. You can reverse
this behavior by setting `showRectsStackUp: true`.

# Axis Header Text

The plugin can show configurable text for an axis. The most common usage of this might be to show the units
associated with the values on that axis. To enable, set `headerText: 'txt'` in the options passed to the axis.

## Adjust Location

By default, the header text is drawn just below the bottom of the y-axis. To adjust this location, set the
`headerTextX` and `headerTextY` options with offsets from the default position.

## Color

By default, the header text is drawn in black. To specify a different color for drawing the header text, set 
`headerTextColor` to a valid color.
