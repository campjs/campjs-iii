(function() {

var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    // At least Safari 3+: "[object HTMLElementConstructor]"
var isChrome = !!window.chrome && !isOpera;              // Chrome 1+
var isIE = /*@cc_on!@*/false || !!document.documentMode; // At least IE6

var bg = document.getElementById('background')
var wrap = document.querySelector('.wrap')

if (!(isChrome) && !(isSafari)) {
  return
}

if (isSafari) {
  bg.style.minHeight = "100%"
  //bg.style.width = window.innerWidth + 'px'
  //setTimeout(function() {
    //drawBg()
  //})
}

var needsDraw = true

window.addEventListener('scroll', function() {
  needsDraw = true
})

window.addEventListener('resize', function() {
  needsDraw = true
  bg.style.width = window.innerWidth + 'px'
})

window.addEventListener('load', function() {
  needsDraw = true
  bg.style.width = window.innerWidth + 'px'
})

function drawBg() {
  var windowScroll = window.scrollY
  var windowHeight =  window.innerHeight
  var bodyHeight = document.body.clientHeight - windowHeight
  var bgHeight = (bg.height || bg.clientHeight) - windowHeight
  var scrollFraction = bgHeight / bodyHeight

  var newTop = Math.floor(
    windowScroll * (1 - scrollFraction)
  )

  translateY(bg, newTop)
}

function render() {
  var scrollY = window.scrollY
  if (render.lastScroll != scrollY) needsDraw = true
  render.lastScroll = scrollY
  if (needsDraw) drawBg()
  needsDraw = false
  raf(render)
}

var transformKey = null

if (isChrome || isSafari) transformKey = 'webkitTransform'
if (isFirefox) transformKey = 'mozTransform'

function translateY(el, y){
  var transform = 'translate3d(0, '+y+'px, 0)'

  el.style.transform = transform
  if (transformKey) el.style[transformKey] = transform
}

var raf = window.requestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window.mozRequestAnimationFrame
  || window.oRequestAnimationFrame
  || window.msRequestAnimationFrame
  || fallback;

/**
 * Fallback implementation.
 */

var prev = +new Date();
function fallback(fn) {
  var curr = +new Date();
  var ms = Math.max(0, 16 - (curr - prev));
  var req = setTimeout(fn, ms);
  prev = curr;
  return req;
}


setTimeout(function() {
  bg.style.position = 'absolute'
  bg.style.width = window.innerWidth + 'px'
  drawBg()
  render()
})
})()
