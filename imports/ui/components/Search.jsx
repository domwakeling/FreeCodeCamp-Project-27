import React from 'react';
import PropTypes from 'prop-types';
import { Bert } from 'meteor/themeteorchef:bert';

export default class Search extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.submitLocation = this.submitLocation.bind(this);
    }

    submitLocation(e) {
        e.preventDefault();
        $('#searchbutton').blur();
        const searchLocation = $('input[name=search]')[0].value;
        if (searchLocation === '') {
            Bert.alert({
                    title: 'No name provided',
                    type: 'danger',
                    message: 'Please provide a location!',
                    style: 'growl-top-right',
                    icon: 'fa-warning'
                });
        } else {
            this.props.submitCallback(searchLocation);
        }
    }

    handleChange() {
        const searchLocation = $('input[name=search]')[0].value;
        this.props.changeCallback(searchLocation);
    }

    render() {
        return (
            <div>
                <div className='space-top' />
                <h2 className='text-centre'>See where's hot near you</h2>
                <form className='searchbox-form'>
                    <div className='field field-is-search'>
                        <input
                            className='searchbox-text'
                            name='search'
                            onChange={this.handleChange}
                            placeholder='Where are you?'
                            type='search'
                        />

                        <button
                            className='searchbox-button'
                            id='searchbutton'
                            onClick={this.submitLocation}
                            type='submit'
                            >Search
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

Search.propTypes = {
    changeCallback: PropTypes.func,
    searchLocation: PropTypes.string,
    submitCallback: PropTypes.func
};
