import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Connections.scss';
import { Navigation } from '../Partials/Navigation';
import { Footer } from '../Partials/Footer';
import { Pagination } from '../Partials/Pagination';
import {
    InputGroup,
    Input,
    Label
} from 'reactstrap';
import {
    fetchConnections
  } from '../../actions/connectionsAction';

class Connections extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isNavDropdownOpen: false,
            isModalOpen: false,
            actionName: '',
            connectionsPerPage: 10,
            currentPage: 1,
            filterText: '',
            singleConnection: {}
        };
    }

    toggleHamburgerNav = () => {
        this.setState({
            isNavDropdownOpen: !this.state.isNavDropdownOpen
        });
    }

    toggle = (action='', connection={}) => {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
            actionName: action,
            singleConnection: connection
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
        this.props.fetchConnections();
    }

    componentDidMount() {
        this.props.fetchConnections();
        this.interval = setInterval(this.handleRefresh, 180000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { connectionsReducer: { allConnections, isFetchingConnections, meta } } = this.props;
        const { currentPage, connectionsPerPage, filterText } = this.state;
        const indexOfLastConnection = currentPage * connectionsPerPage;
        const indexOfFirstConnection = indexOfLastConnection - connectionsPerPage;
        const allFilteredConnections = allConnections.filter(eachConnection => {
            return (eachConnection.andela && eachConnection.andela.toLowerCase().indexOf(filterText) !== -1) || (eachConnection.user && eachConnection.user.firstName.toLowerCase().indexOf(filterText) !== -1)
        })
        const currentConnections = allFilteredConnections.slice(indexOfFirstConnection, indexOfLastConnection);
        let totalPages = Math.ceil((allFilteredConnections.length)/(connectionsPerPage));

        const renderConnection = currentConnections.map((connection, index) => {
            return (<tr id={connection.id} key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{connection.primary_person}</td>
                    <td>{connection.backup}</td>
                    <td>{connection.andela}</td>
                    <td>{connection.purpose}</td>
                    <td>{connection.network.charAt(0).toUpperCase() + connection.network.slice(1)} Andela</td>
                    <td>{connection.user.firstName} {connection.user.lastName}</td>
                    <td>{connection.user.email}</td>
                    <td>{connection.timestamps.createdAt.datePrettyShort}</td>
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
                            <span className="table-title-text">All Connections</span>
                            <div className="line">
                                <span className="long-line"></span>
                                <span className="short-line"></span>
                            </div>
                        </div>
                        <div className="add-guest-container">
                            <div className="refresh-guest-btn" onClick={this.handleRefresh}>
                                <span>Refresh</span>
                                {isFetchingConnections ? <div className="loader absolute"></div> : ''}
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
                                <Input type="select" name="select" id="no_of_record" value={this.state.connectionsPerPage} onChange={this.handleOnChangeNoPerPage}>
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
                                    <th scope="col">Primary Person</th>
                                    <th scope="col">Alternative Contact(bcakup)</th>
                                    <th scope="col">Andelan</th>
                                    <th scope="col">Purpose</th>
                                    <th scope="col">Network</th>
                                    <th scope="col">User Full Name</th>
                                    <th scope="col">User Email</th>
                                    <th scope="col">Created At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(parseInt(currentConnections.length, 10) === 0 ? <tr><td align="center" colSpan="10">No Records</td></tr> : renderConnection)}
                            </tbody>
                        </table>
                        {(
                            parseInt(currentConnections.length, 10) === 0 ?
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
    fetchConnections,
};

export default connect(mapStateToProps, mapDispatchToProps)(Connections);
