import React from 'react';
import PropTypes from 'prop-types';
import Layout from './components/Layout.jsx';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Search from './components/Search.jsx';
import { Session } from 'meteor/session';
import { Bert } from 'meteor/themeteorchef:bert';
import Bars from './components/Bars.jsx';
// import { Votes } from '../api/votes.js';
// import { _ } from 'underscore';

// Main index page
class IndexPage extends React.Component {

    // Constructor to set state and bind functions
    constructor(props) {
        super(props);
        this.state = {
            businesses: [],
            mode: 'search',
            searchLocation: ''
        };
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleLocationSubmit = this.handleLocationSubmit.bind(this);
        this.promiseAuthToken = this.promiseAuthToken.bind(this);
    }

    // Passed as callback to 'Search' component, keeping state aligned
    handleLocationChange(str) {
        this.setState({ searchLocation: str});
    }

    // Passed as callback to 'Search' component, activating a search
    async handleLocationSubmit(str) {

        // use component var to bind 'this' for simplicity
        var component = this;

        str = str.replace(/\s/g, '%20');
        this.promiseAuthToken().then( function(response) {
            Meteor.call('yelp.getLocalInfo', response, str, function(err, res) {
                if (err) {
                    console.log('Error while asking for info', err);
                } else if (res.businesses.length > 0) {
                    component.setState({
                        businesses: res.businesses,
                        mode: 'bars'
                    });
                } else {
                    Bert.alert({
                        title: 'No results found',
                        type: 'danger',
                        message: 'Couldn\'t find any bars near you!',
                        style: 'growl-top-right',
                        icon: 'fa-warning'
                    });
                }
            });
        }, function(error) {
            console.log('Error', error);
        });
    }

    // Promise to return an auth token
    async promiseAuthToken() {

        return new Promise(function(resolve, reject) {

            // set up variables
            var authToken = '';
            var lastUpdated = 0;
            var tokenExpiry = 0;
            var rightNow = Date.now();

            // if we have a token stored in Session, get the details
            if (Session.get('authToken')) {
                const sessionToken = Session.get('authToken');
                authToken = sessionToken.token;
                lastUpdated = sessionToken.date;
                tokenExpiry = sessionToken.expiry;
            }

            // if we have a current token, resolve with it
            if (lastUpdated + 1000 * tokenExpiry > rightNow) {
                resolve(authToken);
            } else {
                // don't have a current token, try to get a new one and store it
                getNewAuthToken().then(function(newToken) {
                    const newSessionToken = {
                        token: newToken.access_token,
                        expiry: newToken.expires_in,
                        date: rightNow
                    };
                    Session.set('authToken', newSessionToken);
                    resolve(newToken.access_token);
                }, function(error) {
                    reject(error);
                });
            }
        });
    }

    // Render search bar on screen
    renderSearch() {
        const searchLocation = this.state.searchLocation;
        return (
            <Search
                changeCallback={this.handleLocationChange}
                searchLocation={searchLocation}
                submitCallback={this.handleLocationSubmit}
            />
        );
    }

    // Render bars on screen
    renderBars() {
        const businesses = this.state.businesses;
        return (
            <Bars businesses={businesses} />
        );
    }

    // Render main part of app; this calls helper functions which do the work
    render() {
        const mode = this.state.mode;
        return (
            <Layout>
                {mode === 'search' ? this.renderSearch() : this.renderBars()}
            </Layout>
        );
    }
}

// Utility function to get new token using promise; outside of object
async function getNewAuthToken() {

    return new Promise(function(resolve, reject) {

        Meteor.call('yelp.getAuthToken', function(err, res) {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

// Define props types, error checking and prevents eslint error reports
IndexPage.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    // votes: PropTypes.array.isRequired,
    user: PropTypes.object
};

// Wrap the component in a createContainer component, so data can be rendered
export default createContainer(() => {
    return {
        // votes: Votes.find({}).fetch(),
        user: Meteor.user()
    };
}, IndexPage);
