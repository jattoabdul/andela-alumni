import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Talents.scss';
import { Navigation } from '../Partials/Navigation';
import { Footer } from '../Partials/Footer';
import { Pagination } from '../Partials/Pagination';
import {
    InputGroup,
    Input,
    Label
} from 'reactstrap';
import {
    fetchTalents
  } from '../../actions/talentsAction';

class Talents extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isNavDropdownOpen: false,
            isModalOpen: false,
            actionName: '',
            talentsPerPage: 10,
            currentPage: 1,
            filterText: '',
            singleGuest: {}
        };
    }

    toggleHamburgerNav = () => {
        this.setState({
            isNavDropdownOpen: !this.state.isNavDropdownOpen
        });
    }

    toggle = (action='', guest={}) => {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
            actionName: action,
            singleGuest: guest
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
        this.props.fetchTalents();
    }

    componentDidMount() {
        this.props.fetchTalents();
        this.interval = setInterval(this.handleRefresh, 180000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { talentsReducer: { allTalents, isFetchingTalents, meta } } = this.props;
        const { currentPage, talentsPerPage, filterText } = this.state;
        const indexOfLastTalent = currentPage * talentsPerPage;
        const indexOfFirstTalent = indexOfLastTalent - talentsPerPage;
        const allFilteredTalents = allTalents.filter(eachTalent => eachTalent.name.toLowerCase().indexOf(filterText) !== -1 || eachTalent.user.firstName.toLowerCase().indexOf(filterText) !== -1)
        const currentTalents = allFilteredTalents.slice(indexOfFirstTalent, indexOfLastTalent);
        let totalPages = Math.ceil((allFilteredTalents.length)/(talentsPerPage));

        const renderTalents = currentTalents.map((talent, index) => {
            return (<tr id={talent.id} key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{talent.name}</td>
                    <td>{talent.role}</td>
                    <td>{talent.url}</td>
                    <td>{talent.user.firstName} {talent.user.lastName}</td>
                    <td>{talent.user.email}</td>
                    <td>{talent.timestamps.createdAt.datePrettyShort}</td>
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
                            <span className="table-title-text">All Talents</span>
                            <div className="line">
                                <span className="long-line"></span>
                                <span className="short-line"></span>
                            </div>
                        </div>
                        <div className="add-guest-container">
                            <div className="refresh-guest-btn" onClick={this.handleRefresh}>
                                <span>Refresh</span>
                                {isFetchingTalents ? <div className="loader absolute"></div> : ''}
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
                                <Input type="select" name="select" id="no_of_record" value={this.state.talentsPerPage} onChange={this.handleOnChangeNoPerPage}>
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
                                    <th scope="col">Talent Name</th>
                                    <th scope="col">Talent Role</th>
                                    <th scope="col">Personal URL</th>
                                    <th scope="col">Referrer Full Name</th>
                                    <th scope="col">Referrer Email</th>
                                    <th scope="col">Created At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(parseInt(currentTalents.length, 10) === 0 ? <tr><td align="center" colSpan="10">No Records</td></tr> : renderTalents)}
                            </tbody>
                        </table>
                        {(
                            parseInt(currentTalents.length, 10) === 0 ?
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
    fetchTalents,
};

export default connect(mapStateToProps, mapDispatchToProps)(Talents);
