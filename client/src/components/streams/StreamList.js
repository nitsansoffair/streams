import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../../actions';

class StreamList extends React.Component{
    componentDidMount() {
        const { fetchStreams } = this.props;

        fetchStreams();
    }

    renderAdmin({ userId, id }){
        const { currentUserId } = this.props;

        if(userId === currentUserId){
            return (
                <div className="right floated content">
                    <Link to={`/streams/edit/${id}`} className="ui button primary">
                        Edit
                    </Link>
                    <Link to={`/streams/delete/${id}`} className="ui button negative">
                        Delete
                    </Link>
                </div>
            );
        }
    }

    renderList() {
        const { streams } = this.props;

        return streams.map((stream) => {
            const { id, title, description } = stream;

            return (
                <div className="item" key={id}>
                    {this.renderAdmin(stream)}
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        {title}
                        <div className="description">
                            {description}
                        </div>
                    </div>
                </div>
            );
        });
    }

    renderCreate(){
        const { isSignedIn } = this.props;

        if(isSignedIn){
            return (
                <div style={{ textAlign: 'right' }}>
                    <Link to="/streams/new" className="ui button primary">
                        Create Stream
                    </Link>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">
                    {this.renderList()}
                </div>
                {this.renderCreate()}
            </div>
        );
    }
}

const mapStateToProps = ({ streams, auth: { userId, isSignedIn } }) => {
    return {
        streams: Object.values(streams),
        currentUserId: userId,
        isSignedIn
    };
};

export default connect(
    mapStateToProps,
    { fetchStreams }
)(StreamList);
