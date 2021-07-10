import {useState, useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import {buildChartData} from '../utilities/util'
import numeral from 'numeral'; 

// Configur options for line component
const options = {
    legend: {
        display: false
    },
    elements: {
        point:{
            radius: 0
        }
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect:false,
        callbacks: {
            label: function(tooltipItem, data){
                return numeral(tooltipItem.value).format("+0,0")
            }
        }
    },
    scales: {
        xAxes: [
            {
                type: 'time',
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: 'll',

                }
            }
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    callback: function (value,index, vlaues){
                        return numeral(value).format("0a");
                    }
                }
            }
        ]
    }
}

const LineGraph = ({casesType}) => {

    const [data,setData] = useState([])
    

    useEffect(()=>{
        const getChartData = async ()=>{

            await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
            .then((res)=> res.json())
            .then((data)=>{
                setData(buildChartData(data,casesType)) // this is now dependnt on the casestype  state although it has 
                // a default value n casesType also has same default value -redundant get rid of def value 0r  ... hmm

            })

        }
        getChartData();
        

    }, [casesType])

   

   
    return (
        <div>
            { data?.length &&
                <Line 
                options = {options}
                data = {
                    {
                        datasets : [
                            {
                                backgroundColor: "rgba(204, 16, 52, 0.5)",
                                borderColor: "#CC1034",
                                data: data
                            }
                        ]
                    }
                }

                />
            }
            
        </div>
    )
}

LineGraph.defaultProps = {
    casesType: 'cases'
}

export default LineGraph
