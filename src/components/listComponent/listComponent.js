import React, { Component } from "react";
import { kFormatter } from "../../utils/common";
import StarRatingComponent from "react-star-rating-component";
import InfiniteScroll from "react-infinite-scroller";
import { toBeListString } from "../../utils/common";
import 'font-awesome/css/font-awesome.min.css';
import "./listComponent.scss";

class ListComponent extends Component {
  componentDidMount() {}

  fetchMoreData = () => {
    // make sures no keywords then loading function will turn on
    if (this.props.displayLists.length >= 500) {
      this.props.onHasMore(false);
      return;
    }
    // set 0.5 sec for show the loading... due to without set timeout that will quick to removed 'loading...' text
    setTimeout(() => {
      this.props.onHasMore(false);
    }, 1000);

    // 10 more records in 1.5 secs
    setTimeout(() => {
      if (this.props.keywords.length === 0) {
        this.props.onStartEnd({
          start: this.props.end,
          end: this.props.end + 10
        });

        console.log(this.props.start + "-" + this.props.end);
        // emit event update the lists
        this.props.onListsUpdate(
          this.props.displayLists.concat(
            this.props.topFreeList.slice(this.props.start, this.props.end)
          )
        );
        setTimeout(() => {
          // will not display loading...
          if (this.props.end > 99) {
            this.props.onHasMore(false);
          } else {
            this.props.onHasMore(true);
          }
        });
      }
    }, 1500);
  };

  render() {
    // update the new style of the star empty
    document.querySelectorAll('.dv-star-rating-empty-star').forEach((f,index) => {
      f.innerHTML = '<i class="fa fa-star-o"></i>'
    });
    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={this.fetchMoreData}
        hasMore={this.props.hasMore}
        loader={
          <div className="loading" key={0}>
            Loading ...
          </div>
        }
      >
        <div className="list-container">
          <ul id="app-item" className="row">
            {this.props.displayLists.map((item, index) => (
              <li
                key={index}
                className="col-xs-12 col-sm-6 col-md-4"
                title={item.description}
              >
                <div className="artist-index">{index + 1}</div>
                <div className="artist-image">
                  <img
                    alt={item.artistName}
                    key={item.artworkUrl100}
                    src={item.artworkUrl100}
                  ></img>
                </div>
                <div className="artist-info">
                  {/* {item.id} */}
                  <div className="artist-name">{item.name}</div>
                  <div className="artist-genres">
                    {toBeListString(
                      item.genres.map(genres => {
                        return genres.name;
                      })
                    )}
                  </div>
                  <StarRatingComponent
                    name="rate1"
                    starCount={5}
                    value={item.averageUserRating}
                    emptyStarColor="black"
                    editing={false}
                  />
                  <div className="review">
                    ({kFormatter(item.userRatingCount)})
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </InfiniteScroll>
    );
  }
}

export default ListComponent;
