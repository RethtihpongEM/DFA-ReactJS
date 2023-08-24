import $ from 'jquery'

// disable mousewheel on a input number field when in focus
// (to prevent Chromium browsers change the value when scrolling)
$(document).on('focus', 'input[type=number]', function (e) {
  $(this).on('wheel.disableScroll', function (e) {
    e.preventDefault()
  })
})
$('form').on('blur', 'input[type=number]', function (e) {
  $(this).off('wheel.disableScroll')
})