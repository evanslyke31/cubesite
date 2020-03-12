var shapes = [];
var links = ["https://evanslyke31.github.io/cubesite/wspeed", "https://evanslyke31.github.io/cubesite/sort", "https://evanslyke31.github.io/pathvis"];
//var stars = [];
//var starAmt;
var mip;
function setup() {
	createCanvas(window.innerWidth, window.innerHeight - 6);
	noStroke();
	frameRate(60);
	background(0);
	starAmt = width * height / 2944;
	mips = false;
	for (var i = 0; i < links.length; i++)
		shapes.push(new Cube(Math.sqrt(width * width + height * height) * random(.035, .06), links[i]));
	/*for(var i = 0; i < starAmt; i++)
		stars.push(new Star());*/
	background(0);
}

function draw() {
	background(0);

	/*for(var i = 0; i < starAmt; i++) {
		stars[i].move();
		stars[i].display();
	}*/
	for (var i = 0; i < links.length; i++) {
		shapes[i].move();
		shapes[i].display();
	}

}


function matMul(A, B) {
	if (A[0].length != B.length)
		return null;
	var X = new Array(A.length);
	for (var i = 0; i < A.length; i++) {
		X[i] = new Array(B[0].length);
		for (var j = 0; j < B[0].length; j++) {
			var sum = 0;
			for (var k = 0; k < A[0].length; k++)
				sum += A[i][k] * B[k][j];
			X[i][j] = sum;
		}
	}
	return X;
}

function rotatX(A, angle) {
	var rotMatrix = [
		[1, 0, 0],
		[0, Math.cos(angle), -Math.sin(angle)],
		[0, Math.sin(angle), Math.cos(angle)]];
	return matMul(rotMatrix, A);
}

function rotatY(A, angle) {
	var rotMatrix = [
		[Math.cos(angle), 0, Math.sin(angle)],
		[0, 1, 0],
		[-Math.sin(angle), 0, Math.cos(angle)]];
	return matMul(rotMatrix, A);
}

function rotatZ(A, angle) {
	var rotMatrix = [
		[Math.cos(angle), -Math.sin(angle), 0],
		[Math.sin(angle), Math.cos(angle), 0],
		[0, 0, 1]];
	return matMul(rotMatrix, A);
}

function resizeMat(A, resize) {
	var rMatrix = [
		[resize, 0, 0],
		[0, resize, 0],
		[0, 0, resize]];
	return matMul(rMatrix, A);
}

/*function doubleClicked() {
	for(var i = 0; i < links.length; i++) {
		shapes[i].checkClicked();
	}
}*/

/*function Star() {

	this.init = function() {
		this.x = 0;
		this.y = 0;
		this.size = 1;
		this.gfct = .009;
		this.gfctRate = random(.001,.004);
		this.side = floor(random(0,4));
		if(this.side == 0) {
			this.x = random(0,width);
			this.y = -this.size;
		} else if(this.side == 1) {
			this.x = width + this.size;
			this.y = random(0, height);
		} else if(this.side == 2) {
			this.x = random(0,width);
			this.y = height + this.size;
		} else if(this.side >= 3) {
			this.x = -this.size;
			this.y = random(0, height);
		}
	}
	this.init();

	this.move = function() {

		if(mouseX == 0 && mouseY == 0) {
			this.x = this.x + this.gfct * (width/2 - this.x);
			this.y = this.y + this.gfct * (height/2 - this.y);
		} else {
			this.x = this.x + this.gfct * (mouseX - this.x);
			this.y = this.y + this.gfct * (mouseY - this.y);
		}

		if(this.gfct >= .1) {
			this.init();
		}
		if(mouseIsPressed) {
			this.gfct -= 0;
		} else {
			this.gfct += this.gfctRate;
		}
	}

	this.display = function() {
		stroke(255,255,255);
		point(this.x, this.y, this.size);
	}

}*/

