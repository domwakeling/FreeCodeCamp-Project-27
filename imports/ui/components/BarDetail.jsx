import React from 'react';
import PropTypes from 'prop-types';

export default class BarDetail extends React.Component {

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

    render() {
        const ratingUrl = this.imageForRating(this.props.rating);
        const imageUrl = this.props.imageUrl !== '' ?
            this.props.imageUrl :
            'http://via.placeholder.com/150x120/ddd/666?text=NO+IMAGE';
        return (
            <div className='bar-card'>
                <h3>{this.props.businessName}</h3>
                <img className='bar-image' src={imageUrl} />
                <div className='clearfix' />
                <img className='bar-rating' src={ratingUrl} />
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
