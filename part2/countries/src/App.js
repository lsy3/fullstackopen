import { useState, useEffect } from 'react'
import axios from 'axios'

const SearchBar = ({value, updateValue}) =>
{
  return (
    <>
      find countries
      <input value={value} onChange={(event) => updateValue(event.target.value)} />
      <br />
    </>
  )
}

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState({})

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY
    const city = country.capital[0]

    axios.get('https://api.openweathermap.org/data/2.5/weather',
      { params: { q: city, appid: api_key } })
      .then(response => {
        setWeather({
          temp: response.data.main.temp,
          wind: response.data.wind.speed,
          icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
        })
      })
  }, [])

  return (
    <div>
      <h3>{country.name.common}</h3>
      capital {country.capital} <br />
      area {country.area} <br />
      <h4>languages</h4>
      <ul>
        {Object.entries(country.languages).map(l => <li key={l[0]}>{l[1]}</li> )}
      </ul>
      <img src={country.flags.png} alt={country.name.common} />
      <h3><b>Weather in {country.capital}</b></h3>
      temperature {weather.temp - 273.15} Celcius<br />
      <img src={weather.icon} alt="weather icon" /><br />
      wind {weather.wind} m/s
    </div>
  )
}

const CountryName = ({ name, showHandler }) => {
  return (
    <>{name}<button onClick={showHandler}>show</button><br /></>
  )
}

const CountryData = ({search, setSearch}) =>
{
  const [countries, setCountries] = useState([])
  let searchLowerCase = search.toLowerCase()

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  let fCountries = countries.filter(c => c.name.common.toLowerCase().includes(searchLowerCase))
  if (fCountries.length === 0) {
    return <>No country found</>
  } else if (fCountries.length === 1) {
    return <CountryDetails country={fCountries[0]} />
  } else if (fCountries.length <= 10) {
    return fCountries.map(c =>
        <CountryName key={c.ccn3} name={c.name.common} showHandler={() => setSearch(c.name.common)}
      />)
  } else {
    return <>Too many matches, specify another filter</>
  }
}

function App() {
  const [search, setSearch] = useState('')

  return (
    <div>
      <SearchBar value={search} updateValue={setSearch} />
      <CountryData search={search} setSearch={setSearch} />
    </div>
  )
}

export default App;
