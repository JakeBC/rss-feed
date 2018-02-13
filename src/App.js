import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import RSSParser from 'rss-parser';
import './App.css';

import Main from './components/Main'
import Sidebar from './components/Sidebar'

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentFeed: null,
            feedList: [
                'http://www.reddit.com/.rss',
                'http://www.reddit.com/r/news/.rss',
                'http://www.rss-specifications.com/blog-feed.xml',
                'http://feeds.bbci.co.uk/news/rss.xml?edition=uk'
            ]
        }
        this.handleSearchClicked = this.handleSearchClick.bind(this);
        this.handleFeedClicked = this.handleFeedClick.bind(this);
        this.handleDeleteClicked = this.handleDeleteClick.bind(this);
    }

    handleSearchClick(url) {
        console.log("getting rss feed for:", url);

        let parser = new RSSParser();
        parser.parseURL(CORS_PROXY + url, (function(err, feed) {
            let feedList = this.state.feedList;
            if (!this.state.feedList.includes(url)) {
                feedList.push(url);
            }
            this.setState({
                currentFeed: feed,
                feedList: feedList
            });
        }).bind(this));
    }

    handleFeedClick(url) {
        console.log("feed clicked:", url);

        let parser = new RSSParser();
        parser.parseURL(CORS_PROXY + url, (function(err, feed) {
            this.setState({
                currentFeed: feed
            });
        }).bind(this));
    }

    handleDeleteClick(event, url) {
        console.log("delete clicked:", url);

        event.stopPropagation();
        const newList = this.state.feedList.filter(feed => feed != url);
        this.setState({
            feedList: newList
        });
    }

    render() {
        return (
            <div className="App">
                <Grid>
                    <Row>
                        <Sidebar {...this.props}
                            feedList={this.state.feedList}
                            currentFeed={this.state.currentFeed}
                            searchClicked={this.handleSearchClicked}
                            feedClicked={this.handleFeedClicked}
                            deleteClicked={this.handleDeleteClicked}
                        />
                        <Main {...this.props}
                            currentFeed={this.state.currentFeed}
                        />
                    </Row>
                </Grid>
            </div>
        )
    }
}

export default App;
