import React, { Component } from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { connect } from "react-redux";
import AutosList from "../autos/AutosList";
import { firestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { compose } from "redux";
import ReactLoading from 'react-loading';
import { getAutosForDashboard } from "../../store/actions/autoActions";                     

class Dashboard extends Component {

    state = {
        moreAutos: false,
        loadingInitial: true,
        loadedAutos: []
    };

    async componentDidMount() {
        let next = await this.props.getAutosForDashboard(); 
        if (next && next.docs && next.docs.length > 1) {
            this.setState({
                moreAutos: true,
                loadingInitial: false,
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.autos !== nextProps.autos) {
          this.setState({
            loadedAutos: [...this.state.loadedAutos, ...nextProps.autos]
          });
        }
    }
     
    // loadNexto = () => {
    //     const firebase = this.props.firebase;
    //     const firestore = firebase.firestore();
    //     const autosQuery = firestore.collection('autos');
    //     // autosQuery.get()
    //     // .then(response => {
    //     //     console.log(response.docs[1].data().title);
    //     // });
    // }

    getNextAutos = async () => {
        const { autos } = this.props;
        let lastAuto = autos && autos[autos.length - 1];
        let next = await this.props.getAutosForDashboard(lastAuto);
        if (next && next.docs && next.docs.length <= 1) {
            this.setState({
                moreAutos: false
            });
        }
    };

    render() {
        //const { autos } = this.props;
        const { moreEvents, loadedAutos } = this.state;
        //if ( !isLoaded(autos) ) { return <Container><ReactLoading type='balls' color='#17a2b8' /></Container> }
        //if ( isEmpty(autos) ) { return <Container><div> Список Todo пуст </ div></Container> }

console.log("render from Dashboard");
        return (
            <Container className="dashboard mt-5 mb-5">
                <Row>
                    <Col sm={12}>
                        <AutosList autos={this.state.loadedAutos} />
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <Button variant="primary" onClick={this.getNextAutos} >Загрузить еще...</Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        //autos: state.autos,
        autos: state.firestore.ordered.autos,
        //auth: state.firebase.auth
    };
};

const mapDispatchToProps = { getAutosForDashboard };

export default compose(
    connect( mapStateToProps, mapDispatchToProps ),
    firestoreConnect([{ collection: "autos", limit: 3 }])
)(Dashboard);

//export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);