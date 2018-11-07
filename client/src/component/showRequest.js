import React, { Component } from 'react';

class ShowSearchData extends Component {
    requestType = (type) => {
        if (type === "update") {
            return (
                <div className="text-primary">Update</div>
            )
        }
        else if (type === "add") {
            return (
                <div className="text-success">Add</div>
            )
        }
        else if (type === "delete") {
            return (
                <div className="text-danger">Delete</div>
            )
        }
        else {
            return (
                <div className="text-dark">Else</div>
            )
        }
    }

    render() {
        if (this.props.data.length) {
            return (
                this.props.data.map((item) => {
                    let date = item.date.split('T')[0]
                    let time = item.date.split('T')[1].slice(0, 8)
                    return (
                        <tr key={item._id}>
                            <td>{item.item.fakultas.toUpperCase()}</td>
                            <td>{item.item.title}</td>
                            <td className="text-center">{item.username}</td>
                            <td className="text-center">{date}</td>
                            <td className="text-center">{time}</td>
                            <td className="text-center">{this.requestType(item.type)}</td>
                            <td className="text-center"><button type="button" className="btn btn-warning btn-sm" onClick={async() => await this.props.openReview(item)}>Review</button></td>
                            <td className="text-center"><button type="button" className="btn btn-success btn-sm" onClick={async() => await this.props.acceptReview(item)}>Accept</button></td>
                        </tr>)
                })
            )
        }
        else {
            return (<tr><td colSpan="4" className="text-center">Not Found!</td></tr>)
        }
    }
}

export default ShowSearchData;