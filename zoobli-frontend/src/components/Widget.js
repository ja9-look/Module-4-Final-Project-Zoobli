import React, { Component } from 'react';
import { render } from 'react-dom';

class Widget extends Component {

    state = {
        url: ''
    }

    uploadWidget() {
        window.cloudinary.openUploadWidget({ cloud_name: 'duczihube', upload_preset: 'euvo68qt', tags:['xmas']},
            (error, result) => {
                this.setState({ url: result[0].url },
                    () => this.props.submitImage(this.state.url))
            })
    }

    render(){
        return (
            <div className="Widget">
                <div className="upload">
                    <button onClick={this.uploadWidget.bind(this)} className="upload-button">
                        Add Image
                    </button>
                </div>
            </div>

        );
    }
}

export default Widget;