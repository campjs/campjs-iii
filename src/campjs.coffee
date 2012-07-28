
window.Campjs =
  init: ->
    isMobile = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)
    if ($.browser.webkit && !isMobile)
      $('body').stellar
        positionProperty: 'transform'
        verticalOffset: 150
        hideDistantElements: true
    $('.register').ajaxForm
      beforeSubmit: ->
        userDetails = $('.details').val()
        if (!userDetails)
          $('.message').html('<span class="label label-warning">Do tell me more&hellip;</span>')
          return false
        if /^(.+)@(.+)$/.test(userDetails) or /^@[A-Za-z0-9-_]+$/.test(userDetails)
          $('.message').html('<span class="label label-info">Submitting&hellip;</span>')
          return true
        $('.message').html('<span class="label label-important">No good! I need an @twitter or user@email.com address.</span>')
        return false
      success: ->
        $('.message').html('<span class="label label-success">Success</span>')
      error: ->
        $('.message').html('<span class="label label-important">Fail</span>')

    #animateClouds = ->
      #clouds = $('.clouds')
      #direction = 1
      #if Math.round(Math.random())
        #direction = -1
      #clouds.transition { 'sition-x': direction * 1367 }, 35000, 'linear', ->
        #clouds.css 'background-position-x', 0
        #animateClouds()

    #animateClouds()
    
$ ->
  `
  var vendorPrefix = (function() {
    var prefix = '';

    if ($.browser.webkit) {
      prefix = '-webkit-';
    } else if ($.browser.mozilla) {
      prefix = '-moz-';
    } else if ($.browser.opera) {
      prefix = '-o-';
    } else if ($.browser.msie) {
      prefix = '-ms-';
    }

    return prefix;
  }());

  var setTransform = function($elem, val, dimension /* 'X' or 'Y' */) {
    yOffset = val
    xOffset = 0
    if (dimension === 'X') {
      yOffset = 0
      xOffset = val
    }
    $elem.css(vendorPrefix + 'transform', 'translate3d('+xOffset+'px,' + yOffset + 'px, 0)');
  }
  $.stellar.positionProperty.transform = {
    setTop: function($elem, top, startingTop) {	setTransform($elem, top - startingTop, 'Y'); },
    setLeft: function($elem, left, startingLeft) { setTransform($elem, left - startingLeft, 'X'); }
  }
  `
  Campjs.init()
