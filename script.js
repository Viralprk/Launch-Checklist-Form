// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
function isInvalidString(str) {
  return str != null && str.trim().length > 0 && !isNaN(str);
}
function isInvalidNumber(num) {
  return num != null && num.trim().length > 0 && isNaN(num);
}

function setMissionTarget(object) {
  return `
  <h2>Mission Destination</h2>
<ol>
   <li>Name: ${object.name}</li>
   <li>Diameter: ${object.diameter}</li>
   <li>Star: ${object.star}</li>
   <li>Distance from Earth: ${object.distance}</li>
   <li>Number of Moons: ${object.moons}</li>
</ol>
<img src="${object.image}"></img>`;
}

window.addEventListener("load", function () {
  fetch("https://handlers.education.launchcode.org/static/planets.json").then(
    function (response) {
      response.json().then(function (arr) {
        const element = document.getElementById("missionTarget");
        let index = Math.floor(Math.random() * Math.floor(arr.length));
        let selectedMission = arr[index];
        element.innerHTML = setMissionTarget(selectedMission);
      });
    }
  );

  let form = document.querySelector("form");
  form.addEventListener("submit", function (event) {
    let validForm = true;

    let pilotNameInput = document.querySelector("input[name=pilotName]").value;
    let copilotNameInput = document.querySelector("input[name=copilotName]")
      .value;
    let fuelLevelInput = document.querySelector("input[name=fuelLevel]").value;
    let cargoMassInput = document.querySelector("input[name=cargoMass]").value;

    if (
      pilotNameInput === "" ||
      copilotNameInput === "" ||
      fuelLevelInput === "" ||
      cargoMassInput === ""
    ) {
      validForm = false;
      alert("All fields are required !!");
    } else {
      // let element = document.getElementById(id);
      document.getElementById("faultyItems").style.visibility = "visible";

      if (isInvalidString(pilotNameInput)) {
        validForm = false;
      } else {
        document.getElementById(
          "pilotStatus"
        ).innerHTML = `Pilot ${pilotNameInput} is ready for launch`;
      }
      if (isInvalidString(copilotNameInput)) {
        validForm = false;
      } else {
        document.getElementById(
          "copilotStatus"
        ).innerHTML = `Co-pilot ${copilotNameInput} is ready for launch`;
      }
      if (isInvalidNumber(fuelLevelInput)) {
        validForm = false;
      } else {
        document.getElementById("fuelStatus").innerHTML =
          "Fuel level high enough for launch";
        if (fuelLevelInput < 10000) {
          validForm = false;
          document.getElementById("launchStatus").innerHTML =
            "Shuttle not ready for launch";
          document.getElementById("launchStatus").style.color = "red";
          document.getElementById("fuelStatus").innerHTML =
            "There is not enough fuel for the journey";
        }
      }
      if (isInvalidNumber(cargoMassInput)) {
        validForm = false;
      } else {
        document.getElementById("cargoStatus").innerHTML =
          "Cargo mass low enough for launch";

        if (cargoMassInput > 10000) {
          validForm = false;
          document.getElementById("launchStatus").innerHTML =
            "Shuttle not ready for launch";
          document.getElementById("launchStatus").style.color = "red";
          document.getElementById("cargoStatus").innerHTML =
            "There is too much mass for the shuttle to take off";
        }
      }

      if (!validForm) {
        alert("Make sure to enter valid information for each field !!");
      }

      //update fields
    }

    if (!validForm) {
      event.preventDefault();
    } else {
      document.getElementById("launchStatus").innerHTML =
        "Shuttle is ready for launch";
      document.getElementById("launchStatus").style.color = "green";
      event.preventDefault();
    }
  });
});
