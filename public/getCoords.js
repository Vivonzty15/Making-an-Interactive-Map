// get coordinates
async function getCoords() {
    const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    });
    console.log(pos)
    return [pos.coords.latitude, pos.coords.longitude]
}