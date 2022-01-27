async function fourSquare(bus) {
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: 'fsq3qBIn6IqC1LPXwLD8qeAD6cHDIruOv9rgrZccRuShriU='
        }
    };
    let limit = '6'
    let lon = myMap.coordinates[1]
    let lat = myMap.coordinates[0]
    let response = await fetch(`https://api.foursquare.com/v3/places/search?&query=${bus}&limit=${limit}&ll=${lat}%2C${lon}`, options)
    let data = await response.text()
    let parsed = JSON.parse(data)
    let results = parsed.results
    console.log(results)

    return results
}

function mapBusinesses(object) {
    let businesses = object.map((element) => {
        let location = {
            name: element.name,
            icon: element.icon,
            lat: element.geocodes.main.latitude,
            long: element.geocodes.main.longitude,
            address: element.location.address
        };
        console.log(location)
        return location
    })
    return businesses
}