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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/tweak.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/tweak.js":
/*!**********************!*\
  !*** ./src/tweak.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("(function (w, d) {\n  var t = {\n    debug: false,\n    log: function (data) {\n      if (this.debug) console.log(data)\n    },\n    getHandler: function (action) {\n      return typeof t.handlers[action] === 'function' ? t.handlers[action] : null\n    },\n    getDocumentHead: function () {\n      return d.head || d.getElementsByTagName('head')[0]\n    },\n    init: function (event) {\n      this.debug = w.tweakDebug || this.debug\n      this.log('tweakjs initializing ...')\n      this.loader.loadGlobal().loadUri()\n    },\n    apply: function (tweaks) {\n      tweaks.forEach(t.applyTweak)\n    },\n    applyTweak: function (tweak) {\n      let handler = t.getHandler(tweak.action)\n      if (handler) {\n        if (typeof tweak['selector'] === 'undefined') {\n          handler(tweak)\n        } else {\n          let eles = d.querySelectorAll(tweak.selector)\n          eles.forEach(function (ele) {\n            handler(ele, tweak)\n          })\n        }\n      } else {\n        t.log('Undefined handler: ' + tweak.action)\n      }\n    },\n    stringToFunction: function (string, context) {\n      var namespaces = string.split('.');\n      if (!context)\n        context = window;\n      for (var i = 0; i < namespaces.length; i++)\n        context = context[namespaces[i]];\n      return context;\n    },\n\n    handlers: {\n      setInnerText: function (e, tweak) {\n        e.innerText = tweak.value\n      },\n      setInnerHtml: function (e, tweak) {\n        e.innerHTML = tweak.value\n      },\n      setAttribute: function (e, tweak) {\n        let attr = tweak.attribute\n        e[attr] = tweak.value\n      },\n      hide: function (e, tweak) {\n        e.style.display = 'none'\n      },\n      show: function (e, tweak) {\n        e.style.display = ''\n      },\n      setStyleAttribute: function (e, tweak) {\n        let attr = tweak.attribute\n        e.style[attr] = tweak.value\n      },\n      addClass: function (e, tweak) {\n        e.classList.add(tweak.value)\n      },\n      removeClass: function (e, tweak) {\n        e.classList.remove(tweak.value)\n      },\n      remove: function (e, tweak) {\n        e.remove()\n      },\n      addStyle: function (tweak) {\n        let head = t.getDocumentHead(),\n          style = d.createElement('style')\n        style.type = 'text/css';\n        if (style.styleSheet) {\n          style.styleSheet.cssText = tweak.value;\n        } else {\n          style.appendChild(d.createTextNode(tweak.value));\n        }\n        head.appendChild(style);\n      },\n      addScript: function (tweak) {\n        let location = tweak['location'] || 'body',\n          s = d.createElement('script'),\n          container\n        if (location == 'body') {\n          container = d.body\n        } else {\n          container = t.getDocumentHead()\n        }\n        s.type = 'text/javascript';\n        if (tweak['src']) {\n          s.src = tweak.src\n        } else {\n          s.innerHTML = tweak.value;\n        }\n        container.appendChild(s)\n      },\n      execute: function (tweak) {\n        let f = t.stringToFunction(tweak.value)\n        if (f) {\n          f()\n        } else {\n          eval(tweak.value)\n        }\n      }\n    },\n    loader: {\n      load: function(tweaks) {\n        t.apply(tweaks)\n      },\n      loadGlobal: function() {\n        if (w.tweaks) {\n          t.apply(w.tweaks)\n        }\n        return this;\n      },\n      loadUri: function(){\n        if (t.debug) {\n          let uri = this.getUrlParameter('tweaksUrl'), s = d.createElement('script')\n          if (uri) {\n            s.type = 'text/javascript'\n            s.onload = w.tweakjs.loader.loadGlobal\n            s.src = uri\n            t.getDocumentHead().appendChild(s)\n          }\n        }\n      },\n      getUrlParameter: function(name) {\n        name = name.replace(/[\\[]/, '\\\\[').replace(/[\\]]/, '\\\\]')\n        let regex = new RegExp('[\\\\?&]' + name + '=([^&#]*)')\n        let results = regex.exec(location.search)\n        return results === null ? '' : decodeURIComponent(results[1].replace(/\\+/g, ' '))\n      }\n    }\n  }\n  w.tweakjs = t;\n  d.addEventListener('DOMContentLoaded', t.init.bind(t));\n\n})(window, document);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdHdlYWsuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdHdlYWsuanM/NmYzMiJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKHcsIGQpIHtcbiAgdmFyIHQgPSB7XG4gICAgZGVidWc6IGZhbHNlLFxuICAgIGxvZzogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyhkYXRhKVxuICAgIH0sXG4gICAgZ2V0SGFuZGxlcjogZnVuY3Rpb24gKGFjdGlvbikge1xuICAgICAgcmV0dXJuIHR5cGVvZiB0LmhhbmRsZXJzW2FjdGlvbl0gPT09ICdmdW5jdGlvbicgPyB0LmhhbmRsZXJzW2FjdGlvbl0gOiBudWxsXG4gICAgfSxcbiAgICBnZXREb2N1bWVudEhlYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBkLmhlYWQgfHwgZC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdXG4gICAgfSxcbiAgICBpbml0OiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIHRoaXMuZGVidWcgPSB3LnR3ZWFrRGVidWcgfHwgdGhpcy5kZWJ1Z1xuICAgICAgdGhpcy5sb2coJ3R3ZWFranMgaW5pdGlhbGl6aW5nIC4uLicpXG4gICAgICB0aGlzLmxvYWRlci5sb2FkR2xvYmFsKCkubG9hZFVyaSgpXG4gICAgfSxcbiAgICBhcHBseTogZnVuY3Rpb24gKHR3ZWFrcykge1xuICAgICAgdHdlYWtzLmZvckVhY2godC5hcHBseVR3ZWFrKVxuICAgIH0sXG4gICAgYXBwbHlUd2VhazogZnVuY3Rpb24gKHR3ZWFrKSB7XG4gICAgICBsZXQgaGFuZGxlciA9IHQuZ2V0SGFuZGxlcih0d2Vhay5hY3Rpb24pXG4gICAgICBpZiAoaGFuZGxlcikge1xuICAgICAgICBpZiAodHlwZW9mIHR3ZWFrWydzZWxlY3RvciddID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGhhbmRsZXIodHdlYWspXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGV0IGVsZXMgPSBkLnF1ZXJ5U2VsZWN0b3JBbGwodHdlYWsuc2VsZWN0b3IpXG4gICAgICAgICAgZWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChlbGUpIHtcbiAgICAgICAgICAgIGhhbmRsZXIoZWxlLCB0d2VhaylcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0LmxvZygnVW5kZWZpbmVkIGhhbmRsZXI6ICcgKyB0d2Vhay5hY3Rpb24pXG4gICAgICB9XG4gICAgfSxcbiAgICBzdHJpbmdUb0Z1bmN0aW9uOiBmdW5jdGlvbiAoc3RyaW5nLCBjb250ZXh0KSB7XG4gICAgICB2YXIgbmFtZXNwYWNlcyA9IHN0cmluZy5zcGxpdCgnLicpO1xuICAgICAgaWYgKCFjb250ZXh0KVxuICAgICAgICBjb250ZXh0ID0gd2luZG93O1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuYW1lc3BhY2VzLmxlbmd0aDsgaSsrKVxuICAgICAgICBjb250ZXh0ID0gY29udGV4dFtuYW1lc3BhY2VzW2ldXTtcbiAgICAgIHJldHVybiBjb250ZXh0O1xuICAgIH0sXG5cbiAgICBoYW5kbGVyczoge1xuICAgICAgc2V0SW5uZXJUZXh0OiBmdW5jdGlvbiAoZSwgdHdlYWspIHtcbiAgICAgICAgZS5pbm5lclRleHQgPSB0d2Vhay52YWx1ZVxuICAgICAgfSxcbiAgICAgIHNldElubmVySHRtbDogZnVuY3Rpb24gKGUsIHR3ZWFrKSB7XG4gICAgICAgIGUuaW5uZXJIVE1MID0gdHdlYWsudmFsdWVcbiAgICAgIH0sXG4gICAgICBzZXRBdHRyaWJ1dGU6IGZ1bmN0aW9uIChlLCB0d2Vhaykge1xuICAgICAgICBsZXQgYXR0ciA9IHR3ZWFrLmF0dHJpYnV0ZVxuICAgICAgICBlW2F0dHJdID0gdHdlYWsudmFsdWVcbiAgICAgIH0sXG4gICAgICBoaWRlOiBmdW5jdGlvbiAoZSwgdHdlYWspIHtcbiAgICAgICAgZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgICB9LFxuICAgICAgc2hvdzogZnVuY3Rpb24gKGUsIHR3ZWFrKSB7XG4gICAgICAgIGUuc3R5bGUuZGlzcGxheSA9ICcnXG4gICAgICB9LFxuICAgICAgc2V0U3R5bGVBdHRyaWJ1dGU6IGZ1bmN0aW9uIChlLCB0d2Vhaykge1xuICAgICAgICBsZXQgYXR0ciA9IHR3ZWFrLmF0dHJpYnV0ZVxuICAgICAgICBlLnN0eWxlW2F0dHJdID0gdHdlYWsudmFsdWVcbiAgICAgIH0sXG4gICAgICBhZGRDbGFzczogZnVuY3Rpb24gKGUsIHR3ZWFrKSB7XG4gICAgICAgIGUuY2xhc3NMaXN0LmFkZCh0d2Vhay52YWx1ZSlcbiAgICAgIH0sXG4gICAgICByZW1vdmVDbGFzczogZnVuY3Rpb24gKGUsIHR3ZWFrKSB7XG4gICAgICAgIGUuY2xhc3NMaXN0LnJlbW92ZSh0d2Vhay52YWx1ZSlcbiAgICAgIH0sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIChlLCB0d2Vhaykge1xuICAgICAgICBlLnJlbW92ZSgpXG4gICAgICB9LFxuICAgICAgYWRkU3R5bGU6IGZ1bmN0aW9uICh0d2Vhaykge1xuICAgICAgICBsZXQgaGVhZCA9IHQuZ2V0RG9jdW1lbnRIZWFkKCksXG4gICAgICAgICAgc3R5bGUgPSBkLmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJylcbiAgICAgICAgc3R5bGUudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgICAgIGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG4gICAgICAgICAgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gdHdlYWsudmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3R5bGUuYXBwZW5kQ2hpbGQoZC5jcmVhdGVUZXh0Tm9kZSh0d2Vhay52YWx1ZSkpO1xuICAgICAgICB9XG4gICAgICAgIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICAgICAgfSxcbiAgICAgIGFkZFNjcmlwdDogZnVuY3Rpb24gKHR3ZWFrKSB7XG4gICAgICAgIGxldCBsb2NhdGlvbiA9IHR3ZWFrWydsb2NhdGlvbiddIHx8ICdib2R5JyxcbiAgICAgICAgICBzID0gZC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKSxcbiAgICAgICAgICBjb250YWluZXJcbiAgICAgICAgaWYgKGxvY2F0aW9uID09ICdib2R5Jykge1xuICAgICAgICAgIGNvbnRhaW5lciA9IGQuYm9keVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnRhaW5lciA9IHQuZ2V0RG9jdW1lbnRIZWFkKClcbiAgICAgICAgfVxuICAgICAgICBzLnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcbiAgICAgICAgaWYgKHR3ZWFrWydzcmMnXSkge1xuICAgICAgICAgIHMuc3JjID0gdHdlYWsuc3JjXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcy5pbm5lckhUTUwgPSB0d2Vhay52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocylcbiAgICAgIH0sXG4gICAgICBleGVjdXRlOiBmdW5jdGlvbiAodHdlYWspIHtcbiAgICAgICAgbGV0IGYgPSB0LnN0cmluZ1RvRnVuY3Rpb24odHdlYWsudmFsdWUpXG4gICAgICAgIGlmIChmKSB7XG4gICAgICAgICAgZigpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZXZhbCh0d2Vhay52YWx1ZSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgbG9hZGVyOiB7XG4gICAgICBsb2FkOiBmdW5jdGlvbih0d2Vha3MpIHtcbiAgICAgICAgdC5hcHBseSh0d2Vha3MpXG4gICAgICB9LFxuICAgICAgbG9hZEdsb2JhbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh3LnR3ZWFrcykge1xuICAgICAgICAgIHQuYXBwbHkody50d2Vha3MpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9LFxuICAgICAgbG9hZFVyaTogZnVuY3Rpb24oKXtcbiAgICAgICAgaWYgKHQuZGVidWcpIHtcbiAgICAgICAgICBsZXQgdXJpID0gdGhpcy5nZXRVcmxQYXJhbWV0ZXIoJ3R3ZWFrc1VybCcpLCBzID0gZC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKVxuICAgICAgICAgIGlmICh1cmkpIHtcbiAgICAgICAgICAgIHMudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnXG4gICAgICAgICAgICBzLm9ubG9hZCA9IHcudHdlYWtqcy5sb2FkZXIubG9hZEdsb2JhbFxuICAgICAgICAgICAgcy5zcmMgPSB1cmlcbiAgICAgICAgICAgIHQuZ2V0RG9jdW1lbnRIZWFkKCkuYXBwZW5kQ2hpbGQocylcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnZXRVcmxQYXJhbWV0ZXI6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgbmFtZSA9IG5hbWUucmVwbGFjZSgvW1xcW10vLCAnXFxcXFsnKS5yZXBsYWNlKC9bXFxdXS8sICdcXFxcXScpXG4gICAgICAgIGxldCByZWdleCA9IG5ldyBSZWdFeHAoJ1tcXFxcPyZdJyArIG5hbWUgKyAnPShbXiYjXSopJylcbiAgICAgICAgbGV0IHJlc3VsdHMgPSByZWdleC5leGVjKGxvY2F0aW9uLnNlYXJjaClcbiAgICAgICAgcmV0dXJuIHJlc3VsdHMgPT09IG51bGwgPyAnJyA6IGRlY29kZVVSSUNvbXBvbmVudChyZXN1bHRzWzFdLnJlcGxhY2UoL1xcKy9nLCAnICcpKVxuICAgICAgfVxuICAgIH1cbiAgfVxuICB3LnR3ZWFranMgPSB0O1xuICBkLmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCB0LmluaXQuYmluZCh0KSk7XG5cbn0pKHdpbmRvdywgZG9jdW1lbnQpO1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/tweak.js\n");

/***/ })

/******/ });