// Inspiration from:
// Daniel Shiffman
// http://patreon.com/codingtrain

let bg;
// let riv;
var angle = 0;
var speed = 0.1;
var slope = 1;
var pos = 0.5;
var stops = {
KGX:[929, 137,706, 94,1],
RSL:[859, 297,705, 210,'blue'],
HOL:[831, 403,744, 298,1],
COV:[777, 456,705, 368,'blue'],
LCS:[730, 504,661, 401,1],
PCD:[627, 531,601, 420,1],
GRP:[450, 533,521, 466,1],
HPC:[384, 579,424, 522,'blue'],
KNB:[342, 620,346, 549,'blue'],
SKN:[220, 713,217, 664,1],
ANG:[1062, 140,881, 57,0],
OLD:[1155, 204,1063, 167,1],
MOO:[1155, 317,1055, 281,1],
BNK:[1155, 512,1049, 362,1],
LNB:[1155, 742,1061, 484,1],
EUS:[805, 117,623, 122,1],
WAR:[730, 213,567, 185,1],
GOO:[732, 350,603, 247,0],
TCR:[730, 402,642, 313,1],
CHX:[729, 634,686, 444,1],
EMB:[732, 723,724, 463,1],
WTL:[732, 834,806, 539,1],
OXC:[541, 402,527, 331,1],
VIC:[451, 722,503, 648,1],
NHG:[92, 403,1, 428,1],
QUE:[193, 403,85, 409,'red'],
LAN:[263, 401,201, 387,'red'],
MAR:[324, 403,369, 364,'red'],
BON:[416, 401,462, 347,1],
CHN:[951, 401,827, 286,'red'],
STP:[1001, 427,954, 333,'red'],
LIV:[1326, 336,1107, 298,1]
};
// var stops = {
// 	KGX: [100,100,200,200,1],
// 	RSL: [100,100,100,100,'blue'],
// 	HOL: [200,200,200,200,1],
// 	COV: [300,300,300,300,'blue'],
// 	LCS: [400,400,400,400,1],
// 	PCD: [500,400,700,500,1],
// 	GRP: [700,700,700,700,1],
// 	HPC: [400,600,500,700,'blue'],
// 	KNB: [232,323,323,232,'blue'],
// 	SKN: [200,700,300,800,1],

// 	WTL: [500,32,400,03,1],
// 	CW: [700,700,600,343,2],
// 	OXC: [400,200,200,300,1]
// };
var piccadilly = {
	1: ["KGX","RSL"],
	2: ["RSL","HOL"],
	3: ["HOL","COV"],
	4: ["COV","LCS"],
	5: ["LCS","PCD"],
	6: ["PCD","GRP"],
	7: ["GRP","HPC"],
	8: ["HPC","KNB"],
	9: ["KNB","SKN"]
};
var central = {
	1: ["NHG","QUE"],
	2: ["QUE","LAN"],
	3: ["LAN","MAR"],
	4: ["MAR","BON"],
	5: ["BON","OXC"],
	6: ["OXC","TCR"],
	7: ["TCR","HOL"],
	8: ["HOL","CHN"],
	9: ["CHN","STP"],
	10: ["STP","BNK"],
	11: ["BNK","LIV"]
};
var north = {
	1: ["WTL","EMB"],
	2: ["EMB","CHX"],
	3: ["CHX","LCS"],
	4: ["LCS","TCR"],
	5: ["TCR","GOO"],
	6: ["GOO","WAR"],
	7: ["WAR","EUS"],
	8: ["EUS","KGX"],
	9: ["KGX","ANG"],
	10: ["ANG","OLD"],
	11: ["OLD","MOO"],
	12: ["MOO","BNK"],
	13: ["BNK","LNB"]
};
var vic = {
	1: ["KGX","EUS"],
	2: ["EUS","WAR"],
	3: ["WAR","OXC"],
	4: ["OXC","GRP"],
	5: ["GRP","VIC"]
};


function setup() {
	bg = loadImage('assets/londonmap.jpg');
	// riv = loadImage('assets/londonunderground.jpg');
	createCanvas(1480, 922);
	angleMode(DEGREES);
}

function draw() {
	var tintval =80+120*pow(cos(speed*millis()/2),2);
	tint(255,tintval);
	background(255);
	 image(bg, 0, 0);
	// tint(255,140-tintval);
	// image(riv,0,0);
	// background(bg);
	stroke(0);
	strokeWeight(3);
	fill(0);

	var timestamp = new Date();
	let hr = timestamp%(1000*60*60*24)*(1/1000/60/60);
	let mn = timestamp%(1000*60*60)*(1/1000/60);
	let sc =timestamp%(1000*60)*(1/1000);


	doLINE(piccadilly,'blue');
	doLINE(north,'black');
	doLINE(central,'red');
	doLINE(vic,'deepskyblue');

	doSTOPS(stops);


}	

function moving_point(x1,y1,x2,y2,speed) {
	X = (x1+x2)/2+(x2-x1)*cos(speed*millis())/2 ;
	Y = (y1+y2)/2+(y2-y1)*cos(speed*millis())/2 ;
	return [X,Y];

}

function pad(num, size) {
	var s = "000000000" + num;
	return s.substr(s.length-size);
}

// Plots the lines for a given set of connections in color, e.g. Piccadilly line in blue
function doLINE(connections,color){
	var connection;
	stroke(color);
	for (connection in connections){
		[X1,Y1] = moving_point(stops[connections[connection][0]][0], stops[connections[connection][0]][1],stops[connections[connection][0]][2],stops[connections[connection][0]][3],speed);
		[X2,Y2] = moving_point(stops[connections[connection][1]][0], stops[connections[connection][1]][1],stops[connections[connection][1]][2],stops[connections[connection][1]][3],speed);
		line(X1,Y1,X2,Y2);
	}
}

function doLINEdouble(connections,color1,color2){
	var connection;
	for (connection in connections){
		[X1,Y1] = moving_point(stops[connections[connection][0]][0], stops[connections[connection][0]][1],stops[connections[connection][0]][2],stops[connections[connection][0]][3],speed);
		[X2,Y2] = moving_point(stops[connections[connection][1]][0], stops[connections[connection][1]][1],stops[connections[connection][1]][2],stops[connections[connection][1]][3],speed);
		var dX = X2-X1;
		var dY = Y2-Y1;
		var pX = dY;
		var pY = dX;
		var norm = sqrt(pX*pX+pY*pY);
		pX = pX/norm;
		pY = pY/norm;
		stroke(color1);
		line(X1,Y1,X2,Y2);
		stroke(color2);
		line(X1+pX*4,Y1+pY*4,X2+pX*4,Y2+pY*4);
	}
}

// Plot the stops
function doSTOPS(stops){
	var stop;
	strokeWeight(2);
	for (stop in stops) {
		[X,Y] = moving_point(stops[stop][0],stops[stop][1],stops[stop][2],stops[stop][3],speed);
		if ( stops[stop][4] == 1 ){
			stroke(0);
			fill(255);
			circle(X,Y,6);
		}
		else {
			stroke(stops[stop][4]);
			fill(stops[stop][4]);
			circle(X,Y,4);
		}
	}
}

function smoothStep(slope,speed,pos){
	return sin(speed*millis())
}
