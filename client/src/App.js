import React, { Component } from 'react';

class App extends Component {
  state = {
    response: []
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('api/get');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    return body;
  };

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
    return (
      <div className="table-responsive">
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th style={{width:"10%"}}>Fakultas</th>
              <th style={{width:"40%"}}>Title</th>
              <th className="text-center" style={{width:"10%"}}>File Type</th>
              <th className="text-center" style={{width:"20%"}}>Download</th>
            </tr>
          </thead>
          <tbody>
            {
            this.state.response.map(item => {
              return (
                <tr>
                  <td>{item.fakultas.toUpperCase()}</td>
                  <td>{item.title}</td>
                  <td className="text-center">{this.iconGenerate(item.file_name.split('.')[item.title.split('.').length])}</td>
                  <td className="text-center"><a href={item.url}><img src={"/assets/images/download.png"} style={{width:"20px", height:"20px"}} alt="download-button"/></a></td>
                </tr>)
            })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

String.prototype.toProperCase = function()
{
  return this.toLowerCase().replace(/^(.)|\s(.)/g, 
      function($1) { return $1.toUpperCase(); });
}

export default App;