var initPosPanoID, streetView, map_canvas;

function initialize() {
  //In front of Ardenwood
  var initPos = new google.maps.LatLng(37.55631,-122.051153);  

  // Set StreetView provider.
  var streetViewOptions = {
    zoom: 1,
    panoProvider:  getCustomPanorama,
    pov : {
      heading : 55,
      pitch : 0,
      zoom : 1
    }
  };
  
  // Create a StreetView object.
  var streetViewDiv = document.getElementById('streetview_canvas');
  streetViewDiv.style.fontSize = "15px";
  streetView = new google.maps.StreetViewPanorama(streetViewDiv, streetViewOptions);

  // Add links when it happens "links_change" event.
  google.maps.event.addListener(streetView, "links_changed", createCustomLink);
  
  // Create a StreetViewService object.
  var streetviewService = new google.maps.StreetViewService();
  
  // Get panorama ID of initPos
  var radius = 50;
  streetviewService.getPanoramaByLocation(initPos, radius, function(result, status) {
    if (status == google.maps.StreetViewStatus.OK) {
      initPosPanoID = result.location.pano;
      streetView.setPosition(result.location.latLng);
    }
  });
  
  var infoWnd = new google.maps.InfoWindow({
    content : "Welcome to Ardenwood Histroic Farm<br><a href='http://www.ebparks.org/parks/ardenwood' target='_blank'>www.ebparks.org/parks/ardenwood</a>",
    position : getCustomPanorama("entrance_gate").location.latLng,
  });
  infoWnd.open(streetView);
  
  /*
   * Create a map
   */
  var mapOptions = {
    center: initPos,
    zoom: 19,
    streetView: streetView,
    mapTypeId : google.maps.MapTypeId.HYBRID
  };
  map_canvas = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
  google.maps.event.addListener(streetView, "position_changed", function(){
    var position = this.getPosition();
    var map_bounds = map_canvas.getBounds();
    map_canvas.panTo(position);
  });
}

function getCustomPanoramaTileUrl(panoID, zoom, tileX, tileY) {
  // Return a pano image given the panoID.
  return "https://googledrive.com/host/0B1ECfqTCcLE8blRHZVVZM1QtRkE/custom_streetview/ardenwood_tiles/" + panoID + '/'  + tileX + '-' +tileY + '_s1.jpg';
}

function getCustomPanorama(panoID) {
  var streetViewPanoramaData = {
    links: [],
    copyright: 'Imagery (c) Masashi Katsumata',
    tiles: {
        tileSize: new google.maps.Size(256, 256),
        worldSize: new google.maps.Size(2048, 1024),
        centerHeading: 0,
        getTileUrl: getCustomPanoramaTileUrl
     }
  };
  switch(panoID) {
    case "entrance_gate":
      // Description of the point.
      streetViewPanoramaData["location"] = {
        pano: 'entrance_gate',
        description: "Ardenwood entrance gate",
        latLng: new google.maps.LatLng(37.556373,-122.050921)
      };
      return streetViewPanoramaData;
      
    case "visitor_center":
      streetViewPanoramaData["location"] = {
        pano: 'visitor_center',
        description: "Visitor center",
        latLng: new google.maps.LatLng(37.556429,-122.050745)
      };
      return streetViewPanoramaData;
      
    case "in_front_of_arden_station":
      streetViewPanoramaData["location"] = {
        pano: 'in_front_of_arden_station',
        description: "In front of Arden Station",
        latLng: new google.maps.LatLng(37.556457,-122.050678)
      };
      return streetViewPanoramaData;
      
    case "arden_station":
      streetViewPanoramaData["location"] = {
        pano: 'arden_station',
        description: "Arden station",
        latLng: new google.maps.LatLng(37.556527,-122.050723)
      };
      return streetViewPanoramaData;
    case "006":
      streetViewPanoramaData["location"] = {
        pano: '006',
        description: "",
        latLng: new google.maps.LatLng(37.556733,-122.050167)
      };
      return streetViewPanoramaData;
      

    case "007":
      streetViewPanoramaData["location"] = {
        pano: '007',
        description: "",
        latLng: new google.maps.LatLng(37.557015,-122.049702)
      };
      return streetViewPanoramaData;
    case "patterson_house1":
      streetViewPanoramaData["location"] = {
        pano: 'patterson_house1',
        description: "Patterson House",
        latLng: new google.maps.LatLng(37.557945,-122.048876)
      };
      return streetViewPanoramaData;
      
    case "patterson_house2":
      streetViewPanoramaData["location"] = {
        pano: 'patterson_house2',
        description: "Patterson House",
        latLng: new google.maps.LatLng(37.557815,-122.048849)
      };
      return streetViewPanoramaData;
      
    case "patterson_house3":
      streetViewPanoramaData["location"] = {
        pano: 'patterson_house3',
        description: "Patterson House",
        latLng: new google.maps.LatLng(37.557837,-122.048671)
      };
      return streetViewPanoramaData;
      
    case "patterson_house4":
      streetViewPanoramaData["location"] = {
        pano: 'patterson_house4',
        description: "Patterson House",
        latLng: new google.maps.LatLng(37.557976,-122.04853)
      };
      return streetViewPanoramaData;
      
    case "patterson_house5":
      streetViewPanoramaData["location"] = {
        pano: 'patterson_house5',
        description: "Patterson House",
        latLng: new google.maps.LatLng(37.558131,-122.048558)
      };
      return streetViewPanoramaData;
  }
}

