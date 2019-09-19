import React from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class StreamShow extends React.Component{
    constructor(props){
        super(props);

        this.videoRef = React.createRef();
    }

    componentDidMount() {
        const { fetchStream, match: { params: { id } } } = this.props;

        fetchStream(id);
        this.buildPlayer();
    }

    componentDidUpdate() {
        this.buildPlayer();
    }

    componentWillUnmount() {
        this.player.destroy();
    }

    buildPlayer(){
        const { stream } = this.props;
        if(this.player || !stream){
            return;
        }

        const { match: { params: { id } } } = this.props;
        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${id}.flv`
        });
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    }

    render() {
        const { stream } = this.props;

        if(!stream){
            return <div>Loading...</div>;
        }

        const { title, description } = stream;
        return (
            <div>
                <video ref={this.videoRef} style={{ width: '100%' }} controls/>
                <h1>{title}</h1>
                <h5>{description}</h5>
            </div>
        );
    }
}

const mapStateToProps = ({ streams }, { match: { params: { id } } }) => {
    return {
        stream: streams[id]
    };
};

export default connect(
    mapStateToProps,
    { fetchStream }
)(StreamShow);