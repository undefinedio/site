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
vinnie.src = "vincent.gif";

var imageArray = [];

var spawn1 = {
	x : 200,
	y : 200,
    image: "vincent.gif"
}

var spawn2 = {
	x : 200,
	y : 200
}

var spawn3 = {
    x : 200,
    y : 200
}

function render(){
	ctx.clearRect(0, 0, width, height);



    if(Math.floor(randomNumber(0,3)) != 1 || imageArray.length < 900){
        var image = {
            x : spawn1.x,
            y : spawn1.y,
            size: 0.1,
            dirX : Math.random() *10 - 5,
            dirY : Math.random() *10 - 8
        };

        imageArray.unshift(image);

        var image = {
            x : spawn2.x,
            y : spawn2.y,
            size : 0.1,
            dirX : Math.random() * 10 - 5,
            dirY : Math.random() * 10 - 6
        };
        //imageArray.unshift(image);

        var image = {
            x : spawn3.x,
            y : spawn3.y,
            size : 0.1,
            dirX : Math.random() * 10 - 5,
            dirY : Math.random() * 10 - 6
        };
        //imageArray.unshift(image);
    }



	imageArray.forEach(function(image){
		image.x += image.dirX;
		image.y  += image.dirY;
        image.dirY = image.dirY + 0.05;

        if(image.size < 1 && randomNumber(1,1000 ) > 800) image.size += 0.05;

		ctx.drawImage( vinnie , image.x , image.y , 50 * image.size , 60 * image.size );
	});

    if(Math.round(Math.random() *50) == 1){
        spawn1.x = randomNumber(50, width- 50);
        spawn1.y = randomNumber(50, height- 50);
    }

    if(Math.round(Math.random() * 50) == 2){
        spawn2.x = randomNumber(50, width- 50);
        spawn2.y = randomNumber(50, height- 50);
    }

    if(Math.round(Math.random() * 50) == 3){
        spawn3.x = randomNumber(50, width- 50);
        spawn3.y = randomNumber(50, height- 50);
    }

	if(imageArray.length > 2000) imageArray.pop();
	if(imageArray.length > 2000) imageArray.pop();
	if(imageArray.length > 2000) imageArray.pop();


}
(function animloop(){
  requestAnimFrame(animloop);
  render();
})();


function randomNumber(min, max){
	return Math.random() * (max - min) + min;
}