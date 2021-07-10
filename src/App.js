import './index.css';
import './app.css';
import { useState, useEffect } from 'react';
import InfoBox from './components/InfoBox';
import Map from './components/Map';
import Table from './components/Table';
import LineGraph from './components/LineGraph';
import {sortData, prettyPrintValue} from './utilities/util';
import "leaflet/dist/leaflet.css"; 

import {MenuItem, FormControl,Select,Card,CardContent} from '@material-ui/core';


function App() {
  // https://disease.sh/v3/covid-19/countries

  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState("all")
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796});
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases")
  
  const displayCountryInfo = async(countryCode = "all")=>{
    const url = countryCode === "all" ? `https://disease.sh/v3/covid-19/${countryCode}` :`https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
    .then(res => res.json())
    .then((data) =>{
      console.log("Contry has data >>>", data)
      setCountry(countryCode);
      setCountryInfo(data); 

      // setMapCenter({lat: data.countryInfo.lat, lng: data.countryInfo.long}) //me based ontop
      if(countryCode !== "all"){
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]) //them out of blues
        setMapZoom(4);


      }else{

        setMapCenter({ lat: 34.80746, lng: -40.4796}) //them out of blues
        setMapZoom(3);

      }
      
    })

  }

  const onCountryChange =  (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode)
    console.log('works like s acharm >>>>',countryCode)
    displayCountryInfo(countryCode);
    
    

  }

  // useEffect(() => {
    
  //     displayCountryInfo(); 

    
   
  // }, [country])






  useEffect(() =>{
    const getCountriesData  = async ()=>{
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then( response => response.json())
      .then(data =>{
        console.log('my countries', data)
        // setting table data to unmodified countries data
        setTableData(() => sortData(data));
        
        const redefinedCountries = data.map( (country) =>(
          {
            name: country.country,
            countryCode: country.countryInfo.iso2
          }
        ));
        // add worldwide to list of redefinedCountries at the beginning
        redefinedCountries.unshift({
          name: "Worldwide",
          countryCode: "all"
        })

        setCountries(redefinedCountries);
        // then map countris
        setMapCountries(data)
      })
    }

    getCountriesData();// set the countries data
    displayCountryInfo(); // defaults to all and then displays for worldwide - or put in seperate useEffect


  }, [])


  return (

    
    <div className='container app'>
      <div className = "app__left">
           {/* Header - Title & Dropdown */}
            <header  className = "app__header">
              <h1>Covid-19 Tracker</h1>
              <FormControl className = "app__dropdown">
                <Select
                  variant = "outlined"
                  value = {country}
                  onChange = {(e) =>(onCountryChange(e))}
                >
                  {
                    countries.map(({name,countryCode}, index) => <MenuItem value = {countryCode} key = {index}>{name}</MenuItem>)
                  }

                  
                </Select>

              </FormControl>
            </header>

            {/* Info Boxes */}
            <div className =  "app__stats">
              <InfoBox 
                active = {casesType === "cases"}
                onClick = {() => setCasesType("cases")}
                title = "Coronavirus Cases" 
                cases = {prettyPrintValue(countryInfo.todayCases)} 
                total = {prettyPrintValue(countryInfo.cases)}/>

              <InfoBox 
                active = {casesType === "recovered"}
                onClick = {() => setCasesType("recovered")}
                title = "Recovered" 
                cases = {prettyPrintValue(countryInfo.todayRecovered)} 
                total = {prettyPrintValue(countryInfo.recovered) }/>

              <InfoBox 
                active = {casesType === "deaths"}
                onClick = {() => setCasesType("deaths")}
                title = "Deaths" 
                cases = {prettyPrintValue(countryInfo.todayDeaths)} 
                total = {prettyPrintValue(countryInfo.deaths) }/>

            </div>

            {/* Map */}
            <Map center = {mapCenter} zoom = {mapZoom}  countries={mapCountries} casesType = {casesType}/>

      </div>
   
      {/* Side bar - Cases by Coutry (Table ) & Graph*/}
      <Card className = "app__right">
          <CardContent>
            <h3>Live Cases by Country</h3>
            <Table countries = {tableData}/>
            <h3 className = "app__graphTitle">Worlwide new {casesType}</h3>
            <LineGraph casesType = {casesType} className= "app__graph"/>
          </CardContent>

      </Card>

     

       

      
    </div>
  );
}

export default App;
