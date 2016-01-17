function moveEnemy() {
document.getElementById("knight").style.right = (knight.style.right+10)+'px';
setTimeout(moveEnemy,20);
}


moveEnemy();