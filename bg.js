(function() {

var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    // At least Safari 3+: "[object HTMLElementConstructor]"
var isChrome = !!window.chrome && !isOpera;              // Chrome 1+
var isIE = /*@cc_on!@*/false || !!document.documentMode; // At least IE6

var bg = document.getElementById('background')

if (!(isFirefox || isChrome)) return


var needsDraw = false

window.addEventListener('scroll', function() {
  needsDraw = true
})

window.addEventListener('resize', function() {
  console.log('resize')
  needsDraw = true
})

window.addEventListener('load', function() {
  console.log('LOAD')
  needsDraw = true
})

function drawBg() {
  var newTop = (Math.floor(window.scrollY * (1 - (bg.clientHeight - window.innerHeight)/(document.body.clientHeight - window.innerHeight))))
  //if (bg.style.top == newTop) return
  //bg.style.top = newTop
  //bg.style.transform = 'translate3d(' + newTop + 'px,0,0)'
  translateY(bg, newTop)
}

function render() {
  if (render.lastScroll != window.scrollY) needsDraw = true
  render.lastScroll = window.scrollY
  if (needsDraw) drawBg()
  needsDraw = false
  raf(function() {
    render()
  })
}

function translateY(el, y){
  //y = (-y) * 0.2
  el.setAttribute('style', ['position: absolute',
                            '-webkit-transform: translate3d(0, '+y+'px,0)',
                           '-moz-transform: translate3d(0, '+y+'px,0)',
                           '-ms-transform: translate3d(0, '+y+'px,0)',
                           '-o-transform: translate3d(0, '+y+'px,0)',
                           'transform: translate3d(0, '+y+'px,0)'].join(';'));
  //el.style.webkitTransformOrigin = 'translate3d('+y+'px,0,0)';
  //debugger
  //el.style.mozTransform = 'translate3d('+y+'px,0,0)';
  //el.style.msTransform = 'translate3d('+y+'px,0,0)';
  //el.style.oTransform = 'translate3d('+y+'px,0,0)';
  //el.style.top = y + 'px'
  //el.setAttribute('style', 'top: ' + y+'')
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

var prev = new Date().getTime();
function fallback(fn) {
  var curr = new Date().getTime();
  var ms = Math.max(0, 16 - (curr - prev));
  var req = setTimeout(fn, ms);
  prev = curr;
  return req;
}
drawBg()
render()
console.log('LJHBBJHKBHJLBH')
})()
