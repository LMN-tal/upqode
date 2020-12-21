$('#carousel-banner').on('slide.bs.carousel', function (e) {
  $('.videoContainer__video')[e.from].contentWindow.postMessage(
    '{"event":"command","func":"' + 'pauseVideo' + '","args":""}',
    '*'
  );
  $('.videoContainer__video')[e.to].contentWindow.postMessage(
    '{"event":"command","func":"' + 'playVideo' + '","args":""}',
    '*'
  );
});
var lastId,
    topMenu = $('#topmenu'),
    topMenuHeight = $(topMenu).outerHeight()+40,
    // All list items
    menuItems = $(topMenu).find("a"),
    // Anchors corresponding to menu items
    scrollItems = $(menuItems).map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });
menuItems.click(function(e){
  var href = $(this).attr("href"),
      offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
  $('html, body').stop().animate({ 
      scrollTop: offsetTop
  }, 300);
  e.preventDefault();
});

// Bind to scroll
$(window).scroll(function(){
   // Get container scroll position
   var fromTop = $(this).scrollTop()+topMenuHeight+60;
   
   // Get id of current scroll item
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });
   // Get the id of the current element
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";
   
   if (lastId !== id) {
       lastId = id;
       // Set/remove active class
       menuItems
         .parent().removeClass("active")
         .end().filter("[href='#"+id+"']").parent().addClass("active");
   }                   
});

var path = MorphSVGPlugin.pathDataToBezier(".path");
var circlePath = new TimelineMax({paused: true});
circlePath.to("#spot", 1, {bezier:{values:path, type:"cubic"}},'-=1')

document.addEventListener("scroll", onScroll);
function onScroll() {
  var scrollY = window.pageYOffset-$('#services').offset().top || 0;
  var progress = (scrollY<0)?0:scrollY/2000;
  circlePath.tweenTo(progress);
}