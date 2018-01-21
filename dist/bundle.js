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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__painter__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__board__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__snake__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__food__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__score__ = __webpack_require__(6);





var canvas = document.getElementById('canvas');
var startButton = document.getElementById('start-button');
var startContent = document.getElementById('start-content');
var mainContent = document.getElementById('main-content');
var gameOverText = document.getElementById('game-over-msg');
var scoreContainer = document.getElementById('score');
startButton.addEventListener("click", function () {
    startContent.className = 'hide';
    mainContent.className = 'show';
    init();
});
var gameLoop;
function init() {
    var painter = new __WEBPACK_IMPORTED_MODULE_0__painter__["a" /* Painter */](canvas);
    var snake = new __WEBPACK_IMPORTED_MODULE_2__snake__["a" /* Snake */](5, 'green', 'darkgreen');
    var food = new __WEBPACK_IMPORTED_MODULE_3__food__["a" /* Food */]();
    var score = new __WEBPACK_IMPORTED_MODULE_4__score__["a" /* Score */](0, scoreContainer);
    var board = new __WEBPACK_IMPORTED_MODULE_1__board__["a" /* Board */](painter, snake, food, 600, 600, 20, score);
    board.init();
    var intervalCount = 200;
    gameLoop = setInterval(function () {
        board.init();
        snake.move();
        if (board.checkBoundary() || snake.checkCollision()) {
            gameLoop = clearInterval(gameLoop);
            mainContent.className = 'hide';
            startContent.className = 'show';
            gameOverText.className = 'show';
            startButton.innerHTML = "Start Again";
        }
        if (snake.eatFood(food.position)) {
            food.createFood();
            board.drawSnake();
            score.scoreIncrement();
            board.drawScore();
            board.drawFood();
            intervalCount -= 20;
        }
        document.onkeydown = function (event) {
            var keyCode = event.keyCode;
            snake.changeDirection(keyCode);
        };
        board.drawSnake();
        board.drawFood();
        board.drawScore();
    }, intervalCount);
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Painter; });
var Painter = /** @class */ (function () {
    function Painter(_canvas) {
        this.canvas = _canvas;
        this.context = _canvas.getContext('2d');
        var alpha = .8;
        this.context.globalAlpha = alpha;
    }
    Painter.prototype.fillArea = function (x1, y1, x2, y2, color) {
        this.context.fillStyle = color;
        this.context.fillRect(x1, y1, x2, y2);
    };
    Painter.prototype.strokeArea = function (x1, y1, x2, y2, color) {
        this.context.strokeStyle = color;
        this.context.strokeRect(x1, y1, x2, y2);
    };
    return Painter;
}());



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Board; });
var Board = /** @class */ (function () {
    function Board(painter, snake, food, h, w, s, score) {
        this.height = h;
        this.width = w;
        this.size = s;
        this.painter = painter;
        this.snake = snake;
        this.food = food;
        this.score = score;
    }
    Board.prototype.drawSnake = function () {
        for (var i = 0; i < this.snake.cells.length; i++) {
            var cell = this.snake.cells[i];
            if (i == 0) {
                this.drawSnakeCell(cell.x, cell.y, true);
            }
            else {
                this.drawSnakeCell(cell.x, cell.y, false);
            }
        }
    };
    Board.prototype.drawSnakeCell = function (x, y, isHead) {
        if (isHead) {
            this.painter.fillArea(x * this.size, y * this.size, this.size, this.size, "#E30F0E");
            this.painter.strokeArea(x * this.size, y * this.size, this.size, this.size, "#E30F0E");
        }
        else {
            this.painter.fillArea(x * this.size, y * this.size, this.size, this.size, "#007bff");
            this.painter.strokeArea(x * this.size, y * this.size, this.size, this.size, "#007bff");
        }
    };
    Board.prototype.drawFood = function () {
        this.painter.fillArea(this.food.position.x * this.size, this.food.position.y * this.size, this.size, this.size, "#6610f2");
        this.painter.strokeArea(this.food.position.x * this.size, this.food.position.y * this.size, this.size, this.size, "#6610f2");
    };
    Board.prototype.drawScore = function () {
        this.score.drawScore();
    };
    Board.prototype.checkBoundary = function () {
        return this.snake.checkBoundary(-1, this.width / this.size, -1, this.height / this.size);
    };
    Board.prototype.init = function () {
        this.painter.fillArea(0, 0, this.width, this.height, "rgba(250, 250, 250, 0.5)");
        this.painter.strokeArea(0, 0, this.width, this.height, "rgba(250, 250, 250, 0.5)");
    };
    return Board;
}());



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Snake; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enums_direction__ = __webpack_require__(4);

