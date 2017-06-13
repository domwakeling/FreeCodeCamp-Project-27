import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

class BarDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            going: 0,
            userGoing: false
        };
    }

    componentDidMount() {

        var component = this;

        Meteor.call('votes.howMany', this.props.businessId, function(err, res) {
            if (err) {
                component.setState({going: 0});
            } else {
                component.setState({going: res});
            }
        });
    }

    imageForRating(rating) {
        switch (rating) {
            case 5:
                return '/images/ratings/regular_5.png';
            case 4.5:
                return '/images/ratings/regular_4_half.png';
            case 4:
                return '/images/ratings/regular_4.png';
            case 3.5:
                return '/images/ratings/regular_3_half.png';
            case 3:
                return '/images/ratings/regular_3.png';
            case 2.5:
                return '/images/ratings/regular_2_half.png';
            case 2:
                return '/images/ratings/regular_2.png';
            case 1.5:
                return '/images/ratings/regular_1_half.png';
            case 1:
                return '/images/ratings/regular_1.png';
            case 0.5:
                return '/images/ratings/regular_0_half.png';
            default:
                return '/images/ratings/regular_0.png';
        }
    }

    goingClick() {
        if (this.state.userGoing) {
            Meteor.call('votes.removeOne',
                this.props.businessId,
                Meteor.userId()
            );
            const going = this.state.going - 1;
            this.setState({going: going, userGoing: false});
        } else {
            Meteor.call('votes.addOne',
                this.props.businessId,
                Meteor.userId()
            );
            const going = this.state.going + 1;
            this.setState({going: going, userGoing: true});
        }
    }

    renderGoingButton() {
        if (Meteor.user()) {
            var text = this.state.userGoing ? 'Not going' : 'Sign me up!';
            return (
                <button className='main-button' onClick={this.boundGoingClick}>
                    {text}
                </button>
            );
        } else {
            return '';
        }
    }

    render() {

        this.boundGoingClick = this.goingClick.bind(this);

        const ratingUrl = this.imageForRating(this.props.rating);

        var imageUrl = this.props.imageUrl !== '' ?
            this.props.imageUrl :
            'http://via.placeholder.com/150x120/ddd/666?text=NO+IMAGE';

        return (
            <div className='bar-card'>
                <h3>{this.props.businessName}</h3>
                <img className='bar-image' src={imageUrl} />
                <div className='clearfix' />
                <img className='bar-rating' src={ratingUrl} />
                <div className='clearfix' />
                <div
                    className='float-left cardbottom'
                    >
                    {this.state.going} going
                </div>
                <div
                    className='float-right cardbottom'
                    >
                    {this.renderGoingButton()}
                </div>
            </div>
        );
    }

}

BarDetail.propTypes = {
    businessId: PropTypes.string,
    businessName: PropTypes.string,
    imageUrl: PropTypes.string,
    linkUrl: PropTypes.string,
    rating: PropTypes.number
};

// Wrap the component in a createContainer component, so data can be rendered
export default createContainer(() => {
    return {
        user: Meteor.user()
    };
}, BarDetail);
