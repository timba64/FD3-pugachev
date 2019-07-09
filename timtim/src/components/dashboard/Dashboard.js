import React, { Component } from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { connect } from "react-redux";
import AutosList from "../autos/AutosList";
import { firestoreConnect, isEmpty } from "react-redux-firebase";
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
        this.mounted = true;
        let next = await this.props.getAutosForDashboard(); 
        if (next && next.docs && next.docs.length > 1) {
            this.setState({
                moreAutos: true,
                loadingInitial: false,
                
            });
        }
    }

    componentWillUnmount(){
        this.mounted = false;
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.autos !== nextProps.autos) {
          this.setState({
            loadedAutos: [...this.state.loadedAutos, ...nextProps.autos]
          });
        }
    }
     
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
        //const {loading} = this.props;
        const { moreAutos, loadedAutos } = this.state;
        if ( this.state.loadingInitial ) { return <Container><ReactLoading type='balls' color='#17a2b8' /></Container> }
        if ( isEmpty(loadedAutos) ) { return <Container><div> Список объявлений пуст </ div></Container> }

console.log("render from Dashboard");
        return (
            <Container className="dashboard mt-5 mb-5">
                <Row>
                    <Col sm={12}>
                        <AutosList autos={loadedAutos} moreAutos={moreAutos} />
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <Button variant="primary" disabled={moreAutos ? '' : 'disabled'} onClick={this.getNextAutos} >Загрузить еще...</Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        //autos: state.firestore.ordered.autos,
        //auth: state.firebase.auth
        autos: state.auto,
        loading: state.async.loading
    };
};

const mapDispatchToProps = { getAutosForDashboard };

export default compose(
    connect( mapStateToProps, mapDispatchToProps ),
    firestoreConnect([{ collection: "autos" }])
)(Dashboard);