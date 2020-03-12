var circ = [];
var amt = 100;
const rgbVal = 1530;
var sot = true;
var type = 0;
var x;
var y;
var gx;
var speed = 8;
var key;

var slider = $("#speedSlider");

slider.on("input change", function(e) {
	speed = $(this).val();
})

function setup() {
	if(window.innerWidth > window.innerHeight)
		createCanvas(window.innerHeight - 150, window.innerHeight - 150);
	else
		createCanvas(window.innerWidth, window.innerWidth);
	noStroke();
	frameRate(60);
	background('#262626');
	createCir();
}

function trigShuff() {
	sot = true;
	shuffle(circ,true);
}

function trigInsert() {
	if(sot) {
		circ[0] = new CArc(1); //fix for weird bug with insertion sort algorithm
		x = 1;
		y = x - 1;
		type = 3;
		key = circ[x];
		sot = false;
	}
}

function trigSelect() {
	if(sot) {
		x = 0;
		y = x + 1;
		type = 1;
		sot = false;
	}
}

function trigBubble() {
	if(sot) {
		x = 0;
		y = 1;
		gx = 0;
		type = 2;
		sot = false;
	}
}

function draw() {
	background('#262626');
	fill(0, 102, 153);
	for(var i = 0; i < circ.length; i++) {
		circ[i].draw(i);
	}

	if(!sot) {
		if(type == 1) {
			for(i = 0; i < speed; i++)
				selectSort();
		} else if(type == 2) {
			for(i = 0; i < speed; i++)
				bubbleSort();
		} else if(type == 3) {
			for(i = 0; i < speed; i++)
				insertSort();
		}
	}

}

function insertSort() {
	if(x < circ.length) {

		if(key.rank < circ[y].rank && y > 0) {
			circ[y + 1] = circ[y];
			y -= 1;
		} else {
			circ[y + 1] = key;
			key = circ[++x];
			y = x - 1;
		}

	} else {
		sot = true;
		type = 0;
	}
}

function bubbleSort() {
	if(gx < circ.length - 1) {
		if(y < circ.length) {
			if(circ[x].rank > circ[y].rank) {
				temp = circ[x];
				circ[x] = circ[y];
				circ[y] = temp;
			}
			x += 1;
			y += 1;
		} else {
			x = 0;
			y = 1;
			gx += 1;
		}
	} else {
		sot = true;
		type = 0;
	}
}

function selectSort() {
	if(x < circ.length - 1) {
		if(y < circ.length) {
			if(circ[x].rank > circ[y].rank) {
				temp = circ[x];
				circ[x] = circ[y];
				circ[y] = temp;
			}
			y += 1;
		} else {
			x += 1;
			y = x + 1;
		}
	} else {
		sot = true;
		type = 0;
	}
}

function createCir() {
	colPart = rgbVal/amt;
	colStart = 1;
	for(var i = 1; i <= amt; i++) {
		circ.push(new CArc(colStart));
		colStart += colPart;
	}
}

function getRgb(vgal) {
	if(vgal > 1530)
		vgal = vgal % 1530;
	if(vgal <= 0)
		return [vgal, 0, 0];
	else if(vgal <= 255)
		return [255, vgal, 0];
	else if(vgal <= 510)
		return [255 - (vgal - 255), 255, 0];
	else if(vgal <= 765)
		return [0, 255, vgal - 510];
	else if(vgal <= 1020)
		return [0, 255 - (vgal - 765), 255];
	else if(vgal <= 1275)
		return [vgal - 1020, 0, 255];
	else if(vgal <= 1530)
		return [255, 0, 255 - (vgal - 1275)];
	return [255, 255, 255];
}

function CArc(rank) {
	this.rank = rank;
	this.col = getRgb(rank);

	this.draw = function(num) {
		fill(this.col[0], this.col[1], this.col[2]);
		arc(width/2, height/2, width - 50, height - 50, (((num-.07)/amt) * 2 * PI) - PI/2, (((num+1)/amt) * 2 * PI) - PI/2 );
	};
}
