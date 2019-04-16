$(function() {
  var $window = $(window)
  var $htmlBody = $('html, body')
  var $skipArrows = $('.skip-arrow')

  var alignArrows = function() {
    var scrollTop = $window.scrollTop()
    var scrollBottom = scrollTop + $window.height()

    $skipArrows.each(function() {
      var $skipArrow = $(this)
      var $skipArrowContainer = $skipArrow.parent()
      var skipArrowContainerTop = $skipArrowContainer.offset().top
      var skipArrowContainerHeight = $skipArrowContainer.height()
      var skipArrowContainerBottom =
        skipArrowContainerTop + skipArrowContainerHeight
      var skipArrowBottom = Math.max(
        35,
        Math.min(
          35 + skipArrowContainerBottom - scrollBottom,
          skipArrowContainerHeight - 75
        )
      )

      $skipArrow.css('bottom', skipArrowBottom + 'px')
    })
  }

  $window.scroll(alignArrows)

  $skipArrows.click(function(e) {
    e.preventDefault()

    var $skipArrow = $(this)
    var $skipArrowContainer = $skipArrow.parent()
    var skipArrowContainerTop = $skipArrowContainer.offset().top
    var skipArrowContainerHeight = $skipArrowContainer.height()
    var skipArrowContainerBottom =
      skipArrowContainerTop + skipArrowContainerHeight

    $htmlBody.animate({ scrollTop: skipArrowContainerBottom + 'px' })
  })

  alignArrows()
})
