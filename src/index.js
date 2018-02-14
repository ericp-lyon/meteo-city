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
import {Weather} from "./hydrators/apis/weather.api.hydrator";
import { ApiWaqi } from "./models/apis/api-waqi.api.model";
import { Waqi } from "./hydrators/apis/waqi.api.hydrator";


//Models
let citymodel = new CityModel(
    new PolutionModel,
    new ClimatModel(
    new TemperatureModel
    )
);
//Components
new City (
    citymodel,
    new ApiOpenWeather("27125dda65fd2e71fa64f1f6d50916cc"),
    new Weather
).render();

new Meteopolution(
    new Temperature(citymodel),
    new Climat(citymodel.get("climat")),
    new Polution (
        citymodel.get("polution"),
        new ApiWaqi ("e7ed518e65b137a4715481431fad65c3a069f216"),
        new Waqi
    )
).render();



