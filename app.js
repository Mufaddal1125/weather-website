window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(".temp-desc");
  let temperatureDegree = document.querySelector(".temp-degree");
  let locationTimezone = document.querySelector(".location-timezone");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api_key = 'c122bd66243c09f8b5d0afdd5ba2993d'
      const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api_key}`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const { main, description } = data.weather[0];
          const { temp } = data.main;
          const cityName = data.name;
          const timeZone = data.timezone;


          // convert default kelvin to celcius
          document.querySelector("#celcius").onclick = () => {
            temperatureDegree.textContent = (temp -273.15 ).toFixed(0) + "°";
            document.querySelector("#fahrenheit").style.opacity = 0.5;
            document.querySelector("#celcius").style.opacity = 1;
          };
          // convert default kelvin to fahrenheit
          document.querySelector("#fahrenheit").onclick = () => {
            temperatureDegree.textContent = ((temp - 273.15) * 9/5 + 32 ).toFixed(0)  + "°";
            document.querySelector("#celcius").style.opacity = 0.5;
            document.querySelector("#fahrenheit").style.opacity = 1;
          };

          document.querySelector("#celcius").click() //click on celcius by default

          temperatureDescription.textContent = description;
          temperatureDescription.style.textTransform = 'capitalize'
          locationTimezone.textContent = cityName;
          setIcons(main, document.querySelector(".icon"));
        });
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    let currentIcon = icon.replace(/-/g, "_").toUpperCase();
    if(currentIcon === "HAZE")  {currentIcon = "FOG"}
    if(currentIcon === "HAZE")  {currentIcon = "FOG"}
    console.log(currentIcon)
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
