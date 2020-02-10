const store = {
  apiKey: "8a0fb5fc01c4876b3fd44716f18a4141",
  locationName: "Brooklyn,nyc"
}
let weatherApp;
window.onload = async function(){
  weatherApp = new Weather(store);
  await weatherApp.init();
  console.log(weatherApp.data.current)
}