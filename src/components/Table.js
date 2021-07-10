import React from 'react'
import numeral from 'numeral'

const Table = ({countries}) => {
    return (
        <div className = "table">
            <tbody>
                {
                    countries.map((country, index) => {
                        return <tr key = {index} className = "table__item">
                                    <td>{country.country}</td>
                                    <td><strong>{numeral(country.cases).format('0,0')}</strong></td>
                                </tr>


                    })
                }
                    
            </tbody>
            
            
        </div>
    )
}

export default Table
