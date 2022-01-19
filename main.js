
var mymap = L.map('mapid').setView([54.6872, 25.2797], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1
}).addTo(mymap);

L.circle([51.508, -0.11], 20, {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5
}).addTo(mymap);


function test(oldGroup) {
  fetch('http://m.stops.lt/vilnius/gps.txt')
    .then((response) => response.text())
    .then((gps) => {
      const group1 = L.featureGroup();
      const transportListRaw = gps.split('\n');
      for (let i = 0; i < transportListRaw.length; i += 1) {
        const transportRaw = transportListRaw[i];
        const [transportType, transportNumber, latitude, longitude] = transportRaw.split(',');  
        if (longitude && latitude) {
          L.circle([Number(longitude) / 1000000, Number(latitude) / 1000000], 20, {
            color: transportType == 1 ? 'red' : 'blue',
            fillColor: '#f03',
            fillOpacity: 0.5
          }).addTo(group1).bindPopup(transportNumber);
        }

      }
      if (oldGroup) {
        mymap.removeLayer(oldGroup);
      }
      mymap.addLayer(group1);
      setTimeout(() => {
        test(group1);
      }, 1000);

    });
}

test();