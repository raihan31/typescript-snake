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




var canvas = document.getElementById('canvas');
var startButton = document.getElementById('start-button');
var startContent = document.getElementById('start-content');
var mainContent = document.getElementById('main-content');
var gameOverText = document.getElementById('game-over-msg');
startButton.addEventListener("click", function () {
    startContent.className = 'hide';
    mainContent.className = 'show';
    init();
});
var gameLoop;
function init() {
    // let firstTimeChecked: boolean = false;
    // var painter = new Painter(canvas);
    // var snake:Snake = new Snake(6, 'green', 'darkgreen');
    // var food:Food = new Food();
    // var board:Board = new Board(painter, snake, food, 450, 650, 20);
    // board.init();
    gameLoop = setInterval(function () {
        var painter = new __WEBPACK_IMPORTED_MODULE_0__painter__["a" /* Painter */](canvas);
        var snake = new __WEBPACK_IMPORTED_MODULE_2__snake__["a" /* Snake */](6, 'green', 'darkgreen');
        var food = new __WEBPACK_IMPORTED_MODULE_3__food__["a" /* Food */]();
        var board = new __WEBPACK_IMPORTED_MODULE_1__board__["a" /* Board */](painter, snake, food, 450, 650, 20);
        board.init();
        snake.move();
        if (board.checkBoundary() || snake.checkCollision()) {
            gameLoop = clearInterval(gameLoop);
            mainContent.className = 'hide';
            startContent.className = 'show';
            gameOverText.className = 'show';
            startButton.innerHTML = "Start Again";
            startButton.setAttribute('disabled', false);
        }
        // if(snake.eatFood(food.position)){
        //     firstTimeChecked = false;
        // }
        document.onkeydown = function (event) {
            var keyCode = event.keyCode;
            snake.changeDirection(keyCode);
        };
        board.drawSnake();
        // board.drawFood();
    }, 150);
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
    function Board(painter, snake, food, h, w, s) {
        this.height = h;
        this.width = w;
        this.size = s;
        this.painter = painter;
        this.snake = snake;
        this.food = food;
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
            this.painter.fillArea(x * this.size, y * this.size, this.size, this.size, "red");
            this.painter.strokeArea(x * this.size, y * this.size, this.size, this.size, "darkgreen");
        }
        else {
            this.painter.fillArea(x * this.size, y * this.size, this.size, this.size, "green");
            this.painter.strokeArea(x * this.size, y * this.size, this.size, this.size, "darkgreen");
        }
    };
    Board.prototype.drawFood = function () {
        this.painter.fillArea(this.food.position.x * this.size, this.food.position.y * this.size, this.size, this.size, "pink");
        this.painter.strokeArea(this.food.position.x * this.size, this.food.position.y * this.size, this.size, this.size, "yellow");
    };
    Board.prototype.drawScore = function () {
    };
    Board.prototype.checkBoundary = function () {
        return this.snake.checkBoundary(-1, this.width / this.size, -1, this.height / this.size);
    };
    Board.prototype.init = function () {
        this.painter.fillArea(0, 0, this.width, this.height, "lightgrey");
        this.painter.strokeArea(0, 0, this.width, this.height, "black");
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
            x: Math.random() * 30,
            y: Math.random() * 30
        };
        this.position = pos;
    };
    return Food;
}());



