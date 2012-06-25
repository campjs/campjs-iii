window.Campjs =
  init: ->
    if ($.browser.webkit)
      $('body').stellar
        positionProperty: 'transform'
        verticalOffset: 150
        hideDistantElements: true
    $('.register').ajaxForm
      beforeSubmit: ->
        userDetails = $('.details').val()
        if (!userDetails)
          $('.message').html('Do tell me more&hellip;')
          return false
        if /^(.+)@(.+)$/.test(userDetails) or /^@[A-Za-z0-9-_]+$/.test(userDetails)
          $('.message').html('Submitting&hellip;')
          return true
        $('.message').html('No good! I need an @twitter or user@email.com address.')
        return false
      success: ->
        $('.message').html('Success')
      error: ->
        $('.message').html('Fail')
    
    animateClouds = ->
      clouds = $('.clouds')
      
      clouds.animate { 'background-position-x': 1367 }, 45000, 'linear', ->
        clouds.css 'background-position-x', 0
        animateClouds()
    
    animateClouds()
    
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
