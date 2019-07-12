import React, {Component} from 'react';
import Modal from '../Modal';
import history from '../../history'
import {fetchStream, deleteStream} from "../../actions";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

class StreamDelete extends Component {

    componentDidMount() {
        console.log(this.props);
        let {id} = this.props.match.params;

        this.props.fetchStream(id);

    }

    handleDelete = () => {
        let {deleteStream} = this.props;
        let {id} = this.props.match.params;

        deleteStream(id)

    };


    renderActions = () => {
        return <>
            <button className="ui negative button" onClick={this.handleDelete}>Delete</button>
            <Link to="/" className="ui button" >Cancel</Link>
        </>
    };

    renderContent = () => {
        if (!this.props.stream) {
            return 'Are you sure you want to delete this stream?'
        }

        return `Are you sure you want to delete this stream: ${this.props.stream.title}?`;
    };

    render() {
        return (
            <Modal
                title="Delete Stream"
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => history.push('/')}
            />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id],
    }
};


export default connect(mapStateToProps, {fetchStream, deleteStream})(StreamDelete);
