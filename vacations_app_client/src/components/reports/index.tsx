import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';
import { connect } from "react-redux"
import { IReportsState, IVacation } from '../../ts/interfaces';
import { Button } from '@material-ui/core';


class Reports extends React.Component<IReportsState, any> {
    constructor(props: IReportsState) {
        super(props)
        this.state = { vacations: [], value: "follows" }
    }

    componentDidMount() {
        const { vacations, session, history } = this.props
        if (!session) history.push("/login")
        this.setState({ vacations: [...vacations] })
    }



render() {
    const { vacations, value } = this.state
    console.log(vacations)

    return (

        <div className="home">

            <h3 >Reports</h3>
            <Button color="primary" style={{ margin: "15px", verticalAlign: "top" }} onClick={() => this.setState({ vacations: sortVacations(vacations, "follows"), value: "follows" })}>Sort By Follows</Button>
            <Button color="primary" style={{ margin: "15px", verticalAlign: "top" }} onClick={() => this.setState({ vacations: sortVacations(vacations, "start_date"), value: "follows" })}>Sort By Date</Button>
            <Button color="primary" style={{ margin: "15px", verticalAlign: "top" }} onClick={() => this.setState({ vacations: sortVacations(vacations, "price"), value: "price" })}>Sort By Price</Button>
            {graphFunction(vacations, value)}
        </div>

    );
}
}

const graphFunction = (vacations: Array<IVacation>, key: string) => {
    return (
        <div>
            <BarChart
                width={550}
                height={400}
                data={vacations}
                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="destination" />
                <YAxis />
                <Tooltip />
                <Legend wrapperStyle={{ margin: -30 }} />
                <Bar dataKey={key} fill="#8884d8" />
            </BarChart>
        </div>
    )


}


const sortVacations = (vacations: Array<any>, key: string): any => {
    const sortedArr: Array<any> = vacations.sort((a, b) => ((a[key] || 0) < (b[key] || 0)) ? 1 : -1)
    if (key === "start_date") sortedArr.reverse()
    return sortedArr
}

const mapToProps = (state: IReportsState) => {
    return state
}



export default connect(mapToProps, null)(Reports)