var Snake = /** @class */ (function () {
    function Snake(_length, _bodyColor, _borderColor) {
        this.cells = [];
        this.length = _length;
        this.bodyColor = _bodyColor;
        this.borderColor = _borderColor;
        this.direction = __WEBPACK_IMPORTED_MODULE_0__enums_direction__["a" /* Direction */].Down;
        for (var i = 0; i < _length; i++) {
            this.cells.push({ x: i, y: 0 });
        }
    }
    Snake.prototype.changeDirection = function (keyCode) {
        switch (keyCode) {
            case 37:
                if (this.direction != __WEBPACK_IMPORTED_MODULE_0__enums_direction__["a" /* Direction */].Right) {
                    this.direction = __WEBPACK_IMPORTED_MODULE_0__enums_direction__["a" /* Direction */].Left;
                }
                break;
            case 39:
                if (this.direction != __WEBPACK_IMPORTED_MODULE_0__enums_direction__["a" /* Direction */].Left) {
                    this.direction = __WEBPACK_IMPORTED_MODULE_0__enums_direction__["a" /* Direction */].Right;
                }
                break;
            case 38:
                if (this.direction != __WEBPACK_IMPORTED_MODULE_0__enums_direction__["a" /* Direction */].Down) {
                    this.direction = __WEBPACK_IMPORTED_MODULE_0__enums_direction__["a" /* Direction */].Up;
                }
                break;
            case 40:
                if (this.direction != __WEBPACK_IMPORTED_MODULE_0__enums_direction__["a" /* Direction */].Up) {
                    this.direction = __WEBPACK_IMPORTED_MODULE_0__enums_direction__["a" /* Direction */].Down;
                }
                break;
        }
    };
    Snake.prototype.move = function () {
        var snakeX = this.cells[0].x;
        var snakeY = this.cells[0].y;
        if (this.direction == __WEBPACK_IMPORTED_MODULE_0__enums_direction__["a" /* Direction */].Right) {
            snakeX++;
        }
        else if (this.direction == __WEBPACK_IMPORTED_MODULE_0__enums_direction__["a" /* Direction */].Left) {
            snakeX--;
        }
        else if (this.direction == __WEBPACK_IMPORTED_MODULE_0__enums_direction__["a" /* Direction */].Up) {
            snakeY--;
        }
        else if (this.direction == __WEBPACK_IMPORTED_MODULE_0__enums_direction__["a" /* Direction */].Down) {
            snakeY++;
        }
        this.cells.pop();
        this.cells.unshift({ x: snakeX, y: snakeY });
    };
    Snake.prototype.eatFood = function (food) {
        var head = this.cells[0];
        if (food.x == head.x && food.y == head.y) {
            this.cells.push(food);
            return true;
        }
        else {
            return false;
        }
    };
    Snake.prototype.checkCollision = function () {
        var x = this.cells[0].x;
        var y = this.cells[0].y;
        for (var i = 1; i < this.cells.length; i++) {
            var cell = this.cells[i];
            if (cell.x === x && cell.y === y) {
                return true;
            }
        }
        return false;
    };
    Snake.prototype.checkBoundary = function (bx1, bx2, by1, by2) {
        var firstCell = this.cells[0];
        if (firstCell.x == bx1 || firstCell.y == by1 || firstCell.x == bx2 || firstCell.y == by2) {
            return true;
        }
        else {
            return false;
        }
    };
    return Snake;
}());



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Direction; });
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {}));


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Food; });
var Food = /** @class */ (function () {
    function Food() {
        this.createFood();
    }
    Food.prototype.createFood = function () {
        var pos = {
            x: Math.floor(Math.random() * 30),
            y: Math.floor(Math.random() * 30)
        };
        this.position = pos;
    };
    return Food;
}());



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Score; });
var Score = /** @class */ (function () {
    function Score(value, container) {
        this.value = value;
        this.scoreContainer = container;
    }
    Score.prototype.drawScore = function () {
        this.scoreContainer.innerHTML = 'Score: ' + this.value;
    };
    Score.prototype.scoreIncrement = function () {
        this.value += 20;
        return this.value;
    };
    return Score;
}());



