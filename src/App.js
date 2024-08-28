// import React, { useState, useEffect, useCallback } from "react";
// import { WeatherCard } from "./WeatherCard";
// import "./App.css";

// function App() {
//   const [page, setPage] = useState(1);
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Fetch weather data
//   const fetchWeather = async () => {
//     setLoading(true);
//     try {
//       const API_KEY ="e0eda18d8544b3dfee9163c683d2f73d"; 
//       const URL = `https://api.openweathermap.org/data/2.5/forecast?q=`+'Lahore'+`&appid=`+API_KEY+`&units=metric`;
      
//       const response = await fetch(URL);
      
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const result = await response.json();
      
//       setData((prevData) => [...prevData, ...result.list]);
//     } catch (error) {
//       console.error("Error fetching weather data:", error);
//     }
//     setLoading(false);
//   }

//   useEffect(() => {
//     fetchWeather();
//   },[]);

//   // Handle scroll event
//   const handleScroll = () => {
//     if (window.innerHeight + document.documentElement.scrollTop + 300 >= document.documentElement.scrollHeight) {
//       fetchWeather(); 
//     }
//   };

//   useEffect(() => {
//     const debouncedHandleScroll = debounce(handleScroll, 500);
//     window.addEventListener("scroll", debouncedHandleScroll);
//     return () => window.removeEventListener("scroll", debouncedHandleScroll);
//   }, []);

//   useEffect(() => {
//     if (loading) {
//       setPage((prevPage) => prevPage + 1);
//     }
//   }, [loading]);

//   return (
//     <div className="App">
//       <header className="App-header">
//         Weather Forecast
//         <div className="weatherCardContainer">
//           {data.map((item) => (
//             <WeatherCard
//               key={item.dt}
//               date={item.dt_txt}
//               temperature={item.main.temp}
//               description={item.weather[0].description}
//               icon={item.weather[0].icon}
//             />
//           ))}
//           {loading && <h1>Loading....</h1>}
//         </div>
//       </header>
//     </div>
//   );
// }

// // Debounce function
// function debounce(func, delay) {
//   let timeoutId;
//   return function (...args) {
//     if (timeoutId) {
//       clearTimeout(timeoutId);
//     }
//     timeoutId = setTimeout(() => {
//       func(...args);
//     }, delay);
//   };
// }

// export default App;
import React, { useState, useEffect, useCallback } from "react";
import { WeatherCard } from "./WeatherCard";
import "./App.css";

function App() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("Lahore"); // Default city

  // Fetch weather data
  const fetchWeather = async () => {
    setLoading(true);
    try {
      const API_KEY ="e0eda18d8544b3dfee9163c683d2f73d"; 
      const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
      
      const response = await fetch(URL);
      
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      
      setData(result.list); // Reset data to only show the new city's data
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWeather();
  }, [city]); // Refetch data when city changes

  // Handle city change
  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  // Handle scroll event
  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 300 >= document.documentElement.scrollHeight) {
      fetchWeather(); 
    }
  };

  useEffect(() => {
    const debouncedHandleScroll = debounce(handleScroll, 500);
    window.addEventListener("scroll", debouncedHandleScroll);
    return () => window.removeEventListener("scroll", debouncedHandleScroll);
  }, []);

  useEffect(() => {
    if (loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather Forecast</h1>
        {/* Dropdown menu */}
        <select value={city} onChange={handleCityChange}>
          <option value="Lahore">Lahore</option>
          <option value="Islamabad">Islamabad</option>
          <option value="London">London</option>
          <option value="Paris">Paris</option>
          <option value="New York">New York</option>
          <option value="Tokyo">Tokyo</option>
        </select>
        <div className="weatherCardContainer">
          {data.map((item) => (
            <WeatherCard
              key={item.dt}
              date={item.dt_txt}
              temperature={item.main.temp}
              description={item.weather[0].description}
              icon={item.weather[0].icon}
            />
          ))}
          {loading && <h1>Loading....</h1>}
        </div>
      </header>
    </div>
  );
}

// Debounce function
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export default App;

