// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 50);
          };
})();

var width = window.innerWidth;
var height = window.innerHeight;

var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");

//create images
var vinnie = new Image();
vinnie.src = "vincent.jpg";

var imageArray = [];

var spawn1 = {
	x : 200,
	y : 200
}

var spawn2 = {
	x : 200,
	y : 200
}

function render(){
	ctx.clearRect(0, 0, width, height);
	var image = {
		x : spawn1.x,
		y : spawn1.y,
		dirX : Math.random() *10 - 5,
		dirY : Math.random() *10 - 5
	};

	imageArray.push(image);

	var image = {
		x : spawn2.x,
		y : spawn2.y,
		dirX : Math.random() * 10 - 5,
		dirY : Math.random() * 10 - 5
	};
	imageArray.push(image);

	imageArray.forEach(function(image){
		image.x += image.dirX;
		image.y  += image.dirY;
		ctx.drawImage( vinnie , image.x , image.y , 40 , 40 );
	});

    if(Math.round(Math.random() *50) == 1){
        spawn1.x = randomNumber(50, width- 50);
        spawn1.y = randomNumber(50, height- 50);
    }

    if(Math.round(Math.random() * 50) == 2){
        spawn2.x = randomNumber(50, width- 50);
        spawn2.y = randomNumber(50, height- 50);
        console.log(height);
    }

	if(imageArray.length > 2000) imageArray.shift();
	if(imageArray.length > 2000) imageArray.shift();


}
(function animloop(){
  requestAnimFrame(animloop);
  render();
})();


function randomNumber(min, max){
	return Math.random() * (max - min) + min;
}