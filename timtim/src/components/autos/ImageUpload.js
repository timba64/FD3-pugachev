import React, {Fragment} from 'react';
import {storage} from '../firebase';
import { Form, Button } from 'react-bootstrap';

class ImageUpload extends React.PureComponent {


    render() {
        return(
            <Fragment>
                <Form.Control type="file" />
                <Button onClick={this.handleUpload}>Upload</Button>
            </Fragment>
        );
    }
}

export default ImageUpload;