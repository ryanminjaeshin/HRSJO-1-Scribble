/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkhrsjo1_scribble"] = self["webpackChunkhrsjo1_scribble"] || []).push([["src_components_ScribbleBoard_jsx"],{

/***/ "./src/components/ScribbleBoard.jsx":
/*!******************************************!*\
  !*** ./src/components/ScribbleBoard.jsx ***!
  \******************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react_p5__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-p5 */ \"./node_modules/react-p5/build/index.js\");\n/* harmony import */ var react_p5__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_p5__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_enums_socketEvents__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/enums/socketEvents */ \"./src/lib/enums/socketEvents.js\");\n\n\n\n\nfunction ScribbleBoard(_ref) {\n  var socket = _ref.socket,\n      currentDrawer = _ref.currentDrawer;\n  var x = 50;\n  var y = 50;\n\n  var setup = function setup(p5, canvasParentRef) {\n    p5.createCanvas(500, 500).parent(canvasParentRef);\n    p5.background(0);\n    socket.on(_lib_enums_socketEvents__WEBPACK_IMPORTED_MODULE_2__.default.DRAW, function (data) {\n      console.log(\"Got: \" + data.x + \" \" + data.y);\n      p5.fill(0, 0, 255);\n      p5.noStroke();\n      p5.ellipse(data.x, data.y, 20, 20);\n    });\n  };\n\n  function sendmouse(xpos, ypos) {\n    console.log(\"sendmouse: \" + xpos + \" \" + ypos); // Make a little object with  and y\n\n    var data = {\n      x: xpos,\n      y: ypos\n    }; // Send that object to the socket\n\n    socket.emit(_lib_enums_socketEvents__WEBPACK_IMPORTED_MODULE_2__.default.DRAW, data);\n  }\n\n  function mouseDragged(p5) {\n    // Draw some white circles\n    if (currentDrawer) {\n      p5.fill(255);\n      p5.noStroke();\n      p5.ellipse(p5.mouseX, p5.mouseY, 20, 20); // Send the mouse coordinates\n\n      sendmouse(p5.mouseX, p5.mouseY);\n    }\n  }\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement((react_p5__WEBPACK_IMPORTED_MODULE_1___default()), {\n    setup: setup,\n    mouseDragged: mouseDragged\n  });\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ScribbleBoard);\n\n//# sourceURL=webpack://hrsjo1-scribble/./src/components/ScribbleBoard.jsx?");

/***/ })

}]);