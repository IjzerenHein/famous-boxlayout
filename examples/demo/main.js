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

/*jslint browser:true, nomen:true, vars:true, plusplus:true, bitwise: true*/
/*global define*/

define(function (require, exports, module) {
    'use strict';
    
    // import dependencies
    var Engine = require('famous/core/Engine');
    var Modifier = require('famous/core/Modifier');
    var RenderNode = require('famous/core/RenderNode');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var GridLayout = require('famous/views/GridLayout');
    var BoxLayout = require('famous-boxLayout');
    
    // Create the main context
    var mainContext = Engine.createContext();

    // Helper functions
    function addSurface(boxLayout, name) {
        if (boxLayout[name] !== undefined) {
            var surface = new Surface({
                classes: [name]
            });
            
            boxLayout[name].add(surface);
            if (name === 'middle') {
                surface.setContent('Insets: [' + boxLayout.options.insets + ']<div class="center">.middle</div>');
            } else {
                surface.setContent('<div class="center">.' + name + '</div>');
            }
        }
    }
    function setSurfaces(boxLayout) {
        var SZ = 20;
        addSurface(boxLayout, 'topLeft');
        addSurface(boxLayout, 'top');
        addSurface(boxLayout, 'topRight');
        addSurface(boxLayout, 'left');
        addSurface(boxLayout, 'middle');
        addSurface(boxLayout, 'right');
        addSurface(boxLayout, 'bottomLeft');
        addSurface(boxLayout, 'bottom');
        addSurface(boxLayout, 'bottomRight');
    }
    var boxLayouts = [];
    function createBoxLayout(insets) {
        var boxLayout = new BoxLayout({
            insets: insets
        });
        setSurfaces(boxLayout);
        var modifier = new Modifier({
            transform: Transform.scale(0.9, 0.9, 1.0),
            align: [0.5, 0.5],
            origin: [0.5, 0.5]
        });
        var renderable = new RenderNode(modifier);
        renderable.add(boxLayout);
        boxLayouts.push(renderable);
    }
    
    // Create example box-layouts
    var SZ = 60;
    createBoxLayout([]);
    createBoxLayout([SZ]);
    createBoxLayout([SZ, 0]);
    createBoxLayout([0, SZ]);
    createBoxLayout([SZ, 0, 0, 0]);
    createBoxLayout([0, SZ, 0, 0]);
    createBoxLayout([0, 0, SZ, 0]);
    createBoxLayout([0, 0, 0, SZ]);
    createBoxLayout([SZ - 10, SZ, SZ - 20, SZ + 10]);
    
    
    // Show box-layouts in grid
    var grid = new GridLayout({
        dimensions: [3, 3]
    });
    grid.sequenceFrom(boxLayouts);
    mainContext.add(grid);
});
