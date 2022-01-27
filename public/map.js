const myMap = {
    coordinates: [],
    businesses: [],
    map: {},
    markers: {},
	
	// build map
	createMap() {
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
		marker.addTo(this.map).bindPopup('<p1><b>Your location</b><br></p1>').openPopup()
	},

	// add markers
	addMarkers() {
		for (let i = 0; i < this.businesses.length; i++) {
		this.markers = L.marker([this.businesses[i].lat, this.businesses[i].long,])
			.bindPopup(`<p1><b>${this.businesses[i].name}</b></p1><br></br><p1>${this.businesses[i].address}</p1>`)
			.addTo(this.map)
		}
	},
}