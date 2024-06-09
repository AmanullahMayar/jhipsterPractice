import { faBarcode, faChevronDown, faHome, faList, faQrcode, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Ripple } from 'primereact/ripple';
import React, { useState } from 'react';
import { translate } from 'react-jhipster';
import { NavLink } from 'react-router-dom';
import { Brand } from '../header/header-components';

export interface IHeaderProps {
  open: boolean;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void; // Add a function to control menuOpen state
}

const Sidebar = (props: IHeaderProps) => {
  const open = props.open;
  const menuOpen = props.menuOpen;
  const setMenuOpen = props.setMenuOpen;
  const [openSubMenuIndex, setOpenSubMenuIndex] = useState<number | null>(null);

  const menuItems = [
    { title: translate('global.menu.home'), icon: faHome, to: '/' },
    {
      title: translate('global.menu.admin.main'),
      icon: faUsers,
      subMenu: [
        { title: translate('global.menu.admin.userManagement'), to: '/admin/user-management', icon: faUsers },
        { title: translate('global.menu.admin.metrics'), to: '/admin/metrics', icon: faUsers },
        { title: translate('global.menu.admin.health'), to: '/admin/health', icon: faUsers },
      ],
    },
    {
      title: translate('global.menu.entities.main'),
      icon: faList,
      subMenu: [
        { title: 'Company', to: '/company', icon: faUsers },
        { title: 'Customer', to: '/customer', icon: faUsers },
      ],
    },
    {
      title: 'Barcode Test',
      icon: faList,
      subMenu: [
        { title: 'Generating Barcode', to: '/GeneratBarcode', icon: faBarcode },
        { title: 'Generating/Scanning QR Code', to: '/qrcode', icon: faQrcode },
      ],
    },
  ];

  const handleSubMenuToggle = (index: number) => {
    setOpenSubMenuIndex(openSubMenuIndex === index ? null : index);
  };

  const closeSidebar = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <div className={`hidden md:flex  flex-column relative ${open ? 'w-16rem' : 'w-6rem'}`}>
        <div
          id="app-sidebar-2"
          style={{ backgroundColor: '#4db6ac' }}
          className={`flex-shrink-0 absolute lg:static left-0 top-0 z-1 surface-border select-none hidden md:flex ${open ? 'w-16rem' : 'w-6rem'}`}
        >
          <div
            style={{ backgroundColor: '#4db6ac' }}
            className={`flex flex-column min-h-full fixed overflow-hidden ${open ? 'w-16rem transition-duration-500' : 'w-6rem transition-duration-500'}`}
          >
            <div className="overflow-y-auto flex-grow-1">
              <div>
                <Brand open={open} />
              </div>
              <ul className="list-none pt-3 pl-0 pr-0 m-0">
                {menuItems.map((menuItem, index) => (
                  <React.Fragment key={index}>
                    {menuItem.subMenu ? (
                      <div>
                        <div
                          onClick={() => handleSubMenuToggle(index)}
                          className="p-ripple p-3 menu-hover flex align-items-center justify-content-between text-600 cursor-pointer"
                          style={{}}
                        >
                          <div>
                            <FontAwesomeIcon icon={menuItem.icon} className="text-900 mr-2 ml-2" />
                            <span className={`font-medium text-900 ${!open && 'hidden'}`}>{menuItem.title}</span>
                          </div>
                          <FontAwesomeIcon
                            icon={faChevronDown}
                            className={`text-900 ${openSubMenuIndex === index && 'rotate-180 transition-duration-500'}`}
                          />
                          <Ripple />
                        </div>
                        {openSubMenuIndex === index && (
                          <ul className="list-none p-0" style={{ backgroundColor: '#45a59b' }}>
                            {menuItem.subMenu.map((subItem, subIndex) => (
                              <li key={subIndex}>
                                <NavLink
                                  to={subItem.to}
                                  className="p-ripple menu-hover flex align-items-center cursor-pointer p-3 border-round text-700  transition-duration-150 transition-colors w-full no-underline"
                                >
                                  <FontAwesomeIcon icon={subItem.icon} className="mr-2 ml-2 text-900" />
                                  <span className={`font-medium text-900 ${!open && 'hidden'}`}>{subItem.title}</span>
                                  <Ripple />
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ) : (
                      <NavLink
                        to={menuItem.to}
                        className="p-ripple menu-hover flex align-items-center cursor-pointer p-3 border-round text-700 transition-duration-150 transition-colors w-full no-underline"
                      >
                        <FontAwesomeIcon icon={menuItem.icon} className="text-900 mr-2 ml-2" />
                        <span className={`font-medium text-900 ${!open && 'hidden'}`}>{menuItem.title}</span>
                        <Ripple />
                      </NavLink>
                    )}
                  </React.Fragment>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`offcanvas offcanvas-start ${menuOpen ? 'show' : ''} d-md-none`}
        tabIndex={-1}
        style={{ backgroundColor: '#4db6ac', width: '16rem', visibility: menuOpen ? 'visible' : 'hidden' }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">TESTPROJECT</h5>
          <button type="button" className="btn-close" aria-label="Close" onClick={closeSidebar}></button>
        </div>
        <div className="offcanvas-body">
          <ul className="list-unstyled">
            {menuItems.map((menuItem, index) => (
              <React.Fragment key={index}>
                {menuItem.subMenu ? (
                  <li className="mb-2">
                    <div
                      onClick={() => handleSubMenuToggle(index)}
                      className="d-flex align-items-center justify-content-between text-dark cursor-pointer"
                    >
                      <div>
                        <FontAwesomeIcon icon={menuItem.icon} className="me-2" />
                        <span>{menuItem.title}</span>
                      </div>
                      <FontAwesomeIcon icon={faChevronDown} className={`ms-auto ${openSubMenuIndex === index ? 'rotate-180' : ''}`} />
                    </div>
                    {openSubMenuIndex === index && (
                      <ul className="list-unstyled ps-3">
                        {menuItem.subMenu.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <NavLink to={subItem.to} className="d-flex align-items-center text-dark text-decoration-none py-2">
                              <FontAwesomeIcon icon={subItem.icon} className="me-2" />
                              <span>{subItem.title}</span>
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ) : (
                  <li>
                    <NavLink to={menuItem.to} className="d-flex align-items-center text-dark text-decoration-none py-2">
                      <FontAwesomeIcon icon={menuItem.icon} className="me-2" />
                      <span>{menuItem.title}</span>
                    </NavLink>
                  </li>
                )}
              </React.Fragment>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
