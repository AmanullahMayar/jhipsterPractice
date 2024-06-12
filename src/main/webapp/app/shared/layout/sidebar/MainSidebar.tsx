import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Ripple } from 'primereact/ripple';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Brand } from '../header/header-components';

const MainSidebar = ({ menuItems, mopen }) => {
  const open = mopen;
  const [openSubMenuIndex, setOpenSubMenuIndex] = useState(null);

  const handleSubMenuToggle = index => {
    setOpenSubMenuIndex(openSubMenuIndex === index ? null : index);
  };

  return (
    <div className={`hidden md:flex flex-column relative ${open ? 'w-16rem' : 'w-6rem'}`}>
      <div
        id="app-sidebar-2"
        style={{ backgroundColor: '#4db6ac' }}
        className={`flex-shrink-0 absolute lg:static left-0 top-0 z-1 surface-border select-none hidden md:flex ${open ? 'w-16rem' : 'w-6rem'}`}
      >
        <div
          style={{ backgroundColor: '#4db6ac' }}
          className={`flex flex-column min-h-full fixed overflow-hidden ${open ? 'w-16rem transition-duration-200' : 'w-6rem transition-duration-500'}`}
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
                        <ul className="list-none p-0" style={{ backgroundColor: '#45a5s9b' }}>
                          {menuItem.subMenu.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <NavLink to={subItem.to} className="p-ripple menu-hover flex p-3">
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
                    <NavLink to={menuItem.to} className="p-ripple menu-hover flex p-3">
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
  );
};

export default MainSidebar;
