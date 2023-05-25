import { useEffect, useState } from 'react';
import Dashboard from './componenets/Dashbaord/Dashboard' ;
import Hightlights from './componenets/Hightlights/Hightlights';
import NextDays from './componenets/NextDays/NextDays';
import Footer from './componenets/footer/Footer';



function App() {
  const API_KEY = process.env.REACT_APP_API_KEY
  const [currentWeather  , setCurrentWeather] = useState({})
  const  [nextdays  , setNextdays] = useState([])
  const [city ,  setCity] = useState('10001')
  const [temperaturefromat , setTumperature] = useState('c') 


  const getCurrentWeather  = async (city) => {
      const  url  = 'https://api.openweathermap.org/data/2.5/weather?&q='+city+'&appid='+API_KEY

      try{
          const response = await fetch(url)
          const data = await response.json()
          
          setCurrentWeather(data)

      }catch{
          console.log('there is  a  problem  fetching  data ')
      }
  }
  




  const futureWeather = async ()=> {
      const url = 'api.openweathermap.org/data/2.5/forecast?q='+city+'&appid='+API_KEY
      try{
          const  response = await fetch(url) ;
          const data  = await response.json() ;
          setNextdays(data.forecast.forecastday)
          
      }catch{
          console.log('there is a  problem with  api ')
      }
  }

  useEffect(()=> {
        getCurrentWeather(city)
        futureWeather()
  } , [city])




  return (
    <div className="App w-[90%]  mx-auto  bg-[#1E213A] ">
      <div className='flex  flex-col lg:flex-row max-h-full '>
        <Dashboard currentWeather = {currentWeather} setCity={setCity} temperaturefromat = {temperaturefromat} setTumperature  = {setTumperature}/>
        <div className='flex flex-col min-w-[70%] max-h-full bg-[#100E1D] '>
          <NextDays nextdays = {nextdays} temperaturefromat = {temperaturefromat} />
          <Hightlights currentWeather = {currentWeather}  />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
