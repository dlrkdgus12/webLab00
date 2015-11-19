"use strict";

var numberOfBlocks = 9;
var targetBlocks = [];
var trapBlock;
var targetTimer;
var trapTimer;
var instantTimer;


document.observe('dom:loaded', function(){
	$("start").observe("click",startGame);
	$("stop").observe("click",stopGame);
	
});
function score(){
	var score = 0;
	var wrongTimer = setInterval(function(){
		for(var i=0; i<blocks.length; i++){
		if(blocks[i].hasClassName("wrong")){
		blocks[i].removeClassName("wrong");
		blocks[i].addClassName("normal");
			}
		}
	},100);
	var blocks = $$(".block");
	if(this.hasClassName("normal")){
		this.removeClassName("normal");
		this.addClassName("wrong");
		score -=10;
	}
	else if(this.hasClassName("trap")){
		this.removeClassName("trap");
		this.addClassName("normal");
		score -=30;
	}
	else if(this.hasClassName("target")){
		this.removeClassName("target");
		this.addClassName("normal");
		score += 20;
	}
	$("score").textContent = parseFloat($("score").textContent) + score;
}
function startGame(){
	$("state").textContent="Ready";
	$("score").textContent=0;
	instantTimer = setTimeout(function(){Stop(); startToCatch();}, 3000);
}

function stopGame(){
	$("state").textContent="Stop";
	$("score").textContent=0;
	Stop();
	var blocks = $$(".block");
	for(var i=0; i<blocks.length; i++){
		if(blocks[i].hasClassName("target")){
		blocks[i].removeClassName("target");
		blocks[i].addClassName("normal");
		}
		else if(blocks[i].hasClassName("trap")){
		blocks[i].removeClassName("trap");
		blocks[i].addClassName("normal");
		}
	}
}
function stopGame2(){
	$("state").textContent="Stop";
	Stop();
	var blocks = $$(".block");
	for(var i=0; i<blocks.length; i++){
		if(blocks[i].hasClassName("target")){
		blocks[i].removeClassName("target");
		blocks[i].addClassName("normal");
		}
		else if(blocks[i].hasClassName("trap")){
		blocks[i].removeClassName("trap");
		blocks[i].addClassName("normal");
		}
	}
}

function startToCatch(){
	$("state").textContent="Catch!";
	targetTimer = setInterval(function(){ myTimer()},1000);
	trapTimer = setInterval(function(){ myTimer2()},3000);
	var blocks = $$(".block");
	for(var i=0; i<blocks.length; i++){
		blocks[i].observe("click",score);
	}
}
function shuffleRandom(n){
        var ar = new Array();
        var temp;
        var rnum;

        for(var i=1; i<=n; i++){
            ar.push(i);
        }

        for(var i=0; i< ar.length ; i++)
        {
            rnum = Math.floor(Math.random() *n);
            temp = ar[i];
            ar[i] = ar[rnum];
            ar[rnum] = temp;
        }
        for(var i=0; i< ar.length;i++){
        	ar[i] -= 1;
        }

        return ar;
}
function myTimer() {
	var blocks = $$('.block');
	var count = 0;
	var count2 = 0;
	blocks.sort(function(){return Math.random() - Math.random();});
	
	for(var i=0; i<9; i++){
			if(blocks[i].hasClassName("normal") && count == 0){
			blocks[i].removeClassName("normal");
			blocks[i].addClassName("target");
			count++;
			}
		}
	for(var i=0; i<9; i++){
			if(blocks[i].hasClassName("target")){
			count2++;
			}
		if(count2>4){
			stopGame2();
			alert("you lose");
			count2 = 0;
		}
	}
	
}
function myTimer2() {
	var blocks2 = $$('.block');
	var count2 = 0;
	for(var i=0; i<9; i++){
		if(blocks2[i].hasClassName("trap")){
			blocks2[i].removeClassName("trap");
			blocks2[i].addClassName("normal");
			}
		}

	blocks2.sort(function(){return Math.random() - Math.random();});
	for(var i=0; i<9; i++){
			if(count2 == 0){
				if(blocks2[i].hasClassName("normal")){
					blocks2[i].removeClassName("normal");
					blocks2[i].addClassName("trap");
					count2++;
				}
			}
		}
}
function Stop() {
    clearInterval(targetTimer);
    clearInterval(trapTimer);
    clearInterval(instantTimer);
}
