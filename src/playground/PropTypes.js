import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import PropTypes from 'prop-types';
// import registerServiceWorker from './registerServiceWorker';

const Sum = (props) => {
    return <h1>{props.a} + {props.b} = {props.a + props.b}</h1>
};

Sum.propTypes = {
    a: PropTypes.number.isRequired,
    b: PropTypes.number.isRequired
}
export default Sum;