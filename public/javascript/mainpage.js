function logout() {
  var request = new XMLHttpRequest();
  request.open("POST", "/users/logout", true);
  request.send();

  window.location = "/login.html";
}

function loadUserList() {
  var request = new XMLHttpRequest();

  request.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) { // only run if request succeeds
        vueinst.adminUserList = JSON.parse(request.response);
      }
  };

  var searchToken = document.getElementById("user-searchbar").value;
  if (searchToken != '') {
    request.open("GET", '/admins/users/search?searchToken=' + searchToken, true);
  } else {
    request.open("GET", '/admins/users', true);
  }

  request.send();
}

function loadVenueList() {
  var request = new XMLHttpRequest();

  request.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) { // only run if request succeeds
        vueinst.adminVenueList = JSON.parse(request.response);
      }
  };

  var searchToken = document.getElementById("venue-searchbar").value;
  if (searchToken != '') {
    request.open("GET", '/admins/venues/search?searchToken=' + searchToken, true);
  } else {
    request.open("GET", '/admins/venues', true);
  }

  request.send();
}

function loadHotspotList() {
  var request = new XMLHttpRequest();

  request.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) { // only run if request succeeds
        vueinst.hotspotListData = JSON.parse(request.response);

        // parse date to js format
        for (hotspot of vueinst.hotspotListData) {
          hotspot.Created = new Date(Date.parse(hotspot.Created));
          hotspot.Expires = new Date(Date.parse(hotspot.Expires));
        }
      }
  };

  var searchToken = document.getElementById("hotspot-searchbar").value;
  if (searchToken != '') {
    request.open("GET", '/admins/hotspots/search?searchToken=' + searchToken, true);
  } else {
    request.open("GET", '/users/currentHotspots', true);
  }

  request.send();
}

function loadMyVenuesList() {
  var request = new XMLHttpRequest();

  request.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) { // only run if request succeeds
        vueinst.currentUserData.ownedVenues= JSON.parse(request.response);
      }
  };

  request.open("GET", '/users/user/ownedVenues?userID=' + vueinst.currentUserData.id, true);
  request.send();
}

function viewUserProfile() {
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

        historyRequest.open("GET", 'admins/users/checkInHistory?userID=' + vueinst.selectedUserData.id, true);
        historyRequest.send();
      }
  };

  vueinst.selectedUserData.id = vueinst.selectedVenueData.details.OwnerID;

  request.open("GET", 'admins/users/user?userID=' + vueinst.selectedUserData.id, true);
  request.send();
}

