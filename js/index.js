window.onload = function() {
  displayStores();
};

var map;
var markers = [];
var infoWindow;

function initMap() {
  var losAngeles = {
    lat: 34.06338,
    lng: -118.35808
  };
  map = new google.maps.Map(document.getElementById("map"), {
    center: losAngeles,
    zoom: 11,
    mapTypeId: "roadmap",
    styles: [
      { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] }
    ]
  });
  infoWindow = new google.maps.InfoWindow();
  showStoresMarkers();
}

function displayStores() {
  var storesHtml = "";
  for (var [index, store] of stores.entries()) {
    var address = store["addressLines"];
    var phone = store["phoneNumber"];
    storesHtml += `
            <div class="store-container">
                <div class="store-info-container">
                    <div class="store-address">
                        <span>${address[0]}</span>
                        <span>${address[1]}</span>
                    </div>
                    <div class="store-phone-number">${phone}</div>
                </div>
                <div class="store-number-container">
                    <div class="store-number">
                        ${index + 1}
                    </div>
                </div>
            </div>
        `;
    document.querySelector(".stores-list").innerHTML = storesHtml;
  }
}

function showStoresMarkers() {
  var bounds = new google.maps.LatLngBounds();
  for (var [icon, store] of stores.entries()) {
    var latlng = new google.maps.LatLng(
      store["coordinates"]["latitude"],
      store["coordinates"]["longitude"]
    );
    var name = store["name"];
    var address = store["addressLines"][0];
    var hours = store["openStatusText"];
    var phone = store["phoneNumber"];

    bounds.extend(latlng);
    createMarker(latlng, name, address, hours, phone, icon);
  }
  map.fitBounds(bounds);
}

function createMarker(latlng, name, address, hours, phone, index) {
  //   var html =

  //     "<b>" + name + "</b> <br/>" + address + "<br/>" + hours + "<br/>" + phone;

  var displayName = "<p id=storeName>" + name + "</p>";
  var displayHours = "<p id=storeHours>" + hours + "</p>";
  var hr = "<hr />";
  //   var displayAdd = "<p  id=storeAdd>" + address + "</p>";

  //https://www.google.com/maps/dir/?api=1&origin=Google+Pyrmont+NSW&destination=QVB&destination_place_id=ChIJISz8NjyuEmsRFTQ9Iw7Ear8&travelmode=walking

  var add = address.replace(/\s/g, "_");

  console.log(add);

  var displayAdd =
    "<a target=blank href=https://www.google.com/maps/search/?api=1&query=" +
    add +
    "  " +
    "<h4 >" +
    address +
    "</h4>" +
    "</a>";
  var displayPhone =
    "<p id=iconss class=fa>&#xf098" + "  " + "<h5>" + phone + "</h5>" + "</p>";

  //   var iconContainer = document.createElement("span");
  //   iconContainer.innerHTML = icon({ prefix: "fas", iconName: "cat" }).html;

  var marker = new google.maps.Marker({
    map: map,
    position: latlng,
    icon: "https://img.icons8.com/color/48/000000/marker.png"
  });
  google.maps.event.addListener(marker, "click", function() {
    infoWindow.setContent(
      displayName + displayHours + hr + displayAdd + displayPhone
    );
    infoWindow.open(map, marker);
  });
  markers.push(marker);
}
