/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__token_token_js__ = __webpack_require__(1);


Object(__WEBPACK_IMPORTED_MODULE_0__token_token_js__["a" /* buildTokens */])();

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return buildTokens; });
let width = 1100;//window.innerWidth;
let height = 550;//window.innerHeight;
let elementWidth = 50;
let elementHeight = 50;
let gutter = 0;
let initialCount = 11;
let snapGrid = [];
let elements = [];
let cols = width/(gutter + elementWidth);
let rows = height/gutter + elementHeight;
/*for (let i = 0; i<(width); i=(i+(width/50))) {
    for (let z = 0; z<(height); z=(z+(height/50))) {
        snapGrid.push([Math.floor(i),Math.floor(z)]);
    }
}*/

const setGrid = () => {
    for (let i = 0; i < width; i = (i + gutter + elementWidth)) {
        for (let z = 0; z < height; z = (z + gutter + elementHeight)) {
            snapGrid.push([Math.floor(i), Math.floor(z)]);
        }
    }
    console.log(snapGrid);
    createBoard('false','');
};

let stage = new Konva.Stage({
    container: 'board',
    width: width,
    height: height
});

let layer = new Konva.Layer();
stage.add(layer);

function haveIntersection(r1, r2) {
    return !(
        r2.x > r1.x + r1.width ||
        r2.x + r2.width < r1.x ||
        r2.y > r1.y + r1.height ||
        r2.y + r2.height < r1.y
    );
}

const createShape = (x,y,pos) => {
    console.log(x+' '+y);
    let closestGridIndex = closestIndex(x,y);
    let group = new Konva.Group({
        x: snapGrid[closestGridIndex][0],
        y: snapGrid[closestGridIndex][1],
        draggable: true
    });
    /*let shape = new Konva.Rect({
        width: elementWidth,
        height: elementHeight,
        fill: '#ffffff',
        rotation: 0,
        name: 'fillShape'
    });*/
    let shape = new Konva.Circle({
        radius: elementWidth/2,
        fill: '#ffffff',
        stroke: '#aaaaaa',
        strokeWidth: 1,
        name: 'fillShape'
    });

    group.add(shape);

    /*let boundingBox = shape.getClientRect({ relativeTo: group });

    let box = new Konva.Rect({
        x: boundingBox.x,
        y: boundingBox.y,
        width: boundingBox.width,
        height: boundingBox.height,
        stroke: 'red',
        strokeWidth: 1
    });
    group.add(box);*/

    let boundingBox = shape.getClientRect({ relativeTo: group });
    let label = new Konva.Text({
        x: (pos.length==1)?boundingBox.x + elementWidth/2 - elementWidth/8:boundingBox.x + elementWidth/2 - elementWidth/4,
        y: boundingBox.y + elementWidth/2 - elementWidth/4,
        text: pos,
        fontSize: 20,
        fontFamily: 'Calibri',
        fill: '#AAAAAA'
    });

    label.on('dblclick', () => {
        // create textarea over canvas with absolute position

        // first we need to find its positon
        let textPosition = label.getAbsolutePosition();
        let stageBox = stage.getContainer().getBoundingClientRect();

        let areaPosition = {
            x: textPosition.x + stageBox.left,
            y: textPosition.y + stageBox.top
        };


        // create textarea and style it
        let textarea = document.createElement('textarea');
        document.body.appendChild(textarea);

        textarea.value = label.text();
        textarea.style.position = 'absolute';
        textarea.style.top = areaPosition.y + 'px';
        textarea.style.left = areaPosition.x + 'px';
        textarea.style.width = label.width();

        textarea.focus();


        textarea.addEventListener('keydown', function (e) {
            // hide on enter
            if (e.keyCode === 13) {
                label.text(textarea.value);
                label.x((textarea.value.length==1)?boundingBox.x + elementWidth/2 - elementWidth/8:boundingBox.x + elementWidth/2 - elementWidth/4);
                layer.draw();
                document.body.removeChild(textarea);
            }
        });
    });

    group.add(label);

    return group;
};

