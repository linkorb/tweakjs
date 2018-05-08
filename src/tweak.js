(function (w, d) {
  var t = {
    debug: false,
    setDebug: function() {
      this.debug = w.tweakDebug || this.debug
    },
    log: function (data) {
      if (this.debug) console.log(data)
    },
    getHandler: function (action) {
      return typeof t.handlers[action] === 'function' ? t.handlers[action] : null
    },
    getDocumentHead: function () {
      return d.head || d.getElementsByTagName('head')[0]
    },
    init: function (event) {
      this.setDebug()
      this.log('tweakjs initializing ...')
      this.loader.loadGlobal().loadUri()
    },
    apply: function (tweaks) {
      tweaks.forEach(t.applyTweak)
    },
    applyTweak: function (tweak) {
      let handler = t.getHandler(tweak.action)
      if (handler) {
        if (typeof tweak['selector'] === 'undefined') {
          handler(tweak)
        } else {
          let eles = d.querySelectorAll(tweak.selector)
          eles.forEach(function (ele) {
            handler(ele, tweak)
          })
        }
      } else {
        t.log('Undefined handler: ' + tweak.action)
      }
    },
    stringToFunction: function (string, context) {
      var namespaces = string.split('.');
      if (!context)
        context = window;
      for (var i = 0; i < namespaces.length; i++)
        context = context[namespaces[i]];
      return context;
    },

    handlers: {
      setInnerText: function (e, tweak) {
        e.innerText = tweak.value
      },
      setInnerHtml: function (e, tweak) {
        e.innerHTML = tweak.value
      },
      setAttribute: function (e, tweak) {
        let attr = tweak.attribute
        e[attr] = tweak.value
      },
      hide: function (e, tweak) {
        e.style.display = 'none'
      },
      show: function (e, tweak) {
        e.style.display = ''
      },
      setStyleAttribute: function (e, tweak) {
        let attr = tweak.attribute
        e.style[attr] = tweak.value
      },
      addClass: function (e, tweak) {
        e.classList.add(tweak.value)
      },
      removeClass: function (e, tweak) {
        e.classList.remove(tweak.value)
      },
      remove: function (e, tweak) {
        e.remove()
      },
      addStyle: function (tweak) {
        let head = t.getDocumentHead(),
          style = d.createElement('style')
        style.type = 'text/css';
        if (style.styleSheet) {
          style.styleSheet.cssText = tweak.value;
        } else {
          style.appendChild(d.createTextNode(tweak.value));
        }
        head.appendChild(style);
      },
      addScript: function (tweak) {
        let location = tweak['location'] || 'body',
          s = d.createElement('script'),
          container
        if (location == 'body') {
          container = d.body
        } else {
          container = t.getDocumentHead()
        }
        s.type = 'text/javascript';
        if (tweak['src']) {
          s.src = tweak.src
        } else {
          s.innerHTML = tweak.value;
        }
        container.appendChild(s)
      },
      execute: function (tweak) {
        let f = t.stringToFunction(tweak.value)
        if (f) {
          f()
        } else {
          eval(tweak.value)
        }
      }
    },
    loader: {
      load: function(tweaks) {
        t.apply(tweaks)
      },
      loadGlobal: function() {
        if (w.tweaks) {
          t.setDebug()
          t.apply(w.tweaks)
        }
        return this;
      },
      loadUri: function(){
        if (t.debug) {
          let uri = this.getUrlParameter('tweaksUrl'), s = d.createElement('script')
          if (uri) {
            s.type = 'text/javascript'
            s.onload = w.tweakjs.loader.loadGlobal
            s.async = true
            s.src = uri
            t.getDocumentHead().appendChild(s)
          }
        }
      },
      getUrlParameter: function(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
        let regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
        let results = regex.exec(location.search)
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
      }
    }
  }
  w.tweakjs = t;
  d.addEventListener('DOMContentLoaded', t.init.bind(t));

})(window, document);
