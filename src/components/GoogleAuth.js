import React, {Component} from 'react';
import {connect} from "react-redux";

import {signIn, signOut} from "../actions";


class GoogleAuth extends Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '891950206250-nu2odoot865j5nh57ordpgrvipftp90d.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                //listen method listens to auth status, whenever auth status changes
                //the method in the parameter gets called
                this.auth.isSignedIn.listen(this.onAuthChange)
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        let {signIn, signOut} = this.props;

        if (isSignedIn) {
            signIn(this.auth.currentUser.get().getId());
        } else {
            signOut();
        }
    };

    signOut = () => {
        this.auth.signOut();
        //this.setState({isSignedIn:false});
    };

    signIn = () => {
        this.auth.signIn();
        //this.setState({isSignedIn: true});
    };


    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return <button className="ui red google button" onClick={() => this.auth.signOut()}>
                <i className="google icon"/> Sign Out
            </button>;
        } else return <button className="ui red google button" onClick={() => this.auth.signIn()}>
            <i className="google icon"/>Sign In with Google
        </button>;
    }

    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {isSignedIn: state.auth.isSignedIn}
};

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);

