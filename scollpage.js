// NAVIGATION LOGO SCROLL TOP
$('.logo').on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({
    scrollTop: 0
  }, 500, 'easeInOutQuad')
});
// LINKS TO ANCHORS
// $('a[href^="#"]').on('click', function(event) {

//   let $target = $(this.getAttribute('href'));

//   let windowHeight = $(window).height()
//   let h80vh = windowHeight*0.8

//   if($target.length) {
//     event.preventDefault();
//     $('html, body').stop().animate({
//       scrollTop: $target.offset().top
//     }, 500, 'easeInOutQuad');
//     console.log('scoll');
    
//   }
// });

