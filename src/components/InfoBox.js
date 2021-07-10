import React from 'react';
import {Card,CardContent,Typography} from '@material-ui/core'
import './InfoBox.css'

const InfoBox = ({title,cases,total,active, onClick}) => {
    return (
        <Card className = {`infoBox ${active && 'active'}`}
                onClick = {onClick}>
            <CardContent>
                {/* title */}
                <Typography color = "textSecondary" className="infoBox__title">
                    {title}
                </Typography>
                {/* no of cases */}
                <Typography color = "textSecondary" className="infoBox__cases">
                    {cases}
                </Typography>
                {/* total */}
                <Typography color = "textSecondary" className="infoBox__total">
                    {total} Total
                </Typography>

            </CardContent>
        </Card>
            
        
    )
}

export default InfoBox
