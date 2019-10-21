import React, { Component } from "react";
// import { createStore } from "redux";
import ReactLoading from "react-loading";
import SearchComponent from "./components/searchComponent/searchComponent";
import TopComponent from "./components/topComponent/topComponent";
import ListComponent from "./components/listComponent/listComponent";
import LazyLoad from "react-lazyload";
import axios from "axios";
import "./App.scss";

axios.defaults.adapter = require("axios/lib/adapters/http");
class App extends Component {
  constructor(props) {
    super(props);
    // state management
    this.state = {
      searchReady: false,
      topGrossingList: [], // top grossing lists
      topFreeList: [], // top free lists
      displayLists: [], // display lists
      grossingList: [], // search lists
      keywords: "",
      hasMore: false, // default not showing loading untill topFree list ready then set true
      start: 0, // listing start end pagination
      end: 10 // listing start end pagination
    };
    // for update state with binding
    this.updateDisplayLists = this.updateDisplayLists.bind(this);
    this.updateGrossingLists = this.updateGrossingLists.bind(this);
    this.updateHasMore = this.updateHasMore.bind(this);
    this.updateStartEnd = this.updateStartEnd.bind(this);
    this.searchKeywords = this.searchKeywords.bind(this);
  }

  // using async await to make sure get the list first then get the lookup data
  async componentDidMount() {
    var config = {
      headers: { "Access-Control-Allow-Origin": "*" }
    };

    // top grossing api calling
    await this.getTopGrossing(config).then(finalList => {
      this.setState({
        topGrossingList: finalList,
        grossingList: finalList
      });
    });

    // top free api calling
    await this.getTopFree(config).then(finalList => {
      this.setState({
        topFreeList: finalList,
        displayLists: finalList.slice(this.state.start, this.state.end), // get first 10 items
        hasMore: true, // ready for infiniate loading
        searchReady: true // ready to show serach bar
      });
    });
  }

  getTopGrossing(config) {
    console.log("start top grossing api");
    return new Promise(resolve => {
      axios
        .get("/api/v1/hk/ios-apps/top-grossing/all/10/explicit.json", config)
        .then(response => {
          const finalList = [];
          // eslint-disable-next-line array-callback-return
          response.data.feed.results.map((m, index) => {
            // lookup api calling by id
            axios.get("/hk/lookup?id=" + m.id, config).then(lookup => {
              m["averageUserRating"] =
                lookup.data.results[0]["averageUserRating"];
              m["userRatingCount"] = lookup.data.results[0]["userRatingCount"];
              m["description"] = lookup.data.results[0]["description"];
              finalList.push(m);
              // when last then update the lists
              if (response.data.feed.results.length - 1 === index) {
                setTimeout(() => {
                  resolve(finalList);
                });
              }
            });
          });
        })
        .catch(error => {
          console.log(error);
        });
    });
  }

  getTopFree(config) {
    console.log("start top free api");
    return new Promise(resolve => {
      axios
        .get("/api/v1/hk/ios-apps/top-free/all/100/explicit.json", config)
        .then(response => {
          const finalList = [];
          // eslint-disable-next-line array-callback-return
          response.data.feed.results.map((m, index) => {
            // lookup api calling by id
            axios.get("/hk/lookup?id=" + m.id, config).then(lookup => {
              m["averageUserRating"] = lookup.data.results[0]["averageUserRating"] || lookup.data.results[0]["averageUserRatingForCurrentVersion"];
              m["userRatingCount"] = lookup.data.results[0]["userRatingCount"] || lookup.data.results[0]["userRatingCountForCurrentVersion"];
              m["description"] = lookup.data.results[0]["description"];
              finalList.push(m);
              // when last then update the lists
              if (response.data.feed.results.length - 1 === index) {
                setTimeout(() => {
                  resolve(finalList);
                });
              }
            });
          });
        })
        .catch(error => {
          console.log(error);
        });
    });
  }

  updateDisplayLists(displayLists) {
    this.setState({ displayLists: displayLists });
  }

  updateGrossingLists(grossingList) {
    this.setState({ grossingList: grossingList });
  }

  updateHasMore(hasMore) {
    this.setState({ hasMore: hasMore });
  }

  updateStartEnd(data) {
    this.setState({
      start: data.start,
      end: data.end
    });
  }

  searchKeywords(keywords, grossingList, displayLists) {
    if (keywords.length > 0) {
      this.setState({ hasMore: false });
    } else if (keywords.length === 0) {
      // reset start & end
      this.setState({
        start: 0,
        end: 10,
        hasMore: true
      });
    }

    this.setState({
      keywords: keywords,
      displayLists: displayLists,
      grossingList: grossingList
    });
  }

  render() {
    return (
      <div className="app-container">
        {this.state.searchReady ? (
          <LazyLoad key="loading" throttle={200} height={200}>
            <SearchComponent
              {...this.state}
              onSearch={this.searchKeywords}
            ></SearchComponent>
            <div className="main-container">
              <TopComponent
                {...this.state}
                onGrossingUpdate={this.updateGrossingLists}
              ></TopComponent>
              <ListComponent
                {...this.state}
                onListsUpdate={this.updateDisplayLists}
                onHasMore={this.updateHasMore}
                onStartEnd={this.updateStartEnd}
              ></ListComponent>
            </div>
          </LazyLoad>
        ) : (
          <div className="loading-container">
            <ReactLoading type={"spokes"} color={"black"} className="loading" />
          </div>
        )}
      </div>
    );
  }
}

export default App;
