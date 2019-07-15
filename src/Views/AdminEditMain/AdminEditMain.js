import React, { Component } from "react"
import axios from "axios"
import { connect } from "react-redux"
import Dropzone from "react-dropzone"

import EditHomeImg from "../../ReusableComponents/EditHomeImg/EditHomeImg"
import { getAdminData } from "../../Ducks/reducer"
import AdminNavbar from "../../ReusableComponents/AdminNavbar/AdminNavbar"
import "./AdminEditMain.scss"

class AdminEditMain extends Component {
    constructor() {
        super()

        this.state = {
            backgroundImg: {},
            imgs: [],
            description: "",
            editingBackground: false,
            editingDescription: false
        }
    }

    async componentDidMount() {
        // Make sure authorized admin is logged in
        try {
            let adminRes = await axios.get("/api/admin/admin-data")
            this.props.getAdminData(adminRes.data)
        }
        catch(err) {
            if (err.response.status === 403) {
                console.log(err)
                alert("unauthorized")
                this.props.history.push("/admin/login")
            }
        }

        try {
            let infoRes = await axios.get("/api/user/home-info")
            let descriptionRes = await axios.get("/api/user/about/description")
            this.setState({
                backgroundImg: infoRes.data[0][0],
                imgs: infoRes.data[1],
                description: descriptionRes.data[0].description
            })
            console.log(infoRes)
        }
        catch(err) {
            console.log(err)
        }
    }

    updateEditing = (e) => {
        this.setState({
            [e.target.name]: !this.state[e.target.name]
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
                    backgroundImg: {id: 1, img: res.data.secure_url}
                })
            })
            .then(() => {
                axios.put("/api/admin/home/background", { img: this.state.backgroundImg.img})
            })
            .then(() => {
                this.updateEditing({target: {name: "editingBackground"}})
                alert("Image updated")
            })
        }
        }
        catch(err) {
            console.log(err)
        }
    }

    updateInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    updateDescription = async () => {
        await axios.put("/api/admin/about/description", {description: this.state.description})
        this.updateEditing({target: {name: "editingDescription"}})
    }

    render() {
        let imgs = this.state.imgs.length
        ? 
        this.state.imgs.map((img, i) => {
            return (
                <EditHomeImg key={i} img={img.img} id={img.id}/>
            )
        })
        :
        null

        const dropzoneStyle = {
            height : "50px",
            width : "100px",
            marginLeft: "10px",
            marginRight: "10px"
        }

        return (
            <div className="admin_edit_home">
                <AdminNavbar />
                <div className="edit_home_images_container">
                    <p className="edit_home_p">Home Background</p>
                    <div className="edit_home_background_container">
                        <img src={this.state.backgroundImg.img} alt="home_background"/>
                        {
                            this.state.editingBackground ?
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
                                <button className=""
                                name="editingBackground"
                                onClick={this.updateEditing}>X</button>
                            </div>
                            :
                            <button className=""
                            name="editingBackground"
                            onClick={this.updateEditing}>edit</button>
                        }
                    </div>
                    <div className="edit_home_carousel_container">
                        <p className="edit_home_p">Carousel Images</p>
                        {imgs}
                    </div>
                    <div className="edit_description_container">
                        <p className="edit_description_p">Description:</p>
                        {
                            this.state.editingDescription
                            ?
                            <div className="edit_description_area">
                                <textarea className="editing_description"
                                placeholder="Enter Description" 
                                name="description"
                                value={this.state.description}
                                onChange={this.updateInput} 
                                cols="30" 
                                rows="10"></textarea>
                                <button onClick={this.updateDescription}>Save</button>
                                <button name="editingDescription" 
                                onClick={this.updateEditing}>X</button>
                            </div>
                            :
                            <div className="edit_description">
                                <p>{this.state.description}</p>
                                <button name="editingDescription"
                                onClick={this.updateEditing}>Edit</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        admin: state.admin
    }
}

const actionOutputs = {
    getAdminData: getAdminData
}

const connected = connect(mapStateToProps, actionOutputs)

export default connected(AdminEditMain)