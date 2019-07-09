import React, { Component } from 'react';
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { editAuto } from "../../store/actions/autoActions";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import {storage} from "../../config/fbconfig";

class AutoDetails extends Component {

    state = {
        id: this.props.id,
        title: "",
        content: "",
        image: null,
        imageName: null,
        url: '',
        progress: 0
    }

    componentDidMount = () =>{
//console.log(this.props.auto);
        if(this.props.auto) {
            this.setState({
                title: this.props.auto.title,
                content: this.props.auto.content,
                url: this.props.auto.url,
                imageName: this.props.auto.image
            });
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    handleImageChange = e => {
        if (e.target.files[0]) {
          const image = e.target.files[0];
          this.setState(() => ({image}));
        }
    }

    handleUpload = () => {
        const {image} = this.state;
        if(!image){
            alert("Сначала выберите файл!");
            return;
        }
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on('state_changed', 
            (snapshot) => {
            // progres function ...
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            this.setState({progress});
            }, 
            (error) => {
                // error function ....
                console.log(error);
            }, 
            () => {
                // complete function ....
                storage.ref('images').child(image.name).getDownloadURL().then(url => {
                    //console.log(url);
                    this.setState({url});
                })
        });
    }
    
    handleSubmit = e => {
        e.preventDefault();
        let nameImg = null;
        if(this.state.image){
            nameImg = this.state.image.name;
        } else {
            nameImg = this.state.imageName;
        }

        const advert = {
            id: this.state.id,
            title: this.state.title,
            content: this.state.content,
            image: nameImg,
            url: this.state.url
        };
        this.props.editAuto(advert);
        this.props.history.push('/panel');
    };

    handleCansel = () => {
        this.props.history.push('/panel');
    }

    render() {
        const { auto, auth } = this.props;
console.log("render from AutoDetails");
        if (!auth.uid) {
            return <Redirect to="/signin" />;
        }

        if (auto) {
            return (
                <Container className="item-detail mt-3">
                    <Form className="edit-form" onSubmit={this.handleSubmit}>
                        <h2 className="mb-3">Edit your advert</h2>

                        <Form.Group as={Row} controlId="title">
                            <Form.Label column sm="2">
                                Наименование
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" defaultValue={auto.title} onChange={this.handleChange} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="content">
                            <Form.Label column sm="2">
                                Описание
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control as="textarea" rows="3" defaultValue={auto.content} onChange={this.handleChange} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="fileArea">
                            <Form.Label column sm="2">
                                Добавьте файл
                            </Form.Label>
                            <Col sm="4">
                                <progress value={this.state.progress} max="100"/>
                                <Form.Control className="btn-secondary btn-sm mb-2" type="file" onChange={this.handleImageChange} />
                                <Button className="btn-secondary btn-sm" onClick={this.handleUpload}>Upload</Button>
                            </Col>
                            <Col  sm="6">
                                <img src={this.state.url || 'http://via.placeholder.com/200x150'} alt="Uploaded images" height="150" width="200"/>
                            </Col>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mr-2">Edit</Button>
                        <Button variant="primary" onClick={this.handleCansel} >Cancel</Button>
                    </Form>
                </Container>
            )
        } else {
            return (
                <Container className="item-detail mt-5">
                    <p>Loading project...</p>
                </Container>
            );
        }
    }
}

const mapStateToProps = (state, ownProps) => {

    const id = ownProps.match.params.id;
    const autos = state.firestore.data.autos;

    return {
      auto: autos ? autos[id] : null,
      auth: state.firebase.auth,
      id: id
    }
}

const mapDispatchToProps = dispatch => {
    return {
      editAuto: (edauto) => dispatch(editAuto(edauto))
    }
}
  
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{
      collection: 'autos'
    }])
)(AutoDetails)
