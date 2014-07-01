famous-boxlayout
==========

Box-layout is a simple yet powerful layout view for famo.us to:

* Quickly add margins to a renderable (called insets)
* Link a renderable to an inset region (e.g. add a border surface)

Box-layout takes an insets argument as input and then creates a layout accordingly. 
Box-layout is intended to be very lightweight and will only create layout-contents and properties for which an inset was specified. For instance, if all insets would be set to 0, then box-layout would create one modifier, wrapped in a RenderNode, and that would be assigned to ```.middle```.

BoxLayout is modelled after the standard HeaderFooterLayout and should be very familiar to use.

![BoxLayout](BoxLayout.png)

### [View the demo here](https://rawgit.com/IjzerenHein/famous-boxlayout/master/examples/demo/index.html)

## Getting started

Install using bower:
	
	bower install famous-boxlayout
	
If necessary, add to the requirejs paths config:

```javascript
require.config({
    paths: {
        ...
        'famous-boxlayout': 'bower_components/famous-boxlayout/BoxLayout',
        ...
    }
});
```

Create a surface with 20px margins all around:

```javascript
var BoxLayout = require('famous-boxlayout');

var boxLayout = new BoxLayout({ insets: [20] });
this.add(boxLayout);
boxLayout.middle.add(new Surface());
```

Create a surface with a 20px right inset:

```javascript
var boxLayout = new BoxLayout({ insets: [0, 20, 0, 0] });
this.add(boxLayout);
boxLayout.middle.add(new Surface());
```

## Insets

The insets array is oriented in a clockwise manner: [top, right, bottom, left].
For convenience, the following shorthand notations can be used:

+ **insets: [25, 50, 75, 100]**
  - top inset is 25px
  - right inset is 50px
  - bottom inset is 75px
  - left inset is 100px
+ **insets: [25, 50]**
  - top and bottom inset are 25px
  - right and left inset are 50px
+ **insets: [25]**
  - all four insets are 25px

## Properties

Dependent on which insets are specified, properties are created to which renderables can be added.

|Property|Description|
|--------|-----------|
|```.topLeft```|Top-left area, only created when both **top- and left**-inset are specified.|
|```.top```|Top area, only created when **top-inset** is specified.|
|```.topRight```|Top-right area, only created when both **top- and right-inset** are specified.|
|```.left```|Left area, only created when **left-inset** is specified.|
|```.middle```|Middle content, **always created**.|
|```.right```|Right area, only created when **right-inset** is specified.|
|```.bottomLeft```|Bottom-left area, only created when both **bottom- and left-inset** are specified.|
|```.bottom```|Bottom area, only created when **bottom-inset** is specified.|
|```.bottomRight```|Bottom-right area, only created when both **bottom- and right-inset** are specified.|

Example:

```javascript
var boxLayout = new BoxLayout({ insets: [0, 20] });
this.add(boxLayout);
boxLayout.left.add(new Surface({properties: {backgroundColor: 'red'}}));
boxLayout.right.add(new Surface({properties: {backgroundColor: 'red'}}));

// The following line would throw an error because the top-inset is not set, and thus .top
// is not available.
boxLayout.top.add(new Surface({properties: {backgroundColor: 'red'}}));
```

## Contribute

Feel free to contribute to this project in any way. The easiest way to support this project is by giving it a star.

## Contact
- 	@IjzerenHein
- 	http://www.gloey.nl
- 	hrutjes@gmail.com

© 2014 - Hein Rutjes