const createBoard = (load,name) => {
    let total = 0;
    let tempBoard;
    console.log(load);
    if (load == 'true') {
        elements.length=0;
        layer.destroyChildren();
        tempBoard = loadBoard(name);
        console.log(tempBoard);
        total = tempBoard.length;
    } else {
        total = initialCount;
    }

    for (let i = 0; i < total; i++) {
        let posX = ((width/2)-((initialCount/2)*elementWidth)+((gutter+elementWidth)*(elements.length)));
        let posY = height/2;
        let labelText = 'O';
        if (load == 'true') {
            let thisToken = JSON.parse(tempBoard[i]);
            console.log(thisToken);
            posX = thisToken.attrs.x;
            posY = thisToken.attrs.y;
            labelText = thisToken.children[1].attrs.text;
        }
        elements[i] = createShape(posX,posY,labelText);
        layer.add(elements[i]);
        elements[i].on("dragend", function (e) {
            let target = e.target;
            let targetRect = e.target.getClientRect();

            let closestGridIndex = closestIndex(targetRect.x+(elementWidth/2), targetRect.y+(elementWidth/2));

            // the tween has to be created after the node has been added to the layer
            let tween = new Konva.Tween({
                node: target,
                duration: 0.1,
                x: snapGrid[closestGridIndex][0],
                y: snapGrid[closestGridIndex][1],
                rotation: 0,
                opacity: 1,
                scaleX: 1
            });

            // start tween after 2 seconds
            tween.play();
        });
        elements[i].on('mouseenter', function () {
            stage.container().style.cursor = 'pointer';
        });

        elements[i].on('mouseleave', function () {
            stage.container().style.cursor = 'default';
        });
    }
    layer.on('dragmove', function (e) {
        let target = e.target;
        let targetRect = e.target.getClientRect();
        layer.children.each(function (group) {
            // do not check intersection with itself
            if (group === target) {
                return;
            }
            if (haveIntersection(group.getClientRect(), targetRect)) {
                group.findOne('.fillShape').fill('#eeeeee');
            } else {
                group.findOne('.fillShape').fill('#ffffff');
            }
            // do not need to call layer.draw() here
            // because it will be called by dragmove action
        });
    });
};

const closestIndex = (xCor, yCor) => {
    let distances = [];

    snapGrid.forEach(el => {
        let distance = Math.hypot(el[0] - parseInt(xCor), el[1] - parseInt(yCor));
        distances.push(parseInt(distance));
    });

    return distances.indexOf(Math.min(...distances));
};

const storeBoard = () => {
    let boardName = document.getElementById('board_name').value;
    // Put the object into storage
    localStorage.setItem(boardName, JSON.stringify(elements));

    // Retrieve the object from storage
    let retrievedObject = localStorage.getItem(boardName);

    console.log('retrievedObject: ', JSON.parse(retrievedObject));
};

const loadBoard = (name) => {

    // Retrieve the object from storage
    let retrievedObject = localStorage.getItem(name);

    return (JSON.parse(retrievedObject));
};

document.getElementById('save_board').addEventListener("click", storeBoard);
document.getElementById('load_board').addEventListener("click", function() {
    createBoard('true', document.getElementById("saved_boards").value);
    layer.draw();
});

const createSavedOptions = () => {
    let selectBoards = document.getElementById('saved_boards');

    for (let i = 0, len = localStorage.length; i < len; ++i) {
        if (localStorage.key(i).substring(0, 6) == "board:") {
            let option = document.createElement("option");
            option.value = localStorage.key(i);
            option.text = localStorage.key(i).substring(6, localStorage.key(i).length);
            selectBoards.add(option);
        }
    }
};

const buildTokens = () => {
    setGrid();
    createSavedOptions();
    layer.draw();
};

//function setType() { return 'circle'; }



/***/ })
/******/ ]);