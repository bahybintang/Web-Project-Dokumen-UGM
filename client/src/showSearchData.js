import React, { Component } from 'react';

class ShowSearchData extends Component {
    
    constructor(props){
        super(props);
        console.log("data added");
    }

    iconGenerate = (s) => {
        if(s === 'pdf'){
            return <img src={"/assets/images/pdf-icon.png"} style={{width:"20px", height:"20px"}} alt="pdf"/>;
        }
        else if(s === 'doc' || s === 'docx'){
            return <img src={"/assets/images/doc-icon.png"} style={{width:"20px", height:"20px"}} alt="doc"/>;
        }
        else if(s === 'xls' || s === 'xlsx'){
            return <img src={"/assets/images/xls-icon.png"} style={{width:"20px", height:"20px"}} alt="xls"/>;
        }
        else{
            return <img src={"/assets/images/other-icon.png"} style={{width:"20px", height:"20px"}} alt="other"/>;
        }
    }

    render() {
        if(this.props.data.length){
            return(
                this.props.data.map((item) => {
                return (
                    <tr key={item._id}>
                        <td>{item.fakultas.toUpperCase()}</td>
                        <td>{item.title}</td>
                        <td className="text-center">{this.iconGenerate(item.file_name.split('.')[item.title.split('.').length])}</td>
                        <td className="text-center"><a href={item.url}><img src={"/assets/images/download.png"} style={{width:"20px", height:"20px"}} alt="download-button"/></a></td>
                    </tr>)
                })
            )
        }
        else{
            return (<tr><td colSpan="4" className="text-center">Not Found!</td></tr>)
        }
    }
}

export default ShowSearchData;