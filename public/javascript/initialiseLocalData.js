var request = new XMLHttpRequest();

request.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) { // only run if request succeeds
    vueinst.currentUserData.details = JSON.parse(request.response)[0];
    var checkbox = document.getElementById('emailnotifications');
    checkbox.checked = vueinst.currentUserData.details.NotificationStatus;
    // show tabs the user has access to
    if (vueinst.currentUserData.details.PermissionLevelID >= 2) {
      (document.getElementById("venue-tabs")).style.display = "block";
    }

    if (vueinst.currentUserData.details.PermissionLevelID >= 3) {
      (document.getElementById("admin-tabs")).style.display = "block";
    }

    var historyRequest = new XMLHttpRequest();

    historyRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) { // only run if request succeeds
          vueinst.currentUserData.checkInHistory = JSON.parse(historyRequest.response);

          // parse date to js format
          for (checkIn of vueinst.currentUserData.checkInHistory) {
            checkIn.CheckInTime = new Date(Date.parse(checkIn.CheckInTime));
          }
        }
    };

    historyRequest.open("GET", 'users/currentUserHistory', true);
    historyRequest.send();

    var venuesRequest = new XMLHttpRequest();

    venuesRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) { // only run if request succeeds
          vueinst.currentUserData.ownedVenues = JSON.parse(venuesRequest.response);
        }
    };

    venuesRequest.open("GET", 'users/currentUserVenues', true);
    venuesRequest.send();
  }
};

request.open("GET", 'users/currentUser', true);
request.send();

// load hotspot data
var hotspotRequest = new XMLHttpRequest();

hotspotRequest.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) { // only run if request succeeds
    vueinst.hotspotListData = JSON.parse(hotspotRequest.response);

    // parse date to js format
    for (hotspot of vueinst.hotspotListData) {
      hotspot.Created = new Date(Date.parse(hotspot.Created));
      hotspot.Expires = new Date(Date.parse(hotspot.Expires));
    }

  }
};

hotspotRequest.open("GET", 'users/currentHotspots', true);
hotspotRequest.send();


let hotspotMarkerList = [];
let checkinMarkerList = [];

function formatHotspotMarkerMessage(venueName, address, confirmedCases, description) {
  var formattedHTML = `
    <h2 class="hotspot-marker-heading">${venueName}</h2>
    <span class="block-span">${address}</span>
    <span class="block-span marker-subheading">Confirmed cases: ${confirmedCases}</span>
    <span class="block-span marker-subheading">Description:<br></span>
    <span class="block-span"> ${description}</span>

  `;

  return formattedHTML;
}

function formatCheckinMarkerMessage(venueName, address, checkInTime) {
  var formattedHTML = `
    <h2 class="hotspot-marker-heading">${venueName}</h2>
    <span class="block-span">${address}</span>
    <span class="block-span">You checked in here on ${checkInTime.toDateString()}.</span>
  `;

  return formattedHTML;
}

let hotspotMarkerCountOnLastUpdate = 0;
let checkinMarkerCountOnLastUpdate = 0;
function updateMarkers() {

  // update checkin markers
  if (checkinMarkerCountOnLastUpdate != vueinst.currentUserData.checkInHistory.length) {
    for (marker of checkinMarkerList) {
      marker.remove();
    }
    for(checkIn of vueinst.currentUserData.checkInHistory) {
      var checkinMarker = new mapboxgl.Marker({
        color: "#87CEEB",
        draggable: false
      })
      .setLngLat([checkIn.Longitude, checkIn.Latitude])
      .setPopup(new mapboxgl.Popup().setHTML(formatCheckinMarkerMessage(checkIn.VenueName, checkIn.Address, checkIn.CheckInTime)))
      .addTo(map);

      checkinMarkerList.push(checkinMarker);
    }
    checkinMarkerCountOnLastUpdate = checkinMarkerList.length;
  }

  // update hotspots markers
  if (hotspotMarkerCountOnLastUpdate != vueinst.hotspotListData.length) {
    for (marker of hotspotMarkerList) {
      marker.remove();
    }
    for(hotspot of vueinst.hotspotListData) {
      var hotspotMarker = new mapboxgl.Marker({
        color: "#FF0000",
        draggable: false
      })
      .setLngLat([hotspot.Longitude, hotspot.Latitude])
      .setPopup(new mapboxgl.Popup().setHTML(formatHotspotMarkerMessage(hotspot.VenueName, hotspot.Address, hotspot.ConfirmedCases, hotspot.Description)))
      .addTo(map);

      hotspotMarkerList.push(hotspotMarker);
    }
    hotspotMarkerCountOnLastUpdate = hotspotMarkerList.length;
  }

}

setTimeout(updateMarkers, 500);
setInterval(updateMarkers, 15000); // update markers every 15 seconds