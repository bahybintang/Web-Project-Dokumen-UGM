import React, { Component } from 'react';
import UtilService from './utils/util';
const Util = new UtilService();

class ShowSearchDataAdmin extends Component {
    constructor() {
        super()
        this.state = {
            updateData: {}
        }
    }

    render() {
        if (this.props.data.length) {
            return (
                this.props.data.map((item) => {
                    return (
                        <tr key={item._id}>
                            <td className="align-baseline">{item.fakultas.toUpperCase()}</td>
                            <td className="align-baseline">{item.title}</td>
                            <td className="text-center align-baseline">{Util.iconGenerate(item.file_name.split('.')[item.title.split('.').length])}</td>
                            <td className="text-center align-baseline"><a href={item.url}><img src={"/assets/images/download.png"} style={{ width: "30px", height: "30px" }} alt="download-button" /></a></td>
                            <td className="text-center align-baseline"><button type="button" className="btn btn-primary btn-sm" onClick={async() => await this.props.openUpdate(item)}>Update</button></td>
                            <td className="text-center align-baseline"><button type="button" className="btn btn-danger btn-sm" onClick={async () => await this.props.performDelete(item)}>Delete</button></td>
                        </tr>
                    )
                })
            )
        }
        else {
            return (<tr><td colSpan="6" className="text-center">Not Found!</td></tr>)
        }
    }
}

export default ShowSearchDataAdmin;