function Cube(size, link) {
	this.size = size;
	this.link = link;
	this.x = random(this.size * 3.5 / 2, width - this.size * 3.5 / 2);
	this.y = random(this.size * 3.5 / 2, height - this.size * 3.5 / 2);
	this.xvel = random(-1, 1);
	this.yvel = random(-1, 1);
	this.gfct = 0;
	this.gfctRate = random(.005, .01);
	this.colc = random(0, 1530);
	this.colcRate = random(2, 6);
	this.col = getRgb(this.colc);
	this.rotx = random(-.005, .005);
	this.roty = random(-.005, .005);
	this.rotz = random(-.005, .005);
	this.clicked = false;
	this.fc = 0;
	this.growCounter = 0;
	this.loaded = false;
	var cube = new Array(8);
	this.text = link.split("/");
	console.log(this.text);
	cube[0] = [[-this.size], [this.size], [this.size]];
	cube[1] = [[-this.size], [this.size], [-this.size]];
	cube[2] = [[-this.size], [-this.size], [this.size]];
	cube[3] = [[-this.size], [-this.size], [-this.size]];
	cube[4] = [[this.size], [this.size], [this.size]];
	cube[5] = [[this.size], [this.size], [-this.size]];
	cube[6] = [[this.size], [-this.size], [this.size]];
	cube[7] = [[this.size], [-this.size], [-this.size]];

	this.move = function () {

		for (var i = 0; i < cube.length; i++) {
			cube[i] = rotatZ(cube[i], this.rotz);
			cube[i] = rotatY(cube[i], this.roty);
			cube[i] = rotatX(cube[i], this.rotx);
		}

		this.x += this.xvel;
		this.y += this.yvel;

		if (this.x < this.size * 3.5 / 2 || this.x > width - this.size * 3.5 / 2) {
			this.xvel *= -1;
			this.rotx *= -1;
		}
		if (this.y < this.size * 3.5 / 2 || this.y > height - this.size * 3.5 / 2) {
			this.yvel *= -1;
			this.roty *= -1;
		}

		if (mouseIsPressed && mouseX > this.x - this.size * 3.5 / 2 && mouseX < this.x + this.size * 3.5 / 2 && mouseY > this.y - this.size * 3.5 / 2 && mouseY < this.y + this.size * 3.5 / 2) {
			this.clicked = true;
		} else {
			this.mip = false;
		}



		/*if(mouseIsPressed) {
			if(mouseX > this.x - this.size * 3.5/2 && mouseX < this.x + this.size * 3.5/2 && mouseY > this.y - this.size * 3.5/2 && mouseY < this.y + this.size * 3.5/2 && !mip) {
				this.mip = true;
			}
		} else {
			this.mip = false;
			mip = false;
		}

		if(this.mip) {
			mip = true;
			for(var i = 0; i < cube.length; i++) {
				cube[i] = rotatY(cube[i], (pmouseX - mouseX)/100);
				cube[i] = rotatX(cube[i], -(pmouseY - mouseY)/100);
			}
		}
		*/
		if (this.clicked) {
			for (var i = 0; i < cube.length; i++) {
				cube[i] = resizeMat(cube[i], 1.025);
			}
			this.growCounter += 1;
			this.roty += .003;
		}

		if (this.growCounter >= 100) {
			this.clicked = false;
			this.x = -2000;
			this.y = -2000;
			if (link != "" && !this.loaded) {
				document.location.href = this.link;
				noLoop();
			}
		}

	}

	this.display = function () {

		/*==if(mouseX > this.x - this.size * 3.5/2 && mouseX < this.x + this.size * 3.5/2 && mouseY > this.y - this.size * 3.5/2 && mouseY < this.y + this.size * 3.5/2) {
				document.body.style.cursor = "pointer";
		} else {
			document.body.style.cursor = "default";
		}*/

		if (window.innerWidth < 600)
			strokeWeight(1);
		else
			strokeWeight(3);
		this.col = getRgb(this.colc);
		stroke(this.col[0], this.col[1], this.col[2]);

		this.partLine(0, 1);
		this.partLine(3, 2);
		this.partLine(5, 4);
		this.partLine(6, 7);

		this.partLine(2, 0);
		this.partLine(1, 3);
		this.partLine(4, 6);
		this.partLine(7, 5);

		this.partLine(0, 4);
		this.partLine(5, 1);
		this.partLine(6, 2);
		this.partLine(3, 7);

		if (!this.clicked) {
			stroke(0);
			textSize(this.size / 4);
			fill(this.col[0], this.col[1], this.col[2])
			text(this.text[this.text.length - 1], this.x, this.y + this.size * 3.5 / 2 + 20);
		}

		if (this.gfct < 1)
			this.gfct += this.gfctRate;

		this.colc += this.colcRate;
	}

	this.checkClicked = function () {

		if (mouseX > this.x - this.size * 3.5 / 2 && mouseX < this.x + this.size * 3.5 / 2 && mouseY > this.y - this.size * 3.5 / 2 && mouseY < this.y + this.size * 3.5 / 2) {
			this.clicked = true;
		}

	}

	this.partLine = function (a, b) {
		line(cube[a][0][0] + this.x,
			cube[a][1][0] + this.y,
			cube[a][0][0] + this.gfct * (cube[b][0][0] - cube[a][0][0]) + this.x,
			cube[a][1][0] + this.gfct * (cube[b][1][0] - cube[a][1][0]) + this.y);
	}
}

function getRgb(vgal) {
	if (vgal >= 1530)
		vgal = (vgal % 1530) + 1;
	if (vgal <= 0)
		return [vgal, 0, 0];
	else if (vgal <= 255)
		return [255, vgal, 0];
	else if (vgal <= 510)
		return [255 - (vgal - 255), 255, 0];
	else if (vgal <= 765)
		return [0, 255, vgal - 510];
	else if (vgal <= 1020)
		return [0, 255 - (vgal - 765), 255];
	else if (vgal <= 1275)
		return [vgal - 1020, 0, 255];
	else if (vgal <= 1531)
		return [255, 0, 255 - (vgal - 1275)];
	return [0, 0, 0];
}