function popuphide(checker) {
    switch(checker) {
      case 'history-window':
        var history = document.getElementById("history-window");
        history.style.display = "none";
        break;
      case 'profile-window':
        var profile = document.getElementById("profile-window");
        profile.style.display = "none";
        break;
      case 'selected-profile-window':
        var selProfile = document.getElementById("selected-profile-window");
        selProfile.style.display = "none";
        break;
      case 'checkin-window':
        var checkin = document.getElementById("checkin-window");
        checkin.style.display = "none";
        break;
      case 'report-window':
        var report = document.getElementById("report-window");
        report.style.display = "none";
        break;
      case 'VenueList-window':
        var VenueList = document.getElementById("VenueList-window");
        VenueList.style.display = "none";
        break;
      case 'venue-profile-window':
        var venueProfile = document.getElementById("venue-profile-window");
        venueProfile.style.display = "none";
        break;
      case 'UserList-window':
        var UserList = document.getElementById("UserList-window");
        UserList.style.display = "none";
        break;
      case 'HotspotList-window':
        var hotspotList = document.getElementById("HotspotList-window");
        hotspotList.style.display = "none";
        break;
      /*case 'VenueHistory-window':
        var VenueHistory = document.getElementById("VenueHistory-window");
        VenueHistory.style.display = "none";
        break;*/
      case 'MyVenue-window':
        var MyVenue = document.getElementById("MyVenue-window");
        MyVenue.style.display = "none";
        break;
      default:
        break;
    }
}
function popupshow(checker) {
    var profile = document.getElementById("profile-window");
    var selProfile = document.getElementById("selected-profile-window");
    var history = document.getElementById("history-window");
    var checkin = document.getElementById("checkin-window");
    var report = document.getElementById("report-window");
    var VenueList = document.getElementById("VenueList-window");
    var venueProfile = document.getElementById("venue-profile-window");
    var UserList = document.getElementById("UserList-window");
    var hotspotList = document.getElementById("HotspotList-window");
    //var VenueHistory = document.getElementById("VenueHistory-window");
    var MyVenue = document.getElementById("MyVenue-window");
    var popupsToHide = [];
    switch(checker) {
      case 'history-window':
        history.style.display = "block";

        popupsToHide = [report, profile, checkin, VenueList, UserList, MyVenue, selProfile, venueProfile, hotspotList];
        for (popup of popupsToHide) {
          popup.style.display = "none";
        }

        break;
      case 'profile-window':
        profile.style.display = "block";

        popupsToHide = [report, checkin, VenueList, UserList, MyVenue, history, selProfile, venueProfile, hotspotList];
        for (popup of popupsToHide) {
          popup.style.display = "none";
        }

        break;
      case 'checkin-window':
        checkin.style.display = "block";

        popupsToHide = [report, profile, VenueList, UserList, MyVenue, history, selProfile, venueProfile, hotspotList];
        for (popup of popupsToHide) {
          popup.style.display = "none";
        }

        break;
      case 'report-window':
        report.style.display = "block";

        popupsToHide = [profile, checkin, VenueList, UserList, MyVenue, history, selProfile, venueProfile, hotspotList];
        for (popup of popupsToHide) {
          popup.style.display = "none";
        }

        break;
      case 'VenueList-window':
        loadVenueList();
        VenueList.style.display = "block";

        popupsToHide = [report, profile, checkin, UserList, MyVenue, history, selProfile, venueProfile, hotspotList];
        for (popup of popupsToHide) {
          popup.style.display = "none";
        }

        break;
      case 'venue-profile-window':
        venueProfile.style.display = "block";

        popupsToHide = [report, profile, checkin, UserList, MyVenue, history, selProfile, VenueList, hotspotList, hotspotList];
        for (popup of popupsToHide) {
          popup.style.display = "none";
        }

        break;
      case 'UserList-window':
        loadUserList();

        UserList.style.display = "block";

        popupsToHide = [report, profile, checkin, VenueList, MyVenue, history, selProfile, venueProfile, hotspotList];
        for (popup of popupsToHide) {
          popup.style.display = "none";
        }

        break;
      case 'MyVenue-window':
        MyVenue.style.display = "block";

        popupsToHide = [report, profile, checkin, VenueList, UserList, history, selProfile, venueProfile, hotspotList];
        for (popup of popupsToHide) {
          popup.style.display = "none";
        }

        break;
      case 'SelectedProfile-window':
        selProfile.style.display = "block";
        popupsToHide = [report, profile, checkin, VenueList, UserList, history, venueProfile, hotspotList];
        for (popup of popupsToHide) {
          popup.style.display = "none";
        }

        break;
      case 'HotspotList-window':
        loadHotspotList();

        hotspotList.style.display = "block";

        popupsToHide = [history, report, profile, checkin, VenueList, UserList, MyVenue, selProfile, venueProfile];
        for (popup of popupsToHide) {
          popup.style.display = "none";
        }

        break;
      default:
        break;
    }
}

var toggled = false;