/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNWRlMzgxZWZmOWQwMzVmZGE4ODkiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvbWFpbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9wYWludGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL2JvYXJkLnRzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL3NuYWtlLnRzIiwid2VicGFjazovLy8uL3NyYy9lbnVtcy9kaXJlY3Rpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvZm9vZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9zY29yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDN0RrQztBQUNKO0FBQ0E7QUFDRjtBQUNFO0FBRTlCLElBQUksTUFBTSxHQUFRLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFcEQsSUFBSSxXQUFXLEdBQVEsUUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUMvRCxJQUFJLFlBQVksR0FBUSxRQUFRLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ2pFLElBQUksV0FBVyxHQUFRLFFBQVEs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QU0sRUFBRSxHQUFHLEVBQUUsQ0FBQztZQUNoQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDO1NBQ25DO1FBQ0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7SUFDeEIsQ0FBQztJQUNMLFdBQUM7QUFBRCxDQUFDOzs7Ozs7Ozs7QUNkRDtBQUFBO0lBR0ksZUFBWSxLQUFhLEVBQUUsU0FBYztRQUNyQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQztJQUNwQyxDQUFDO0lBRUQseUJBQVMsR0FBVDtRQUNJLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQzNELENBQUM7SUFFRCw4QkFBYyxHQUFkO1FBQ0ksSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDakIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUNMLFlBQUM7QUFBRCxDQUFDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDVkZTM4MWVmZjlkMDM1ZmRhODg5IiwiaW1wb3J0IHtQYWludGVyfSBmcm9tICcuL3BhaW50ZXInO1xyXG5pbXBvcnQge0JvYXJkfSBmcm9tICcuL2JvYXJkJztcclxuaW1wb3J0IHtTbmFrZX0gZnJvbSAnLi9zbmFrZSc7XHJcbmltcG9ydCB7Rm9vZH0gZnJvbSBcIi4vZm9vZFwiO1xyXG5pbXBvcnQge1Njb3JlfSBmcm9tIFwiLi9zY29yZVwiO1xyXG5cclxubGV0IGNhbnZhczogYW55ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpO1xyXG5cclxubGV0IHN0YXJ0QnV0dG9uOiBhbnkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnQtYnV0dG9uJyk7XHJcbmxldCBzdGFydENvbnRlbnQ6IGFueSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydC1jb250ZW50Jyk7XHJcbmxldCBtYWluQ29udGVudDogYW55ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21haW4tY29udGVudCcpO1xyXG5sZXQgZ2FtZU92ZXJUZXh0OiBhbnkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZS1vdmVyLW1zZycpO1xyXG5sZXQgc2NvcmVDb250YWluZXI6IGFueSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY29yZScpO1xyXG5cclxuc3RhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgIHN0YXJ0Q29udGVudC5jbGFzc05hbWUgPSAnaGlkZSc7XHJcbiAgICBtYWluQ29udGVudC5jbGFzc05hbWUgPSAnc2hvdyc7XHJcbiAgICBpbml0KCk7XHJcbn0pO1xyXG5cclxubGV0IGdhbWVMb29wOmFueTtcclxuXHJcblxyXG5mdW5jdGlvbiBpbml0KCk6IHZvaWQge1xyXG4gICAgdmFyIHBhaW50ZXIgPSBuZXcgUGFpbnRlcihjYW52YXMpO1xyXG4gICAgdmFyIHNuYWtlOlNuYWtlID0gbmV3IFNuYWtlKDUsICdncmVlbicsICdkYXJrZ3JlZW4nKTtcclxuICAgIHZhciBmb29kOkZvb2QgPSBuZXcgRm9vZCgpO1xyXG4gICAgdmFyIHNjb3JlOiBTY29yZSA9IG5ldyBTY29yZSgwLCBzY29yZUNvbnRhaW5lcik7XHJcbiAgICB2YXIgYm9hcmQ6Qm9hcmQgPSBuZXcgQm9hcmQocGFpbnRlciwgc25ha2UsIGZvb2QsIDYwMCwgNjAwLCAyMCwgc2NvcmUpO1xyXG4gICAgYm9hcmQuaW5pdCgpO1xyXG4gICAgbGV0IGludGVydmFsQ291bnQ6IG51bWJlciA9IDIwMDsgXHJcbiAgICBnYW1lTG9vcCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBib2FyZC5pbml0KCk7XHJcbiAgICAgICAgc25ha2UubW92ZSgpO1xyXG5cclxuICAgICAgICBpZihib2FyZC5jaGVja0JvdW5kYXJ5KCkgfHwgc25ha2UuY2hlY2tDb2xsaXNpb24oKSl7XHJcbiAgICAgICAgICAgIGdhbWVMb29wID0gY2xlYXJJbnRlcnZhbChnYW1lTG9vcCk7XHJcbiAgICAgICAgICAgIG1haW5Db250ZW50LmNsYXNzTmFtZSA9ICdoaWRlJztcclxuICAgICAgICAgICAgc3RhcnRDb250ZW50LmNsYXNzTmFtZSA9ICdzaG93JztcclxuICAgICAgICAgICAgZ2FtZU92ZXJUZXh0LmNsYXNzTmFtZSA9ICdzaG93JztcclxuICAgICAgICAgICAgc3RhcnRCdXR0b24uaW5uZXJIVE1MID0gXCJTdGFydCBBZ2FpblwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoc25ha2UuZWF0Rm9vZChmb29kLnBvc2l0aW9uKSl7XHJcbiAgICAgICAgICAgIGZvb2QuY3JlYXRlRm9vZCgpO1xyXG4gICAgICAgICAgICBib2FyZC5kcmF3U25ha2UoKTtcclxuICAgICAgICAgICAgc2NvcmUuc2NvcmVJbmNyZW1lbnQoKTtcclxuICAgICAgICAgICAgYm9hcmQuZHJhd1Njb3JlKCk7XHJcbiAgICAgICAgICAgIGJvYXJkLmRyYXdGb29kKCk7XHJcbiAgICAgICAgICAgIGludGVydmFsQ291bnQgLT0gMjA7IFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZG9jdW1lbnQub25rZXlkb3duID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGxldCBrZXlDb2RlOm51bWJlciA9IGV2ZW50LmtleUNvZGU7XHJcbiAgICAgICAgICAgIHNuYWtlLmNoYW5nZURpcmVjdGlvbihrZXlDb2RlKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYm9hcmQuZHJhd1NuYWtlKCk7XHJcbiAgICAgICAgYm9hcmQuZHJhd0Zvb2QoKTtcclxuICAgICAgICBib2FyZC5kcmF3U2NvcmUoKTtcclxuICAgIH0sIGludGVydmFsQ291bnQpXHJcbn1cclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jbGFzc2VzL21haW4udHMiLCJpbXBvcnQge0lQYWludGVyfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lwYWludGVyJztcclxuXHJcbmV4cG9ydCBjbGFzcyBQYWludGVyIGltcGxlbWVudHMgSVBhaW50ZXJ7XHJcbiAgICBjYW52YXM6YW55O1xyXG4gICAgY29udGV4dDogYW55O1xyXG4gICAgY29uc3RydWN0b3IoX2NhbnZhczphbnkpe1xyXG4gICAgICAgIHRoaXMuY2FudmFzID0gX2NhbnZhcztcclxuICAgICAgICB0aGlzLmNvbnRleHQgPSBfY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgdmFyIGFscGhhID0gLjg7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0Lmdsb2JhbEFscGhhID0gYWxwaGE7XHJcbiAgICB9XHJcbiAgICBmaWxsQXJlYSh4MTpudW1iZXIsIHkxOm51bWJlcix4MjpudW1iZXIsIHkyOm51bWJlciwgY29sb3I6c3RyaW5nKTp2b2lke1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBjb2xvcjtcclxuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFJlY3QoeDEsIHkxLHgyLCB5Mik7XHJcbiAgICB9XHJcbiAgICBzdHJva2VBcmVhKHgxOm51bWJlciwgeTE6bnVtYmVyLHgyOm51bWJlciwgeTI6bnVtYmVyLCBjb2xvcjpzdHJpbmcpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlID0gY29sb3I7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZVJlY3QoeDEsIHkxLHgyLCB5Mik7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NsYXNzZXMvcGFpbnRlci50cyIsImltcG9ydCB7SVBhaW50ZXJ9IGZyb20gJy4uL2ludGVyZmFjZXMvaXBhaW50ZXInO1xyXG5pbXBvcnQge0lGb29kfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lmb29kJztcclxuaW1wb3J0IHtJU25ha2V9IGZyb20gJy4uL2ludGVyZmFjZXMvaXNuYWtlJztcclxuaW1wb3J0IHtJQm9hcmR9IGZyb20gJy4uL2ludGVyZmFjZXMvaWJvYXJkJztcclxuaW1wb3J0IHtJU2NvcmV9IGZyb20gJy4uL2ludGVyZmFjZXMvaXNjb3JlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBCb2FyZCBpbXBsZW1lbnRzIElCb2FyZHtcclxuICAgIHBhaW50ZXI6IElQYWludGVyO1xyXG4gICAgc2NvcmU6IElTY29yZTtcclxuICAgIHNuYWtlOiBJU25ha2U7XHJcbiAgICBoZWlnaHQ6bnVtYmVyO1xyXG4gICAgd2lkdGg6IG51bWJlcjtcclxuICAgIHNpemU6bnVtYmVyO1xyXG4gICAgZm9vZDogSUZvb2Q7XHJcbiAgICBjb25zdHJ1Y3RvcihwYWludGVyOiBJUGFpbnRlciwgc25ha2U6IElTbmFrZSwgZm9vZDogSUZvb2QsaDpudW1iZXIsIHc6bnVtYmVyLCBzOm51bWJlciwgc2NvcmU6IElTY29yZSl7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoO1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB3O1xyXG4gICAgICAgIHRoaXMuc2l6ZSA9IHM7XHJcbiAgICAgICAgdGhpcy5wYWludGVyID0gcGFpbnRlcjtcclxuICAgICAgICB0aGlzLnNuYWtlID0gc25ha2U7XHJcbiAgICAgICAgdGhpcy5mb29kID0gZm9vZDtcclxuICAgICAgICB0aGlzLnNjb3JlID0gc2NvcmU7XHJcbiAgICB9XHJcbiAgICBkcmF3U25ha2UoKTp2b2lke1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zbmFrZS5jZWxscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgY2VsbCA9IHRoaXMuc25ha2UuY2VsbHNbaV07XHJcbiAgICAgICAgICAgIGlmKGk9PTApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3U25ha2VDZWxsKGNlbGwueCwgY2VsbC55LCB0cnVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd1NuYWtlQ2VsbChjZWxsLngsIGNlbGwueSwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGRyYXdTbmFrZUNlbGwoeDpudW1iZXIsIHk6bnVtYmVyLCBpc0hlYWQ6Ym9vbGVhbil7XHJcbiAgICAgICAgaWYoaXNIZWFkKXsgXHJcbiAgICAgICAgICAgIHRoaXMucGFpbnRlci5maWxsQXJlYSh4KnRoaXMuc2l6ZSwgeSp0aGlzLnNpemUsIHRoaXMuc2l6ZSwgdGhpcy5zaXplLCBcIiNFMzBGMEVcIik7XHJcbiAgICAgICAgICAgIHRoaXMucGFpbnRlci5zdHJva2VBcmVhKHgqdGhpcy5zaXplLCB5KnRoaXMuc2l6ZSwgdGhpcy5zaXplLCB0aGlzLnNpemUsIFwiI0UzMEYwRVwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnBhaW50ZXIuZmlsbEFyZWEoeCp0aGlzLnNpemUsIHkqdGhpcy5zaXplLCB0aGlzLnNpemUsIHRoaXMuc2l6ZSwgXCIjMDA3YmZmXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnBhaW50ZXIuc3Ryb2tlQXJlYSh4KnRoaXMuc2l6ZSwgeSp0aGlzLnNpemUsIHRoaXMuc2l6ZSwgdGhpcy5zaXplLCBcIiMwMDdiZmZcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZHJhd0Zvb2QoKTp2b2lke1xyXG4gICAgICAgIHRoaXMucGFpbnRlci5maWxsQXJlYSh0aGlzLmZvb2QucG9zaXRpb24ueCp0aGlzLnNpemUsIHRoaXMuZm9vZC5wb3NpdGlvbi55KnRoaXMuc2l6ZSwgdGhpcy5zaXplLCB0aGlzLnNpemUsIFwiIzY2MTBmMlwiKTtcclxuICAgICAgICB0aGlzLnBhaW50ZXIuc3Ryb2tlQXJlYSh0aGlzLmZvb2QucG9zaXRpb24ueCp0aGlzLnNpemUsIHRoaXMuZm9vZC5wb3NpdGlvbi55KnRoaXMuc2l6ZSwgdGhpcy5zaXplLCB0aGlzLnNpemUsIFwiIzY2MTBmMlwiKTtcclxuXHJcbiAgICB9XHJcbiAgICBkcmF3U2NvcmUoKTp2b2lke1xyXG4gICAgICAgIHRoaXMuc2NvcmUuZHJhd1Njb3JlKCk7XHJcbiAgICB9XHJcbiAgICBjaGVja0JvdW5kYXJ5KCk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc25ha2UuY2hlY2tCb3VuZGFyeSgtMSwgIHRoaXMud2lkdGgvdGhpcy5zaXplLCAtMSwgdGhpcy5oZWlnaHQvdGhpcy5zaXplKTtcclxuICAgIH1cclxuICAgIGluaXQoKTp2b2lke1xyXG4gICAgICAgIHRoaXMucGFpbnRlci5maWxsQXJlYSgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgXCJyZ2JhKDI1MCwgMjUwLCAyNTAsIDAuNSlcIilcclxuICAgICAgICB0aGlzLnBhaW50ZXIuc3Ryb2tlQXJlYSgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCxcInJnYmEoMjUwLCAyNTAsIDI1MCwgMC41KVwiKVxyXG4gICAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NsYXNzZXMvYm9hcmQudHMiLCJpbXBvcnQge0lQb3NpdGlvbn0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pcG9zaXRpb24nO1xyXG5pbXBvcnQge0lTbmFrZX0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pc25ha2UnO1xyXG5pbXBvcnQge0RpcmVjdGlvbn0gZnJvbSAnLi4vZW51bXMvZGlyZWN0aW9uJztcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgU25ha2UgaW1wbGVtZW50cyBJU25ha2V7XHJcbiAgICBjZWxsczogSVBvc2l0aW9uW107XHJcbiAgICBib2R5Q29sb3I6IHN0cmluZztcclxuICAgIGJvcmRlckNvbG9yOiBzdHJpbmc7XHJcbiAgICBkaXJlY3Rpb246IERpcmVjdGlvbjtcclxuICAgIGxlbmd0aDogbnVtYmVyO1xyXG4gICAgY29uc3RydWN0b3IoX2xlbmd0aDpudW1iZXIsIF9ib2R5Q29sb3I6c3RyaW5nLCBfYm9yZGVyQ29sb3I6IHN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5jZWxscyA9IFtdO1xyXG4gICAgICAgIHRoaXMubGVuZ3RoID0gX2xlbmd0aDtcclxuICAgICAgICB0aGlzLmJvZHlDb2xvciA9IF9ib2R5Q29sb3I7XHJcbiAgICAgICAgdGhpcy5ib3JkZXJDb2xvciA9IF9ib3JkZXJDb2xvcjtcclxuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IERpcmVjdGlvbi5Eb3duO1xyXG4gICAgICAgIGZvcihsZXQgaT0wO2k8X2xlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICB0aGlzLmNlbGxzLnB1c2goe3g6IGksIHk6IDB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlRGlyZWN0aW9uKGtleUNvZGU6bnVtYmVyKXtcclxuICAgICAgICBzd2l0Y2ggKGtleUNvZGUpIHtcclxuICAgICAgICAgICAgY2FzZSAzNzpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRpcmVjdGlvbiAhPSBEaXJlY3Rpb24uUmlnaHQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IERpcmVjdGlvbi5MZWZ0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzk6XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXJlY3Rpb24gIT0gRGlyZWN0aW9uLkxlZnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IERpcmVjdGlvbi5SaWdodDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAzODpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRpcmVjdGlvbiAhPSBEaXJlY3Rpb24uRG93bikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gRGlyZWN0aW9uLlVwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlIDQwOlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uICE9IERpcmVjdGlvbi5VcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gRGlyZWN0aW9uLkRvd247XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZSgpe1xyXG4gICAgICAgIGxldCBzbmFrZVg6IG51bWJlciA9IHRoaXMuY2VsbHNbMF0ueDtcclxuICAgICAgICBsZXQgc25ha2VZOiBudW1iZXIgPSB0aGlzLmNlbGxzWzBdLnk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PSBEaXJlY3Rpb24uUmlnaHQpIHtcclxuICAgICAgICAgICAgc25ha2VYKys7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRpcmVjdGlvbiA9PSBEaXJlY3Rpb24uTGVmdCkge1xyXG4gICAgICAgICAgICBzbmFrZVgtLTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGlyZWN0aW9uID09IERpcmVjdGlvbi5VcCkge1xyXG4gICAgICAgICAgICBzbmFrZVktLTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGlyZWN0aW9uID09IERpcmVjdGlvbi5Eb3duKSB7XHJcbiAgICAgICAgICAgIHNuYWtlWSsrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jZWxscy5wb3AoKTtcclxuICAgICAgICB0aGlzLmNlbGxzLnVuc2hpZnQoe3g6c25ha2VYLCB5OnNuYWtlWX0pO1xyXG4gICAgfVxyXG5cclxuICAgIGVhdEZvb2QoZm9vZDpJUG9zaXRpb24pOiBib29sZWFue1xyXG4gICAgICAgIGxldCBoZWFkOklQb3NpdGlvbiA9IHRoaXMuY2VsbHNbMF07XHJcbiAgICAgICAgaWYoZm9vZC54ID09IGhlYWQueCAmJiBmb29kLnkgPT0gaGVhZC55ICl7XHJcbiAgICAgICAgICAgIHRoaXMuY2VsbHMucHVzaChmb29kKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNoZWNrQ29sbGlzaW9uKCk6IGJvb2xlYW57XHJcbiAgICAgICAgdmFyIHggPSB0aGlzLmNlbGxzWzBdLng7XHJcbiAgICAgICAgdmFyIHkgPSB0aGlzLmNlbGxzWzBdLnk7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMTsgaSA8IHRoaXMuY2VsbHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGNlbGwgPSB0aGlzLmNlbGxzW2ldO1xyXG4gICAgICAgICAgICBpZihjZWxsLnggPT09IHggJiYgY2VsbC55ID09PSB5KXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGNoZWNrQm91bmRhcnkoYngxOm51bWJlcixieDI6bnVtYmVyLCBieTE6bnVtYmVyLCBieTI6bnVtYmVyICk6Ym9vbGVhbntcclxuICAgICAgICB2YXIgZmlyc3RDZWxsID0gdGhpcy5jZWxsc1swXTtcclxuICAgICAgICBpZihmaXJzdENlbGwueCA9PSBieDEgfHwgZmlyc3RDZWxsLnkgPT0gYnkxIHx8IGZpcnN0Q2VsbC54ID09IGJ4MiB8fCBmaXJzdENlbGwueSA9PSBieTIpe1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NsYXNzZXMvc25ha2UudHMiLCJleHBvcnQgZW51bSBEaXJlY3Rpb24ge1xyXG4gICAgVXAsXHJcbiAgICBEb3duLFxyXG4gICAgTGVmdCxcclxuICAgIFJpZ2h0XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2VudW1zL2RpcmVjdGlvbi50cyIsIlxyXG5pbXBvcnQge0lQb3NpdGlvbn0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pcG9zaXRpb24nO1xyXG5pbXBvcnQge0lGb29kfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lmb29kJztcclxuXHJcbmV4cG9ydCBjbGFzcyBGb29kIGltcGxlbWVudHMgSUZvb2R7XHJcbiAgICBwb3NpdGlvbjogSVBvc2l0aW9uO1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLmNyZWF0ZUZvb2QoKTtcclxuICAgIH1cclxuICAgIGNyZWF0ZUZvb2QoKTp2b2lke1xyXG4gICAgICAgIGxldCBwb3MgPSB7XHJcbiAgICAgICAgICAgIHg6TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMzApLFxyXG4gICAgICAgICAgICB5Ok1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDMwKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBvc2l0aW9uID0gcG9zO1xyXG4gICAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NsYXNzZXMvZm9vZC50cyIsImltcG9ydCB7IElTY29yZSB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2lzY29yZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNjb3JlIGltcGxlbWVudHMgSVNjb3Jle1xyXG4gICAgdmFsdWU6IG51bWJlcjtcclxuICAgIHNjb3JlQ29udGFpbmVyOiBhbnk7XHJcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZTogbnVtYmVyLCBjb250YWluZXI6IGFueSApe1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnNjb3JlQ29udGFpbmVyID0gY29udGFpbmVyO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXdTY29yZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNjb3JlQ29udGFpbmVyLmlubmVySFRNTCA9ICdTY29yZTogJyArIHRoaXMudmFsdWU7IFxyXG4gICAgfVxyXG5cclxuICAgIHNjb3JlSW5jcmVtZW50KCk6IG51bWJlciB7XHJcbiAgICAgICAgdGhpcy52YWx1ZSArPSAyMDsgXHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XHJcbiAgICB9IFxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NsYXNzZXMvc2NvcmUudHMiXSwic291cmNlUm9vdCI6IiJ9