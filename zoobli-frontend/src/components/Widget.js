import React, { Component } from 'react';
import { render } from 'react-dom';

class Widget extends Component {

    uploadWidget() {
        window.cloudinary.openUploadWidget({ cloud_name: 'duczihube', upload_preset: 'euvo68qt', tags:['xmas']},
            function(error, result) {
                console.log(result);
            });
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