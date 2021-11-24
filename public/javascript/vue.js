var vueinst = new Vue({
  el: '#app',
  data: {
    isHidden: false,
    loggedIn: true,
    hotspotListData: [],
    currentUserData: {
        details: {},
        selectedVenue: {
            id: -1,
            name: "None",
            checkInHistory: []
        },
        ownedVenues: [],
        checkInHistory: []
    },
    selectedVenueData: {
        id: -1,
        details: {},
        ownedVenues: [],
        checkInHistory: []
    },
    selectedUserData: {
        id: -1,
        details: {},
        ownedVenues: [],
        checkInHistory: []
    },
    adminUserList: [],
    adminVenueList: [],
    editingVenue: -1
  },
  methods: {
    selectUser: function (userI) {
      var request = new XMLHttpRequest();

      request.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) { // only run if request succeeds
            vueinst.selectedUserData.details = JSON.parse(request.response)[0];

            // request for user succeeded, now send requests for their owned venues and check in history
            var venueRequest = new XMLHttpRequest();

            venueRequest.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) { // only run if request succeeds
                  vueinst.selectedUserData.ownedVenues = JSON.parse(venueRequest.response);
                }
            };

            venueRequest.open("GET", 'admins/users/ownedVenues?userID=' + vueinst.selectedUserData.id, true);
            venueRequest.send();

            var historyRequest = new XMLHttpRequest();

            historyRequest.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) { // only run if request succeeds
                  vueinst.selectedUserData.checkInHistory = JSON.parse(historyRequest.response);

                  // parse date to js format
                  for (checkIn of vueinst.selectedUserData.checkInHistory) {
                    checkIn.CheckInTime = new Date(Date.parse(checkIn.CheckInTime));
                  }
                }
            };
            var dropdown = document.getElementById("permissionLevel");
            dropdown.selectedIndex = (vueinst.selectedUserData.details.PermissionLevelID-1);
            historyRequest.open("GET", 'admins/users/checkInHistory?userID=' + vueinst.selectedUserData.id, true);
            historyRequest.send();
          }
      };

      vueinst.selectedUserData.id = vueinst.adminUserList[userI].UserID;

      request.open("GET", 'admins/users/user?userID=' + vueinst.selectedUserData.id, true);
      request.send();
    },
    selectVenueOwned: function (venueI) {
      var request = new XMLHttpRequest();

      request.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) { // only run if request succeeds
            vueinst.selectedVenueData.details = JSON.parse(request.response)[0];

            // request for venue succeeded, now send requests for its check in history
            var historyRequest = new XMLHttpRequest();

            historyRequest.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) { // only run if request succeeds
                  vueinst.selectedVenueData.checkInHistory = JSON.parse(historyRequest.response);

                  // parse date to js format
                  for (checkIn of vueinst.selectedVenueData.checkInHistory) {
                    checkIn.CheckInTime = new Date(Date.parse(checkIn.CheckInTime));
                  }
                }
            };

            historyRequest.open("GET", 'users/venues/checkInHistory?venueID=' + vueinst.selectedVenueData.id, true);
            historyRequest.send();
          }
      };

      vueinst.selectedVenueData.id = vueinst.currentUserData.ownedVenues[venueI].VenueID;

      request.open("GET", 'users/venues/venue?venueID=' + vueinst.selectedVenueData.id, true);
      request.send();
    },
    selectVenue: function (venueI) {
      var request = new XMLHttpRequest();

      request.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) { // only run if request succeeds
            vueinst.selectedVenueData.details = JSON.parse(request.response)[0];

            // request for venue succeeded, now send requests for its check in history
            var historyRequest = new XMLHttpRequest();

            historyRequest.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) { // only run if request succeeds
                  vueinst.selectedVenueData.checkInHistory = JSON.parse(historyRequest.response);

                  // parse date to js format
                  for (checkIn of vueinst.selectedVenueData.checkInHistory) {
                    checkIn.CheckInTime = new Date(Date.parse(checkIn.CheckInTime));
                  }
                }
            };

            historyRequest.open("GET", 'admins/venues/checkInHistory?venueID=' + vueinst.selectedVenueData.id, true);
            historyRequest.send();
          }
      };

      vueinst.selectedVenueData.id = vueinst.adminVenueList[venueI].VenueID;

      request.open("GET", 'admins/venues/venue?venueID=' + vueinst.selectedVenueData.id, true);
      request.send();
    },
    selectVenueProfile: function (venueI) {
      var request = new XMLHttpRequest();

      request.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) { // only run if request succeeds
            vueinst.selectedVenueData.details = JSON.parse(request.response)[0];

            // request for venue succeeded, now send requests for its check in history
            var historyRequest = new XMLHttpRequest();

            historyRequest.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) { // only run if request succeeds
                  vueinst.selectedVenueData.checkInHistory = JSON.parse(historyRequest.response);

                  // parse date to js format
                  for (checkIn of vueinst.selectedVenueData.checkInHistory) {
                    checkIn.CheckInTime = new Date(Date.parse(checkIn.CheckInTime));
                  }
                }
            };

            historyRequest.open("GET", 'admins/venues/checkInHistory?venueID=' + vueinst.selectedVenueData.id, true);
            historyRequest.send();
          }
      };

      vueinst.selectedVenueData.id = vueinst.selectedUserData.ownedVenues[venueI].VenueID;

      request.open("GET", 'admins/venues/venue?venueID=' + vueinst.selectedVenueData.id, true);
      request.send();
    },
    loadMyVenueHistory: function (venueI) {
      var request = new XMLHttpRequest();

      request.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) { // only run if request succeeds
            vueinst.currentUserData.selectedVenue.checkInHistory = JSON.parse(request.response);

            // parse date to js format
            for (checkIn of vueinst.currentUserData.selectedVenue.checkInHistory) {
              checkIn.CheckInTime = new Date(Date.parse(checkIn.CheckInTime));
            }
          }
      };

      vueinst.currentUserData.selectedVenue.id = vueinst.currentUserData.ownedVenues[venueI].VenueID;
      vueinst.currentUserData.selectedVenue.name = vueinst.currentUserData.ownedVenues[venueI].VenueName;

      request.open("GET", 'users/venues/checkInHistory?venueID=' + vueinst.currentUserData.selectedVenue.id, true);
      request.send();
    },
    moveMapToSelectedHotspot: function (hotspotI) {
      map.flyTo({
        center: [
          vueinst.hotspotListData[hotspotI].Longitude,
          vueinst.hotspotListData[hotspotI].Latitude
        ],
        essential: true // this animation is considered essential with respect to prefers-reduced-motion
      });
    },
    moveMapToSelectedCheckin: function (checkinI) {
      map.flyTo({
        center: [
          vueinst.currentUserData.checkInHistory[checkinI].Longitude,
          vueinst.currentUserData.checkInHistory[checkinI].Latitude
        ],
        essential: true // this animation is considered essential with respect to prefers-reduced-motion
      });
    },
    deleteHotspot: function(hotspotI, hotspotName) {
      var hotspotID = vueinst.hotspotListData[hotspotI].HotSpotID;
      if (confirm(`WARNING: Are you sure you want to delete hotspot '${hotspotName}'?\nThis cannot be undone.`)) {
        var request = new XMLHttpRequest();
        var requestBody = {
          hotspotID: hotspotID
        };

        request.open("POST", 'admins/hotspots/deleteHotspot', true);
        request.setRequestHeader("Content-type", "application/json");
        request.send(JSON.stringify(requestBody));

        setTimeout(loadHotspotList, 500);
      }
    },
    loadEditVenueForm: function(venueI) {
      var venueToLoad = vueinst.currentUserData.ownedVenues[venueI];
      document.getElementById('edit-venue-venueName').value = venueToLoad.VenueName;
      document.getElementById('edit-venue-address').value = venueToLoad.Address;
      document.getElementById('edit-venue-longitude').value = venueToLoad.Longitude;
      document.getElementById('edit-venue-latitude').value = venueToLoad.Latitude;
      vueinst.editingVenue = venueToLoad.VenueID;
    }
  }
});