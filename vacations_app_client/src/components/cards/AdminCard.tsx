import React, { useEffect } from 'react';
import { IVacation, IAdminCard } from "../../ts/interfaces"
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';




export default function AdminCard(props: IAdminCard) {
    const { id, description, image: pic, destination, start_date, end_date, follows, price } = props.vacation
    const { deleteVacation } = props.adminFunctions
    const startDate: string = convertDate(start_date)
    const endDate: string = convertDate(end_date)
    return (
        <div>
            <Card className="admin-card">
                <CardActionArea>
                    <CardMedia
                        className="media"
                        image={pic}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {destination}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {description}
                        </Typography>
                        <Typography variant="body2" color="textPrimary" component="h3" >
                            {startDate} - {endDate}
                        </Typography>
                    </CardContent>
                </CardActionArea >
                <CardActions style={{ display: "flex" }}>
                    <Button size="small" color="secondary" onClick={() => deleteVacation(id)}> remove</Button>
                    <Button size="small" color="primary">Learn More</Button>
                    <div className="small-headline">Follows: {follows}</div>
                </CardActions>
            </Card>
        </div>
    )
}


function convertDate(dateTime: string): any {
    const dateSplit: Array<string> = dateTime.split("T")
    const dateLine: string = ` date: ${dateSplit[0].split("-").reverse().join("-")}. time: ${dateSplit[1].substring(0, 5)} `
    return dateSplit[0].split("-").reverse().join("-")
}