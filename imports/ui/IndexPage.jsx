import React from 'react';
import PropTypes from 'prop-types';
import Layout from './components/Layout.jsx';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Search from './components/Search.jsx';
// import { Votes } from '../api/votes.js';
// import { Bert } from 'meteor/themeteorchef:bert';
// import { _ } from 'underscore';

// Main index page
class IndexPage extends React.Component {

    // Constructor to set state and bind functions
    constructor(props) {
        super(props);
        this.state = {
            searchLocation: ''
        };
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleLocationSubmit = this.handleLocationSubmit.bind(this);
    }

    handleLocationChange(str) {
        this.setState({ searchLocation: str});
    }

    // TODO: make this do something interesting
    handleLocationSubmit(str) {
        console.log('Received location:', str);
    }

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

    // Render main part of app; this calls helper functions which do the work
    render() {
        // TODO: sort something out here!
        return (
            <Layout>
                {this.renderSearch()}
            </Layout>
        );
    }
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
