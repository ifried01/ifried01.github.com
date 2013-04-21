var sprite_info = [];
var i, j;
var log_speed, car_speed, turtle_speed;
var total_lives;
var score, level;
var frogs_home;
var victory_locations = [];
var free_vic_locs     = [];
var frog_horiz_speed;
var fly_present, fly_counter, fly_wait, random_x_fly;
var x, username, d, creation;
game_over_img = new Image();
game_over_img.src = 'assets/dead_frog.png';

function init_sprite_info(){
    // FROGGER
    sprite_info[0]   = {"image_start_x_loc":13, "image_start_y_loc": 13, "x_length":318, "y_length":32, "start_print_x": 10, "start_print_y": 14, "x_resize":318, "y_resize":32};
    // purple paths on background
    sprite_info[1]   = {"image_start_x_loc": 0, "image_start_y_loc":119, "x_length":399, "y_length":45, "start_print_x":  0, "start_print_y":280, "x_resize":399, "y_resize":45};
    sprite_info[2]   = {"image_start_x_loc": 0, "image_start_y_loc":119, "x_length":399, "y_length":45, "start_print_x":  0, "start_print_y":490, "x_resize":399, "y_resize":45};
    // green lilies
    sprite_info[3]   = {"image_start_x_loc": 0, "image_start_y_loc": 51, "x_length":399, "y_length":54, "start_print_x":  0, "start_print_y": 50, "x_resize":399, "y_resize":54};
    // big log
    sprite_info[4]   = {"image_start_x_loc": 7, "image_start_y_loc":165, "x_length":180, "y_length":23, "start_print_x": 20, "start_print_y":115, "x_resize":180, "y_resize":23};
    // medium log
    sprite_info[5]   = {"image_start_x_loc": 7, "image_start_y_loc":198, "x_length":118, "y_length":23, "start_print_x":250, "start_print_y":185, "x_resize":118, "y_resize":23};
    // small log
    sprite_info[6]   = {"image_start_x_loc": 7, "image_start_y_loc":230, "x_length": 84, "y_length":23, "start_print_x":10, "start_print_y":255, "x_resize":84, "y_resize":23};
    // cars
    sprite_info[7]   = {"image_start_x_loc":  9, "image_start_y_loc":265, "x_length": 30, "y_length":23, "start_print_x":30, "start_print_y":320, "x_resize":30, "y_resize":23};
    sprite_info[8]   = {"image_start_x_loc":  9, "image_start_y_loc":265, "x_length": 30, "y_length":23, "start_print_x":180, "start_print_y":320, "x_resize":30, "y_resize":23};
    sprite_info[9]   = {"image_start_x_loc":  9, "image_start_y_loc":265, "x_length": 30, "y_length":23, "start_print_x":330, "start_print_y":320, "x_resize":30, "y_resize":23};
    sprite_info[10]  = {"image_start_x_loc": 69, "image_start_y_loc":299, "x_length": 29, "y_length":23, "start_print_x":50, "start_print_y":350, "x_resize":29, "y_resize":26};
    sprite_info[11]  = {"image_start_x_loc": 69, "image_start_y_loc":299, "x_length": 29, "y_length":23, "start_print_x":200, "start_print_y":350, "x_resize":29, "y_resize":26};
    sprite_info[12]  = {"image_start_x_loc": 69, "image_start_y_loc":299, "x_length": 29, "y_length":23, "start_print_x":350, "start_print_y":350, "x_resize":29, "y_resize":26};
    sprite_info[13]  = {"image_start_x_loc": 46, "image_start_y_loc":265, "x_length": 31, "y_length":26, "start_print_x":70, "start_print_y":390, "x_resize":31, "y_resize":26};
    sprite_info[14]  = {"image_start_x_loc": 46, "image_start_y_loc":265, "x_length": 31, "y_length":26, "start_print_x":220, "start_print_y":390, "x_resize":31, "y_resize":26};
    sprite_info[15]  = {"image_start_x_loc": 46, "image_start_y_loc":265, "x_length": 31, "y_length":26, "start_print_x":370, "start_print_y":390, "x_resize":31, "y_resize":26};
    sprite_info[16]  = {"image_start_x_loc": 81, "image_start_y_loc":264, "x_length": 26, "y_length":26, "start_print_x":0, "start_print_y":425, "x_resize":26, "y_resize":26};
    sprite_info[17]  = {"image_start_x_loc": 81, "image_start_y_loc":264, "x_length": 26, "y_length":26, "start_print_x":150, "start_print_y":425, "x_resize":26, "y_resize":26};
    sprite_info[18]  = {"image_start_x_loc": 81, "image_start_y_loc":264, "x_length": 26, "y_length":26, "start_print_x":300, "start_print_y":425, "x_resize":26, "y_resize":26};
    sprite_info[19]  = {"image_start_x_loc":103, "image_start_y_loc":301, "x_length": 49, "y_length":19, "start_print_x":40, "start_print_y":460, "x_resize":49, "y_resize":19};
    sprite_info[20]  = {"image_start_x_loc":103, "image_start_y_loc":301, "x_length": 49, "y_length":19, "start_print_x":190, "start_print_y":460, "x_resize":49, "y_resize":19};
    sprite_info[21]  = {"image_start_x_loc":103, "image_start_y_loc":301, "x_length": 49, "y_length":19, "start_print_x":340, "start_print_y":460, "x_resize":49, "y_resize":19};
    // initial frog position
    sprite_info[22]  = {"image_start_x_loc": 13, "image_start_y_loc":368, "x_length": 24, "y_length":20, "start_print_x":190, "start_print_y":500, "x_resize":24, "y_resize":20};
    // lives
    sprite_info[23]  = {"image_start_x_loc": 13, "image_start_y_loc":334, "x_length": 24, "y_length":20, "start_print_x":  3, "start_print_y":531, "x_resize":13, "y_resize":13};
    sprite_info[24]  = {"image_start_x_loc": 13, "image_start_y_loc":334, "x_length": 24, "y_length":20, "start_print_x": 15, "start_print_y":531, "x_resize":13, "y_resize":13};
    // victory frog image at lilly pad
    sprite_info[25]  = {"image_start_x_loc": 13, "image_start_y_loc":368, "x_length": 24, "y_length":20, "start_print_x":22, "start_print_y":80, "x_resize":24, "y_resize":20};
    sprite_info[26]  = {"image_start_x_loc": 13, "image_start_y_loc":368, "x_length": 24, "y_length":20, "start_print_x":106, "start_print_y":80, "x_resize":24, "y_resize":20};
    sprite_info[27]  = {"image_start_x_loc": 13, "image_start_y_loc":368, "x_length": 24, "y_length":20, "start_print_x":190, "start_print_y":80, "x_resize":24, "y_resize":20};
    sprite_info[28]  = {"image_start_x_loc": 13, "image_start_y_loc":368, "x_length": 24, "y_length":20, "start_print_x":274, "start_print_y":80, "x_resize":24, "y_resize":20};
    sprite_info[29]  = {"image_start_x_loc": 13, "image_start_y_loc":368, "x_length": 24, "y_length":20, "start_print_x":358, "start_print_y":80, "x_resize":24, "y_resize":20};
    // turtles
    sprite_info[30]  = {"image_start_x_loc": 14, "image_start_y_loc":404, "x_length": 32, "y_length":25, "start_print_x":200, "start_print_y":215, "x_resize":32, "y_resize":25};
    sprite_info[31]  = {"image_start_x_loc": 14, "image_start_y_loc":404, "x_length": 32, "y_length":25, "start_print_x":235, "start_print_y":215, "x_resize":32, "y_resize":25};
    sprite_info[32]  = {"image_start_x_loc": 14, "image_start_y_loc":404, "x_length": 32, "y_length":25, "start_print_x":270, "start_print_y":215, "x_resize":32, "y_resize":25};
    sprite_info[33]  = {"image_start_x_loc": 14, "image_start_y_loc":404, "x_length": 32, "y_length":25, "start_print_x":200, "start_print_y":145, "x_resize":32, "y_resize":25};
    sprite_info[34]  = {"image_start_x_loc": 14, "image_start_y_loc":404, "x_length": 32, "y_length":25, "start_print_x":235, "start_print_y":145, "x_resize":32, "y_resize":25};
    sprite_info[35]  = {"image_start_x_loc": 14, "image_start_y_loc":404, "x_length": 32, "y_length":25, "start_print_x":270, "start_print_y":145, "x_resize":32, "y_resize":25};
    // logs again
    sprite_info[36]  = {"image_start_x_loc":  7, "image_start_y_loc":165, "x_length":180, "y_length":23, "start_print_x": 280, "start_print_y":115, "x_resize":180, "y_resize":23};
    // medium log
    sprite_info[37]  = {"image_start_x_loc":  7, "image_start_y_loc":198, "x_length":118, "y_length":23, "start_print_x":10, "start_print_y":185, "x_resize":118, "y_resize":23};
    // small log
    sprite_info[38]  = {"image_start_x_loc":  7, "image_start_y_loc":230, "x_length": 84, "y_length":23, "start_print_x":180, "start_print_y":255, "x_resize":84, "y_resize":23};
    sprite_info[39]  = {"image_start_x_loc":  7, "image_start_y_loc":230, "x_length": 84, "y_length":23, "start_print_x":330, "start_print_y":255, "x_resize":84, "y_resize":23};
    // the fly
    sprite_info[40]  = {"image_start_x_loc":135, "image_start_y_loc":234, "x_length": 20, "y_length":20, "start_print_x":330, "start_print_y":80, "x_resize":20, "y_resize":20};
    // frog right
    sprite_info[41]  = {"image_start_x_loc": 12, "image_start_y_loc":335, "x_length": 20, "y_length":24, "start_print_x":190, "start_print_y":500, "x_resize":20, "y_resize":24};
    // frog left
    sprite_info[42]  = {"image_start_x_loc": 83, "image_start_y_loc":335, "x_length": 20, "y_length":24, "start_print_x":190, "start_print_y":500, "x_resize":20, "y_resize":24};
    // frog down
    sprite_info[43]  = {"image_start_x_loc": 81, "image_start_y_loc":366, "x_length": 24, "y_length":20, "start_print_x":190, "start_print_y":500, "x_resize":24, "y_resize":20};
}

