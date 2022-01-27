window.onload = async () => {
    const coords = await getCoords()
    myMap.coordinates = coords
    myMap.createMap()
}

function selectMultiple() {
    document.getElementById("business").multiple = true;
}

document.getElementById('submit').addEventListener('click', async (event) => {
    event.preventDefault()
    selectMultiple()
    let bus = document.getElementById('business').value
    let object = await fourSquare(bus)
    myMap.businesses = mapBusinesses(object)
    myMap.addMarkers()
})

// api key fsq3qBIn6IqC1LPXwLD8qeAD6cHDIruOv9rgrZccRuShriU=