import React from 'react';
import { IUserCard } from "../../ts/interfaces"
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';



export default function UserCard(props: IUserCard) {
    const { id, description, image: pic, destination, start_date, end_date, price, time_of_like } = props.vacation
    const { postLike, user, unLike } = props.userFunctions
    const startDate: string = convertDate(start_date)
    const endDate: string = convertDate(end_date)
    const isLiked: boolean = time_of_like ? true : false
    const vacation_id: number = id


    function handleLikeChange(): any {
         isLiked? unLike({user, vacation_id}) : postLike({user, vacation_id})
    }

    return (
        <div>
            <Card className="admin-card">
                <CardActionArea>
                    <CardMedia
                        className="media"
                        image={pic}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" color="primary" component="h2">
                            {destination}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {description}
                        </Typography>
                        <Typography variant="body2" color="textPrimary" component="h3" >
                            {startDate} - {endDate}
                        </Typography>
                        <Typography variant="body2" color="secondary" component="h4" >
                            {price}$ a night
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isLiked}
                                onChange={handleLikeChange}
                                value={isLiked}
                                color="primary"
                            />
                        }
                        label="Follow"
                    />
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

