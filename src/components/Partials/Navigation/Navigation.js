import React from 'react';
import {
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Collapse,
    Nav,
    NavItem,
    NavLink,
    // UncontrolledDropdown,
    // DropdownToggle,
    // DropdownMenu,
    // DropdownItem
} from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import './Navigation.scss';


const Navigation = props => {
    return (
        <div className="Navigation">
            <Navbar color="white" light expand="md">
                <NavbarBrand href="/talents">
                    <div className="navigation-logo"></div>
                </NavbarBrand>
                <NavbarToggler onClick={props.toggle} />
                <Collapse isOpen={props.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem >
                            <NavLink to="/talents" activeClassName="active" tag={RRNavLink}>Talents</NavLink>
                        </NavItem>
                        <NavItem >
                            <NavLink to="/partners" activeClassName="active" tag={RRNavLink}>Partners</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/general" activeClassName="active" tag={RRNavLink}>General</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/connections" activeClassName="active" tag={RRNavLink}>Connections</NavLink>
                        </NavItem>
                        {/**<UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                <span className="avatar"><img src="http://via.placeholder.com/50x50" className="rounded" alt="user avatar"/></span> Aminujatto Abdulqahhar
                            </DropdownToggle>
                            <DropdownMenu right>
                            <DropdownItem>
                                Guest History
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>
                                Log Out
                            </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>**/}
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default Navigation;