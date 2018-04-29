(function(w,d) {

  this.log = function(data) {
    console.log(data);
  }

  this.init = function(event) {
    log('Initializing tweak.js')
    log(tweaks)
    apply(tweaks)
  }

  this.apply = function(tweaks) {
    log('Applying tweaks')
    tweaks.forEach(function(tweak) {
      var actionHandler = tweak.action + 'Handler'
      if (!window[actionHandler]) {
        log("Undefined handler: " + actionHandler)
        return
      }
      var e = document.querySelector(tweak.selector)
      if (e) {
        window[actionHandler](e, tweak)
      }

    })
  }

  this.setInnerTextHandler = function(e, tweak)
  {
    e.innerText = tweak.value
  }

  this.setAttributeHandler = function(e, tweak)
  {
    var attr = tweak.attribute
    e[attr] = tweak.value
  }

  this.hideHandler = function(e, tweak)
  {
    e.style.display = "none"
  }

  this.showHandler = function(e, tweak)
  {
    e.style.display = ""
  }

  this.setStyleAttributeHandler = function(e, tweak)
  {
    var attr = tweak.attribute
    e.style[attr] = tweak.value
  }

  log('Loaded tweak.js');

  document.addEventListener("DOMContentLoaded", init);

})(window, document);

