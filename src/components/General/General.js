import React, { Component } from 'react';
import { connect } from 'react-redux';
import './General.scss';
import { Navigation } from '../Partials/Navigation';
import { Footer } from '../Partials/Footer';
import { Pagination } from '../Partials/Pagination';
import {
    InputGroup,
    Input,
    Label
} from 'reactstrap';
import {
    fetchGeneralRequests
  } from '../../actions/generalAction';

class General extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isNavDropdownOpen: false,
            isModalOpen: false,
            actionName: '',
            generalRequestPerPage: 10,
            currentPage: 1,
            filterText: '',
            singleRequest: {}
        };
    }

    toggleHamburgerNav = () => {
        this.setState({
            isNavDropdownOpen: !this.state.isNavDropdownOpen
        });
    }

    toggle = (action='', request={}) => {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
            actionName: action,
            singleRequest: request
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
        this.props.fetchGeneralRequests();
    }

    componentDidMount() {
        this.props.fetchGeneralRequests();
        this.interval = setInterval(this.handleRefresh, 180000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { generalReducer: { allGeneralRequests, isFetchingGeneralRequests, meta } } = this.props;
        const { currentPage, generalRequestPerPage, filterText } = this.state;
        const indexOfLastRequest = currentPage * generalRequestPerPage;
        const indexOfFirstRequest = indexOfLastRequest - generalRequestPerPage;
        const allFilteredRequests = allGeneralRequests.filter(eachRequest => {
            return (eachRequest.info && eachRequest.info.toLowerCase().indexOf(filterText) !== -1) || (eachRequest.user && eachRequest.user.firstName.toLowerCase().indexOf(filterText) !== -1)
        })
        const currentRequests = allFilteredRequests.slice(indexOfFirstRequest, indexOfLastRequest);
        let totalPages = Math.ceil((allFilteredRequests.length)/(generalRequestPerPage));

        const renderRequest = currentRequests.map((request, index) => {
            return (<tr id={request.id} key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{request.request_type}</td>
                    <td>{request.info}</td>
                    <td>{request.user.firstName} {request.user.lastName}</td>
                    <td>{request.user.email}</td>
                    <td>{request.timestamps.createdAt.datePrettyShort}</td>
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
                            <span className="table-title-text">All General Request</span>
                            <div className="line">
                                <span className="long-line"></span>
                                <span className="short-line"></span>
                            </div>
                        </div>
                        <div className="add-guest-container">
                            <div className="refresh-guest-btn" onClick={this.handleRefresh}>
                                <span>Refresh</span>
                                {isFetchingGeneralRequests ? <div className="loader absolute"></div> : ''}
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
                                <Input type="select" name="select" id="no_of_record" value={this.state.generalRequestPerPage} onChange={this.handleOnChangeNoPerPage}>
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
                                    <th scope="col">Request Type</th>
                                    <th scope="col">Additional Info</th>
                                    <th scope="col">User Full Name</th>
                                    <th scope="col">User Email</th>
                                    <th scope="col">Created At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(parseInt(currentRequests.length, 10) === 0 ? <tr><td align="center" colSpan="10">No Records</td></tr> : renderRequest)}
                            </tbody>
                        </table>
                        {(
                            parseInt(currentRequests.length, 10) === 0 ?
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
    fetchGeneralRequests,
};

export default connect(mapStateToProps, mapDispatchToProps)(General);
