import React, { Component } from 'react';
import Navbar from './nav';

class Header extends Component {
    shouldComponentUpdate = () => {
        return false
    }

    render() {
        return (
            <div>
                <div className="jumbotron" style={{ padding: "30px 20px 30px 20px", marginBottom: "0px" }}>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <img src={"/assets/images/ugm-icon.png"} style={{ width: "120px", height: "120px", marginRight: "20px" }} alt="pdf" />
                                </td>
                                <td>
                                    <h2>Dokumen Akademik UGM</h2>
                                    <p>Semua dokumen akademik UGM ada disini!</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    
                </div>
                <Navbar />
            </div>
        );
    }
}

export default Header;