function buttontexttoggle() {
    if (toggled == true) {
        toggled = false;
        var title1=document.getElementById("title1");
        title1.style.opacity = 1;
        var title2=document.getElementById("title2");
        title2.style.opacity = 1;
        var title3=document.getElementById("title3");
        title3.style.opacity = 1;
        //var buttontext1="Heatmap";
        //document.getElementById("buttontext1").innerHTML=buttontext1;
        var buttontext2="History";
        document.getElementById("buttontext2").innerHTML=buttontext2;
        var buttontext3="My Profile";
        document.getElementById("buttontext3").innerHTML=buttontext3;
        var buttontext4="My Venues";
        document.getElementById("buttontext4").innerHTML=buttontext4;
        //var buttontext5="Venue History";
        //document.getElementById("buttontext5").innerHTML=buttontext5;
        var buttontext6="User List";
        document.getElementById("buttontext6").innerHTML=buttontext6;
        var buttontext7="Venue List";
        document.getElementById("buttontext7").innerHTML=buttontext7;
        var buttontext8="Hotspot List";
        document.getElementById("buttontext8").innerHTML=buttontext8;
        document.getElementById("user-tabs-menu").style.width = "200px";
        document.getElementById("max").style.display = "none";
        document.getElementById("min").style.display = "block";
        //document.getElementById("map").style.marginLeft = "200px";
    } else if (toggled == false) {
        toggled=true;
        var title1o=document.getElementById("title1");
        title1o.style.opacity = 0;
        var title2o=document.getElementById("title2");
        title2o.style.opacity = 0;
        var title3o=document.getElementById("title3");
        title3o.style.opacity = 0;
        //var buttontext1o=" ";
        //document.getElementById("buttontext1").innerHTML=buttontext1o;
        var buttontext2o=" ";
        document.getElementById("buttontext2").innerHTML=buttontext2o;
        var buttontext3o=" ";
        document.getElementById("buttontext3").innerHTML=buttontext3o;
        var buttontext4o=" ";
        document.getElementById("buttontext4").innerHTML=buttontext4o;
        //var buttontext5o=" ";
        //document.getElementById("buttontext5").innerHTML=buttontext5o;
        var buttontext6o=" ";
        document.getElementById("buttontext6").innerHTML=buttontext6o;
        var buttontext7o=" ";
        document.getElementById("buttontext7").innerHTML=buttontext7o;
        var buttontext8o=" ";
        document.getElementById("buttontext8").innerHTML=buttontext8o;
        document.getElementById("user-tabs-menu").style.width = "55px";
        document.getElementById("max").style.display = "block";
        document.getElementById("min").style.display = "none";
        //document.getElementById("map").style.marginLeft = "55px";
        //document.getElementById("map").style.width = "${(window.innerWidth - 355)}px";
    }
}

function handleCheckIn() {

  var requestBody = {
    checkInCode: document.getElementById("checkin-input").value
  };

  var request = new XMLHttpRequest();

  request.onreadystatechange = function() {
      if (this.readyState == 4 && this.status != 500) {
        document.getElementById("check-in-status").innerHTML = this.responseText;
      }

      // update the users local data if the addition was successful
      if (this.readyState == 4 && this.status == 200) {
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
      }
  };

  request.open("POST", '/users/checkIn' , true);
  request.setRequestHeader("Content-type", "application/json");
  request.send(JSON.stringify(requestBody));
}

function openForm(formname) {
  var form = document.getElementById(formname);
  form.style.display = "block";
}

function closeForm(formname) {
  var form = document.getElementById(formname);
  form.style.display = "none";
}