function init_global_vars(){
    log_speed        = -2;
    car_speed1       = 2;
    car_speed2       = 1.8;
    car_speed3       = 1.6;
    level            = 1;
    score            = 0;
    total_lives      = 2;
    frogs_home       = 0;
    turtle_speed     = 2;
    frog_horiz_speed = 0;
    fly_wait         = 0;
    fly_counter      = 0;
    fly_present      = false;
    free_vic_locs    = [22, 106, 190, 274, 358];
}

function init_game_variables(){
    canvas = document.getElementById("game");
    ctx = canvas.getContext('2d');
    init_global_vars();
    j = 0;
    i = 0;
    init_sprite_info();
}

function move_logs(){
    if(sprite_info[6]["start_print_x"] > 399){
        sprite_info[6]["start_print_x"] = -84;
    }
    else{
        sprite_info[6]["start_print_x"] -= log_speed;
    }
    if(sprite_info[5]["start_print_x"] > 399){
        sprite_info[5]["start_print_x"] = -118;
    }
    else{
        sprite_info[5]["start_print_x"] -= log_speed;
    }
    if(sprite_info[4]["start_print_x"] > 399){
        sprite_info[4]["start_print_x"] = -180;
    }
    else{
        sprite_info[4]["start_print_x"] -= log_speed;
    }
    if(sprite_info[36]["start_print_x"] > 399){
        sprite_info[36]["start_print_x"] = -180;
    }
    else{
        sprite_info[36]["start_print_x"] -= log_speed;
    }
    if(sprite_info[37]["start_print_x"] > 399){
        sprite_info[37]["start_print_x"] = -118;
    }
    else{
        sprite_info[37]["start_print_x"] -= log_speed;
    }
    if(sprite_info[38]["start_print_x"] > 399){
        sprite_info[38]["start_print_x"] = -84;
    }
    else{
        sprite_info[38]["start_print_x"] -= log_speed;
    }
    if(sprite_info[39]["start_print_x"] > 399){
        sprite_info[39]["start_print_x"] = -84;
    }
    else{
        sprite_info[39]["start_print_x"] -= log_speed;
    }
}

