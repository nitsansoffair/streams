import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
    componentDidMount() {
        const { fetchStream, match: { params: { id } } } = this.props;

        fetchStream(id);
    }

    onSubmit = (formValues) => {
        const { editStream, match: { params: { id } } } = this.props;

        editStream(id, formValues);
    };

    render() {
        const { stream } = this.props;
        if(!stream){
            return <div>Loading...</div>;
        }

        return (
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm
                    initialValues={_.pick(stream, 'title', 'description')}
                    onSubmit={this.onSubmit}
                />
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
    { fetchStream, editStream }
)(StreamEdit);