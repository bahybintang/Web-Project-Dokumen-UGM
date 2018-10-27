import React, { Component } from 'react';
import Navbar from './nav';

class Header extends Component {

  render() {
    return (
        <div>
            <div className="jumbotron" style={{paddingBottom:"20px"}}>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <img src={"/assets/images/ugm-icon.png"} style={{width:"152px", height:"152px", marginRight:"20px"}} alt="pdf"/>
                            </td>
                            <td>
                                <h1>Dokumen Akademik UGM</h1> 
                                <p>Semua dokumen akademik UGM ada disini!</p> 
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Navbar/>
            </div>
        </div>
    );
  }
}

export default Header;