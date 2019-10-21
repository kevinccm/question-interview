import React, { Component } from "react";
import { DebounceInput } from "react-debounce-input";
import "./searchComponent.scss";

class SearchComponent extends Component {
  render() {
    return (
      <div className="search-container">
        <DebounceInput
          className="search"
          placeholder="搜尋"
          type="text"
          minLength={1}
          debounceTimeout={1000}
          onChange={e => {
            this.handleChange(e);
          }}
        />
      </div>
    );
  }

  handleChange(e) {
    // for the top recommendation
    console.log(e.target.value);
    if (e.target.value.length === 0) {
      this.props.onSearch(
        e.target.value,
        this.props.topGrossingList,
        this.props.topFreeList.slice(0, 10)
      );
    } else {
      const match = new RegExp(e.target.value, "gi"); // set match global with case insensitive
      const grossingList = this.props.topGrossingList.filter(f => {
        return f.name.match(match) ||
          f.genres.filter(g => g.name.match(match)).length > 0
          ? true
          : null || 
          f.artistName.match(match) || 
          f.description.match(match);
      });

      const displayLists = this.props.topFreeList.filter(f =>
        f.name.match(match) ||
        f.genres.filter(g => g.name.match(match)).length > 0
          ? true
          : null || 
          f.artistName.match(match) || 
          f.description.match(match)
      );
      this.props.onSearch(e.target.value, grossingList, displayLists);
    }
  }
}
export default SearchComponent;
