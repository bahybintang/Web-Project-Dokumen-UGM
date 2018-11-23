import React, { Component } from 'react'
import Modal from 'react-modal'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: '20%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

export default class loadingModal extends Component {

    render() {
        return (
            <div style={{zIndex:-1}}>
                <Modal
                    style={customStyles}
                    isOpen={this.props.isOpen}
                    ariaHideApp={false}
                >
                    <i className="fa fa-spinner fa-spin" /> {this.props.text}
                </Modal>
            </div>
        )
    }
}
