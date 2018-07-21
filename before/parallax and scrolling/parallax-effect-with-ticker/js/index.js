// Retrieve container position relative to viewport
var rect = $('#container')[0].getBoundingClientRect();
// Create mouse object to keep track of mouse coordinates
var mouse = {x: 0, y: 0, moved: false};

$("#container").mousemove(function(e) {
  // set moved property to true
  mouse.moved = true;
  // calculate mouse coordinates
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
});
 
// Ticker event will be called on every frame
TweenLite.ticker.addEventListener('tick', function(){
  // if mouse is moved call parallax function
  if (mouse.moved){    
    // parallaxIt takes two parameters
    // first is the target element
    // Second is how much the element should move
    // Movement is relative to height and width of parent, in this case the container
    // insert all your parallax calls here
    // you can insert more parameters to change duration etc for each element
    parallaxIt(".slide", -100);
    parallaxIt("img", -30);
  }
  // set moved property to false on each frame so parallax function won't be called more than once
  mouse.moved = false;
});

// Simplest part, take mouse coordinates and container dimensions and animate elements
function parallaxIt(target, movement) {
  TweenMax.to(target, 0.3, {
    x: (mouse.x - rect.width / 2) / rect.width * movement,
    y: (mouse.y - rect.height / 2) / rect.height * movement
  });
}

// Recaclulate container dimensions on resize and scroll
$(window).on('resize scroll', function(){
  rect = $('#container')[0].getBoundingClientRect();
})