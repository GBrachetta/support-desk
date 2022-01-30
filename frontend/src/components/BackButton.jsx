/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
import { FaArrowCircleLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BackButton = ({ url }) => {
  return (
    <Link to={url} className="btn btn-reverse btn-back">
      <FaArrowCircleLeft /> Back
    </Link>
  );
};

BackButton.propTypes = {
  url: PropTypes.string.isRequired,
};

export default BackButton;
