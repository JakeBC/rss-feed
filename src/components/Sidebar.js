import React, { Component } from 'react';
import { Col, Button, ListGroup, ListGroupItem, Glyphicon } from 'react-bootstrap';
import RSSParser from 'rss-parser';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feedUrl: ""
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            feedUrl: e.target.value
        });
    }

    renderFeedList() {
        const currentFeed = this.props.currentFeed
        return (
            <ListGroup>
            {
                this.props.feedList.map((feedUrl, i) => {
                    return (
                        <ListGroupItem onClick={() => this.props.feedClicked(feedUrl)}
                            key={feedUrl + i}
                        >
                            <span className="ellipsis">{ feedUrl }</span>
                            <Glyphicon glyph="trash"
                                onClick={(event) => this.props.deleteClicked(event, feedUrl)}
                            />
                        </ListGroupItem>
                    )
                })
            }
            </ListGroup>
        );
    }

    render() {
        return (
            <Col xs={12} sm={6} md={3}>
                <div className="flex">
                    <input type="text"
                        value={this.state.feedUrl}
                        onChange={this.handleInputChange}
                    />
                    <Button onClick={() => this.props.searchClicked(this.state.feedUrl)}>
                        <Glyphicon glyph="search" />
                    </Button>
                </div>
                <hr />
                { this.renderFeedList() }
            </Col>
        );
    }
}

export default Sidebar;
