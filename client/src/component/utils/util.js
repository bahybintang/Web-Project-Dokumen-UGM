import React from 'react';

export default class Util {
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
}