import React, { Component } from "react";
import { toBeListString } from "../../utils/common";
import "./topComponent.scss";

class TopComponent extends Component {
  render() {
    return (
      <div className="top-container">
        <div>
          <label className="label">推介</label>
        </div>
        <ul id="app-item">
          {(this.props.grossingList.length > 0) ?
          this.props.grossingList.map((item, index) => {
            return (
              <li key={index} title={item.description}>
                <div className="artist-image">
                  <img
                    alt={item.artistName}
                    key={item.artworkUrl100}
                    src={item.artworkUrl100}
                  ></img>
                </div>
                <div className="artist-name">{item.name}</div>
                <div className="artist-genres">
                  {toBeListString(
                    item.genres.map(genres => {
                      return genres.name;
                    })
                  )}
                </div>
              </li>
            );
          }): <div>這裡沒有你所搜尋的推介</div>}
        </ul>
      </div>
    );
  }
}
export default TopComponent;