function move_cars(){
    for(i = 7; i <= 9; i++){
        if(sprite_info[i]["start_print_x"] < -20){
            sprite_info[i]["start_print_x"] = 425;
        }
        else{
            sprite_info[i]["start_print_x"] -= car_speed1;
        }
    }
    for(i = 10; i <= 12; i++){
        if(sprite_info[i]["start_print_x"] > 399){
            sprite_info[i]["start_print_x"] = -29;
        }
        else{
            sprite_info[i]["start_print_x"] += car_speed2;
        }
    }
    for(i = 13; i <= 15; i++){
        if(sprite_info[i]["start_print_x"] > 399){
            sprite_info[i]["start_print_x"] = -31;
        }
        else{
            sprite_info[i]["start_print_x"] += car_speed3;
        }
    }
    for(i = 16; i <= 18; i++){
        if(sprite_info[i]["start_print_x"] < -20){
            sprite_info[i]["start_print_x"] = 420;
        }
        else{
            sprite_info[i]["start_print_x"] -= car_speed1;
        }
    }
    for(i = 19; i <= 21; i++){
        if(sprite_info[i]["start_print_x"] < -40){
            sprite_info[i]["start_print_x"] = 420;
        }
        else{
            sprite_info[i]["start_print_x"] -= car_speed3;
        }
    }
}

