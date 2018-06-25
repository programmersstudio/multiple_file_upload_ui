import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(){
    super();
    this.state = {
      arrList : []
    }
  }

  uploadFiles = () => {
    // post method to node server and sending FORM-DATA which inculdes files.
    const url = "http://localhost:5000/";

    const formData = new FormData();
    for(var i=0; i<this.state.arrList.length; i++){
      formData.append('file'+i , this.state.arrList[i]);  
    }

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        'Accept': 'application/json',
        'Access-Control-Allow-Credentials':true,
        'Access-Control-Allow-Origin':true
      }
    }

    axios.post(url, formData, config)
    .then(response => console.log(response))
    .catch(errors => console.log(errors));
    
  }

  handelChange = () => {
    var input = document.getElementById('files');
    var length = input.files.length;

    this.setState({arrList : []});

    var tempArrList = [];

    for(var i=0; i<length; i++){
      tempArrList.push(input.files[i].name);
    }

    this.setState({arrList : tempArrList}, this.getList);
  }

  clicked = (e) => {
    var arr = this.state.arrList;
    arr.splice(e.target.id,1);
    this.setState({arrList : arr});

    console.log(this.state.arrList);
  }

  deleteFile = () => {
    return (
      <ol>
        {
          this.state.arrList.map((it, i) => <div key={i}><li onClick={this.clicked} value={this.state.arrList[i]} id={i}>{it}</li></div>)
        }
      </ol>
    );
  }

  render() {
    return (
      <div>
        <input type="file" id="files" onChange={this.handelChange} multiple />
        <input type="button" value="Upload" id="upload" onClick={this.uploadFiles}/>
        <div id="output">
          {
            this.deleteFile()
          }
        </div>
      </div>
    );
  }
}

export default App;
