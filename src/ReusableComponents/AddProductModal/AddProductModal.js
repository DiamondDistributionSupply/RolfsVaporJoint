import React, { Component } from "react"
import axios from "axios"
import Dropzone from "react-dropzone"
import { withRouter } from "react-router-dom"

import "./AddProductModal.scss"

class AddProductModal extends Component {
    constructor() {
        super()

        this.state = {
            productType: "juice",
            juiceType: "e-juice",
            hardwareType: "tank",
            name: "",
            brand: "",
            description: "",
            flavorProfile: "",
            size: "",
            nicotine: "",
            attributes: "",
            otherDetails: "",
            qty: 0,
            price: "",
            hardwareTypeArr: [],
            addingHardwareType: false,
            hardwareInput: "",
            images: [],
            juiceTypeArr: [],
            addingJuiceType: false,
            juiceInput: ""
        }
    }

    componentDidMount() {
        this.getJuiceTypes()
        this.getHardwareTypes()
    }

    updateProductType = (e) => {
        // When product type is switched reset all other values
        this.setState({
            productType: e.target.value,
            name: "",
            brand: "",
            description: "",
            flavorProfile: "",
            size: "",
            nicotine: "",
            attributes: "",
            packageContents: "",
            otherDetails: "",
            price: "",
            images: []
        })
    }

