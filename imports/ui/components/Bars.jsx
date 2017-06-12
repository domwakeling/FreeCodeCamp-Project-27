import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import BarDetail from './BarDetail.jsx';

class Bars extends React.Component {

    renderBarDetails() {
        return this.props.businesses.map((business) => (
            <BarDetail
                businessId={business.id}
                businessName={business.name}
                imageUrl={business.image_url}
                key={business.id}
                linkUrl={business.url}
                rating={business.rating}
            />
        ));
    }

    render() {
        return (
            <div className='bars-container'>
                <div className='bars-flex'>
                    {this.renderBarDetails()}
                </div>
            </div>
        );
    }

}

Bars.propTypes = {
    businesses: PropTypes.array
};

// Wrap the component in a createContainer component, so data can be rendered
export default createContainer(() => {
    return {
        // votes: Votes.find({}).fetch(),
        user: Meteor.user()
    };
}, Bars);
