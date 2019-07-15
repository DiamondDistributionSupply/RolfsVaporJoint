import React, { Component } from "react"
import axios from "axios"
import Dropzone from "react-dropzone"

import "./EditHomeImg.scss"

class EditHomeImg extends Component {
    constructor() {
        super()

        this.state = {
            img: "",
            id: 0,
            editing: false
        }
    }

    componentDidMount() {
        this.setState({
            img: this.props.img,
            id: this.props.id
        })
    }

    updateEditing = () => {
        this.setState({
            editing: !this.state.editing
        })
    }

    handleDrop = (files, rejectedFiles) => {
        try {
        const {
            REACT_APP_CL_UPLOAD_PRESET,
            REACT_APP_CL_API_KEY,
            REACT_APP_CL_URL
        } = process.env

        if (rejectedFiles.length >= 1) {
            // Let them know why files were rejected
            let message = ""
            if (rejectedFiles[0].size > 8000000) {
                message = "Image is too big"
            }
            else {
                message = "Wrong file type only images are accepted"
            }
            alert(message)
            return
        }
        else {
            const formData = new FormData()
            formData.append("file", files[0])
            formData.append("tags", "cloudinaryExample, medium, gist")
            formData.append("upload_preset", `${REACT_APP_CL_UPLOAD_PRESET}`)
            formData.append("api_key", `${REACT_APP_CL_API_KEY}`)
            formData.append("timestamp", (Date.now() / 1000 | 0))

            axios.post(`${REACT_APP_CL_URL}`, formData)
            .then(res => {
                console.log(res.data)
                 this.setState({
                    img: res.data.secure_url
                })
            })
            .then(() => {
                axios.put("/api/admin/home/img", { img: this.state.img, id:this.state.id})
            })
            .then(() => {
                this.updateEditing()
                alert("Image updated")
            })
        }
        }
        catch(err) {
            console.log(err)
        }
    }

    render() {
        const dropzoneStyle = {
            height : "50px",
            width : "100px",
            marginLeft: "10px",
            marginRight: "10px"
        }
        return (
            <div className="edit_home_img">
                <img src={this.state.img} alt="home"/>
                {
                    this.state.editing
                    ?
                    <div className="dropzone_container">
                        <Dropzone
                            style={dropzoneStyle}
                            onDrop={this.handleDrop}
                            accept="image/*"
                            multiple={false}
                            maxSize={8000000}
                        >
                            <p>Drag images or click to upload</p>
                        </Dropzone>
                        <button onClick={this.updateEditing}>X</button>
                    </div>
                    :
                    <button onClick={this.updateEditing}>Edit</button>
                }
            </div>
        )
    }
}

export default EditHomeImg