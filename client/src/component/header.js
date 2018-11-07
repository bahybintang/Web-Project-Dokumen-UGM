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
                                    <img src={"/assets/images/ugm-icon.png"} style={{ width: "152px", height: "152px", marginRight: "20px" }} alt="pdf" />
                                </td>
                                <td>
                                    <h1>Dokumen Akademik UGM</h1>
                                    <p>Semua dokumen akademik UGM ada disini!</p>
                                    <p>To my beloved debugger, you can login with (username: admin, password: admin) xD</p>
                                    <p>Or you can login with (username: cek1, password: admin) to try as user</p>
                                    <p>Register not yet implemented, malas buat wk</p>
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