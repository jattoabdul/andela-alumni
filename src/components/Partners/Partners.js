import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Partners.scss';
import { Navigation } from '../Partials/Navigation';
import { Footer } from '../Partials/Footer';
import { Pagination } from '../Partials/Pagination';
import {
    InputGroup,
    Input,
    Label
} from 'reactstrap';
import {
    fetchPartners
  } from '../../actions/partnersAction';

class Partners extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isNavDropdownOpen: false,
            isModalOpen: false,
            actionName: '',
            partnersPerPage: 10,
            currentPage: 1,
            filterText: '',
            singlePartner: {}
        };
    }

    toggleHamburgerNav = () => {
        this.setState({
            isNavDropdownOpen: !this.state.isNavDropdownOpen
        });
    }

    toggle = (action='', partner={}) => {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
            actionName: action,
            singlePartner: partner
          });
    }

    handleOnChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleOnCheckBox = (event) => {
        this.setState({ [event.target.name]: event.target.checked });
    }

    handlePageClick = (page) => {
        const selectedPage = Math.ceil(page.selected + 1);
        this.setState({
            currentPage: Number(selectedPage)
        });
    }

    handleOnChangeNoPerPage = (event) => {
        this.setState({
            talentsPerPage: Number(event.target.value)
        });
    }

    handleOnChangeFilterText = (event) => {
        this.setState({
            filterText: event.target.value
        });
    }

    handleRefresh = () => {
        this.props.fetchPartners();
    }

    componentDidMount() {
        this.props.fetchPartners();
        this.interval = setInterval(this.handleRefresh, 180000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { partnersReducer: { allPartners, isFetchingPartners, meta } } = this.props;
        const { currentPage, partnersPerPage, filterText } = this.state;
        const indexOfLastPartner = currentPage * partnersPerPage;
        const indexOfFirstPartner = indexOfLastPartner - partnersPerPage;
        const allFilteredPartners = allPartners.filter(eachPartner => eachPartner.name.toLowerCase().indexOf(filterText) !== -1 || eachPartner.user.firstName.toLowerCase().indexOf(filterText) !== -1)
        const currentPartners = allFilteredPartners.slice(indexOfFirstPartner, indexOfLastPartner);
        let totalPages = Math.ceil((allFilteredPartners.length)/(partnersPerPage));

        const renderPartners = currentPartners.map((partner, index) => {
            return (<tr id={partner.id} key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{partner.name}</td>
                    <td>{partner.primary_contact}</td>
                    <td>{partner.location}</td>
                    <td>{partner.size}</td>
                    <td>{partner.user.firstName} {partner.user.lastName}</td>
                    <td>{partner.user.email}</td>
                    <td>{partner.timestamps.createdAt.datePrettyShort}</td>
                </tr>);
          });

        return [
            <div className="Dashboard">
                <div className="navigation-container">
                    <Navigation
                        isOpen={this.state.isNavDropdownOpen}
                        toggle={this.toggleHamburgerNav}
                    />
                </div>
                <div className="guest-list-container">
                    <div className="guest-list-top-section">
                        <div className="guest-list-table-title">
                            <span className="table-title-text">All Partners</span>
                            <div className="line">
                                <span className="long-line"></span>
                                <span className="short-line"></span>
                            </div>
                        </div>
                        <div className="add-guest-container">
                            <div className="refresh-guest-btn" onClick={this.handleRefresh}>
                                <span>Refresh</span>
                                {isFetchingPartners ? <div className="loader absolute"></div> : ''}
                            </div>
                        </div>
                    </div>
                    <div className="guest-list-table-section">
                        <div className="table-filters">
                            <InputGroup className="search-filter">
                                <Label for="search">Filter by Name:</Label>
                                <Input placeholder="search" name="search" id="search" onChange={this.handleOnChangeFilterText} />
                            </InputGroup>
                            <InputGroup className="no-of-record-filter">
                                <Label for="no_of_record">No. of Records:</Label>
                                <Input type="select" name="select" id="no_of_record" value={this.state.partnersPerPage} onChange={this.handleOnChangeNoPerPage}>
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                                <option value={meta.totalRows || "1000"}>All</option>
                                </Input>
                            </InputGroup>              
                        </div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Partner Name</th>
                                    <th scope="col">Primary Contact</th>
                                    <th scope="col">Partner Location</th>
                                    <th scope="col">Company Size</th>
                                    <th scope="col">Referrer Full Name</th>
                                    <th scope="col">Referrer Email</th>
                                    <th scope="col">Created At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(parseInt(currentPartners.length, 10) === 0 ? <tr><td align="center" colSpan="10">No Records</td></tr> : renderPartners)}
                            </tbody>
                        </table>
                        {(
                            parseInt(currentPartners.length, 10) === 0 ?
                            '' :
                            <Pagination
                                handlePageClick={this.handlePageClick}
                                pageCount={parseInt(totalPages, 10)}
                            />
                        )}
                    </div>
                </div>
            </div>,
            <Footer />
        ];
    }
}

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = {
    fetchPartners,
};

export default connect(mapStateToProps, mapDispatchToProps)(Partners);