    updateInput = (e) => {
        // Updates the different inputs depending on the name of the input
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    updateAddingJuiceType = () => {
        // Toggle to add a new juice type
        this.setState({
            addingJuiceType: !this.state.addingJuiceType,
            juiceInput: ""
        })
    }

    updateAddingHardwareType = () => {
        // Toggle to add a new hardware type
        this.setState({
            addingHardwareType: !this.state.addingHardwareType,
            hardwareInput: ""
        })
    }

    getJuiceTypes = async () => {
        // Gets list of juice types to add to a select box
        let juiceTypes = await axios.get("/api/admin/get/juice-types")
        this.setState({
            juiceTypeArr: juiceTypes.data
        })
    }

    addJuiceType = async () => {
        // Adds juice type to db
        // Check to make sure user has entered something in the input field
        if(this.state.juiceInput.length < 1) {
            alert("Juice type must have a name")
            return
        }
        else {
            await axios.post("/api/admin/add/juice-type", { name: this.state.juiceInput.toLowerCase() })
            this.getJuiceTypes()
            this.updateAddingJuiceType()
        }
    }

    getHardwareTypes = async () => {
        // Gets list of hardware types to add to a select box
        let hardwareTypes = await axios.get("/api/admin/get/hardware-types")
        this.setState({
            hardwareTypeArr: hardwareTypes.data
        })
    }

    addHardwareType = async () => {
        // Adds hardware type to db
        if(this.state.hardwareInput.length < 1) {
            alert("Hardware type must have a name")
            return
        }
        else {
            await axios.post("/api/admin/add/hardware-type", { name: this.state.hardwareInput.toLowerCase() })
            this.getHardwareTypes()
            this.updateAddingHardwareType()
        }
    }
    
    handleDrop = (files, rejectedFiles) => {
        // Adds images to images array
        const {
            REACT_APP_CL_UPLOAD_PRESET,
            REACT_APP_CL_API_KEY,
            REACT_APP_CL_URL
        } = process.env

        let images = []

        if (files.length > 3) {
            alert("You can only upload 3 pictures")
            return
        }
        else if (rejectedFiles.length >= 1) {
            // Let them know why files were rejected
            let message = ""
            let tooBig = false
            let badFileType = false
            for (let i = 0; i < rejectedFiles.length; i++) {
                if (rejectedFiles[i].size >= 10000000) {
                    tooBig = true
                }
                if (rejectedFiles[i].type.includes("image") === false) {
                    badFileType = true
                }
            }
            if (tooBig === true && badFileType === false) {
                message = "Image(s) are too big"
            }
            else if (tooBig === false && badFileType === true) {
                message = "Wrong file type only images are accepted"
            }
            else {
                message = "An image is too big and one of the file types is wrong images accepted only"
            }
            alert(message)
            return
        }
        else {
            let uploads = files.map(file => {
                const formData = new FormData()
                formData.append("file", file)
                formData.append("tags", "diamondDistribution, medium, gist")
                formData.append("upload_preset", `${REACT_APP_CL_UPLOAD_PRESET}`)
                formData.append("api_key", `${REACT_APP_CL_API_KEY}`)
                formData.append("timestamp", (Date.now() / 1000  | 0))

                return axios.post(`${REACT_APP_CL_URL}`, formData)
                .then(res => {
                    images.push(res.data.secure_url)
                })
            })

            axios.all(uploads)
            .then(() => {
                this.setState({
                    images
                })
            })
        }
    }

    addJuice = async () => {
        if(this.state.name.length < 1 ||
            this.state.brand.length < 1 || 
            this.state.description.length < 1 || 
            this.state.flavorProfile.length < 1 ||
            this.state.size.length < 1 ||
            this.state.nicotine.length < 1 ||
            this.state.price.length < 1 ||
            this.state.images.length < 1
        ) {
            alert("please enter in required fields")
            return
        }
        else {
            const productInfo = {
                name: this.state.name,
                brand: this.state.brand,
                description: this.state.description,
                flavorProfile: this.state.flavorProfile,
                size: this.state.size,
                nicotine: this.state.nicotine,
                type: this.state.juiceType,
                otherDetails: this.state.otherDetails,
                price: Number(this.state.price),
                images: this.state.images
            }
            let productId = await axios.post("/api/admin/add/juice", {productInfo})
            this.props.history.push(`/admin/juice/${productId.data[0].id}`)
        }
    }

    addHardware = async () => {
        if(this.state.name.length < 1 ||
            this.state.brand.length < 1 || 
            this.state.description.length < 1 ||
            this.state.attributes.length < 1 ||
            this.state.price.length < 1 ||
            this.state.images.length < 1
        ) {
            alert("please enter in required fields")
            return
        }
        else {
            const productInfo = {
                type: this.state.hardwareType,
                name: this.state.name,
                brand: this.state.brand,
                description: this.state.description,
                attributes: this.state.attributes,
                otherDetails: this.state.otherDetails,
                price: Number(this.state.price),
                images: this.state.images
            }
            let productId = await axios.post("/api/admin/add/hardware", {productInfo})
            this.props.history.push(`/admin/hardware/${productId.data[0].id}`)
        }
    }

    render() {
        const className = this.props.show ? "add_product_display" : "add_product_none"
        const hardwareTypes = this.state.hardwareTypeArr.map((type, i) => {
            return (
                <option key={i} value={type.name}>{type.name}</option>
            )
        })
        const juiceTypes = this.state.juiceTypeArr.map((type, i) => {
            return (
                <option key={i} value={type.name}>{type.name}</option>
            )
        })
        const dropzoneStyle = {
            height : "50px",
            width : "100px"
        }
        return (
            <div className={className}>
                <div></div>
                <div className="add_product_content">
                    <button onClick={this.props.toggleShow}>X</button>
                    <div>
                        <div id="product_type">
                            <p>Product Type:</p>
                            <select className="product_select" 
                            defaultValue="juice" 
                            onChange={this.updateProductType}>
                                <option value="juice">Juice</option>
                                <option value="hardware">Hardware</option>
                            </select>
                        </div>
                        <div className="required_container">
                            <p>Fields marked with</p>
                            <p className="required_field">*</p>
                            <p>are required</p>
                        </div>
                        {
                            this.state.productType === "juice"
                            ?
                            <div className="add_juice_content">
                                {
                                    this.state.addingJuiceType
                                    ?
                                    <div className="adding_juice_type">
                                        <input type="text"
                                        placeholder="Add juice type"
                                        name="juiceInput"
                                        value={this.state.juiceInput}
                                        onChange={this.updateInput}/>
                                        <button className="btn"
                                        onClick={this.addJuiceType}>
                                        Confirm</button>
                                        <button className="btn"
                                        onClick={this.updateAddingJuiceType}>
                                        Cancel</button>
                                    </div>
                                    :
                                    <div>
                                        <button className="btn"
                                        onClick={this.updateAddingJuiceType}>
                                        Add juice type</button>
                                    </div>
                                }
                                <div>
                                    <p>Juice type:</p>
                                    <select name="juiceType" 
                                    defaultValue="e-juice"
                                    onChange={this.updateInput}>
                                        {juiceTypes}
                                    </select>
                                </div>
                                <div>
                                    <p className="required_field add_name_required">*</p>
                                    <p className="add_name">Name:</p>
                                    <input type="text"
                                    placeholder="* Enter juice name"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.updateInput} />
                                </div>
                                <div>
                                    <p className="required_field">*</p>
                                    <p>Brand:</p>
                                    <input type="text"
                                    placeholder="* Enter Juice Brand"
                                    name="brand"
                                    value={this.state.brand}
                                    onChange={this.updateInput}/>
                                </div>
                                <div className="add_text_area">
                                    <p className="required_field">*</p>
                                    <p>Description:</p>
                                    <textarea name="description" 
                                    cols="30" 
                                    rows="6" 
                                    placeholder="* Enter product description"
                                    value={this.state.description} 
                                    onChange={this.updateInput}> 
                                    </textarea>
                                </div>
                                <div id="add_flavor_instructions">
                                    <p>Seperate flavor profiles by commas example: (sweet, sour, fruit)</p>
                                </div>
                                <div className="add_text_area">
                                    <p className="required_field flavor_required">*</p>
                                    <p id="add_flavor_profile">Flavor profile:</p>
                                    <textarea name="flavorProfile"
                                    cols="30"
                                    rows="6" 
                                    placeholder="* Seperate flavor profiles by commas"
                                    value={this.state.flavorProfile}
                                    onChange={this.updateInput}>
                                    </textarea>
                                </div>
                                <div>
                                    <p className="required_field">*</p>
                                    <p className="add_size">Size:</p>
                                    <input type="text" 
                                    placeholder="* Enter size"
                                    name="size"
                                    value={this.state.size}
                                    onChange={this.updateInput}/>
                                </div>
                                <div>
                                    <p className="required_field nicotine_required">*</p>
                                    <p className="add_nicotine">Nicotine:</p>
                                    <input type="text"
                                    placeholder="* Enter nicotine content"
                                    name="nicotine"
                                    value={this.state.nicotine}
                                    onChange={this.updateInput}/>
                                </div>
                                <div className="add_text_area">
                                    <p className="add_other">Other details:</p>
                                    <textarea name="otherDetails" 
                                    cols="30" 
                                    rows="6"
                                    placeholder="Enter other details"
                                    value={this.state.otherDetails}
                                    onChange={this.updateInput}>
                                    </textarea>
                                </div>
                                <div>
                                    <p className="required_field">*</p>
                                    <p className="add_price">Price:</p>
                                    <input type="number"
                                    placeholder="* Enter price" 
                                    name="price"
                                    value={this.state.price}
                                    onChange={this.updateInput}/>
                                </div>
                                <div className="dropzone_container">
                                    <p className="required_field add_images_required">*</p>
                                    <p className="add_images">images:</p>
                                        <Dropzone
                                            style={dropzoneStyle}
                                            onDrop={this.handleDrop}
                                            accept="image/*"
                                            multiple
                                            maxSize={8000000}
                                        >
                                            <p>Drag images or click to upload</p>
                                        </Dropzone>
                                </div>
                                <button className="btn add_product_btn"
                                onClick={this.addJuice}
                                >
                                    Add juice
                                </button>
                            </div>
                            :
                            <div className="add_hardware_content">
                                    {
                                        this.state.addingHardwareType
                                        ?
                                        <div className="add_hardware_type">
                                            <input type="text"
                                            placeholder="Enter hardware type"
                                            name="hardwareInput"
                                            value={this.state.hardwareInput}
                                            onChange={this.updateInput}/>
                                            <button className="btn"
                                            onClick={this.addHardwareType}>
                                            Confirm</button>
                                            <button className="btn"
                                            onClick={this.updateAddingHardwareType}>
                                            Cancel</button>
                                        </div>
                                        :
                                        <div className="add_hardware_type">
                                            <button className="btn"
                                            onClick={this.updateAddingHardwareType}>
                                            Add hardware type</button>
                                        </div>
                                    }
                                <div>
                                    <p>Hardware type:</p>
                                    <select name="hardwareType"
                                    defaultValue="tank"
                                    onChange={this.updateInput}>
                                        {hardwareTypes}
                                    </select>
                                </div>
                                <div>
                                    <p className="required_field add_name_required">*</p>
                                    <p className="add_name">Name:</p>
                                    <input type="text"
                                    placeholder="Enter hardware name"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.updateInput}/>
                                </div>
                                <div>
                                    <p className="required_field">*</p>
                                    <p>Brand:</p>
                                    <input type="text"
                                    placeholder="* Enter Hardware Brand"
                                    name="brand"
                                    value={this.state.brand}
                                    onChange={this.updateInput}/>
                                </div>
                                <div className="add_text_area">
                                    <p className="required_field">*</p>
                                    <p>Description:</p>
                                    <textarea name="description" 
                                    cols="30" 
                                    rows="6"
                                    placeholder="Enter description"
                                    value={this.state.description}
                                    onChange={this.updateInput}>
                                    </textarea>
                                </div>
                                <div id="add_attributes_instructions">
                                    <p>Seperate attributes by commas example: (tank length: 55mm, color: silver, e-liquid capacity: 7ml )</p>
                                </div>
                                <div className="add_text_area">
                                    <p className="required_field">*</p>
                                    <p className="add_attributes">Attributes:</p>
                                    <textarea name="attributes" 
                                    cols="30" 
                                    rows="6"
                                    placeholder="Seperate attributes by commas"
                                    value={this.state.attributes}
                                    onChange={this.updateInput}>
                                    </textarea>
                                </div>
                                <div className="add_text_area">
                                    <p>Other details:</p>
                                    <textarea name="otherDetails" 
                                    cols="30" 
                                    rows="6"
                                    placeholder="Enter other details"
                                    value={this.state.otherDetails}
                                    onChange={this.updateInput}>
                                    </textarea>
                                </div>
                                <div>
                                    <p className="required_field add_hardware_price_required">*</p>
                                    <p className="add_hardware_price">Price:</p>
                                    <input type="number"
                                    name="price"
                                    placeholder="Enter price"
                                    value={this.state.price}
                                    onChange={this.updateInput}/>
                                </div>
                                <div className="dropzone_container">
                                    <p className="required_field add_images_required">*</p>
                                    <p className="add_images">images:</p>
                                        <Dropzone
                                            style={dropzoneStyle}
                                            onDrop={this.handleDrop}
                                            accept="image/*"
                                            multiple
                                            maxSize={8000000} 
                                        >
                                            <p>Drag images or click to upload</p>
                                        </Dropzone>
                                </div>
                                <button className="btn add_product_btn"
                                onClick={this.addHardware}
                                >
                                    Add hardware
                                </button>
                            </div>
                        }
                    </div>
                </div>
                <div></div>
            </div>
        )
    }
}

export default withRouter(AddProductModal)