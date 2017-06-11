import React from 'react';

export default class Footer extends React.Component {
    // Render the copyright year (or range) and name/email
    render() {

        const currYear = new Date().getFullYear();
        const yearRange = currYear > 2017 ? '2017-' + currYear : '2017';

        return (
            <div className='footer'>
                    <div className='text-centre'>Powered by</div>
                    <img
                        className='yelp-logo'
                        src='/images/Yelp_trademark_RGB_outline.png'
                    />
                    <div className='text-centre'>
                        &copy; {yearRange} &nbsp;
                        <a href='mailto:info@domwakeling.com'>
                            Dom Wakeling
                        </a>
                    </div>
            </div>
        );
    }
}
