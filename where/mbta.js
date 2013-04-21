/* a big thank you to Ming Chow */

/* initialize variables */
var request = new XMLHttpRequest();
var request1 = new XMLHttpRequest();
var info_window = new google.maps.InfoWindow();
var my_info_win = new google.maps.InfoWindow();
var marker;
var pic_marker;
var waldo_marker;
var carmen_marker;
var t_abbrevs = [];
var red_line_stations = [];
var red_line_ashmont = [];
var red_line_braintree = [];
var waldo_and_carmen = [];
var t_locations = [];
var waldo_lng;
var waldo_lat;
var carmen_lng;
var carmen_lat;
var my_lat;
var my_lng;
/* set up map */
var myOptions = {
    zoom: 11, 
//      center: centerMBTA,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};

function init() {
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    get_my_location();
    init_red_line();
    render_red_line();
}

function render_map() {
    me = new google.maps.LatLng(my_lat, my_lng);
    /* update map and go to me */
    map.panTo(me);

    var distance_informatzia = closest_station();

    /* create a marker */
    marker = new google.maps.Marker({
        position: me,

        title: "Here I Am! The closest T station is " + distance_informatzia["station"] +
                ". It is " + distance_informatzia["distance"] + " miles away from me."
    });
    marker.setMap(map);

    /* on click of marker, open info window */
    google.maps.event.addListener(marker, 'click', function() {
        info_window.setContent(marker.title);
        info_window.open(map, marker);
    });

    var request = {
        location: me,
        radius: '500',
        types: ['food']
    };
}

function get_my_location() {
    /* determine if the navigator.geolocation object is supported in browser */
    if (navigator.geolocation) { 
        navigator.geolocation.getCurrentPosition(function(position) {
            my_lat = position.coords.latitude;
            my_lng = position.coords.longitude;
            render_map();
            render_waldo_and_carmen();
            get_mbta_times();
        });
    }
    else {
        alert("Geolocation is not supported by your web browser.");
    }
}

function init_t_locations(){
    t_locations[0]  = {"station": "Alewife Station", "lat":42.395428, "lng":-71.142483};
    t_locations[1]  = {"station": "Davis Station", "lat":42.39674, "lng": -71.121815};
    t_locations[2]  = {"station": "Porter Sqaure Station", "lat":42.3884, "lng":-71.119149};
    t_locations[3]  = {"station": "Harvard Sqaure Station", "lat":42.373362, "lng":-71.118956};
    t_locations[4]  = {"station": "Central Sqaure Station", "lat":42.365486, "lng":-71.103802};
    t_locations[5]  = {"station": "Kendall/MIT Sqaure Station", "lat":42.36249079, "lng":-71.08617653};
    t_locations[6]  = {"station": "Charles/MGH Station", "lat":42.361166, "lng":-71.070628};
    t_locations[7]  = {"station": "Park St. Station", "lat":42.35639457, "lng":-71.0624242};
    t_locations[8]  = {"station": "Downtown Crossing Station", "lat":42.355518, "lng":-71.060225};
    t_locations[9]  = {"station": "South Station", "lat":42.352271, "lng":-71.055242};
    t_locations[10] = {"station": "Broadway Station", "lat":42.342622, "lng":-71.056967};
    t_locations[11] = {"station": "Andrew Station", "lat":42.330154, "lng":-71.057655};
    t_locations[12] = {"station": "JFK/UMass Station", "lat":42.320685, "lng":-71.052391};
    t_locations[13] = {"station": "North Quincy Station", "lat":42.275275, "lng":-71.029583};
    t_locations[14] = {"station": "Savin Hill Station", "lat":42.31129, "lng":-71.053331};
    t_locations[15] = {"station": "Fields Corner Station", "lat":42.300093, "lng":-71.061667};
    t_locations[16] = {"station": "Wollaston Station", "lat":42.2665139, "lng":-71.0203369};
    t_locations[17] = {"station": "Quincy Center Station", "lat":42.251809, "lng":-71.005409};
    t_locations[18] = {"station": "Shawmut Station", "lat":42.29312583, "lng":-71.06573796};
    t_locations[19] = {"station": "Quincy Adams Station", "lat":42.233391, "lng":-71.007153};
    t_locations[20] = {"station": "Ashmont Station", "lat":42.284652, "lng":-71.064489};
    t_locations[21] = {"station": "Braintree Station", "lat":42.2078543, "lng":-71.0011385};
}

function my_to_rad(x) {
   return x * Math.PI / 180;
}

function distance_me_to_dest(me_lat, me_lng, dest_lat, dest_lng){
    var R = 3958.76; // miles
    var dLat     = my_to_rad(me_lat-dest_lat);
    var dLon     = my_to_rad(me_lng-dest_lng)
    var dest_lat = my_to_rad(dest_lat);
    var me_lat   = my_to_rad(me_lat);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(dest_lat) * Math.cos(me_lat); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
    return d;
}


function closest_station(){
    init_t_locations();
    var min = 100000000;
    var t_station = "";
    for (var m in t_locations) {
        var d = distance_me_to_dest(my_lat, my_lng, t_locations[m]["lat"], t_locations[m]["lng"]);
        if (d < min) { min = d; t_station = t_locations[m]["station"];};
    }
    return {"distance": min, "station": t_station};
}

function init_red_line(){
    pt = new google.maps.LatLng(42.395428, -71.142483);
        red_line_stations.push(pt);
    pt = new google.maps.LatLng(42.39674, -71.121815);
        red_line_stations.push(pt);
    pt = new google.maps.LatLng(42.3884, -71.119149);
        red_line_stations.push(pt);
    pt = new google.maps.LatLng(42.373362, -71.118956);
        red_line_stations.push(pt);
    pt = new google.maps.LatLng(42.365486, -71.103802);
        red_line_stations.push(pt);
    pt = new google.maps.LatLng(42.36249079, -71.08617653);
        red_line_stations.push(pt);
    pt = new google.maps.LatLng(42.361166, -71.070628);
        red_line_stations.push(pt);
    pt = new google.maps.LatLng(42.35639457, -71.0624242);
        red_line_stations.push(pt);
    pt = new google.maps.LatLng(42.355518, -71.060225);
        red_line_stations.push(pt);
    pt = new google.maps.LatLng(42.352271, -71.055242);
        red_line_stations.push(pt);
    pt = new google.maps.LatLng(42.342622, -71.056967);
        red_line_stations.push(pt);
    pt = new google.maps.LatLng(42.330154, -71.057655);
        red_line_stations.push(pt);
    pt = new google.maps.LatLng(42.320685, -71.052391);
        red_line_stations.push(pt);
        red_line_ashmont.push(pt);
        red_line_braintree.push(pt);
    pt = new google.maps.LatLng(42.275275, -71.029583);
        red_line_braintree.push(pt);
    pt = new google.maps.LatLng(42.31129, -71.053331);
        red_line_ashmont.push(pt);
    pt = new google.maps.LatLng(42.300093, -71.061667);
        red_line_ashmont.push(pt);
    pt = new google.maps.LatLng(42.2665139, -71.0203369);
        red_line_braintree.push(pt);
    pt = new google.maps.LatLng(42.251809, -71.005409);
        red_line_braintree.push(pt);
    pt = new google.maps.LatLng(42.29312583, -71.06573796);
        red_line_ashmont.push(pt);
    pt = new google.maps.LatLng(42.233391, -71.007153);
        red_line_braintree.push(pt);
    pt = new google.maps.LatLng(42.284652, -71.064489);
        red_line_ashmont.push(pt);
    pt = new google.maps.LatLng(42.2078543, -71.0011385);
        red_line_braintree.push(pt);
}

/*                  render waldo and carmen                           */
/**********************************************************************/
function render_image_of_with_distance(my_picture, pic_lat, pic_lng, info_note, dist_info){
    pic_loc = new google.maps.LatLng(pic_lat, pic_lng);
    /* create a marker */
    pic_marker = new google.maps.Marker({
        map: map,
        position: pic_loc,
        icon: my_picture
    });
    /* on click of marker, open info window */
    google.maps.event.addListener(pic_marker, 'click', function() {
        info_window.setContent(info_note + ". " + dist_info["name"] + " is " + dist_info["distance"] + " miles away from you.");
        info_window.open(map, this);
    });
}

function render_waldo_and_carmen(){
    /* Set up the request */
    request1.open("GET", "http://messagehub.herokuapp.com/a3.json", true);
    /* Execute the request */
    request1.send(null);
    /* Handle the request (however you want) */
    request1.onreadystatechange = find_waldo_and_carmen;
}

function find_waldo_and_carmen(){
    waldo_icon  = "images/waldo.png";
    carmen_icon = "images/carmen.png";
    if (request1.readyState == 4 && request1.status == 200){
        waldo_l = JSON.parse(request1.responseText);
        for(i = 0; i < waldo_l.length; i++){
            name      = waldo_l[i]["name"];
            lati      = waldo_l[i]["loc"]["latitude"];
            longi     = waldo_l[i]["loc"]["longitude"];
            info_note = waldo_l[i]["loc"]["note"];
            if (name == "Waldo"){ 
                var d = distance_me_to_dest(my_lat, my_lng, lati, longi);
                var dist_info = {"name": "Waldo", "distance": d};
                render_image_of_with_distance(waldo_icon, lati, longi, info_note, dist_info);
            }
            else{
                var d = distance_me_to_dest(my_lat, my_lng, lati, longi);
                var dist_info = {"name": "Carmen", "distance": d};
                render_image_of_with_distance(carmen_icon, lati, longi, info_note, dist_info);
            }
        }
    }
}
/**********************************************************************/

/*                  render red line and stations                      */
/**********************************************************************/
function render_image_of(my_picture, pic_lat, pic_lng, t_stop, map_info_note){
    pic_loc = new google.maps.LatLng(pic_lat, pic_lng);
    /* create a marker */
    pic_marker = new google.maps.Marker({
        map: map,
        position: pic_loc,
        icon: my_picture
    });

    /* on click of marker, open info window */
    google.maps.event.addListener(pic_marker, 'click', function() {
        info_window.setContent(t_stop + "<p>" + map_info_note);//the_sched);
        info_window.open(map, this);
    });
}

function get_mbta_times(){
    /* Set up the request */
    request.open("GET", "http://mbtamap.herokuapp.com/mapper/redline.json", true);
    /* Execute the request */
    request.send(null);
    /* Handle the request */
    request.onreadystatechange = parse_schedule;
}

/* displays the T schedule for each station */
function parse_schedule(){
    var t_content_string = "";
    init_t_abbreviations();
    t_marker = "images/the_t.png";
    if (request.readyState == 4 && request.status == 200){
        t_content_string = "";
        t_schedules = JSON.parse(request.responseText);

        for(m = 0; m < t_abbrevs.length; m++){// in t_abbrevs){
            for(i = 0; i < t_schedules.length; i++){
            
                if (t_schedules[i]["PlatformKey"] == t_abbrevs[m]["abb"]){
                    t_stop      = t_schedules[i]["PlatformKey"];
                    line_col    = t_schedules[i]["Line"];
                    trip_num    = t_schedules[i]["Trip"];
                    time_rem    = t_schedules[i]["TimeRemaining"];
                    if (t_schedules[i]["PlatformKey"][4] == 'N'){
                        nor_or_sou = "North";
                    }
                    else {
                        nor_or_sou = "South";
                    }
                    var t_stop_full = t_abbrevs[m]["full_name"];
                    t_content_string += line_col +" "+ trip_num +" "+ nor_or_sou +" " + time_rem + "<p>"
                    var index = m;
                }
            }
            var temp = m + 1;
            if(temp < t_abbrevs.length){
                if (t_stop_full != t_abbrevs[temp]["full_name"]){
                    render_image_of(t_marker, t_abbrevs[index]["lat"], t_abbrevs[index]["lng"], t_stop_full, t_content_string); 
                    t_content_string = "";
                }
            }
        }
        render_image_of(t_marker, t_abbrevs[index]["lat"], t_abbrevs[index]["lng"], t_stop_full, t_content_string); 
    }
}

function init_t_abbreviations(){
    t_abbrevs[0] = {"abb": "RALEN", "full_name": "Alewife Station", "lat": 42.395428, "lng": -71.142483};
    t_abbrevs[1] = {"abb": "RDAVN", "full_name": "Davis Station", "lat":42.39674, "lng": -71.121815};
    t_abbrevs[2] = {"abb": "RDAVS", "full_name": "Davis Station", "lat":42.39674, "lng": -71.121815};
    t_abbrevs[3] = {"abb": "RPORN", "full_name": "Porter Square", "lat":42.3884, "lng": -71.119149};
    t_abbrevs[4] = {"abb": "RPORS", "full_name": "Porter Square", "lat":42.3884, "lng": -71.119149};
    t_abbrevs[5] = {"abb": "RHARN", "full_name": "Harvard Square", "lat":42.373362, "lng": -71.118956};
    t_abbrevs[6] = {"abb": "RHARS", "full_name": "Harvard Square", "lat":42.373362, "lng": -71.118956};
    t_abbrevs[7] = {"abb": "RCENN", "full_name": "Central Square Square", "lat":42.365486, "lng":-71.103802};
    t_abbrevs[8] = {"abb": "RCENS", "full_name": "Central Square Square", "lat":42.365486, "lng":-71.103802};
    t_abbrevs[9] = {"abb": "RKENN", "full_name": "Kendall/MIT Square", "lat":42.36249079, "lng":-71.08617653};
    t_abbrevs[10] = {"abb": "RKENS", "full_name": "Kendall/MIT Square", "lat":42.36249079, "lng":-71.08617653};
    t_abbrevs[11] = {"abb": "RMGHN", "full_name": "Charles/MGH Square", "lat":42.361166, "lng":-71.070628};
    t_abbrevs[12] = {"abb": "RMGHS", "full_name": "Charles/MGH Square", "lat":42.361166, "lng":-71.070628};
    t_abbrevs[13] = {"abb": "RPRKN", "full_name": "Park St. Square", "lat":42.35639457, "lng":-71.0624242};
    t_abbrevs[14] = {"abb": "RPRKS", "full_name": "Park St. Square", "lat":42.35639457, "lng":-71.0624242};
    t_abbrevs[15] = {"abb": "RDTCN", "full_name": "Downtown Crossing Square", "lat":42.355518, "lng":-71.060225};
    t_abbrevs[16] = {"abb": "RDTCS", "full_name": "Downtown Crossing Square", "lat":42.355518, "lng":-71.060225};
    t_abbrevs[17] = {"abb": "RSOUN", "full_name": "South Square", "lat":42.352271, "lng":-71.055242};
    t_abbrevs[18] = {"abb": "RSOUS", "full_name": "South Square", "lat":42.352271, "lng":-71.055242 };
    t_abbrevs[19] = {"abb": "RBRON", "full_name": "Broadway Square", "lat":42.342622, "lng":-71.056967};
    t_abbrevs[20] = {"abb": "RBROS", "full_name": "Broadway Square", "lat":42.342622, "lng":-71.056967};
    t_abbrevs[21] = {"abb": "RANDN", "full_name": "Andrew Station", "lat":42.330154, "lng":-71.057655};
    t_abbrevs[22] = {"abb": "RANDS", "full_name": "Andrew Station", "lat":42.330154, "lng":-71.057655};
    t_abbrevs[23] = {"abb": "RJFKN", "full_name": "JFK/UMass Square", "lat":42.320685, "lng":-71.052391};
    t_abbrevs[24] = {"abb": "RJFKS", "full_name": "JFK/UMass Square", "lat":42.320685, "lng":-71.052391};
    t_abbrevs[25] = {"abb": "RSAVN", "full_name": "Savin Hall Square", "lat":42.31129, "lng":-71.053331};
    t_abbrevs[26] = {"abb": "RSAVS", "full_name": "Savin Hall Square", "lat":42.31129, "lng":-71.053331};
    t_abbrevs[27] = {"abb": "RFIEN", "full_name": "Fields Corner Square", "lat":42.300093, "lng":-71.061667};
    t_abbrevs[28] = {"abb": "RFIES", "full_name": "Fields Corner Square", "lat":42.300093, "lng":-71.061667};
    t_abbrevs[29] = {"abb": "RFIEN", "full_name": "Shawmut Square", "lat":42.29312583, "lng":-71.06573796};
    t_abbrevs[30] = {"abb": "RFIES", "full_name": "Shawmut Square", "lat":42.29312583, "lng":-71.06573796};
    t_abbrevs[31] = {"abb": "RASHS", "full_name": "Ashmont Square", "lat":42.284652, "lng":-71.064489};
    t_abbrevs[32] = {"abb": "RNQUN", "full_name": "North Quincy Square", "lat":42.275275, "lng":-71.029583};
    t_abbrevs[33] = {"abb": "RNQUS", "full_name": "North Quincy Square", "lat":42.275275, "lng":-71.029583};
    t_abbrevs[34] = {"abb": "RWOLN", "full_name": "Wollaston Square", "lat":42.2665139, "lng":-71.0203369};
    t_abbrevs[35] = {"abb": "RWOLS", "full_name": "Wollaston Square", "lat":42.2665139, "lng":-71.0203369};
    t_abbrevs[36] = {"abb": "RQUCN", "full_name": "Quincy Center Square", "lat":42.251809, "lng":-71.005409};
    t_abbrevs[37] = {"abb": "RQUCS", "full_name": "Quincy Center Square", "lat":42.251809, "lng":-71.005409};
    t_abbrevs[38] = {"abb": "RQUAN", "full_name": "Quincy Adams Square", "lat":42.233391, "lng":-71.007153};
    t_abbrevs[39] = {"abb": "RQUAS", "full_name": "Quincy Adams Square", "lat":42.233391, "lng":-71.007153};
    t_abbrevs[40] = {"abb": "RBRAS", "full_name": "Braintree Square", "lat":42.2078543, "lng":-71.0011385};
}

/* displays the actual red line on the map */
function render_red_line(){
    red_line = new google.maps.Polyline({
        path: red_line_stations,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 10
    });
    red_line.setMap(map);
    red_branch_ashmont = new google.maps.Polyline({
        path: red_line_ashmont,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 10
    });
    red_branch_ashmont.setMap(map);
    red_branch_braintree = new google.maps.Polyline({
        path: red_line_braintree,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 10
    });
    red_branch_braintree.setMap(map);
}

