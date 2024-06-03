import { faAlignJustify, faAlignRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Storage } from 'react-jhipster';
import LoadingBar from 'react-redux-loading-bar';
import { Collapse, Nav, Navbar, NavbarToggler } from 'reactstrap';
import './header.scss';

import 'primeicons/primeicons.css';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AUTHORITIES } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { isRTL } from 'app/config/translation';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { setLocale } from 'app/shared/reducers/locale';
import { AccountMenu, LocaleMenu } from '../menus';
import Sidebar from '../sidebar/sidebar';
export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isOpenAPIEnabled: boolean;
  currentLocale: string;
}

const Header = (props: IHeaderProps) => {
  const currentLocale = useAppSelector(state => state.locale.currentLocale);
  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
  const isAdmin = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ADMIN]));
  const ribbonEnv = useAppSelector(state => state.applicationProfile.ribbonEnv);
  const isInProduction = useAppSelector(state => state.applicationProfile.inProduction);
  const isOpenAPIEnabled = useAppSelector(state => state.applicationProfile.isOpenAPIEnabled);
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(true);
  const dispatch = useAppDispatch();
  useEffect(() => document.querySelector('html').setAttribute('dir', isRTL(Storage.session.get('locale')) ? 'rtl' : 'ltr'));

  const handleLocaleChange = event => {
    const langKey = event.target.value;
    Storage.session.set('locale', langKey);
    dispatch(setLocale(langKey));
    document.querySelector('html').setAttribute('dir', isRTL(langKey) ? 'rtl' : 'ltr');
  };
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const marginLeft = open ? '15rem' : '6rem';
  const marginRight = open ? '15rem' : '6rem';
  return (
    <>
      <div id="app-container" style={{ display: 'flex', height: '100vh' }}>
        {props.isAuthenticated && <Sidebar open={open} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />}

        <div id="app-header" style={{ flexGrow: 1 }}>
          <LoadingBar className="loading-bar" />
          <Navbar data-cy="navbar" expand="md" className="" style={{ backgroundColor: '#80cbc4', zIndex: 0 }} fixed="top">
            <NavbarToggler aria-label="Menu" onClick={toggleMenu} />
            <div className="ms-auto list-none justify-content-evenly flex md:hidden  align-items-center">
              <div className="mr-3 ml-3">
                <LocaleMenu currentLocale={currentLocale} onClick={handleLocaleChange} />
              </div>
              <div>
                <AccountMenu isAuthenticated={isAuthenticated} />
              </div>
            </div>
            <Collapse navbar>
              <Nav id="header-tabs" className="w-100" navbar>
                {props.isAuthenticated && (
                  <div className="me-auto d-flex align-items-center">
                    <i onClick={() => setOpen(!open)} style={{ marginLeft, marginRight, cursor: 'pointer' }}>
                      {open ? <FontAwesomeIcon icon={faAlignJustify} /> : <FontAwesomeIcon icon={faAlignRight} />}
                    </i>
                  </div>
                )}
                <div className="ms-auto d-flex align-items-center">
                  <LocaleMenu currentLocale={currentLocale} onClick={handleLocaleChange} />
                  <AccountMenu isAuthenticated={isAuthenticated} />
                </div>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      </div>
    </>
  );
};

export default Header;