function move_turtles(){
    for(i = 30; i < 36; i++){
        if(sprite_info[i]["start_print_x"] < -30){
            sprite_info[i]["start_print_x"] = 430;
        }
        else{
            sprite_info[i]["start_print_x"] -= turtle_speed;
        }
    }
}

function move_frog(dir){
    switch(dir){
    //left
    case 37:
        if(sprite_info[22]["start_print_x"] > 10){
            sprite_info[22]["start_print_x"] -= 35;
//            sprite_info[22]  = {"image_start_x_loc": 81, "image_start_y_loc":333, "x_length": 20, "y_length":24,
//                                "start_print_x":sprite_info[22]["start_print_x"], "start_print_y":sprite_info[22]["start_print_y"], "x_resize":20, "y_resize":24};
        }
    break;
    //up
    case 38:
        score += 10;
        sprite_info[22]["start_print_y"] -= 35;
//        sprite_info[22]  = {"image_start_x_loc": 13, "image_start_y_loc":368, "x_length": 24, "y_length":20,
//                            "start_print_x":sprite_info[22]["start_print_x"], "start_print_y":sprite_info[22]["start_print_y"], "x_resize":24, "y_resize":20};
    break;
    //right
    case 39:
        if(sprite_info[22]["start_print_x"] < 370){
            sprite_info[22]["start_print_x"] += 35;
//            sprite_info[22]  = {"image_start_x_loc": 13, "image_start_y_loc":333, "x_length": 20, "y_length":24,
//                                "start_print_x":sprite_info[22]["start_print_x"], "start_print_y":sprite_info[22]["start_print_y"], "x_resize":20, "y_resize":24};
        }
    break;
    //down
    case 40:
        if(sprite_info[22]["start_print_y"] < 500){
            sprite_info[22]["start_print_y"] += 35;
//            sprite_info[22]  = {"image_start_x_loc": 81, "image_start_y_loc":366, "x_length": 24, "y_length":20,
//                                "start_print_x":sprite_info[22]["start_print_x"], "start_print_y":sprite_info[22]["start_print_y"], "x_resize":24, "y_resize":20};
        }
    break;
    }
}

function collided_with_car(){
    for(i = 7; i <= 21; i++){
        if(check_collisions(i)) return true;
    }
    return false;
}

