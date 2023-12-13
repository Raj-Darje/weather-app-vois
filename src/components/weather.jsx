import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './weather-style.css'
import Rain from './assets/rain.gif'
import Wind from './assets/wind.gif'
import Search from './assets/search.png'
// import cloudy from './assets/cloudy.gif'
import Storm from './assets/storm.gif'
// import Thunder from './assets/thunder.gif'
import humidity_icon from './assets/humidity.gif'
import visibility from './assets/visibility.jpg'
import atm from './assets/atm.png'
import feels from './assets/feels.png'
import clear_icon from "./assets/clear.png";
import cloud_icon from "./assets/cloud.png";
import drizzle_icon from "./assets/drizzle.png";
import rain_icon from "./assets/rain.png";
import snow_icon from "./assets/snow.png";
// import wind_icon from "./assets/wind.png";





const Weather = () => {

  
   

  // to get current user's location 


    
    const [city, setCity] = useState(null);
    
    useEffect(() => {
        const fetchLocation = async () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
            async (position) => {
                
                const reverseGeocodingApiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
    
                try {
                const response = await axios.get(reverseGeocodingApiUrl);
                const cityName = response.data.address.city || response.data.address.town || response.data.address.village;
                setCity(cityName);
                } catch (error) {
                console.error('Error getting city:', error.message);
                }
            },
            (error) => {
                console.error('Error getting location:', error.message);
            }
            );
        } else {
            console.error('Geolocation is not supported by your browser');
        }
        };
    
        fetchLocation();

        

    }, []);


    let api_key = "bd5130ee2e3611e91eee80dcbe8341de";


    

    // let api_2 = "12f40774e8024dcbb83143228231112";

    const [wicon, setWicon] = useState(clear_icon);

    let recent_locations=[]; 

    // created this recent_locations array to store the location , to implement save and switch functionality



    // function for getting current location temperature

        const current_weather =  async () =>{ 
          const element = document.getElementsByClassName('cityInput');
          if (element[0].value===""){
            let url5 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`
            let response5 = await fetch(url5);

            let data5 = await response5.json();


            const current_temp = document.getElementsByClassName("weather-temp")
            current_temp[0].innerHTML = Math.floor( data5.main.temp) + " °C";
        }
        }
        current_weather();


    
// complete search functionality starts here
    const search = async ()=>{
        const element = document.getElementsByClassName('cityInput');

        recent_locations.push(element[0].value);


        console.log(recent_locations);
      

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`

        // above url was just giving current time's weather data as response, so i have to take another url (below's url)

        let url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${element[0].value}&units=metric&appid=${api_key}`

        // saved locations functionality
        // let saved_location_url= `https://api.openweathermap.org/data/2.5/weather?q=${recent_locations}&units=Metric&appid=${api_key}`


        // let response3 = await fetch(saved_location_url);

        // let data3 = await response3.json();

        // saved locations functionality

        
        


        let response = await fetch(url);

        let data = await response.json();

        


        
      

      // main-page data



      const humidity = document.getElementsByClassName("humidity-percent");
      const wind = document.getElementsByClassName("wind-rate");

      const temperature = document.getElementsByClassName("weather-temp");
      const location = document.getElementsByClassName("weather-location");

      const feels_like = document.getElementsByClassName("feels_like");
      const visibility = document.getElementsByClassName("visibility");
      const pressure = document.getElementsByClassName("pressure");


      const current_city = document.getElementsByClassName("current_city");
      current_city[0].innerHTML = `Hourly Forecast of location: ${element[0].value} `
      

      



      humidity[0].innerHTML = data.main.humidity + " %";
      wind[0].innerHTML =  Math.floor(data.wind.speed) +  " km/h";

      temperature[0].innerHTML = Math.floor(data.main.temp) + " °C";
      location[0].innerHTML = data.name;

      feels_like[0].innerHTML = data.main.feels_like + " °C";
      visibility[0].innerHTML = data.visibility ;
      pressure[0].innerHTML = data.main.pressure + " atm";



      // console.log(data.main.temp);


        let response2 = await fetch(url2);

        let data2 = await response2.json();



      //   console.log(data2.list[0].wind.speed);
      // console.log(data2.list[0].dt_txt);
      // console.log(data2.list[0].main.temp_max);




      // forecasting data


      // day 1 data


      const d = document.getElementsByClassName("date1");

      const temperature2 = document.getElementsByClassName("forecast-temp1");
      const wind2 = document.getElementsByClassName("forecast-wind1");
      const humidity2 = document.getElementsByClassName("forecast-humidity1");


      d[0].innerHTML = data2.list[0].dt_txt;

      temperature2[0].innerHTML ="Temp- " + data2.list[0].main.temp_min + " °C /"+ data2.list[0].main.temp_max + " °C";
      humidity2[0].innerHTML = "Humidity- " + data2.list[0].main.humidity + " %";
      wind2[0].innerHTML ="Wind- " + data2.list[0].wind.speed + "Km/hr";



      // day 2 data



      const d3 = document.getElementsByClassName("date3");

      const temperature3 = document.getElementsByClassName("forecast-temp3");
      const wind3 = document.getElementsByClassName("forecast-wind3");
      const humidity3 = document.getElementsByClassName("forecast-humidity3");

      

      d3[0].innerHTML = data2.list[1].dt_txt;

      temperature3[0].innerHTML ="Temp- " +  data2.list[1].main.temp_min + " °C /"+ data2.list[1].main.temp_max + " °C";
      humidity3[0].innerHTML = "Humidity- " + data2.list[1].main.humidity + " %";
      wind3[0].innerHTML = "Wind- " + data2.list[1].wind.speed + "Km/hr";


      // day 3 data



      const d4 = document.getElementsByClassName("date4");

      const temperature4 = document.getElementsByClassName("forecast-temp4");
      const wind4 = document.getElementsByClassName("forecast-wind4");
      const humidity4 = document.getElementsByClassName("forecast-humidity4");

  

      d4[0].innerHTML = data2.list[2].dt_txt;

      temperature4[0].innerHTML ="Temp- " +  data2.list[2].main.temp_min + " °C /" + data2.list[2].main.temp_max + " °C";
      humidity4[0].innerHTML = "Humidity- " + data2.list[2].main.humidity + " %";
      wind4[0].innerHTML = "Wind- " + data2.list[2].wind.speed + "Km/hr";



      // day 4 data



      const d5 = document.getElementsByClassName("date5");

      const temperature5 = document.getElementsByClassName("forecast-temp5");
      const wind5 = document.getElementsByClassName("forecast-wind5");
      const humidity5 = document.getElementsByClassName("forecast-humidity5");

    

      d5[0].innerHTML = data2.list[3].dt_txt;

      temperature5[0].innerHTML ="Temp- " +  data2.list[3].main.temp_min + " °C /" + data2.list[3].main.temp_max + " °C";
      humidity5[0].innerHTML ="Humidity- " +  data2.list[3].main.humidity + " %";
      wind5[0].innerHTML = "Wind- " + data2.list[3].wind.speed + "Km/hr";



      // day 5 data

      const d6 = document.getElementsByClassName("date6");

      const temperature6 = document.getElementsByClassName("forecast-temp6");
      const wind6 = document.getElementsByClassName("forecast-wind6");
      const humidity6 = document.getElementsByClassName("forecast-humidity6");
  
      

      d6[0].innerHTML = data2.list[4].dt_txt;

      temperature6[0].innerHTML ="Temp- " +  data2.list[4].main.temp_min + " °C /" + data2.list[4].main.temp_max + " °C";
      humidity6[0].innerHTML = "Humidity- " + data2.list[4].main.humidity + " %";
      wind6[0].innerHTML = "Wind- " + data2.list[4].wind.speed + "Km/hr";
      console.log(data2.list[4].main)

      




      
      // temperature2[0].innerHTML = Math.floor(data2.main.temp) + " °C";
      







      // if(1){
          


      //   let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`
      


      //   let response = await fetch(url);

      //   let data1 = await response.json();

      //   x= Math.floor(data1.main.temp) + " °C";
      //   temperature[0].innerHTML = x;

      //   const location = document.getElementsByClassName("weather-location");
      //   location[0].innerHTML = data1.name;
        

      // }




      // dynamically adding icons based on api's response


      if(data.weather[0].icon==="01d" || data.weather[0].icon === "01n"){
        setWicon(clear_icon);
      }
      else if(data.weather[0].icon==="02d" || data.weather[0].icon === "02n"){
        setWicon(cloud_icon);
      }
      else if(data.weather[0].icon==="03d" || data.weather[0].icon === "03n"){
        setWicon(drizzle_icon);
      }
      else if(data.weather[0].icon==="04d" || data.weather[0].icon === "04n"){
        setWicon(Storm);
      }
      else if(data.weather[0].icon==="09d" || data.weather[0].icon === "09n"){
        setWicon(Rain);
      }
      else if(data.weather[0].icon==="10d" || data.weather[0].icon === "10n"){
        setWicon(rain_icon);
      }
      else if(data.weather[0].icon==="13d" || data.weather[0].icon === "13n"){
        setWicon(snow_icon);
      }
      else{
        setWicon(clear_icon);
      }

    }
    




// tried to implement save, switch, remove functionality in below function but currently this functionality is not working

    const saved_locations_func = () =>{

      const search = async ()=>{
        // const element = document.getElementsByClassName('cityInput');
        // recent_locations.push(element[0].value);

        let saved_location_url= `https://api.openweathermap.org/data/2.5/weather?q=${recent_locations}&units=Metric&appid=${api_key}`


        let response3 = await fetch(saved_location_url);

        let data3 = await response3.json();
        const temperature = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");

        temperature[0].innerHTML = "past location data: " + Math.floor(data3.main.temp) + " °C";
      location[0].innerHTML = data3.name;
      }
      recent_locations.forEach(search);
      


    }
        
    
      










  return (
    <div>
        
        


        {/* header part starts here */}

        <div className="header">

            <div className="search_input">
                <input type="text" placeholder='Search' className='cityInput' />
            </div>

            <div className="search_icon" onClick={()=>{search()}}>
                <img src={Search} alt="" />
                
            </div>

            <button className='switch_location' onClick={()=>saved_locations_func()}>saved locations</button>

            



        </div>

         {/* header part ends here */}




        <div className="temp_loc">
            <div className="weather-image">
                <img src={wicon} alt="" />
            </div>

        

            <div className="weather-temp">
            -- °C
                
            </div>
            <div className="weather-location">
            
            {city}
                
            </div>


        </div>


        





      <div className="data-container">
            <div className="element">
                <img className='data-img' src={humidity_icon} alt="" />
                <div className="data">
                    <div className="text">Humidity</div> <br />
                    <div className="humidity-percent">64%</div>
            </div>
            <div className="element">
                <img className='data-img' src={Wind} alt="" />
                <div className="data">
                <div className="text">Wind Speed</div> <br />
                    <div className="wind-rate">18 km/h</div></div>
            </div>
            <div className="element">
                <img className='data-img' src={visibility} alt="" />
                <div className="data">
                  <div className="text">Visibility</div> <br />
                    <div className="visibility">2000</div></div>
                    
            </div>
            <div className="element">
                <img className='data-img' src={feels} alt="" />
                <div className="data">
                    <div className="text">Feels Like </div> <br />
                    <div className="feels_like">24 °C</div></div>
                    
            </div>
            <div className="element">
                <img className='data-img' src={atm} alt="" />
                <div className="data">
                    <div className="text">Atmospheric Pressure </div> <br />
                    <div className="pressure">341</div></div>
                    
            </div>
        </div>
        
      </div>

      

      
      
      
      <p className='text'>Made By Raj Rameshwar Darje</p>
      <h2>Your current location: {city}</h2>










       



       <div className="days-forecast">
          <h1 className='current_city'>Hourly Forecast of {city}</h1>
          <ul className="weather-cards">
            <li className="card">
              
              <h3 className='date1' >( ______ )</h3>
              <h4 className='forecast-temp1'>Temp: 26C</h4>
              <h4 className='forecast-wind1'>Wind: 3 M/S</h4>
              <h4 className='forecast-humidity1'>Humidity: 54%</h4>
            </li>
            <li className="card">
              <h3 className='date3'>( ______ )</h3>
              <h4 className='forecast-temp3'>Temp: 28 °C</h4>
              <h4 className='forecast-wind3'>Wind: 1.4 M/S</h4>
              <h4 className='forecast-humidity3'>Humidity: 64%</h4>
            </li>
            <li className="card">
              <h3 className='date4'>( ______ )</h3>
              <h4 className='forecast-temp4'>Temp: 28 °C</h4>
              <h4 className='forecast-wind4'>Wind: 2 M/S</h4>
              <h4 className='forecast-humidity4'>Humidity: 43%</h4>
            </li>
            <li className="card">
              <h3 className='date5'>( ______ )</h3>
              <h4 className='forecast-temp5'>Temp: 27 °C</h4>
              <h4 className='forecast-wind5'>Wind: 3 M/S</h4>
              <h4 className='forecast-humidity5'>Humidity: 34%</h4>
            </li>
            <li className="card">
              <h3 className='date6'>( ______ )</h3>
              <h4 className='forecast-temp6'>Temp: 28 °C</h4>
              <h4 className='forecast-wind6'>Wind: 2 M/S</h4>
              <h4 className='forecast-humidity6'>Humidity: 58%</h4>
            </li>
          </ul>
        </div> 


    </div>
  )
}

export default Weather