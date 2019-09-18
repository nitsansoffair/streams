import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions';

class StreamDelete extends React.Component{
    componentDidMount() {
        const { fetchStream, match: { params: { id } } } = this.props;

        fetchStream(id);
    }

    renderActions(){
        const { deleteStream, match: { params: { id } } } = this.props;

        return (
            <React.Fragment>
                <button onClick={() => deleteStream(id)} className="ui button negative">Delete</button>
                <Link to='/' className="ui button">Cancel</Link>
            </React.Fragment>
        );
    }

    renderContent(){
        const { stream } = this.props;

        if(!stream){
            return 'Are you sure you want to delete this stream?'
        }

        const { title } = stream;
        return `Are you sure you want to delete this stream with title ${title}?`
    }

    render() {
        return (
            <Modal
                title="Delete Stream"
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => history.push('/')}
            />
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
    { fetchStream, deleteStream }
)(StreamDelete);