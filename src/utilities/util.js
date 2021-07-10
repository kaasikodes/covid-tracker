import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";


const casesTypeColors = {
    cases: {
        hex: "#cc1034",
        rgb: "rgb(204, 16, 52)",
        rgba: "rgba(204, 16, 52, 0.5)",
        multiplier: 800,
    },
    recovered: {
        hex: "#7dd71d",
        rgb: "rgb(125, 215, 29)",
        rgba: "rgba(125, 215, 29, 0.5)",
        multiplier: 1200,
    },
    deaths: {
        hex: "#fb4443",
        rgb: "rgb(251, 68, 67)",
        rgba: "rgba(204, 68, 67, 0.5)",
        multiplier: 2000,
    },
}


export const sortData = (data) =>{
    const sortedData = [...data];
    return sortedData.sort((a,b) => a.cases > b.cases ? -1 : 1)

}


export const buildChartData = (data,type = 'cases') =>{
    let chartData = []
    let lastDataPointValue;
    for(const date in data[type]){
        if(lastDataPointValue){
            let newDataPoint = {
                x: date,
                y: data[type][date] - lastDataPointValue
            }
            chartData.push(newDataPoint)
        }
        lastDataPointValue = data[type][date]
    }
    
    return chartData;

}

// draw circle on map -ff tut , reFACTOR LATER ... WITH intrctv tool tips
export const showDataMap = (data, casesType = 'cases')=>{

    return data.map((country,index) => (
        <Circle
            key = {index}
            center = {[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity = {0.4}
            fillColor = {casesTypeColors[casesType].hex}
            color = {casesTypeColors[casesType].hex}
            radius = {
                Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
            }
        
        
        >
            <Popup>
               
                <div className = "info-container">
                    <div className = "info-flag" style = {{backgroundImage: `url(${country.countryInfo.flag})`}}/>
                    <div className = "info-country-name">{country.country}</div>
                    <div className = "info-cases">Cases: {numeral(country.cases).format("0,0")}</div>
                    <div className = "info-recovered">Recovered: {numeral(country.recovered).format("0,0")}</div>
                    <div className = "info-deaths">Deaths: {numeral(country.deaths).format("0,0")}</div>
                </div>

            </Popup>

        </Circle>

    ))

}


export const prettyPrintValue = (value) =>{
    let modifiedValue = value ? `+${numeral(value).format("0.0a")}` : 0;
    return modifiedValue;
}