function createCustomLink() {
  /*
   * add links
   */
  var links = streetView.getLinks();
  var panoID = streetView.getPano();
  
  switch(panoID) {
    case initPosPanoID:
      // Add a link to dining room
      links.push({
        description : "Welcome to Ardenwood",
        pano : "entrance_gate",
        heading : 71
      });
      break;
      
    case "entrance_gate":
      links.push({
        description : "Parking",
        pano : initPosPanoID,
        heading : 250
      });
      links.push({
        description : "",
        pano : "visitor_center",
        heading : 68
      });
      break;
    case "visitor_center":
      links.push({
        description : "",
        pano : "in_front_of_arden_station",
        heading : 62
      });
      links.push({
        description : "Parking",
        pano : "entrance_gate",
        heading : 248
      });
      break;
      
    case "in_front_of_arden_station":
      links.push({
        description : "Arden Station",
        pano : "arden_station",
        heading : 332
      });
      links.push({
        description : "Visitor Center",
        pano : "visitor_center",
        heading : 242
      });
      links.push({
        description : "Patterson House",
        pano : "006",
        heading : 56
      });
      break;
      

    case "arden_station":
      links.push({
        description : "",
        pano : "in_front_of_arden_station",
        heading : 153
      });
      break;

    case "006":
      links.push({
        description : "",
        pano : "in_front_of_arden_station",
        heading : 236
      });
      links.push({
        description : "",
        pano : "007",
        heading : 53
      });
      break;
      
    case "007":
      links.push({
        description : "",
        pano : "006",
        heading : 233
      });
      links.push({
        description : "Patterson House",
        pano : "patterson_house2",
        heading : 40
      });
      break;
    case "patterson_house1":
      links.push({
        description : "",
        pano : "patterson_house2",
        heading : 171
      });
      break;
    case "patterson_house2":
      links.push({
        description : "",
        pano : "patterson_house1",
        heading : 350
      });
      links.push({
        description : "",
        pano : "patterson_house3",
        heading : 81
      });
      links.push({
        description : "Arden Station",
        pano : "007",
        heading : 220
      });
      break;
      
    case "patterson_house3":
      links.push({
        description : "",
        pano : "patterson_house2",
        heading : 261
      });
      links.push({
        description : "",
        pano : "patterson_house4",
        heading : 39
      });
      break;
      
    case "patterson_house4":
      links.push({
        description : "",
        pano : "patterson_house3",
        heading : 219
      });
      links.push({
        description : "",
        pano : "patterson_house5",
        heading : 351
      });
      break;
      
    case "patterson_house5":
      links.push({
        description : "",
        pano : "patterson_house4",
        heading : 191
      });
      break;
  }
  
}

google.maps.event.addDomListener(window, 'load', initialize);