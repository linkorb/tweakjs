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

eval("(function (w, d) {\n  var t = {\n    debug: false,\n    setDebug: function() {\n      this.debug = w.tweakDebug || this.debug\n    },\n    log: function (data) {\n      if (this.debug) console.log(data)\n    },\n    getHandler: function (action) {\n      return typeof t.handlers[action] === 'function' ? t.handlers[action] : null\n    },\n    getDocumentHead: function () {\n      return d.head || d.getElementsByTagName('head')[0]\n    },\n    init: function (event) {\n      this.setDebug()\n      this.log('tweakjs initializing ...')\n      this.loader.loadGlobal().loadUri()\n    },\n    apply: function (tweaks) {\n      tweaks.forEach(t.applyTweak)\n    },\n    applyTweak: function (tweak) {\n      let handler = t.getHandler(tweak.action)\n      if (handler) {\n        if (typeof tweak['selector'] === 'undefined') {\n          handler(tweak)\n        } else {\n          let eles = d.querySelectorAll(tweak.selector)\n          eles.forEach(function (ele) {\n            handler(ele, tweak)\n          })\n        }\n      } else {\n        t.log('Undefined handler: ' + tweak.action)\n      }\n    },\n    stringToFunction: function (string, context) {\n      var namespaces = string.split('.');\n      if (!context)\n        context = window;\n      for (var i = 0; i < namespaces.length; i++)\n        context = context[namespaces[i]];\n      return context;\n    },\n\n    handlers: {\n      setInnerText: function (e, tweak) {\n        e.innerText = tweak.value\n      },\n      setInnerHtml: function (e, tweak) {\n        e.innerHTML = tweak.value\n      },\n      setAttribute: function (e, tweak) {\n        let attr = tweak.attribute\n        e[attr] = tweak.value\n      },\n      hide: function (e, tweak) {\n        e.style.display = 'none'\n      },\n      show: function (e, tweak) {\n        e.style.display = ''\n      },\n      setStyleAttribute: function (e, tweak) {\n        let attr = tweak.attribute\n        e.style[attr] = tweak.value\n      },\n      addClass: function (e, tweak) {\n        e.classList.add(tweak.value)\n      },\n      removeClass: function (e, tweak) {\n        e.classList.remove(tweak.value)\n      },\n      remove: function (e, tweak) {\n        e.remove()\n      },\n      addStyle: function (tweak) {\n        let head = t.getDocumentHead(),\n          style = d.createElement('style')\n        style.type = 'text/css';\n        if (style.styleSheet) {\n          style.styleSheet.cssText = tweak.value;\n        } else {\n          style.appendChild(d.createTextNode(tweak.value));\n        }\n        head.appendChild(style);\n      },\n      addScript: function (tweak) {\n        let location = tweak['location'] || 'body',\n          s = d.createElement('script'),\n          container\n        if (location == 'body') {\n          container = d.body\n        } else {\n          container = t.getDocumentHead()\n        }\n        s.type = 'text/javascript';\n        if (tweak['src']) {\n          s.src = tweak.src\n        } else {\n          s.innerHTML = tweak.value;\n        }\n        container.appendChild(s)\n      },\n      execute: function (tweak) {\n        let f = t.stringToFunction(tweak.value)\n        if (f) {\n          f()\n        } else {\n          eval(tweak.value)\n        }\n      }\n    },\n    loader: {\n      load: function(tweaks) {\n        t.apply(tweaks)\n      },\n      loadGlobal: function() {\n        if (w.tweaks) {\n          t.setDebug()\n          t.apply(w.tweaks)\n        }\n        return this;\n      },\n      loadUri: function(){\n        if (t.debug) {\n          let uri = this.getUrlParameter('tweaksUrl'), s = d.createElement('script')\n          if (uri) {\n            s.type = 'text/javascript'\n            s.onload = w.tweakjs.loader.loadGlobal\n            s.async = true\n            s.src = uri\n            t.getDocumentHead().appendChild(s)\n          }\n        }\n      },\n      getUrlParameter: function(name) {\n        name = name.replace(/[\\[]/, '\\\\[').replace(/[\\]]/, '\\\\]')\n        let regex = new RegExp('[\\\\?&]' + name + '=([^&#]*)')\n        let results = regex.exec(location.search)\n        return results === null ? '' : decodeURIComponent(results[1].replace(/\\+/g, ' '))\n      }\n    }\n  }\n  w.tweakjs = t;\n  d.addEventListener('DOMContentLoaded', t.init.bind(t));\n\n})(window, document);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdHdlYWsuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdHdlYWsuanM/NmYzMiJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKHcsIGQpIHtcbiAgdmFyIHQgPSB7XG4gICAgZGVidWc6IGZhbHNlLFxuICAgIHNldERlYnVnOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZGVidWcgPSB3LnR3ZWFrRGVidWcgfHwgdGhpcy5kZWJ1Z1xuICAgIH0sXG4gICAgbG9nOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgfSxcbiAgICBnZXRIYW5kbGVyOiBmdW5jdGlvbiAoYWN0aW9uKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHQuaGFuZGxlcnNbYWN0aW9uXSA9PT0gJ2Z1bmN0aW9uJyA/IHQuaGFuZGxlcnNbYWN0aW9uXSA6IG51bGxcbiAgICB9LFxuICAgIGdldERvY3VtZW50SGVhZDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGQuaGVhZCB8fCBkLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF1cbiAgICB9LFxuICAgIGluaXQ6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgdGhpcy5zZXREZWJ1ZygpXG4gICAgICB0aGlzLmxvZygndHdlYWtqcyBpbml0aWFsaXppbmcgLi4uJylcbiAgICAgIHRoaXMubG9hZGVyLmxvYWRHbG9iYWwoKS5sb2FkVXJpKClcbiAgICB9LFxuICAgIGFwcGx5OiBmdW5jdGlvbiAodHdlYWtzKSB7XG4gICAgICB0d2Vha3MuZm9yRWFjaCh0LmFwcGx5VHdlYWspXG4gICAgfSxcbiAgICBhcHBseVR3ZWFrOiBmdW5jdGlvbiAodHdlYWspIHtcbiAgICAgIGxldCBoYW5kbGVyID0gdC5nZXRIYW5kbGVyKHR3ZWFrLmFjdGlvbilcbiAgICAgIGlmIChoYW5kbGVyKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdHdlYWtbJ3NlbGVjdG9yJ10gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgaGFuZGxlcih0d2VhaylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsZXQgZWxlcyA9IGQucXVlcnlTZWxlY3RvckFsbCh0d2Vhay5zZWxlY3RvcilcbiAgICAgICAgICBlbGVzLmZvckVhY2goZnVuY3Rpb24gKGVsZSkge1xuICAgICAgICAgICAgaGFuZGxlcihlbGUsIHR3ZWFrKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHQubG9nKCdVbmRlZmluZWQgaGFuZGxlcjogJyArIHR3ZWFrLmFjdGlvbilcbiAgICAgIH1cbiAgICB9LFxuICAgIHN0cmluZ1RvRnVuY3Rpb246IGZ1bmN0aW9uIChzdHJpbmcsIGNvbnRleHQpIHtcbiAgICAgIHZhciBuYW1lc3BhY2VzID0gc3RyaW5nLnNwbGl0KCcuJyk7XG4gICAgICBpZiAoIWNvbnRleHQpXG4gICAgICAgIGNvbnRleHQgPSB3aW5kb3c7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5hbWVzcGFjZXMubGVuZ3RoOyBpKyspXG4gICAgICAgIGNvbnRleHQgPSBjb250ZXh0W25hbWVzcGFjZXNbaV1dO1xuICAgICAgcmV0dXJuIGNvbnRleHQ7XG4gICAgfSxcblxuICAgIGhhbmRsZXJzOiB7XG4gICAgICBzZXRJbm5lclRleHQ6IGZ1bmN0aW9uIChlLCB0d2Vhaykge1xuICAgICAgICBlLmlubmVyVGV4dCA9IHR3ZWFrLnZhbHVlXG4gICAgICB9LFxuICAgICAgc2V0SW5uZXJIdG1sOiBmdW5jdGlvbiAoZSwgdHdlYWspIHtcbiAgICAgICAgZS5pbm5lckhUTUwgPSB0d2Vhay52YWx1ZVxuICAgICAgfSxcbiAgICAgIHNldEF0dHJpYnV0ZTogZnVuY3Rpb24gKGUsIHR3ZWFrKSB7XG4gICAgICAgIGxldCBhdHRyID0gdHdlYWsuYXR0cmlidXRlXG4gICAgICAgIGVbYXR0cl0gPSB0d2Vhay52YWx1ZVxuICAgICAgfSxcbiAgICAgIGhpZGU6IGZ1bmN0aW9uIChlLCB0d2Vhaykge1xuICAgICAgICBlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICAgIH0sXG4gICAgICBzaG93OiBmdW5jdGlvbiAoZSwgdHdlYWspIHtcbiAgICAgICAgZS5zdHlsZS5kaXNwbGF5ID0gJydcbiAgICAgIH0sXG4gICAgICBzZXRTdHlsZUF0dHJpYnV0ZTogZnVuY3Rpb24gKGUsIHR3ZWFrKSB7XG4gICAgICAgIGxldCBhdHRyID0gdHdlYWsuYXR0cmlidXRlXG4gICAgICAgIGUuc3R5bGVbYXR0cl0gPSB0d2Vhay52YWx1ZVxuICAgICAgfSxcbiAgICAgIGFkZENsYXNzOiBmdW5jdGlvbiAoZSwgdHdlYWspIHtcbiAgICAgICAgZS5jbGFzc0xpc3QuYWRkKHR3ZWFrLnZhbHVlKVxuICAgICAgfSxcbiAgICAgIHJlbW92ZUNsYXNzOiBmdW5jdGlvbiAoZSwgdHdlYWspIHtcbiAgICAgICAgZS5jbGFzc0xpc3QucmVtb3ZlKHR3ZWFrLnZhbHVlKVxuICAgICAgfSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gKGUsIHR3ZWFrKSB7XG4gICAgICAgIGUucmVtb3ZlKClcbiAgICAgIH0sXG4gICAgICBhZGRTdHlsZTogZnVuY3Rpb24gKHR3ZWFrKSB7XG4gICAgICAgIGxldCBoZWFkID0gdC5nZXREb2N1bWVudEhlYWQoKSxcbiAgICAgICAgICBzdHlsZSA9IGQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKVxuICAgICAgICBzdHlsZS50eXBlID0gJ3RleHQvY3NzJztcbiAgICAgICAgaWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICAgICAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSB0d2Vhay52YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdHlsZS5hcHBlbmRDaGlsZChkLmNyZWF0ZVRleHROb2RlKHR3ZWFrLnZhbHVlKSk7XG4gICAgICAgIH1cbiAgICAgICAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gICAgICB9LFxuICAgICAgYWRkU2NyaXB0OiBmdW5jdGlvbiAodHdlYWspIHtcbiAgICAgICAgbGV0IGxvY2F0aW9uID0gdHdlYWtbJ2xvY2F0aW9uJ10gfHwgJ2JvZHknLFxuICAgICAgICAgIHMgPSBkLmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpLFxuICAgICAgICAgIGNvbnRhaW5lclxuICAgICAgICBpZiAobG9jYXRpb24gPT0gJ2JvZHknKSB7XG4gICAgICAgICAgY29udGFpbmVyID0gZC5ib2R5XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29udGFpbmVyID0gdC5nZXREb2N1bWVudEhlYWQoKVxuICAgICAgICB9XG4gICAgICAgIHMudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuICAgICAgICBpZiAodHdlYWtbJ3NyYyddKSB7XG4gICAgICAgICAgcy5zcmMgPSB0d2Vhay5zcmNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzLmlubmVySFRNTCA9IHR3ZWFrLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzKVxuICAgICAgfSxcbiAgICAgIGV4ZWN1dGU6IGZ1bmN0aW9uICh0d2Vhaykge1xuICAgICAgICBsZXQgZiA9IHQuc3RyaW5nVG9GdW5jdGlvbih0d2Vhay52YWx1ZSlcbiAgICAgICAgaWYgKGYpIHtcbiAgICAgICAgICBmKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBldmFsKHR3ZWFrLnZhbHVlKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBsb2FkZXI6IHtcbiAgICAgIGxvYWQ6IGZ1bmN0aW9uKHR3ZWFrcykge1xuICAgICAgICB0LmFwcGx5KHR3ZWFrcylcbiAgICAgIH0sXG4gICAgICBsb2FkR2xvYmFsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHcudHdlYWtzKSB7XG4gICAgICAgICAgdC5zZXREZWJ1ZygpXG4gICAgICAgICAgdC5hcHBseSh3LnR3ZWFrcylcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH0sXG4gICAgICBsb2FkVXJpOiBmdW5jdGlvbigpe1xuICAgICAgICBpZiAodC5kZWJ1Zykge1xuICAgICAgICAgIGxldCB1cmkgPSB0aGlzLmdldFVybFBhcmFtZXRlcigndHdlYWtzVXJsJyksIHMgPSBkLmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpXG4gICAgICAgICAgaWYgKHVyaSkge1xuICAgICAgICAgICAgcy50eXBlID0gJ3RleHQvamF2YXNjcmlwdCdcbiAgICAgICAgICAgIHMub25sb2FkID0gdy50d2Vha2pzLmxvYWRlci5sb2FkR2xvYmFsXG4gICAgICAgICAgICBzLmFzeW5jID0gdHJ1ZVxuICAgICAgICAgICAgcy5zcmMgPSB1cmlcbiAgICAgICAgICAgIHQuZ2V0RG9jdW1lbnRIZWFkKCkuYXBwZW5kQ2hpbGQocylcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnZXRVcmxQYXJhbWV0ZXI6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgbmFtZSA9IG5hbWUucmVwbGFjZSgvW1xcW10vLCAnXFxcXFsnKS5yZXBsYWNlKC9bXFxdXS8sICdcXFxcXScpXG4gICAgICAgIGxldCByZWdleCA9IG5ldyBSZWdFeHAoJ1tcXFxcPyZdJyArIG5hbWUgKyAnPShbXiYjXSopJylcbiAgICAgICAgbGV0IHJlc3VsdHMgPSByZWdleC5leGVjKGxvY2F0aW9uLnNlYXJjaClcbiAgICAgICAgcmV0dXJuIHJlc3VsdHMgPT09IG51bGwgPyAnJyA6IGRlY29kZVVSSUNvbXBvbmVudChyZXN1bHRzWzFdLnJlcGxhY2UoL1xcKy9nLCAnICcpKVxuICAgICAgfVxuICAgIH1cbiAgfVxuICB3LnR3ZWFranMgPSB0O1xuICBkLmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCB0LmluaXQuYmluZCh0KSk7XG5cbn0pKHdpbmRvdywgZG9jdW1lbnQpO1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/tweak.js\n");

/***/ })

/******/ });