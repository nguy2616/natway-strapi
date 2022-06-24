import styled from 'styled-components';
import PropTypes from 'prop-types';

// import Logo from '../../../assets/images/logo-strapi.png';

const Wrapper = styled.div`
  background-color: #f0fff0;
  padding-left: 2rem;
  height: ${props => props.theme.main.sizes.leftMenu.height};

  .leftMenuHeaderLink {
    &:hover {
      text-decoration: none;
    }
  }

  .projectName {
    display: block;
    width: 100%;
    height: ${props => props.theme.main.sizes.leftMenu.height};
    font-size: 2rem;
    letter-spacing: 0.2rem;
    color: $white;

    background-image: url("https://s3-natway-heroku.s3-ap-southeast-1.amazonaws.com/logo-strapi.png");
    background-repeat: no-repeat;
    background-position: left center;
    background-size: auto 2.5rem;
  }
`;

// background-image: url(${Logo});

Wrapper.defaultProps = {
  theme: {
    main: {
      colors: {
        leftMenu: {},
      },
      sizes: {
        header: {},
        leftMenu: {},
      },
    },
  },
};

Wrapper.propTypes = {
  theme: PropTypes.object,
};

export default Wrapper;