function check_collisions(my_index){
        if((sprite_info[my_index]["start_print_x"] < sprite_info[22]["start_print_x"]) &&
           (sprite_info[22]["start_print_x"] < (sprite_info[my_index]["start_print_x"] + sprite_info[my_index]["x_length"])) &&
           (sprite_info[my_index]["start_print_y"] < sprite_info[22]["start_print_y"]) &&
           (sprite_info[22]["start_print_y"] < (sprite_info[my_index]["start_print_y"] + sprite_info[my_index]["y_length"]))){
                return true;
        }
        else if((sprite_info[my_index]["start_print_x"] < (sprite_info[22]["start_print_x"] + sprite_info[22]["x_length"])) &&
           ((sprite_info[22]["start_print_x"] + sprite_info[22]["x_length"]) < (sprite_info[my_index]["start_print_x"] + sprite_info[my_index]["x_length"])) &&
           (sprite_info[my_index]["start_print_y"] < sprite_info[22]["start_print_y"]) &&
           (sprite_info[22]["start_print_y"] < (sprite_info[my_index]["start_print_y"] + sprite_info[my_index]["y_length"]))){
                return true;
        }
        else if((sprite_info[my_index]["start_print_x"] < sprite_info[22]["start_print_x"]) &&
           (sprite_info[22]["start_print_x"] < (sprite_info[my_index]["start_print_x"] + sprite_info[my_index]["x_length"])) &&
           (sprite_info[my_index]["start_print_y"] < (sprite_info[22]["start_print_y"] + sprite_info[22]["y_length"])) &&
           ((sprite_info[22]["start_print_y"] + sprite_info[22]["y_length"]) < (sprite_info[my_index]["start_print_y"] + sprite_info[my_index]["y_length"]))){
                return true;
        }
        else if((sprite_info[my_index]["start_print_x"] < (sprite_info[22]["start_print_x"] + sprite_info[22]["x_length"])) &&
           ((sprite_info[22]["start_print_x"] + sprite_info[22]["x_length"]) < (sprite_info[my_index]["start_print_x"] + sprite_info[my_index]["x_length"])) &&
           (sprite_info[my_index]["start_print_y"] < (sprite_info[22]["start_print_y"] + sprite_info[22]["y_length"])) &&
           ((sprite_info[22]["start_print_y"] + sprite_info[22]["y_length"]) < (sprite_info[my_index]["start_print_y"] + sprite_info[my_index]["y_length"]))){
                return true;
        }
}

function collided_with_log_or_turtles(){
    for(i = 4; i < 7; i++){
        if(check_collisions(i)){
            frog_horiz_speed = log_speed;
            sprite_info[22]["start_print_x"] -= frog_horiz_speed;
            return true;
        }
    }
    for(i = 36; i < 40; i++){
        if(check_collisions(i)){
            frog_horiz_speed = log_speed;
            sprite_info[22]["start_print_x"] -= frog_horiz_speed;
            return true;
        }
    }
    for(i = 30; i < 36; i++){
        if(check_collisions(i)){
            frog_horiz_speed = turtle_speed;
            sprite_info[22]["start_print_x"] -= frog_horiz_speed;
            return true;
        }
    }
    return false;
}

function collided_with_fly(){
    if(check_collisions(40)){ return true;}
    else{ return false;}
}

function collided_with_finish(){
    if((sprite_info[22]["start_print_x"] > 18) && (sprite_info[22]["start_print_x"] < 40) && (sprite_info[22]["start_print_y"] == 80)){
        // make sure that the home is not already taken
        for(i = 0; i < victory_locations.length; i++){
            if(victory_locations[i] == 22) { return false;}
        }
        victory_locations[victory_locations.length] = 22;
        if(random_x_fly == 22){
            score += 200;
            fly_present = false;
        }
        // erase this location from the free locations
        for(i = 0; i < free_vic_locs.length; i++){
            if(free_vic_locs[i] == 22){
                free_vic_locs[i] = -1;
            }
        }
        return true;
    }
    if(sprite_info[22]["start_print_x"] > 90 && sprite_info[22]["start_print_x"] < 130 && sprite_info[22]["start_print_y"] == 80){
        for(i = 0; i < victory_locations.length; i++){
            if(victory_locations[i] == 106) { return false;}
        }
        if(random_x_fly == 106){
            score += 200;
            fly_present = false;
        }
        // erase this location from the free locations
        for(i = 0; i < free_vic_locs.length; i++){
            if(free_vic_locs[i] == 106){
                free_vic_locs[i] = -1;
            }
        }
        victory_locations[victory_locations.length] = 106;
        return true;
    }
    if(sprite_info[22]["start_print_x"] > 175 && sprite_info[22]["start_print_x"] < 210 && sprite_info[22]["start_print_y"] == 80){
        for(i = 0; i < victory_locations.length; i++){
            if(victory_locations[i] == 190) { return false;}
        }
        if(random_x_fly == 190){
            score += 200;
            fly_present = false;
        }
        // erase this location from the free locations
        for(i = 0; i < free_vic_locs.length; i++){
            if(free_vic_locs[i] == 190){
                free_vic_locs[i] = -1;
            }
        }
        victory_locations[victory_locations.length] = 190;
        return true;
    }
    if(sprite_info[22]["start_print_x"] > 260 && sprite_info[22]["start_print_x"] < 300 && sprite_info[22]["start_print_y"] == 80){
        for(i = 0; i < victory_locations.length; i++){
            if(victory_locations[i] == 274) { return false;}
        }
        // erase this location from the free locations
        for(i = 0; i < free_vic_locs.length; i++){
            if(free_vic_locs[i] == 274){
                free_vic_locs[i] = -1;
            }
        }
        if(random_x_fly == 274){
            score += 200;
            fly_present = false;
        }
        victory_locations[victory_locations.length] = 274;
        return true;
    }
    if(sprite_info[22]["start_print_x"] > 350 && sprite_info[22]["start_print_x"] < 380 && sprite_info[22]["start_print_y"] == 80){
        for(i = 0; i < victory_locations.length; i++){
            if(victory_locations[i] == 358) { return false;}
        }
        // erase this location from the free locations
        for(i = 0; i < free_vic_locs.length; i++){
            if(free_vic_locs[i] == 358){
                free_vic_locs[i] = -1;
            }
        }
        if(random_x_fly == 358){
            score += 200;
            fly_present = false;
        }
        victory_locations[victory_locations.length] = 358;
        return true;
    }
}

