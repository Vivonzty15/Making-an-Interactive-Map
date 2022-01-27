const myMap = {
    coordinates: [],
    businesses: [],
    map: {},
    markers: {},
	
	// build map
	buildMap() {
		this.map = L.map('map', {
		center: this.coordinates,
		zoom: 10,
		});
		// add tiles
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution:
			'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		minZoom: '13',
		}).addTo(this.map)
		// add marker
		const marker = L.marker(this.coordinates)
		marker.addTo(this.map).bindPopup('<p1><b>You are here</b><br></p1>').openPopup()
	},

	// add markers
	addMarkers() {
		for (let i = 0; i < this.businesses.length; i++) {
		this.markers = L.marker([this.businesses[i].lat, this.businesses[i].long,])
			.bindPopup(`<p1><b>${this.businesses[i].name}</b></p1>`)
			.addTo(this.map)
		}
	},
}

    // get coordinates
async function getCoords() {
    const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    });
    return [pos.coords.latitude, pos.coords.longitude]
}

async function fourSquare(bus) {
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: 'fsq3qBIn6IqC1LPXwLD8qeAD6cHDIruOv9rgrZccRuShriU='
        }
    };
    let limit = 6
    let lon = myMap.coordinates[1]
    let lat = myMap.coordinates[0]
    let response = await fetch(`https://api.foursquare.com/v3/places/search?&query=${bus}&limit=${limit}&ll=${lat}%2C${lon}`, options)
    let data = await response.text()
    let parsed = JSON.parse(data)
    let results = parsed.results
    return results
}

function mapBusinesses(object) {
    let businesses = object.map((element) => {
        let location = {
            name: element.name,
            lat: element.geocodes.main.latitude,
            long: element.geocodes.main.longitude
        };
        return location
    })
    return businesses
}

window.onload = async () => {
    const coords = await getCoords()
    myMap.coordinates = coords
    myMap.buildMap()
}

document.getElementById('submit').addEventListener('click', async (event) => {
    event.preventDefault()
    let bus = document.getElementById('business').value
    let object = await fourSquare(bus)
    myMap.businesses = mapBusinesses(object)
    myMap.addMarkers()
})

// api key fsq3qBIn6IqC1LPXwLD8qeAD6cHDIruOv9rgrZccRuShriU=