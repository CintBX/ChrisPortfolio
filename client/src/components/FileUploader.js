import React, { Component } from 'react';
import axios from 'axios';

class FileUploader extends Component {
  constructor(props) {
    super(props);
    this.setDefaultImage = this.setDefaultImage.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.state = {
      multerImage: "https://via.placeholder.com/400"
    };
  };

  setDefaultImage(uploadType) {
    if(uploadType === "multer") {
      this.setState({
        multerImage: "https://via.placeholder.com/400"
      });
    };
  };

  uploadImage(e, method) {
    let imageFormObj;
    if(method === "multer") {
      imageFormObj = new FormData();
      imageFormObj.append("imageName", "multer-image-" + Date.now());
      imageFormObj.append("imageData", e.target.files[0]);
    };
    this.setState({
      multerImage: URL.createObjectURL(e.target.files[0])
    });
    axios
      .post("/images/uploadmulter", imageFormObj)
      .then(data => {
        if(data.data.success) {
          alert("Image has been uploaded using multer");
          this.setDefaultImage("multer");
        };
      })
      .catch(err => {
        alert(`Error uploading image with multer: ${err}`);
        this.setDefaultImage("multer");
      });
  };

  render() {
    return (
      <div className="main-container">
        <h3 className="main-heading">Image Upload</h3>
    
        <div className="image-container">
          <div className="process">
            <h4 className="process__heading">Process: Using Multer</h4>
            <p className="process__details">Upload image to a node server, connected to a MongoDB, with help of multer</p>
            <input type="file" className="process__upload-btn"  onChange={e => this.uploadImage(e, "multer")} />
            <img src={this.state.multerImage} alt="upload-image" className="process__image" />
          </div>
        </div>

        <p className="main-credit">Created by <a href="#">Tarique Ejaz</a></p>
      </div>
    );
  };
};

export default FileUploader;