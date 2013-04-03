function draw(){

    canvas = document.getElementById('simple');
            
            // Check if canvas is supported on browser
            if (canvas.getContext) {
                ctx = canvas.getContext('2d');
                ctx.moveTo(500, 500);
                
                img = new Image();
                img.src = 'assets/mountains.jpg';
                ctx.drawImage(img, 800, 800);
            }
            else {
                alert('Sorry, canvas is not supported on your browser!');
            }
}
