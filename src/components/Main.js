import React, { Component } from 'react';
import { Col, Panel } from 'react-bootstrap';

class Main extends Component {

    renderContent() {
        if (!this.props.currentFeed) {
            return null;
        }
        return (
            <div className="selected-feed">
            {
                this.props.currentFeed.items.map((entry, i) => {
                    const dateStr = new Date(entry.isoDate || entry.pubDate).toDateString();
                    return (
                        <Panel key={entry.link + i}>
                            <Panel.Heading className="flex">
                                <a href={entry.link} target="_blank">{entry.title}</a>
                                <span>{dateStr}</span>
                            </Panel.Heading>
                            <Panel.Body>{entry.contentSnippet}</Panel.Body>
                        </Panel>
                    );
                })
            }
            </div>
        );
    }

    render() {
        const header = this.props.currentFeed
            ? this.props.currentFeed.title
            : "none selected";
        return (
            <Col xs={12} sm={6} md={9}>
                <Panel>
                    <Panel.Heading>{ header }</Panel.Heading>
                    <Panel.Body>
                        { this.props.currentFeed ? this.renderContent() : null }
                    </Panel.Body>
                </Panel>
            </Col>
        );
    }
}

export default Main;
