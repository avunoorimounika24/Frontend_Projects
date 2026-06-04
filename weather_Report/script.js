const  apiKey = "API_KEY";

document
.getElementById("city")
.addEventListener("keypress",function(event){

    if(event.key==="Enter"){
        getWeather();
    }

});

async function getWeather(){

    let city =
    document.getElementById("city").value;

    if(city===""){
        alert("Please enter a city name");
        return;
    }

    document.getElementById("result").innerHTML =
    "<h3>Loading...</h3>";

    let url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    let response = await fetch(url);

    let data = await response.json();
    console.log(data);

    if(data.cod != 200){

        document.getElementById("result").innerHTML =
        `
        <p class="error">
        ❌ City not found
        </p>
        `;

        return;
    }

    displayWeather(data);
}

function getCurrentLocationWeather(){

    document.getElementById("result").innerHTML =
    "<h3>Loading...</h3>";

    navigator.geolocation.getCurrentPosition(

        async function(position){

            let lat =
            position.coords.latitude;

            let lon =
            position.coords.longitude;

            let url =
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            let response =
            await fetch(url);

            let data =
            await response.json();

            console.log(data);

            displayWeather(data);
        },

        function(){

            document.getElementById("result").innerHTML =
            `
            <p class="error">
            Location access denied
            </p>
            `;
        }
    );
}

function displayWeather(data){

    let icon =
    data.weather[0].icon;

    document.getElementById("result").innerHTML =
    `
    <h2>${data.name}</h2>

    <img
    src="https://openweathermap.org/img/wn/${icon}@2x.png">

    <p>
    Temperature:
    ${data.main.temp} °C
    </p>

    <p>
    Feels Like:
    ${data.main.feels_like} °C
    </p>

    <p>
    Humidity:
    ${data.main.humidity}%
    </p>

    <p>
    Wind Speed:
    ${data.wind.speed} m/s
    </p>

    <p>
    Condition:
    ${data.weather[0].main}
    </p>
    `;
}