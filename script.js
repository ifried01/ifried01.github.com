function init(){
    canvas = document.getElementById('simple');
    ctx = canvas.getContext('2d');
    img = new Image();
    img.src = 'assets/orange_leather.jpg';
    ctx.globalAlpha = 0.5; // Transparency
   // ctx.rotate(0.175); // Angle is in radians
    ctx.drawImage(img, 100, 100);
}
