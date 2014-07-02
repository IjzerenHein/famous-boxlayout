/* 
 * Copyright (c) 2014 Gloey Apps
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 * @author: Hein Rutjes (IjzerenHein)
 * @license MIT
 * @copyright Gloey Apps, 2014
 */

/*jslint browser:true, nomen:true, vars:true, plusplus:true*/
/*global define*/

/**
 * @module
 */
define(function (require, exports, module) {
    'use strict';

    // import dependencies
    var RenderNode = require('famous/core/RenderNode');
    var Modifier = require('famous/core/Modifier');
    var View = require('famous/core/View');
    var FlexibleLayout = require('famous/views/FlexibleLayout');
    
    /**
     * @class
     * @extends View
     * @param {Object} [options] Configuration options
     */
    function BoxLayout(options) {
        View.apply(this, arguments);
        
        // normalize margins
        if (this.options.margins.length === 0) {
            this.margins = [0, 0, 0, 0];
        } else if (this.options.margins.length === 1) {
            this.margins = [
                this.options.margins[0],
                this.options.margins[0],
                this.options.margins[0],
                this.options.margins[0]
            ];
        } else if (this.options.margins.length === 2) {
            this.margins = [
                this.options.margins[0],
                this.options.margins[1],
                this.options.margins[0],
                this.options.margins[1]
            ];
        } else {
            this.margins = this.options.margins;
        }
        
        // create layout
        this.add(this._createLayout());
    }
    BoxLayout.prototype = Object.create(View.prototype);
    BoxLayout.prototype.constructor = BoxLayout;

    BoxLayout.DEFAULT_OPTIONS = {
        margins: [] // top, right, bottom, left (clockwise)
    };
    
            
    /**
     * Creates and returns the top-level renderable
     */
    BoxLayout.prototype._createLayout = function (horizontal) {
        var margins = this.margins;
        var ratios;
        var renderables = [];
        if (margins[1] && margins[3]) {
            ratios = [true, 1, true];
            renderables.push(this._createVerticalLayout(0));
            renderables.push(this._createVerticalLayout(1));
            renderables.push(this._createVerticalLayout(2));
        } else if (margins[1]) {
            ratios = [1, true];
            renderables.push(this._createVerticalLayout(1));
            renderables.push(this._createVerticalLayout(2));
        } else if (margins[3]) {
            ratios = [true, 1];
            renderables.push(this._createVerticalLayout(0));
            renderables.push(this._createVerticalLayout(1));
        } else {
            return this._createVerticalLayout(1);
        }
        var horzLayout = new FlexibleLayout({
            ratios: ratios,
            direction: 0
        });
        horzLayout.sequenceFrom(renderables);
        return horzLayout;
    };
    
    /**
     * Create vertical layout, index: left, middle, right
     */
    BoxLayout.prototype._createVerticalLayout = function (index) {
        var margins = this.margins;
        var ratios;
        var renderables = [];
        if (margins[0] && margins[2]) {
            ratios = [true, 1, true];
            renderables.push(this._createRenderable(index));
            renderables.push(this._createRenderable(index + 3));
            renderables.push(this._createRenderable(index + 6));
        } else if (margins[0]) {
            ratios = [true, 1];
            renderables.push(this._createRenderable(index));
            renderables.push(this._createRenderable(index + 3));
        } else if (margins[2]) {
            ratios = [1, true];
            renderables.push(this._createRenderable(index + 3));
            renderables.push(this._createRenderable(index + 6));
        } else {
            return this._createRenderable(index + 3);
        }
        var vertLayout = new FlexibleLayout({
            ratios: ratios,
            direction: 1
        });
        vertLayout.sequenceFrom(renderables);
        
        var modifier;
        if (index === 0) {
            modifier = new Modifier({ size: [margins[3], undefined]});
        } else if (index === 2) {
            modifier = new Modifier({ size: [margins[1], undefined]});
        }
        if (modifier) {
            var renderNode = new RenderNode(modifier);
            renderNode.add(vertLayout);
            return renderNode;
        } else {
            return vertLayout;
        }
    };
        
    /**
     * Creates a renderable, index-order: left-top, top, top-right, left, middle, right, left-bottom, bottom, right-bottom
     */
    BoxLayout.prototype._createRenderable = function (index) {
        var margins = this.margins;
        
        // determine size
        var size, name;
        switch (index) {
        case 0:
            name = 'topLeft';
            size = [margins[3], margins[0]];
            break;
        case 1:
            name = 'top';
            size = [undefined, margins[0]];
            break;
        case 2:
            name = 'topRight';
            size = [margins[1], margins[0]];
            break;
        case 3:
            name = 'left';
            size = [margins[3], undefined];
            break;
        case 4:
            name = 'middle';
            size = [undefined, undefined];
            break;
        case 5:
            name = 'right';
            size = [margins[1], undefined];
            break;
        case 6:
            name = 'bottomLeft';
            size = [margins[3], margins[2]];
            break;
        case 7:
            name = 'bottom';
            size = [undefined, margins[2]];
            break;
        case 8:
            name = 'bottomRight';
            size = [margins[1], margins[2]];
            break;
        }
        
        // Create modifier and renderable
        var modifier = new Modifier({
            size: size
        });
        var renderable = new RenderNode(modifier);
        this[name] = renderable;
        return renderable;
    };

    module.exports = BoxLayout;
});
