import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { storage } from "../../config/fbconfig";
import { createAuto } from "../../store/actions/autoActions";
import './CreateAuto.css';

class CreateAuto extends React.PureComponent {

    state = {
        title: '',
        content: '',
        image: null,
        url: '',
        progress: 0
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
            // progrss function ....
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
        const advert = {
            title: this.state.title,
            content: this.state.content,
            image: this.state.image.name,
            url: this.state.url
        };
        this.props.createAuto(advert);
        this.props.history.push('/panel');
    };

    handleCansel = () => {
        this.props.history.push('/panel');
    }

    render() {
console.log('render from CreateAuto');
        const { auth } = this.props;
        
        if (!auth.uid) {
          return <Redirect to="/signin" />;
        }

        return (
        <Container className="create-auto mt-3">
            <Form className="signin-form" onSubmit={this.handleSubmit}>
                <h2 className="mb-3">Create new advert</h2>
                <Form.Group as={Row}>
                    <Form.Label htmlFor="title" column sm="2">Title</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" id='title' onChange={this.handleChange} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label htmlFor="content" column sm="2">Description</Form.Label>
                    <Col sm="10">
                        <Form.Control as="textarea" rows="3" id="content" onChange={this.handleChange} />
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
                    <Col sm="6">
                        <img src={this.state.url || 'http://via.placeholder.com/200x150'} alt="Uploaded images" height="150" width="200"/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="fileArea">
                    <Col sm="2"></Col>
                    <Col sm="10">
                        <p className="note">* Для лучшего отображения вашего изображения, используйте разрешение 800х600 пикселей, не более 80кб.</p>
                    </Col>
                </Form.Group> 
                <Button variant="primary" type="submit" className="mr-2" >Create</Button>
                <Button variant="primary" onClick={this.handleCansel} >Cancel</Button>
            </Form>
        </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      auth: state.firebase.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
      createAuto: (auto) => dispatch(createAuto(auto))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAuto);
