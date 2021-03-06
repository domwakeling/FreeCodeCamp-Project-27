import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

// To use accounts_ui packages and their login buttons, need to write the
// code in Blaze and wrap in a React component
export default class AccountsUIWrapper extends Component {

    componentDidMount() {
        // Use Meteor Blaze to render login buttons
        this.view = Blaze.render(Template.loginButtons,
            ReactDOM.findDOMNode(this.refs.container));
    }

    componentWillUnmount() {
        // Clean up Blaze view
        Blaze.remove(this.view);
    }

    render() {
        // Just render a placeholder container that will be filled in
        return <span ref='container' />;
    }
}
