((document, window, undefined) => {

  const css3dTransform = (function() {
    const styles = window.getComputedStyle(document.documentElement, '')
    const TRANSFORM = ['webkitTransform', 'MozTransform', 'transform']

    for ( let i in TRANSFORM ) {
      if (styles[TRANSFORM[i]]) {
        return TRANSFORM[i];
      }
    }

    return false
  })()

  function moveHandler(handler, position) {
    let cssStyles = {}
    cssStyles[css3dTransform] = 'translate3d(0, 0, 0)'
    cssStyles['position'] = 'fixed'
    cssStyles['top'] = 0
    $(handler).css(cssStyles)

    return handler
  }

  function moveHandlerToBottom(handler, position) {
    let cssStyles = {}
    cssStyles[css3dTransform] = 'translate3d(0, '+position+'px, 0)'
    cssStyles['position'] = 'absolute'
    cssStyles['top'] = 0
    $(handler).css(cssStyles)

    return handler
  }

  function moveHandlerToTop(handler, position) {
    let cssStyles = {}
    cssStyles[css3dTransform] = 'translate3d(0, 0, 0)'
    cssStyles['position'] = 'absolute'
    cssStyles['top'] = position
    $(handler).css(cssStyles)

    return handler
  }

  function getCoords(element) {
    return {
      top: element.offsetTop,
      left: element.offsetLeft,
      width: element.offsetWidth,
      height: element.offsetHeight
    }
  }

  function checkToFollow(handlerTop, handlerHeight, containerBottom) {
    return window.scrollY >= handlerTop
      && window.scrollY <= (containerBottom - handlerHeight)
  }

  function checkBeforeFollow(handlerTop) {
    return window.scrollY < handlerTop
  }

  function checkBeyondFollow(handlerHeight, containerBottom) {
    return window.scrollY > containerBottom - handlerHeight
  }

  function setupHandler(handler, handlerCoords) {
    $(handler).css({
      'width': handlerCoords.width,
      'position': 'absolute',
      'top': handlerCoords.top,
      'left': handlerCoords.left
    })

    return handler
  }

  function init(options) {
    const handler = options.handler
    const handlerCoords = getCoords(handler)
    const container = options.container
    const containerCoords = getCoords(container)
    const containerBottom = containerCoords.top + containerCoords.height

    setupHandler(handler, handlerCoords)

    window.addEventListener('scroll', () => {
      window.requestAnimationFrame(() => {
        checkBeforeFollow(handlerCoords.top) && moveHandlerToTop(handler, handlerCoords.top)
        checkBeyondFollow(handlerCoords.height, containerBottom) && moveHandlerToBottom(handler, containerBottom - handlerCoords.height)
        checkToFollow(handlerCoords.top, handlerCoords.height, containerBottom) && moveHandler(handler, handlerCoords.top)
      })
    })
  }

  $.fn.magnetize = function(options) {
    return this.each(function() {
      init({
        handler: this,
        container: options && options.container && $(this).closest(options.container).get(0) || $(this).parent().get(0)
      })
    })
  }
  
})(document, window)
