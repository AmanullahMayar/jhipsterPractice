import React from 'react';
import { Translate } from 'react-jhipster';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Image } from 'primereact/image';
import { NavLink as Link } from 'react-router-dom';
import { NavItem, NavLink, NavbarBrand } from 'reactstrap';

export const BrandIcon = props => (
  <div {...props} className="brand-icon">
    <Image
      src="content/images/logo1.jpg"
      imageStyle={{ mixBlendMode: 'multiply', color: 'white' }}
      alt="Logo"
      style={{ borderRadius: '100%', height: '50px' }}
    />
  </div>
);

export const Brand = ({ open }) => (
  <NavbarBrand
    style={{ textAlign: 'center' }}
    className={`brand-logo justify-content-center align-items-center ${open ? 'w-14rem' : 'w-6rem'}`}
  >
    <div className="mr-2 mt-2">
      <BrandIcon />
    </div>
    <span style={{ textAlign: 'center' }} className={`font-semibold justify-content-center mt-2  text-900 ${open ? 'flex' : 'hidden'}`}>
      <Translate contentKey="global.title">Testproject</Translate>
    </span>
    {/* <span className="navbar-version">{VERSION.toLowerCase().startsWith('v') ? VERSION : `v${VERSION}`}</span> */}
  </NavbarBrand>
);

export const Home = () => (
  <NavItem>
    <NavLink tag={Link} to="/" className="d-flex align-items-center">
      <FontAwesomeIcon icon="home" />
      <span>
        <Translate contentKey="global.menu.home">Home</Translate>
      </span>
    </NavLink>
  </NavItem>
);