function submitEditedVenue() {
  var requestBody = {
    venueID: vueinst.editingVenue,
    venueName: document.getElementById('edit-venue-venueName').value,
    address: document.getElementById('edit-venue-address').value,
    longitude: document.getElementById('edit-venue-longitude').value,
    latitude: document.getElementById('edit-venue-latitude').value
  };

  var errorBox = document.getElementById('edit-venue-error-textbox');
  if (requestBody.venueName === '') {
    errorBox.innerHTML = `<span class="required-field">Invalid venue name</span>`;
    return;
  } else if (requestBody.address === '') {
    errorBox.innerHTML = `<span class="required-field">Address cannot be empty</span>`;
    return;
  } else if (requestBody.longitude < -180 || requestBody.longitude > 180 || requestBody.latitude < -90 || requestBody.latitude > 90) {
    errorBox.innerHTML = `<span class="required-field">Coordinates are invalid</span>`;
    return;
  }

  var request = new XMLHttpRequest();

  request.onreadystatechange = function() {
      if (this.readyState == 4 && this.status != 500) {
        errorBox.innerHTML = this.responseText;
      }

      // update the users local data if the addition was successful
      if (this.readyState == 4 && this.status == 200) {
        var venuesRequest = new XMLHttpRequest();

        venuesRequest.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) { // only run if request succeeds
              vueinst.currentUserData.ownedVenues = JSON.parse(venuesRequest.response);
            }
        };

        venuesRequest.open("GET", 'users/currentUserVenues', true);
        venuesRequest.send();

        setTimeout(closeForm('edit-venue-form'), 1000);
        errorBox.innerHTML = '';
      }
  };

  request.open("POST", '/venueManagers/editVenue' , true);
  request.setRequestHeader("Content-type", "application/json");
  request.send(JSON.stringify(requestBody));
}

function updateprofile() {
  let profiledata = {
     Firstname: document.getElementById('updatefname').value,
     Lastname: document.getElementById('updatelname').value,
     Mobile: document.getElementById('updatemobile').value,
     Address: document.getElementById('updateaddress').value
  };
  // validate signup details
  if (profiledata.Firstname == '' || profiledata.Lastname == '' || profiledata.Mobile == '' || profiledata.Address == '') {
    document.getElementById('error-updateprofile').innerHTML = "<span class='required-field'>ERROR: Required field is empty</span>";
    return;
  }else{
    document.getElementById('error-updateprofile').innerHTML = "";
  }



  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) { // only run if request succeeds
    }
  };

  request.open("POST", "/users/editDetails", true);
  request.setRequestHeader("Content-type", "application/json");
  request.send(JSON.stringify(profiledata));

  setTimeout(function() {
    var request2 = new XMLHttpRequest();
    request2.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) { // only run if request succeeds
        vueinst.currentUserData.details = JSON.parse(request2.response)[0];
      }
    };
    request2.open("GET", 'users/currentUser', true);
    request2.send();
  }, 500);
}

function createHotspot() {
  var requestBody = {
    venueID: document.getElementById('create-hotspot-venueID').value,
    confirmedCases: document.getElementById('create-hotspot-cases').value,
    expires: document.getElementById('create-hotspot-expires').value,
    description: document.getElementById('create-hotspot-description').value
  };

  var errorBox = document.getElementById('create-hotspot-error-textbox');
  if (requestBody.venueID === '') {
    errorBox.innerHTML = `<span class="required-field">No venue ID provided</span>`;
    return;
  } else if (requestBody.confirmedCases <= 0) {
    errorBox.innerHTML = `<span class="required-field">Confirmed cases must be a positive integer</span>`;
    return;
  }

  var request = new XMLHttpRequest();

  request.onreadystatechange = function() {
      if (this.readyState == 4 && this.status != 500) {
        errorBox.innerHTML = this.responseText;
      }

      // update the users local data if the addition was successful
      if (this.readyState == 4 && this.status == 200) {
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

        setTimeout(closeForm('create-hotspot-form'), 1000);

        // send email notifcation

        requestBody = {
          venueID: requestBody.venueID,
          confirmedCases: requestBody.confirmedCases,
          expires: new Date(Date.parse(requestBody.expires)),
          created: new Date(),
          description: requestBody.description
        };

        var emailrequest = new XMLHttpRequest();
        emailrequest.open("POST", "/admins/sendHotspotNotification", true);
        emailrequest.setRequestHeader("Content-type", "application/json");
        emailrequest.send(JSON.stringify(requestBody));
      }
  };

  request.open("POST", '/admins/hotspots/createHotspot' , true);
  request.setRequestHeader("Content-type", "application/json");
  request.send(JSON.stringify(requestBody));
}

