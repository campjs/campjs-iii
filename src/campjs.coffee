window.Campjs =
  init: ->
    $('body').stellar()
    
    animateClouds = ->
      clouds = $('.clouds')
      
      clouds.animate { 'background-position-x': 1367 }, 45000, 'linear', ->
        clouds.css 'background-position-x', 0
        animateClouds()
    
    animateClouds()
    
$ ->
  Campjs.init()