/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzk2NGIxNmY0NzkyNmFlZGFjODgiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvbWFpbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9wYWludGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL2JvYXJkLnRzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL3NuYWtlLnRzIiwid2VicGFjazovLy8uL3NyYy9lbnVtcy9kaXJlY3Rpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvZm9vZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM3RGtDO0FBQ0o7QUFDQTtBQUNGO0FBRTVCLElBQUksTUFBTSxHQUFRLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFcEQsSUFBSSxXQUFXLEdBQVEsUUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUMvRCxJQUFJLFlBQVksR0FBUSxRQUFRLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ2pFLElBQUksV0FBVyxHQUFRLFFBQVEsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDL0QsSUFBSSxZ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O1FBQ2pCLENBQUM7SUFDTCxDQUFDO0lBQ0wsWUFBQztBQUFELENBQUM7Ozs7Ozs7Ozs7QUM5RkQsSUFBWSxTQUtYO0FBTEQsV0FBWSxTQUFTO0lBQ2pCLHFDQUFFO0lBQ0YseUNBQUk7SUFDSix5Q0FBSTtJQUNKLDJDQUFLO0FBQ1QsQ0FBQyxFQUxXLFNBQVMsS0FBVCxTQUFTLFFBS3BCOzs7Ozs7OztBQ0REO0FBQUE7SUFFSTtRQUNJLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBQ0QseUJBQVUsR0FBVjtRQUNJLElBQUksR0FBRyxHQUFHO1lBQ04sQ0FBQyxFQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBQyxFQUFFO1lBQ2xCLENBQUMsRUFBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUMsRUFBRTtTQUNyQjtRQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO0lBQ3hCLENBQUM7SUFDTCxXQUFDO0FBQUQsQ0FBQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBjOTY0YjE2ZjQ3OTI2YWVkYWM4OCIsImltcG9ydCB7UGFpbnRlcn0gZnJvbSAnLi9wYWludGVyJztcbmltcG9ydCB7Qm9hcmR9IGZyb20gJy4vYm9hcmQnO1xuaW1wb3J0IHtTbmFrZX0gZnJvbSAnLi9zbmFrZSc7XG5pbXBvcnQge0Zvb2R9IGZyb20gXCIuL2Zvb2RcIjtcblxubGV0IGNhbnZhczogYW55ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpO1xuXG5sZXQgc3RhcnRCdXR0b246IGFueSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydC1idXR0b24nKTtcbmxldCBzdGFydENvbnRlbnQ6IGFueSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydC1jb250ZW50Jyk7XG5sZXQgbWFpbkNvbnRlbnQ6IGFueSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluLWNvbnRlbnQnKTtcbmxldCBnYW1lT3ZlclRleHQ6IGFueSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lLW92ZXItbXNnJyk7XG5cbnN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgc3RhcnRDb250ZW50LmNsYXNzTmFtZSA9ICdoaWRlJztcbiAgICBtYWluQ29udGVudC5jbGFzc05hbWUgPSAnc2hvdyc7XG4gICAgaW5pdCgpO1xufSk7XG5cbmxldCBnYW1lTG9vcDphbnk7XG5cblxuZnVuY3Rpb24gaW5pdCgpOiB2b2lkIHtcbiAgICAvLyBsZXQgZmlyc3RUaW1lQ2hlY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8vIHZhciBwYWludGVyID0gbmV3IFBhaW50ZXIoY2FudmFzKTtcbiAgICAvLyB2YXIgc25ha2U6U25ha2UgPSBuZXcgU25ha2UoNiwgJ2dyZWVuJywgJ2RhcmtncmVlbicpO1xuICAgIC8vIHZhciBmb29kOkZvb2QgPSBuZXcgRm9vZCgpO1xuICAgIC8vIHZhciBib2FyZDpCb2FyZCA9IG5ldyBCb2FyZChwYWludGVyLCBzbmFrZSwgZm9vZCwgNDUwLCA2NTAsIDIwKTtcbiAgICAvLyBib2FyZC5pbml0KCk7XG4gICAgZ2FtZUxvb3AgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBwYWludGVyID0gbmV3IFBhaW50ZXIoY2FudmFzKTtcbiAgICAgICAgbGV0IHNuYWtlOlNuYWtlID0gbmV3IFNuYWtlKDYsICdncmVlbicsICdkYXJrZ3JlZW4nKTtcbiAgICAgICAgbGV0IGZvb2Q6Rm9vZCA9IG5ldyBGb29kKCk7XG4gICAgICAgIGxldCBib2FyZDpCb2FyZCA9IG5ldyBCb2FyZChwYWludGVyLCBzbmFrZSwgZm9vZCwgNDUwLCA2NTAsIDIwKTtcblxuICAgICAgICBib2FyZC5pbml0KCk7XG4gICAgICAgIHNuYWtlLm1vdmUoKTtcblxuICAgICAgICBpZihib2FyZC5jaGVja0JvdW5kYXJ5KCkgfHwgc25ha2UuY2hlY2tDb2xsaXNpb24oKSl7XG4gICAgICAgICAgICBnYW1lTG9vcCA9IGNsZWFySW50ZXJ2YWwoZ2FtZUxvb3ApO1xuICAgICAgICAgICAgbWFpbkNvbnRlbnQuY2xhc3NOYW1lID0gJ2hpZGUnO1xuICAgICAgICAgICAgc3RhcnRDb250ZW50LmNsYXNzTmFtZSA9ICdzaG93JztcbiAgICAgICAgICAgIGdhbWVPdmVyVGV4dC5jbGFzc05hbWUgPSAnc2hvdyc7XG4gICAgICAgICAgICBzdGFydEJ1dHRvbi5pbm5lckhUTUwgPSBcIlN0YXJ0IEFnYWluXCI7XG4gICAgICAgICAgICBzdGFydEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgZmFsc2UpO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZihzbmFrZS5lYXRGb29kKGZvb2QucG9zaXRpb24pKXtcbiAgICAgICAgLy8gICAgIGZpcnN0VGltZUNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIGRvY3VtZW50Lm9ua2V5ZG93biA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgbGV0IGtleUNvZGU6bnVtYmVyID0gZXZlbnQua2V5Q29kZTtcbiAgICAgICAgICAgIHNuYWtlLmNoYW5nZURpcmVjdGlvbihrZXlDb2RlKVxuICAgICAgICB9XG5cbiAgICAgICAgYm9hcmQuZHJhd1NuYWtlKCk7XG4gICAgICAgIC8vIGJvYXJkLmRyYXdGb29kKCk7XG4gICAgfSwgMTUwKVxufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY2xhc3Nlcy9tYWluLnRzIiwiaW1wb3J0IHtJUGFpbnRlcn0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pcGFpbnRlcic7XG5cbmV4cG9ydCBjbGFzcyBQYWludGVyIGltcGxlbWVudHMgSVBhaW50ZXJ7XG4gICAgY2FudmFzOmFueTtcbiAgICBjb250ZXh0OiBhbnk7XG4gICAgY29uc3RydWN0b3IoX2NhbnZhczphbnkpe1xuICAgICAgICB0aGlzLmNhbnZhcyA9IF9jYW52YXM7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IF9jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICB9XG4gICAgZmlsbEFyZWEoeDE6bnVtYmVyLCB5MTpudW1iZXIseDI6bnVtYmVyLCB5MjpudW1iZXIsIGNvbG9yOnN0cmluZyk6dm9pZHtcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFJlY3QoeDEsIHkxLHgyLCB5Mik7XG5cbiAgICB9XG4gICAgc3Ryb2tlQXJlYSh4MTpudW1iZXIsIHkxOm51bWJlcix4MjpudW1iZXIsIHkyOm51bWJlciwgY29sb3I6c3RyaW5nKTp2b2lke1xuICAgICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSBjb2xvcjtcbiAgICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZVJlY3QoeDEsIHkxLHgyLCB5Mik7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NsYXNzZXMvcGFpbnRlci50cyIsImltcG9ydCB7SVBhaW50ZXJ9IGZyb20gJy4uL2ludGVyZmFjZXMvaXBhaW50ZXInO1xuaW1wb3J0IHtJRm9vZH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pZm9vZCc7XG5pbXBvcnQge0lTbmFrZX0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pc25ha2UnO1xuaW1wb3J0IHtJQm9hcmR9IGZyb20gJy4uL2ludGVyZmFjZXMvaWJvYXJkJztcblxuZXhwb3J0IGNsYXNzIEJvYXJkIGltcGxlbWVudHMgSUJvYXJke1xuICAgIHBhaW50ZXI6IElQYWludGVyO1xuICAgIHNuYWtlOiBJU25ha2U7XG4gICAgaGVpZ2h0Om51bWJlcjtcbiAgICB3aWR0aDogbnVtYmVyO1xuICAgIHNpemU6bnVtYmVyO1xuICAgIGZvb2Q6IElGb29kO1xuICAgIGNvbnN0cnVjdG9yKHBhaW50ZXI6IElQYWludGVyLHNuYWtlOiBJU25ha2UsIGZvb2Q6IElGb29kLGg6bnVtYmVyLCB3Om51bWJlciwgczpudW1iZXIpe1xuICAgICAgICB0aGlzLmhlaWdodCA9IGg7XG4gICAgICAgIHRoaXMud2lkdGggPSB3O1xuICAgICAgICB0aGlzLnNpemUgPSBzO1xuICAgICAgICB0aGlzLnBhaW50ZXIgPSBwYWludGVyO1xuICAgICAgICB0aGlzLnNuYWtlID0gc25ha2U7XG4gICAgICAgIHRoaXMuZm9vZCA9IGZvb2Q7XG4gICAgfVxuICAgIGRyYXdTbmFrZSgpOnZvaWR7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zbmFrZS5jZWxscy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGNlbGwgPSB0aGlzLnNuYWtlLmNlbGxzW2ldO1xuICAgICAgICAgICAgaWYoaT09MCl7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3U25ha2VDZWxsKGNlbGwueCwgY2VsbC55LCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3U25ha2VDZWxsKGNlbGwueCwgY2VsbC55LCBmYWxzZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH1cbiAgICBkcmF3U25ha2VDZWxsKHg6bnVtYmVyLCB5Om51bWJlciwgaXNIZWFkOmJvb2xlYW4pe1xuICAgICAgICBpZihpc0hlYWQpe1xuICAgICAgICAgICAgdGhpcy5wYWludGVyLmZpbGxBcmVhKHgqdGhpcy5zaXplLCB5KnRoaXMuc2l6ZSwgdGhpcy5zaXplLCB0aGlzLnNpemUsIFwicmVkXCIpO1xuICAgICAgICAgICAgdGhpcy5wYWludGVyLnN0cm9rZUFyZWEoeCp0aGlzLnNpemUsIHkqdGhpcy5zaXplLCB0aGlzLnNpemUsIHRoaXMuc2l6ZSwgXCJkYXJrZ3JlZW5cIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnBhaW50ZXIuZmlsbEFyZWEoeCp0aGlzLnNpemUsIHkqdGhpcy5zaXplLCB0aGlzLnNpemUsIHRoaXMuc2l6ZSwgXCJncmVlblwiKTtcbiAgICAgICAgICAgIHRoaXMucGFpbnRlci5zdHJva2VBcmVhKHgqdGhpcy5zaXplLCB5KnRoaXMuc2l6ZSwgdGhpcy5zaXplLCB0aGlzLnNpemUsIFwiZGFya2dyZWVuXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGRyYXdGb29kKCk6dm9pZHtcbiAgICAgICAgdGhpcy5wYWludGVyLmZpbGxBcmVhKHRoaXMuZm9vZC5wb3NpdGlvbi54KnRoaXMuc2l6ZSwgdGhpcy5mb29kLnBvc2l0aW9uLnkqdGhpcy5zaXplLCB0aGlzLnNpemUsIHRoaXMuc2l6ZSwgXCJwaW5rXCIpO1xuICAgICAgICB0aGlzLnBhaW50ZXIuc3Ryb2tlQXJlYSh0aGlzLmZvb2QucG9zaXRpb24ueCp0aGlzLnNpemUsIHRoaXMuZm9vZC5wb3NpdGlvbi55KnRoaXMuc2l6ZSwgdGhpcy5zaXplLCB0aGlzLnNpemUsIFwieWVsbG93XCIpO1xuXG4gICAgfVxuICAgIGRyYXdTY29yZSgpOnZvaWR7XG5cbiAgICB9XG4gICAgY2hlY2tCb3VuZGFyeSgpOiBib29sZWFue1xuICAgICAgICByZXR1cm4gdGhpcy5zbmFrZS5jaGVja0JvdW5kYXJ5KC0xLCAgdGhpcy53aWR0aC90aGlzLnNpemUsLTEsIHRoaXMuaGVpZ2h0L3RoaXMuc2l6ZSk7XG4gICAgfVxuICAgIGluaXQoKTp2b2lke1xuICAgICAgICB0aGlzLnBhaW50ZXIuZmlsbEFyZWEoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIFwibGlnaHRncmV5XCIpXG4gICAgICAgIHRoaXMucGFpbnRlci5zdHJva2VBcmVhKDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LFwiYmxhY2tcIilcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NsYXNzZXMvYm9hcmQudHMiLCJpbXBvcnQge0lQb3NpdGlvbn0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pcG9zaXRpb24nO1xuaW1wb3J0IHtJU25ha2V9IGZyb20gJy4uL2ludGVyZmFjZXMvaXNuYWtlJztcbmltcG9ydCB7RGlyZWN0aW9ufSBmcm9tICcuLi9lbnVtcy9kaXJlY3Rpb24nO1xuXG5cbmV4cG9ydCBjbGFzcyBTbmFrZSBpbXBsZW1lbnRzIElTbmFrZXtcbiAgICBjZWxsczogSVBvc2l0aW9uW107XG4gICAgYm9keUNvbG9yOiBzdHJpbmc7XG4gICAgYm9yZGVyQ29sb3I6IHN0cmluZztcbiAgICBkaXJlY3Rpb246IERpcmVjdGlvbjtcbiAgICBsZW5ndGg6IG51bWJlcjtcbiAgICBjb25zdHJ1Y3RvcihfbGVuZ3RoOm51bWJlciwgX2JvZHlDb2xvcjpzdHJpbmcsIF9ib3JkZXJDb2xvcjogc3RyaW5nKXtcbiAgICAgICAgdGhpcy5jZWxscyA9IFtdO1xuICAgICAgICB0aGlzLmxlbmd0aCA9IF9sZW5ndGg7XG4gICAgICAgIHRoaXMuYm9keUNvbG9yID0gX2JvZHlDb2xvcjtcbiAgICAgICAgdGhpcy5ib3JkZXJDb2xvciA9IF9ib3JkZXJDb2xvcjtcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBEaXJlY3Rpb24uRG93bjtcbiAgICAgICAgZm9yKGxldCBpPTA7aTxfbGVuZ3RoO2krKyl7XG4gICAgICAgICAgICB0aGlzLmNlbGxzLnB1c2goe3g6IGksIHk6IDB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoYW5nZURpcmVjdGlvbihrZXlDb2RlOm51bWJlcil7XG4gICAgICAgIHN3aXRjaCAoa2V5Q29kZSkge1xuICAgICAgICAgICAgY2FzZSAzNzpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXJlY3Rpb24gIT0gRGlyZWN0aW9uLlJpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gRGlyZWN0aW9uLkxlZnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOTpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXJlY3Rpb24gIT0gRGlyZWN0aW9uLkxlZnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBEaXJlY3Rpb24uUmlnaHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDM4OlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRpcmVjdGlvbiAhPSBEaXJlY3Rpb24uRG93bikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IERpcmVjdGlvbi5VcDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgNDA6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uICE9IERpcmVjdGlvbi5VcCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IERpcmVjdGlvbi5Eb3duO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vdmUoKXtcbiAgICAgICAgbGV0IHNuYWtlWDogbnVtYmVyID0gdGhpcy5jZWxsc1swXS54O1xuICAgICAgICBsZXQgc25ha2VZOiBudW1iZXIgPSB0aGlzLmNlbGxzWzBdLnk7XG5cbiAgICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uID09IERpcmVjdGlvbi5SaWdodCkge1xuICAgICAgICAgICAgc25ha2VYKys7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kaXJlY3Rpb24gPT0gRGlyZWN0aW9uLkxlZnQpIHtcbiAgICAgICAgICAgIHNuYWtlWC0tO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGlyZWN0aW9uID09IERpcmVjdGlvbi5VcCkge1xuICAgICAgICAgICAgc25ha2VZLS07XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kaXJlY3Rpb24gPT0gRGlyZWN0aW9uLkRvd24pIHtcbiAgICAgICAgICAgIHNuYWtlWSsrO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jZWxscy5wb3AoKTtcbiAgICAgICAgdGhpcy5jZWxscy51bnNoaWZ0KHt4OnNuYWtlWCwgeTpzbmFrZVl9KTtcbiAgICB9XG5cbiAgICBlYXRGb29kKGZvb2Q6SVBvc2l0aW9uKTogYm9vbGVhbntcbiAgICAgICAgbGV0IGhlYWQ6SVBvc2l0aW9uID0gdGhpcy5jZWxsc1swXTtcbiAgICAgICAgaWYoZm9vZC54ID09IGhlYWQueCAmJiBmb29kLnkgPT0gaGVhZC55KXtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNoZWNrQ29sbGlzaW9uKCk6IGJvb2xlYW57XG4gICAgICAgIHZhciB4ID0gdGhpcy5jZWxsc1swXS54O1xuICAgICAgICB2YXIgeSA9IHRoaXMuY2VsbHNbMF0ueTtcbiAgICAgICAgZm9yKHZhciBpID0gMTsgaSA8IHRoaXMuY2VsbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBjZWxsID0gdGhpcy5jZWxsc1tpXTtcbiAgICAgICAgICAgIGlmKGNlbGwueCA9PT0geCAmJiBjZWxsLnkgPT09IHkpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY2hlY2tCb3VuZGFyeShieDE6bnVtYmVyLGJ4MjpudW1iZXIsIGJ5MTpudW1iZXIsIGJ5MjpudW1iZXIgKTpib29sZWFue1xuICAgICAgICB2YXIgZmlyc3RDZWxsID0gdGhpcy5jZWxsc1swXTtcbiAgICAgICAgaWYoZmlyc3RDZWxsLnggPT0gYngxIHx8IGZpcnN0Q2VsbC55ID09IGJ5MSB8fCBmaXJzdENlbGwueCA9PSBieDIgfHwgZmlyc3RDZWxsLnkgPT0gYnkyKXtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jbGFzc2VzL3NuYWtlLnRzIiwiZXhwb3J0IGVudW0gRGlyZWN0aW9uIHtcbiAgICBVcCxcbiAgICBEb3duLFxuICAgIExlZnQsXG4gICAgUmlnaHRcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9lbnVtcy9kaXJlY3Rpb24udHMiLCJcbmltcG9ydCB7SVBvc2l0aW9ufSBmcm9tICcuLi9pbnRlcmZhY2VzL2lwb3NpdGlvbic7XG5pbXBvcnQge0lGb29kfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lmb29kJztcblxuZXhwb3J0IGNsYXNzIEZvb2QgaW1wbGVtZW50cyBJRm9vZHtcbiAgICBwb3NpdGlvbjogSVBvc2l0aW9uO1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMuY3JlYXRlRm9vZCgpO1xuICAgIH1cbiAgICBjcmVhdGVGb29kKCk6dm9pZHtcbiAgICAgICAgbGV0IHBvcyA9IHtcbiAgICAgICAgICAgIHg6TWF0aC5yYW5kb20oKSozMCxcbiAgICAgICAgICAgIHk6TWF0aC5yYW5kb20oKSozMFxuICAgICAgICB9XG4gICAgICAgIHRoaXMucG9zaXRpb24gPSBwb3M7XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jbGFzc2VzL2Zvb2QudHMiXSwic291cmNlUm9vdCI6IiJ9