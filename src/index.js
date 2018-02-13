import { City } from "./components/city/city.component";
import { Climat } from "./components/climat/climat.component";
import { Temperature } from "./components/temperature/temperature.component";
import { Polution } from "./components/polution/polution.component";
import { Meteopolution } from "./components/meteopolution/meteopolution.component";
import { ApiOpenWeather } from "./models/apis/api-openweather.api.model";
import { Climat as ClimatModel } from "./models/climat.model";
import { Temperature as TemperatureModel } from "./models/temperature.model";
import { Polution as PolutionModel } from "./models/polution.model";
import { City as CityModel } from "./models/city.model";



//Apis
let apiOpenWeather = new ApiOpenWeather("27125dda65fd2e71fa64f1f6d50916cc");
//Models
let citymodel = new CityModel(
    new PolutionModel,
    new ClimatModel(
    new TemperatureModel

    )
);
//Components
let city = new City (citymodel, apiOpenWeather);
let meteopolution = new Meteopolution(
    new Temperature,
    new Climat,
    new Polution
);
//render
city.render();
meteopolution.render();



//  console.log(openWeather);



// let climat = new ClimatModel;
// climat.set("wind",99);
// console.log(climat.get("wind"));

//let citymodel = new CityModel;
// citymodel.set("sunrise", 45);
// console.log(citymodel.get("sunrise"));
// let polution = new PolutionModel
// polution.set("aqi",45);
// console.log(polution.get("aqi"));
// let temperature = new TemperatureModel
// temperature.set("min",30);
// console.log(temperature.get("min"));

