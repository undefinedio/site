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

var koray = new Image();
koray.src = "koray.gif";

var benni = new Image();
benni.src = "benni.gif";

var simon = new Image();
simon.src = "simon.gif";

var imageArray = [];
var imageLocation = [];

imageLocation[0] = vinnie;
imageLocation[1] = koray;
imageLocation[2] = benni;
imageLocation[3] = simon;

var spawn1 = {
	x : 200,
	y : 200,
}

var spawn2 = {
	x : 200,
	y : 200
}

var spawn3 = {
    x : 200,
    y : 200
}

var TO_RADIANS = Math.PI/180;
function render(){


	ctx.clearRect(0, 0, width, height);



    if(Math.floor(randomNumber(0,3)) != 1 || imageArray.length < 900){
        var image = {
            x : spawn1.x,
            y : spawn1.y,
            size: 0.1,
            dirX : Math.random() *10 - 5,
            dirY : Math.random() *10 - 8,
            image : imageLocation[Math.floor(randomNumber(0,3.9))],
            rotation : 0,
            rotationSpeed : randomNumber(0,2)
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

        ctx.save();


        image.rotation += image.rotationSpeed;


        ctx.translate(image.x, image.y);

        ctx.rotate(image.rotation * TO_RADIANS);

        ctx.drawImage( image.image , 0 , 0 , 50 * image.size , 60 * image.size );

        ctx.restore();
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


canvas.addEventListener("mousedown", getPosition, false);

function getPosition(event)
{
    var x = event.x;
    var y = event.y;

    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;

    console.log(x);
    console.log(y);

    imageArray.forEach(function(image){
        var width = 50 * image.size;
        var height = 60 * image.size;
        if(x > image.x && x < image.x + width ){
            if(y > image.y && y < image.y + width){
                console.log(image);
                if(image.image == simon) window.location = "http://simonpeters.me/";
                if(image.image == vinnie) window.location = "http://vincentpeters.be";
                if(image.image == benni) window.location = "http://benni.io/";
                if(image.image == koray) window.location = "https://twitter.com/koray_sels";
            }
        }
    });



}


function randomNumber(min, max){
	return Math.random() * (max - min) + min;
}