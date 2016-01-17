var debug = false;
var debugLvl = 6;
var Id = 0;
// Detect if the browser is IE or not.
// If it is not IE, we assume that the browser is NS.
var IE = document.all?true:false;

// If NS -- that is, !IE -- then set up for mouse capture
if (!IE) document.captureEvents(Event.MOUSEMOVE);

// Set-up to use getMouseXY function onMouseMove
document.onmousemove = MouseMove;
document.onmousedown = sendArrow;

    function myMouseDownHandler() {
      alert();
    }
// Temporary variables to hold mouse x-y pos.s
var tempX = 0;
var tempY = 0;

function debugC(string, lvl) {
	if(lvl <= debugLvl) {
		if(debug == true) {
			console.log(string);
		};
	};
};

function MouseMove(e) {
	getMouseXY(e);
};
function sendArrow() {
	var Cx = document.Show.MouseX.value*1;
	var Cy = document.Show.MouseY.value*1;
	var Sx = 65;
	var Sy = 117;
	var Nx;
	var Ny;
	var again = true;
	var loop = 0;
	var refreshIntervalID; 
	console.log(Cx);
	debugC("Click! x: "+Cx+" y: "+Cy, 2);
	
	function createArrow(a) {
		debugC("Creating Arrow", 2);
		var img = document.createElement("img");
		document.body.appendChild(img);
		img.id = a;
		img.src = "Assets/textures/Ranger/Arrow.png";
		img.style.position = "Absolute";
		img.style.top = "65px";
		img.style.left = "117px";
		img.style.transform = "scale(0.8,0.8)";
		Id = Id+1;
		debugC("Arrow Created",2);
		return document.getElementById(a);
	};
		
	var Arrow = createArrow(Id);

	function getNumbers() {
		debugC("Starting GetNumbers", 2);
		var currID = Id.toString();
		debugC("Cx: "+Cx+" Cy: "+Cy,3);

		p3 = p3XY(Sx, Sy, Cx, Cy);	
		p3X = p3[0];
		p3Y = p3[1];
		
		debugC("p3X: "+p3X+" p3Y:"+p3Y, 6);
		
		ABC = QuadEquation(65, 117, Cx, Cy, p3X, p3Y);
			
		if(Nx == undefined) {
			Nx = Sx;		
		}else if (Ychange > 222){
			debugC("Y Position above 222",3);
			loop = loop +1;
			
			debugC("loop: "+loop, 6);
			
				if (loop >= 50)  {
					again = false;
					debugC("50> loops done", 3);
					debugC("again = "+ again, 6);
				}
				
		}else{	
			Nx = Nx+1;
			debugC("Adding one to x value", 5);
		}
			
			Ny = getY(ABC,Nx);
			
			debugC("Nx:" + Nx + " Ny:" + Ny , 6);
			
			Ychange = Ny+117+117;
			
			//document.getElementById
			Arrow.style.top = Ychange+"px";
			Arrow.style.left = Nx+"px";
			
			if (again == false) {
				
				document.body.removeChild(Arrow);
				debugC("Arrow element removed", 3);
				clearInterval(refreshIntervalID);
				return;
			};
	debugC("Ending GetNumbers",2);
	};
	console.log(again);	
	if (again == false) {
		debugC("????",0)
		return;
	}else{		
		debugC("Running getNumbers with 20 millisecond delay", 2);
		refreshIntervalID = setInterval(getNumbers, 20);
	};
	
};
function getMouseXY(e) {

    tempX = e.pageX;
    tempY = e.pageY;
   
  // catch possible negative values in NS4
  if (tempX < 0){tempX = 0};
  if (tempY < 0){tempY = 0};  
  // show the position values in the form named Show
  // in the text fields named MouseX and MouseY
  document.Show.MouseX.value = tempX;
  document.Show.MouseY.value = tempY;
  return true;
};

function p3XY(p1X, p1Y, p2X, p2Y){
	debugC("Getting 3 reference point", 2);
	debugC("1X:"+p1X+" 1Y:"+ p1Y+" 2X:"+ p2X+" 2Y:"+ p2Y, 6);
	
	p4X = p1X/2+p2X/2;
	p4Y = p1Y/2+p2Y/2;
	
	debugC("4X:"+p4X+" 4Y:"+p4Y, 6);
	
	hX = p2X-p4X;	
	hY = p2Y-p4Y;
	
	debugC("hX:"+hX+" hY:"+hY, 6);
	
	p3X = p4X/2-hX/2;
	p3Y = p4Y/2+hY/2;
	
	debugC("in  "+"p3X: "+p3X+" p3Y:"+p3Y, 6);
	
	debugC("third reference point acquired",2);
	return [p3X, p3Y];
};
function QuadEquation(p1X, p1Y, p2X, p2Y, p3X, p3Y) {
	debugC("Making Equation",2);
	
	p1Y = 0-p1Y;
	p2Y = 0-p2Y;
	p3Y = 0-p3Y;
	
	//Copied from StackOverflow
	//Lagrange Polynomial interpolation
a = p1Y/((p1X-p2X)*(p1X-p3X)) + p2Y/((p2X-p1X)*(p2X-p3X)) + p3Y/((p3X-p1X)*(p3X-p2X))

b = -p1Y*(p2X+p3X)/((p1X-p2X)*(p1X-p3X))
    -p2Y*(p1X+p3X)/((p2X-p1X)*(p2X-p3X))
    -p3Y*(p1X+p2X)/((p3X-p1X)*(p3X-p2X))

c = p1Y*p2X*p3X/((p1X-p2X)*(p1X-p3X))
  + p2Y*p1X*p3X/((p2X-p1X)*(p2X-p3X))
  + p3Y*p1X*p2X/((p3X-p1X)*(p3X-p2X))


	debugC(p1X+" "+p1Y+" "+p2X+" "+p2Y+" "+p3X+" "+p3Y,6);
	debugC("a:"+a+"b:"+b+"c:"+c,6);
	debugC("Equation acquired", 2);
	return[a,b,c];
};

function getY(ABC,x) {
	debugC("Acquiring y from x value with equaiton", 2)
	
	a = ABC[0];
	b = ABC[1];
	c = ABC[2];
	
	debugC("ABC[0-3]: 0:"+ABC[0]+" 1:"+ABC[1]+ " 2:"+ABC[2]  ,6)
	
	y = x*x*a+x*b+c;
	
	debugC("y acquired", 2);
	return y;
};