function random_finish(){
    free_vic_locs    = [22, 106, 190, 274, 358];
    var ran_index = Math.floor(Math.random() * 5);
    if(free_vic_locs[ran_index] != -1){
        return free_vic_locs[ran_index];
    }
}

function draw(){
    canvas = document.getElementById('game');
    if (canvas.getContext){
        ctx.clearRect(0, 0, 565, 399); // clear the screen
        // Draw the canvas
        ctx = canvas.getContext('2d');
        ctx.fillStyle = '#191970';
        ctx.fillRect (0, 0, 560, 280);
        ctx.fillStyle = '#000000';
        ctx.fillRect (0, 280, 560, 550);
        
        // Draw the text at the bottom of the screen
        ctx.fillStyle="rgb(0, 255, 0)";
        ctx.font="10pt Helvetica";
        ctx.fillText("Score: " + score, 2, 560);

        ctx.fillStyle="rgb(0, 255, 0)";
        ctx.font="10pt Helvetica";
        ctx.fillText("Highscore: 0", 70, 560);

        ctx.fillStyle="rgb(0, 255, 0)";
        ctx.font="18pt Helvetica";
        ctx.fillText("Level " + level, 43, 545);

        // Draw image
        img = new Image();
        img.src = 'assets/frogger_sprites.png';

        // draw turtles
        for(i = 30; i < 36; i++){
            ctx.drawImage(img, sprite_info[i]["image_start_x_loc"], sprite_info[i]["image_start_y_loc"], sprite_info[i]["x_length"],
                               sprite_info[i]["y_length"], sprite_info[i]["start_print_x"], sprite_info[i]["start_print_y"],
                               sprite_info[i]["x_resize"], sprite_info[i]["y_resize"]);
        }
        // draw extra logs
        for(i = 36; i < 40; i++){
            ctx.drawImage(img, sprite_info[i]["image_start_x_loc"], sprite_info[i]["image_start_y_loc"], sprite_info[i]["x_length"],
                               sprite_info[i]["y_length"], sprite_info[i]["start_print_x"], sprite_info[i]["start_print_y"],
                               sprite_info[i]["x_resize"], sprite_info[i]["y_resize"]);
        }
        // draw game board
        for(i = 0; i < 23; i++){
            ctx.drawImage(img, sprite_info[i]["image_start_x_loc"], sprite_info[i]["image_start_y_loc"], sprite_info[i]["x_length"],
                               sprite_info[i]["y_length"], sprite_info[i]["start_print_x"], sprite_info[i]["start_print_y"],
                               sprite_info[i]["x_resize"], sprite_info[i]["y_resize"]);
        }
        // draw lives
        for(i = 0; i < total_lives; i++){
            ctx.drawImage(img, sprite_info[23+i]["image_start_x_loc"], sprite_info[23+i]["image_start_y_loc"], sprite_info[23+i]["x_length"],
                               sprite_info[23+i]["y_length"], sprite_info[23+i]["start_print_x"], sprite_info[23+i]["start_print_y"],
                               sprite_info[23+i]["x_resize"], sprite_info[23+i]["y_resize"]);
        }
        // randomly draw fly
        if(!((Math.floor(Math.random() * 2500)) % 1717) && (fly_present == false)){
            fly_present = true;
            fly_wait = fly_counter;
            random_x_fly = random_finish();
        }
        if((fly_counter < (fly_wait + 500)) && fly_present){
            sprite_info[40]  = {"image_start_x_loc":135, "image_start_y_loc":234, "x_length": 20, "y_length":20, "start_print_x":random_x_fly, "start_print_y":80, "x_resize":20, "y_resize":20};
            ctx.drawImage(img, sprite_info[40]["image_start_x_loc"], sprite_info[40]["image_start_y_loc"], sprite_info[40]["x_length"],
                               sprite_info[40]["y_length"], random_x_fly, 80,
                               sprite_info[40]["x_resize"], sprite_info[40]["y_resize"]);
        }
        else{
            fly_present = false;
        }
        
        fly_counter++;
        move_logs();
        move_turtles();
        move_cars();
        // if frog is in water or jumped onto green area
        if((sprite_info[22]["start_print_y"] < 280) && (collided_with_log_or_turtles() == false)){
            if(collided_with_finish()){
                score += 50;
                frogs_home++;
                sprite_info[22]["start_print_x"] = 190;
                sprite_info[22]["start_print_y"] = 500;
            }
            else{
                reset_after_death();
            }
        }
        if(collided_with_car()){
            reset_after_death();
        }
        if(frogs_home == 5){
            victory();
        }
        // draw the frogs who have reached home
        for(i = 0; i < frogs_home; i++){
            ctx.drawImage(img, sprite_info[25+i]["image_start_x_loc"], sprite_info[25+i]["image_start_y_loc"], sprite_info[25+i]["x_length"],
                               sprite_info[25+i]["y_length"], victory_locations[i], 80,
                               sprite_info[25+i]["x_resize"], sprite_info[25+i]["y_resize"]);
        }
        if(score >= 10000){ total_lives++;}
        // ctx.drawImage(img,top_left_x_coor,top_left_y_coor,horiz_dist,vert_dist,x_coord_to_print,y_coord_to_print,top_left_x_coor,top_left_y_coor);
        // ex:... ctx.drawImage(img,13,13,318,32,10,14,318,32);
    }
    else { alert('Sorry, canvas is not supported on your browser!'); }
}

