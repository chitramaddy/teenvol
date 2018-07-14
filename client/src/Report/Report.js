import React, { Component } from 'react';
// import Buttons from '../Buttons';
// import LogTime from "./Log";
// import Logout from "../Logout";
import API from "../utils/API";

class Report extends Component{
    state = {
        reportData: []
    }

    componentDidMount() {
        API.getReport()
            .then(res => {
                console.log(res.data);
                if (!res.data.isAdmin) {
                    this.props.checkAdmin(false)
                } else {
                    this.setState({
                        reportData: res.data.reportData
                    })
                }
            })
    }

    render() {
        return (
            <h1>Admin Page</h1>
        )
    }
}

export default Report;