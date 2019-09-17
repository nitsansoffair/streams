import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '451094902217-q5h7scbbqqe1lbgj78tejlsgg07g86au.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        if(isSignedIn){
            const { signIn } = this.props;
            const { currentUser } = this.auth;
            const userId = currentUser.get().getId();

            signIn(userId);
        } else {
            const { signOut } = this.props;

            signOut();
        }
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton(){
        const { isSignedIn } = this.props;

        if(isSignedIn === null){
            return null;
        } else if (isSignedIn){
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon"/>
                    Sign Out
                </button>
            );
        } else {
            return (
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon"/>
                    Sign In with Google
                </button>
            )
        }
    }

    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    const { auth: { isSignedIn } } = state;

    return {
        isSignedIn
    };
};

export default connect(
    mapStateToProps,
    { signIn, signOut }
)(GoogleAuth);