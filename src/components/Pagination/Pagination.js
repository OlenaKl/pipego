import React, { Component } from "react";
import PropTypes from 'prop-types';
import './styles.scss';

export default class Pagination extends Component {

    static propTypes = {
        next: PropTypes.bool,
        active: PropTypes.number,
        fetchRange: PropTypes.func,
        links: PropTypes.array,
        limit: PropTypes.number
    }

    render() {
        const fetchPrev = this.props.active - 2 * this.props.limit;
        return (
            <div className="pagination">
                <ul>
                    {this.props.active > 10 &&
                        <li
                            onClick={() => this.props.fetchRange(fetchPrev)}
                            className="prev">back</li>
                    }
                    {this.props.links.map((item, index) =>
                        (<li className={this.props.active / item === 10 ? "active" : undefined} onClick={() => this.props.fetchRange(undefined, index)} key={index}>{item}</li>))}
                    {this.props.next &&
                        <li
                            onClick={() => this.props.fetchRange(this.props.active)}
                            className="next">next</li>
                    }
                </ul>
            </div>
        )
    }
}
