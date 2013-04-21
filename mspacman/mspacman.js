function start_game(){
    canvas = document.getElementById('game');
    if (canvas.getContext){
        ctx = canvas.getContext('2d');
        ctx.fillStyle = '#191970';//"rgb(230, 255 0)";
        ctx.fillRect (0, 0, 560, 280);
        ctx.fillStyle = '#000000';//"rgb(230, 255 0)";
        ctx.fillRect (0, 280, 560, 550);
        
        // Draw image
        img = new Image();
        img.src = 'pacman10-hp-sprite.png';
 
        // GOOGLE
        ctx.drawImage(img,320,0,465,135,17,20,465,135);
        // mspacman start
        ctx.drawImage(img,120,20,18,18,215,136,18,18);
        // ghost start
        ctx.drawImage(img,82,122,15,15,300,75,15,15);
    }
    else { alert('Sorry, canvas is not supported on your browser!');
    }
}
