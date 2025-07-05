//import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import { useEffect } from "react";
const API_KEY='abe497de7b13b4439c46ba5dbb4c375f';
function App() {
  const [city,setCity]=useState("Delhi");
  const [weather,setWeather]=useState(null);
  const handleChange=(e)=>{
    setCity(e.target.value);
  }
  const fetchResult=async (city)=>{
      try{
        const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
        const data=await response.json();
        if(response.ok){
          setWeather(data);
        }else{
          setWeather(null);
        }
      }catch(error){
        alert(error);
        setWeather(null);
      }
    }
  useEffect(()=>{
    fetchResult(city);
  },[]);
  const handleSubmit=()=>{
    fetchResult(city);
  }
  return (
    <>
    <div className="outer">
      <form>
        <div className="box">
          <input className="field" type="text" name="city" value={city} placeholder="Enter City Name" onChange={handleChange}></input>
          <button type="button" className="butn" onClick={handleSubmit}>Submit</button>
        </div>
      </form>
    </div>
    {weather && 
    <div>
      <h3>Location: {weather.name}</h3>
      <h3>Weather: {weather.weather[0].description}</h3>
      <h3>Avg. Temp: {weather.main.temp}</h3>
      <h3>Humidity: {weather.main.humidity}%</h3>
    </div>}
    </>
  );
}

export default App;
