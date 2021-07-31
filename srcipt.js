// --------------------------------------in vanilla js--------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------
// window.addEventListener("load", () => {
//   let long;
//   let lat;
//   let temperatureDescription = document.querySelector(
//     ".temperature-description"
//   );
//   let temperatureDegree = document.querySelector(".degree-value");
//   let locationTimezone = document.querySelector(".location-timezone");
//   let iconID = document.querySelector(".weather-icon");

//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition((position) => {
//       console.log(position);
//       long = position.coords.longitude;
//       lat = position.coords.latitude;

//       const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=imperial&exclude=hourly,daily,minutely&appid=cf1a38783d74aa19fbbf3e3abc6391e0`;

//       fetch(api)
//         .then((response) => {
//           return response.json();
//         })
//         .then((data) => {
//           console.log(data);
//           const { temp } = data.current;
//           const { timezone } = data;
//           const { description, icon } = data.current.weather[0];
//           //   set DOM elements from the API
//           temperatureDegree.textContent = temp;
//           temperatureDescription.textContent = description;
//           locationTimezone.textContent = timezone;
//           iconID.innerHTML = `<img src = "http://openweathermap.org/img/wn/${icon}@2x.png">`;
//         });
//     });
//   } else {
//
//     temperatureDiscription.textContent = "Can't find your location 😢";
//   }
// });

// --------------------------------------in jQuery--------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------
$("document").ready(function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      const apiKey = "cf1a38783d74aa19fbbf3e3abc6391e0";

      $.getJSON(
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
          lat +
          "&lon=" +
          long +
          "&units=imperial&appid=" +
          apiKey,
        (data) => {
          console.log(data);
          const { temp } = data.main;
          const { description, icon } = data.weather[0];
          const { name } = data;
          const { country, sunset, sunrise } = data.sys;
          // set DOM elements from api
          $(".degree-value").html(temp);
          $(".temperature-description").html(description);
          $(".location-timezone").html(name + ", " + country);
          $(".weather-icon-img").attr("src", "./img/" + icon + ".svg");
          // $(".weather").attr("src", "./img/50n.svg");
          let now = new Date().getHours();

          let set = new Date(sunset * 1000).getHours();

          let rise = new Date(sunrise * 1000).getHours();

          if (now >= set && now <= rise) {
            $("body").addClass("dark");
          }
        }
      );
    });
  } else {
    $(".temperature-description").html("Can't find your location 😢");
  }
});
