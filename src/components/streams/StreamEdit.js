import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchStream,editStream} from "../../actions";
import StreamForm from "./StreamForm";
import _ from 'lodash';


class StreamEdit extends Component {

    componentDidMount() {

        const {fetchStream, match} = this.props;
        fetchStream(match.params.id);

    }

    onSubmit = (formValues) => {
        let {currentStream} = this.props;
        this.props.editStream(currentStream.id, formValues);
    };

    render() {
        let {currentStream} = this.props;
        if (!currentStream) {
            return <div>Loading...</div>
        }
        return (
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm initialValues={_.pick(currentStream,'title','description')}
                            onSubmit={this.onSubmit}/>
            </div>

        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {currentStream: state.streams[ownProps.match.params.id]}
};

export default connect(mapStateToProps, {fetchStream, editStream})(StreamEdit);
