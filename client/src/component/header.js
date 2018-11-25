import React, { Component } from 'react';
import Navbar from './nav';

class Header extends Component {
    shouldComponentUpdate = () => {
        return false
    }

    render() {
        return (
            <div>
                <div className="jumbotron" style={{ paddingBottom: "20px" }}>
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
                    <Navbar />
                </div>
            </div>
        );
    }
}

export default Header;