function notificationToggle(){

    let emailpref = {
     emailStatus:document.getElementById('emailnotifications').checked,
    };


  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) { // only run if request succeeds
    }
  };

  request.open("POST", "/users/editemailpref", true);
  request.setRequestHeader("Content-type", "application/json");
  request.send(JSON.stringify(emailpref));
}

function generateCheckinCode() {
    var min = 100000000;
    var max = 999999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function addVenue() {

  var requestBody = {
    venueName: document.getElementById('add-venue-venueName').value,
    address: document.getElementById('add-venue-address').value,
    longitude: document.getElementById('add-venue-longitude').value,
    latitude: document.getElementById('add-venue-latitude').value,
    checkInCode: generateCheckinCode()
  };

  var errorBox = document.getElementById('add-venue-error-textbox');
  if (requestBody.venueName === '') {
    errorBox.innerHTML = `<span class="required-field">Invalid venue name</span>`;
    return;
  } else if (requestBody.address === '') {
    errorBox.innerHTML = `<span class="required-field">Address cannot be empty</span>`;
    return;
  } else if (requestBody.longitude < -180 || requestBody.longitude > 180 || requestBody.latitude < -90 || requestBody.latitude > 90) {
    errorBox.innerHTML = `<span class="required-field">Coordinates are invalid</span>`;
    return;
  }

  var request = new XMLHttpRequest();

  request.onreadystatechange = function() {
      if (this.readyState == 4 && this.status != 500) {
        errorBox.innerHTML = this.responseText;
      }

      // update the users local data if the addition was successful
      if (this.readyState == 4 && this.status == 200) {
        var venuesRequest = new XMLHttpRequest();

        venuesRequest.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) { // only run if request succeeds
              vueinst.currentUserData.ownedVenues = JSON.parse(venuesRequest.response);
            }
        };

        venuesRequest.open("GET", 'users/currentUserVenues', true);
        venuesRequest.send();

        setTimeout(closeForm('add-venue-form'), 1000);
        errorBox.innerHTML = '';
      }
  };

  request.open("POST", '/venueManagers/addVenue' , true);
  request.setRequestHeader("Content-type", "application/json");
  request.send(JSON.stringify(requestBody));
}

function DeleteVenue(){

  let venue = {
    VenueID:vueinst.selectedVenueData.id
  };

  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) { // only run if request succeeds
    }
  };

  request.open("POST", "/users/deleteVenue", true);
  request.setRequestHeader("Content-type", "application/json");
  request.send(JSON.stringify(venue));

  setTimeout(function() {
    var request2 = new XMLHttpRequest();

    request2.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) { // only run if request succeeds
        vueinst.currentUserData.details = JSON.parse(request2.response)[0];
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

    request2.open("GET", 'users/currentUser', true);
    request2.send();

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
    popupshow('VenueList-window');
  }, 500);

}

function DeleteUser(){

  let user = {
    UserID:vueinst.selectedUserData.details.UserID
  };

  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) { // only run if request succeeds
    }
  };

  request.open("POST", "/users/deleteUser", true);
  request.setRequestHeader("Content-type", "application/json");
  request.send(JSON.stringify(user));


  setTimeout(function() {
    var request2 = new XMLHttpRequest();

    request2.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) { // only run if request succeeds
        vueinst.currentUserData.details = JSON.parse(request2.response)[0];
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

    request2.open("GET", 'users/currentUser', true);
    request2.send();

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
    popupshow('UserList-window');
  }, 500);

}

function permissionToggle(){

    let permStatus = {
     permissionStatus:document.getElementById('permissionLevel').value,
     selectedid:vueinst.selectedUserData.details.UserID
    };


  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) { // only run if request succeeds
    }
  };

  request.open("POST", "/admins/permissionToggle", true);
  request.setRequestHeader("Content-type", "application/json");
  request.send(JSON.stringify(permStatus));
}

