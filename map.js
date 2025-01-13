let start_pos = 0,end_pos=0;
let zoomLevel = 1;
        const canvas = document.getElementById('myCanvas');
        const context = canvas.getContext('2d');

        // Latitude and longitude boundaries
        const minLat = 19.06700; 
        const maxLat = 19.07450; 
        const minLng = 72.85430; 
        const maxLng = 72.86060;

        let canvasHeight = 0;
        let canvasWidth = 0;
        // Canvas dimensions
	if(screen.width > 800){
        canvasHeight = screen.height;
        canvasWidth = screen.width;
	}
	else
	{
	//for width screen having width less than 800px
	canvasHeight = visualViewport.height;
	canvasWidth = visualViewport.width;		
    	zoomLevel=2;
	}
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        // Zoom level and offsets
      
        let offsetX = 0;
        let offsetY = 0;

        // Mouse state for panning
        let isDragging = false;
        let startX, startY;

        // Utility function to map lat/lng to canvas coordinates
        function latLngToCanvas(lat, lng) {
           // const y = ((maxLat - lat) / (maxLat - minLat)) * parseFloat(canvasHeight) * zoomLevel + offsetY;
           // const x = ((lng - minLng) / (maxLng - minLng)) * parseFloat(canvasWidth) * zoomLevel + offsetX;
let y,x;
            if(screen.width > 800){
            y = ((maxLat - lat) / (maxLat - minLat)) * parseFloat(canvasHeight)*zoomLevel + offsetY;
            x = ((lng - minLng) / (maxLng - minLng)) * parseFloat(canvasWidth)*zoomLevel + offsetX;
            }
            else
            {
                y = ((maxLat - lat) / (maxLat - minLat)) * parseFloat(canvasHeight) + offsetY;
            x = ((lng - minLng) / (maxLng - minLng)) * parseFloat(canvasWidth) + offsetX;
            }
            return [x, y];
        }


        let locations = [
            { place: "dnyaneshwar bhavan", lat: 19.07250, lng: 72.85822, zoom: 1 },
            { place: "lokmanya tilak bhavan (department of physics)", lat: 19.07230, lng: 72.85850, zoom: 1 },
            { place: "department of biotechnology", lat: 19.07145, lng: 72.85857, zoom: 2 },
            { place: "pherozshah mehta bhavan (deparment of civics and politics)", lat: 19.07372, lng: 72.85906, zoom: 1 },
            { place: "department of communication and journalism", lat: 19.07322, lng: 72.86049, zoom: 2 },
            { place: "health center (mehul stationary)", lat: 19.07283, lng: 72.86001, zoom: 1 },
            { place: "department of archeology", lat: 19.07346, lng: 72.86025, zoom: 2 },
            { place: "center for extra mural studies", lat: 19.07327, lng: 72.86016, zoom: 2 },
            { place: "savitribai phule girls hostel", lat: 19.07347, lng: 72.85959, zoom: 1 },
            { place: "three monkey point", lat: 19.07293, lng: 72.85991, zoom: 3 },
            { place: "rose garden", lat: 19.07246, lng: 72.85990, zoom: 3 },
            { place: "sculpture point", lat: 19.07188, lng: 72.85993, zoom: 3 },
            { place: "academy for administrative career", lat: 19.07201, lng: 72.86025, zoom: 2 },
            { place: "j.p naik bhavan", lat: 19.07201, lng: 72.86022, zoom: 1 },
            { place: "K.B.P boy's hostel", lat: 19.07036, lng: 72.85975, zoom: 1 },
            { place: "UGC human resources development centre", lat: 19.06976, lng: 72.85967, zoom: 2 },
            { place: "university of mumbai law academy", lat: 19.06963, lng: 72.85985, zoom: 2 },
            { place: "shakarrao chavan bhavan", lat: 19.06958, lng: 72.85998, zoom: 2 },
            { place: "maulana abul kalam azad bhavan", lat: 19.06916, lng: 72.85923, zoom: 2 },
            {
                place: "alkesh dinesh mody institute for financial and management studies",
                lat: 19.06980, lng: 72.85845, zoom: 1
            },
            { place: "mahatma jyotirao phule bhavan", lat: 19.06873, lng: 72.85740, zoom: 1 },
            { place: "university main canteen", lat: 19.07108, lng: 72.85897, zoom: 1 },
            { place: "the buddha circle", lat: 19.07130, lng: 72.85836, zoom: 3 },
            { place: "marathi bhasa bhavan", lat: 19.07097, lng: 72.85822, zoom: 1 },
            { place: "nyaymurthi ranade bhavan", lat: 19.07122, lng: 72.85797, zoom: 2 },
            { place: "pariksha bhavan(exam house) university of mumbai", lat: 19.06843, lng: 72.85725, zoom: 1 },
            { place: "chatrapati shivaji maharaj bhavan", lat: 19.06822, lng: 72.85801, zoom: 1 },
            { place: "rajiv gandhi centre for contemporary studies", lat: 19.07016, lng: 72.85595, zoom: 2 },
            { place: "thesis department of mumbai", lat: 19.06928, lng: 72.85530, zoom: 2 },
            { place: "national centre for nanoscience and nanotechnology", lat: 19.06915, lng: 72.85518, zoom: 1 },
            { place: "CEBS hostel takshashila", lat: 19.06841, lng: 72.85534, zoom: 2 },
            { place: "UM-DAE centre for excellencce and basic ( CEBS)", lat: 19.06832, lng: 72.85489, zoom: 1 },
            { place: "international students hostel", lat: 19.06811, lng: 72.85444, zoom: 1 },
            { place: "Dr. ambedkar bhavan", lat: 19.07214, lng: 72.85522, zoom: 1 },
            { place: "university of mumbai sports complex", lat: 19.07444, lng: 72.85437, zoom: 1 },
            { place: "centre for central euresian studies", lat: 19.07093, lng: 72.85757, zoom: 2 },
            { place: "department of applied psychology", lat: 19.07252, lng: 72.85697, zoom: 2 },
            { place: "basket ball courts", lat: 19.07282, lng: 72.85455, zoom: 1 },
            {
                place: "garware institute of career educations and development", lat: 19.07380,
                lng: 72.85701, zoom: 1
            },
            {
                place: "university department  of information techonology",
                lat: 19.07330, lng: 72.85833, zoom: 2
            },
            { place: "instiute of distance learning(IDOL)", lat: 19.07326, lng: 72.85861, zoom: 1 },
            { place: "nehru yuva kendra sanghthan", lat: 19.07204, lng: 72.86029, zoom: 2 },
            { place: "old lecture complex", lat: 19.07187, lng: 72.85768, zoom: 2 }
        ];

		let is_direction_on = false;

        //getting all input element in an array	
        let inputs = document.querySelectorAll("input");
        let start = document.querySelector("select[name='start']");
        let end = document.querySelector("select[name='end']");

        //adding keyup event to first input field(from top) which takes where are you?
        inputs[0].addEventListener("keyup", (e) => doAction(e, start));

        //keyup even to second input field which takes where to go?
        inputs[1].addEventListener("keyup", (e) => doAction(e, end));

        //specifying what will happen if selection changed from drop down menu for both select element
        start.addEventListener("change", () => {
            inputs[0].value = start.options[start.selectedIndex].innerText;
        });

        end.addEventListener("change", () => {
            inputs[1].value = end.options[end.selectedIndex].innerText;
        });

        //function which takes start or end select element and populate it with user input in respective input element
        function doAction(e, targetSelect) {
            targetSelect.options.length = 1; // Clear previous options except the first one
            let targetedValue = e.target.value;
            if (targetedValue == "") { targetSelect.options.length = 1; }
            else {
                for (let pl of locations) {
                    if (pl.place.toLowerCase().includes(targetedValue.toLowerCase())) {
                        targetSelect.options[targetSelect.options.length] = new Option(pl.place, `${pl.lat},${pl.lng}`);
                    }
                }
            }
        }

        document.getElementById('map_direction').addEventListener("click", () => {
            
			if(start.options.length == 1 || end.options.length == 1){
			alert("please select place from selection box ");
			return;}
			
	    let [lat1, lng1] = start.value.split(",");
            let [lat2, lng2] = end.value.split(",");

			

            if (lat1 == lat2 && lng1 == lng2) {
                alert("you are reach at your destination");
            }
            else if (lat1 && lng1 && lat2 && lng2) {

                 //open("https://www.google.com/maps/dir/"+start.value +"/"+ (end.options[end.selectedIndex].innerText).split(" ").join("+") +"/@"+end.value+"z/"); 
		start_pos = [lat1, lng1];
		end_pos = [lat2, lng2];
		is_direction_on = true;
		console.log(start_pos,end_pos);
		ShowSE_direction();
            } else {
                alert('Please select both start and end locations.');
            }
        });

	function ShowSE_direction()
	{
		
		if('geolocation' in navigator){
		console.log("geolocation is supported by your browser");
				
				let [dest_lat,dest_lng] = latLngToCanvas(end_pos[0],end_pos[1]);
					console.log(dest_lat,dest_lng);
					//console.log(start_pos);
					context.fillStyle = 'Red';
                    context.beginPath();
                    let radius = 10;
					//clearCircle(dest_lat,dest_lng,radius);
                    context.arc(dest_lat,dest_lng, radius, 0, Math.PI * 2);  // Increased marker size
                    context.fill();

		let count = 1;
		let x,y;
		const watchId = navigator.geolocation.watchPosition(
			(position)=>{
			let latitude = position.coords.latitude;
			let longitude = position.coords.longitude;
			let accuracy = position.coords.accuracy;
					latitude = latitude.toFixed(5);
					longitude = longitude.toFixed(5);
					[x, y] = latLngToCanvas(latitude, longitude);
					console.log("user's geolocation ",latitude, longitude);
					console.log("user's position",x,y);
					context.fillStyle = 'green';
                    context.beginPath();
                    let radius = 10;
                    context.arc(x, y, radius, 0, Math.PI * 2);  // Increased marker size
                    context.fill();
		    count++;
					
			},
			(error) =>{
			is_direction_on = false;
				switch (error.code) {
                case error.PERMISSION_DENIED:
                    console.error('Permission denied. Please allow location access.');
                    break;
                case error.POSITION_UNAVAILABLE:
                    console.error('Position unavailable. Please check your device.');
                    break;
                case error.TIMEOUT:
                    console.error('Request timed out. Please try again.');
                    break;
                default:
                    console.error('An unknown error occurred.');
            }
			},
			{
			enableHighAccuracy: true, // Request high accuracy for better results
            maximumAge: 0,           // Prevent caching of results
            timeout: 50000            // Timeout after 5 seconds
			}
		);
		
} 

else {
    console.error('Geolocation is not supported by your browser.');
}
		
}
		

        let roads = {

            "north_gate_phule_junction": [[19.07396, 72.85267], [19.07207, 72.85480],
            [19.07104, 72.85585], [19.07097, 72.85588],
            [19.06891, 72.85710]
            ],

            "phule_junction_to_buddha_cirlce": [
                [19.06891, 72.85710], [19.06993, 72.85746],
                [19.07041, 72.85762], [19.07108, 72.85822]
            ],

            "OLC_buddha": [[19.07149, 72.85782], [19.07105, 72.85828]],

            "lokmanya_tilak_buddha_cirlce": [[19.07183, 72.85852], [19.07129, 72.85805], [19.07105, 72.85828]],

            "sahitya_bhavan_to_buddha_circle":
                [[19.07116, 72.85792], [19.07131, 72.85805], [19.07105, 72.85828]],


            "buddha_circle_east_gate": [[19.07041, 72.85762], [19.07108, 72.85822], [19.07105, 72.85828], [19.07103, 72.85834],
            [19.07107, 72.85839], [19.07109, 72.85840],
            [19.07111, 72.85927], [19.07118, 72.85937],
            [19.07196, 72.86005], [19.07274, 72.86001], [19.07283, 72.86083]],

            "phule_junction_east_gate_pariksha_bhavan": [[19.06891, 72.85710],
            [19.06887, 72.85707],
            [19.06885, 72.85711],
            [19.06888, 72.85717],
            [19.06892, 72.85750],
            [19.06886, 72.85772],
            [19.06845, 72.85799],
            [19.06858, 72.85840],
            [19.06964, 72.85937],
            [19.06974, 72.85937],
            [19.07111, 72.85927], [19.07118, 72.85937],
            [19.07196, 72.86005], [19.07274, 72.86001], [19.07283, 72.86083]
            ],

            "east_gate_ambedkar_bhavan": [[19.07283, 72.86083], [19.07271, 72.85837], [19.07303, 72.85802],
            [19.07326, 72.85768],
            [19.07253, 72.85698],
            [19.07285, 72.85642],
            [19.07275, 72.85561],
            [19.07207, 72.85480]
            ],

            "dnyaneshwar_bhavan_csmt": [[19.07224, 72.85803], [19.07271, 72.85837]],

            "old_jawaharlal_library_NLC_deskmush_bhavan_cirlce":
                [[19.07186, 72.85668],
                [19.07188, 72.85671], [19.07192, 72.85679],
                [19.07192, 72.85685], [19.07188, 72.85695],
                [19.07181, 72.85702], [19.07173, 72.85703],
                [19.07164, 72.85701], [19.07157, 72.85694],
                [19.07154, 72.85685], [19.07157, 72.85673],
                [19.07164, 72.85666], [19.07171, 72.85663],
                [19.07178, 72.85664], [19.07188, 72.85671]],

            "jnl_to_csmt_road_toward_ambedkar": [[19.07186, 72.85668], [19.07255, 72.85587], [19.07273, 72.85563]],


            "east_side_road_LTB": [[19.07187, 72.85799], [19.07160, 72.85828]],
            "marathi_bhasa_bhavan_to_road_going_toward_buddha": [[19.07066, 72.85811], [19.07078, 72.85796]],

            "biophysics_to_road_going_toward_buddha_circle": [[19.07013, 72.85710], [19.06994, 72.85746]],
 
            "CBS_to_road_connecting_ambedkar_phule": [[19.06766, 72.85440], [19.06959, 72.85627], [19.06983, 72.85656]],

            "road_around_nanotechnology": [[19.06889, 72.85557], [19.06953, 72.85480], [19.06893, 72.85420], [19.06825, 72.85497]],
        };


        //function to draw roads
        function drawRoads() {

            for (let i in roads) {
                context.lineWidth = 4;
                context.strokeStyle = 'blue';
                    for (let j = 0; j < roads[i].length - 1; j++) {
                    let p1 = roads[i][j];
					
                    let [x, y] = latLngToCanvas(p1[0], p1[1]);
				
                   context.moveTo(x, y);
                    p1 = roads[i][j + 1];
                    [x, y] = latLngToCanvas(p1[0], p1[1]);
					
                    context.lineTo(x, y);
                   
					context.stroke();
                }
            }
        }

        //zl is zoomlevel

        function drawMap(zl) {
            context.clearRect(0, 0, canvasWidth, canvasHeight);

            // Draw grid
            context.strokeStyle = 'black';
//draw locations
            locations.forEach(location => {
                const [x, y] = latLngToCanvas(location.lat, location.lng);
                
				
				
                if (location.zoom < 2 && (zl >= 1 && zl < 1.30)) {
					
					context.fillStyle = 'blue';
                    context.beginPath();
                    let radius = 5;
                    context.arc(x, y, radius, 0, Math.PI * 2);  // Increased marker size
                    context.fill();

                    context.font = `${radius * 3}px times new roman`;
                    context.fillStyle = 'white';
                    context.fillText(location.place, x, y + radius * 5);
                }
				else if(location.zoom <= 3 && (zl >= 1.30 && zl <= 2))
				{
					context.fillStyle = 'blue';
                    context.beginPath();
                    let radius = 5;
                    context.arc(x, y, radius, 0, Math.PI * 2);  // Increased marker size
                    context.fill();

                    context.font = `${radius * 3}px times new roman`;
                    context.fillStyle = 'white';
                    context.fillText(location.place, x, y + radius * 5);
				}

            });
			
			if(is_direction_on == true){
				ShowSE_direction();
				}

            // Draw zoom scale label
            context.fillStyle = 'black';
            context.font = '8px times new roman';
            context.fillText(`Zoom Level: ${(zoomLevel * 100).toFixed(0)}%`, 10, 20);
        }

        canvas.addEventListener('wheel', (event) => {
            event.preventDefault();

            const mouseX = event.offsetX;
            const mouseY = event.offsetY;

            const zoomFactor = event.deltaY < 0 ? 1.1 : 0.9;
            const newZoomLevel = zoomLevel * zoomFactor;

            // Set max and min zoom levels
            if (newZoomLevel <= 2 && newZoomLevel >= 1) {
                offsetX = mouseX - (mouseX - offsetX) * (newZoomLevel / zoomLevel);
                offsetY = mouseY - (mouseY - offsetY) * (newZoomLevel / zoomLevel);
                zoomLevel = newZoomLevel;
                drawMap(zoomLevel);
                drawRoads();
            }
        });

        // Handle double-click for zooming in
        canvas.addEventListener('dblclick', (event) => {
            const mouseX = event.offsetX;
            const mouseY = event.offsetY;
            const newZoomLevel = zoomLevel * 1.1; // Zoom in 10%

            if (newZoomLevel <= 2.5) {
                offsetX = mouseX - (mouseX - offsetX) * (newZoomLevel / zoomLevel);
                offsetY = mouseY - (mouseY - offsetY) * (newZoomLevel / zoomLevel);
                zoomLevel = newZoomLevel;
                drawMap(zoomLevel);
                drawRoads();
            }
        });

        // Handle mouse drag for panning
        canvas.addEventListener('mousedown', (event) => {
            isDragging = true;
            startX = event.offsetX - offsetX;
            startY = event.offsetY - offsetY;
            canvas.style.cursor = 'grabbing';
        });

        canvas.addEventListener('mouseup', () => {
            isDragging = false;
            canvas.style.cursor = 'grab';
        });

        canvas.addEventListener('mousemove', (event) => {
            if (isDragging) {
                offsetX = event.offsetX - startX;
                offsetY = event.offsetY - startY;
                drawMap(zoomLevel);
                drawRoads();
            }
        });
document.getElementById("PMvisible").addEventListener('mouseover',function(){
console.log("mouseover");
this.style.display='none';
document.getElementById("placeModal").style.display='flex';
});

document.querySelector("#placeModal span").addEventListener('click',function(){
this.parentNode.style.display='none';
document.getElementById("PMvisible").style.display='block';
});


        // Initial drawing
	drawMap(zoomLevel);
        drawRoads();