function reset_after_death(){
    if(total_lives > 0){
        total_lives--;
    }
    else {
        game_over();
    }
    sprite_info[22]["start_print_x"] = 190;
    sprite_info[22]["start_print_y"] = 500;
}

function victory(){
    level            += 1;
    log_speed        -= 1;
    turtle_speed     += 1;
    car_speed1       += 0.2;
    car_speed2       += 0.2;
    car_speed3       += 0.2;
    score            += 1000;
    frogs_home        = 0;
    victory_locations = [];
}

function checkKey(e) {
    e = e || window.event;
    move_frog(e.keyCode);
}

function prompt_user_name() {
    username = prompt("Your score is " + score + ".\nPlease enter your name","");
    //d        = new Date;
    //creation = ((d.getMonth()+1) + '/' + d.getDate() + '/' + d.getFullYear() + ' ' + d.getHours() + ':' + d.getMinutes());
    //$.post("http://localhost:5000/submit.json", {"game_title": 'Frogger', "username": username, "score": score}, function (data, textStatus)); 
    $.post("http://localhost:5000/submit.json", {"game_title": 'Frogger', "username": username, "score": score}); 
}

function game_over(){
//    ctx.clearRect(sprite_info[22]["start_print_x"], sprite_info[22]["start_print_y"], sprite_info[22]["x_length"], sprite_info[22]["y_length"]); // clear the frog
    
    ctx.drawImage(game_over_img, sprite_info[22]["start_print_x"], sprite_info[22]["start_print_y"]);
    prompt_user_name();
    init_global_vars();
    victory_locations = [];
}

function run_game(){
    // play frogger theme song on repeat
    myAudio = new Audio('assets/frogger_song.mp3'); 
    myAudio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
    myAudio.play();
    // set up key listener
    document.onkeydown = checkKey;
    init_game_variables();
    delay = 30; // milliseconds
    setInterval(draw, delay); // draw refers to the function
}
