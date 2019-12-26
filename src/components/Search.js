import React from 'react'
import { Link } from 'gatsby'

const Search = class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            search: "",
        }
    }
    handleSearchChange = (event) => {
        let eve = { ...event }
        this.setState({
            [eve.target.name]: eve.target.value
        })
    }
    render() {
        return (
            <React.Fragment>
                <input type="text" placeholder="Search" name="search" value={this.state.search} onChange={this.handleSearchChange} />
                <br />
                <br />
                <Link className="button" to={`/case-study/search?query=${this.state.search}`}>
                    Search
                  </Link>
            </React.Fragment >
        )
    }
}

export default Search
