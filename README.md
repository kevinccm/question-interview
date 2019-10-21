# project-question interview Question

ReactJS

Responsive website:
- width set 768 for the topGrossing can display scrolling view on desktop
- using rem instead of px
- using async + await & promise for the topGrossing & topList fetch data
    i will call the explicit.json first then call lookup inside the explicit.json and merge all the data to the array of topGrossingList & topFreeList

#### Project Folder structure:
```sh
src
|- components
    |- searchComponent
        |- searchComponent.js
        |- searchComponent.scss
    |- topComponent
        |- topComponent.js
        |- topComponent.scss
    |- ListComponent
        |- ListComponent.js
        |- ListComponent.scss
|- css
    |- sass
        |- _common.scss
|- utils
    |- common.js
App.js
App.scss
```
#### style handling
scss with _common.scss
#### Api handling
using async await + promise handling to fetch the data on the list first then fetch each of the item's id data & stored to the state as below

### state Management on App.js
```sh
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
```

#### Installed plugin
- "axios": "^0.19.0",
- "bootstrap": "^4.3.1",
- "font-awesome": "^4.7.0",
- "node-sass": "^4.12.0",
- "react-debounce-input": "^3.2.2",
- "react-fade-in": "^0.1.6",
- "react-infinite-scroller": "^1.2.4",
- "react-lazyload": "^2.6.2",
- "react-loading": "^2.0.3",
- "react-lottie": "^1.2.3",
- "react-scripts": "3.2.0",
- "react-star-rating-component": "^1.4.1",
- "sass-loader": "^8.0.0"


#### Test:
1. npm i
2. npm start -> http://localhost:3000

#### Check list
###### App listing

1. Display top 100 free apps 
```html
    (called https://rss.itunes.apple.com/api/v1/hk/ios-apps/top-free/all/100/explicit.json)
```
2. used axios for the (cross domain issue) api fetch data 
3. Support vertical scrolling with pagination (10 records per page) and lazy load 
```html
    added react-infinite-scroller)
```
4. For every odd row, app icon is cropped with round corners; For every even row, app icon is cropped in circle
```html
li:nth-child(even) {
  img {
    border-radius: 50%;
  }
}

li:nth-child(odd) {
  img {
    border-radius: 20%;
  }
}
```

###### App recommendation
5. Display top 10 grossing apps;
```html
    (called https://rss.itunes.apple.com/api/v1/hk/ios-apps/top-grossing/all/10/explicit.json)
```
6. used axios for the (cross domain issue) api fetch data 
7. Items are scrolled horizontally;
```html
    (using ul li with display: inline-block to do the horizontal scroll)
```
8. App icons are cropped with round corner;
```html
.artist-image {
    img {
      width: 100%;
      border-radius: 10%;
    }
  }
```
9.  Located above app listing section. When app listing section is scrolled vertically, the app recommendation section will also be scrolled together;
    the top grossing will above the top list and it will scrolled together.

###### Search
10. For searching the apps displayed in app listing and recommendation section by matching the keyword;
```html
using match function:
const match = new RegExp(e.target.value, "gi"); // set match global with case insensitive
```
    
11. The search keyword text field is located at the top of the page, and remains the position even app listing is scrolled;
```html
the search bar will using the style
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 1;
```
12. Once the search is performed, app listing and recommendation section only shows the apps whose app name, category, author or summary contains the keyword;
```html
search will using filter to search the keyword from the below code
const grossingList = this.props.topGrossingList.filter(f => {
    return 
      f.name.match(match) ||
      f.genres.filter(g => g.name.match(match)).length > 0 ? true : null || 
      f.artistName.match(match) || 
      f.description.match(match);
  });
```
14. Search is performed immediately when the keyword is typed;
```html 
i have added the debounce for the input to search the data after keyup (1s) & at least 1 character inputted
<DebounceInput
  className="search"
  placeholder="搜尋"
  type="text"
  minLength={1}
  debounceTimeout={1000}
  onChange={e => {
    this.handleChange(e)
  }}
/>
```

##### Hints for Bonus that i was added 
1. Use state management
2. Use responsive design;
3. Use of SASS (SCSS)
4. Show loading indicator when fetching data;
5. PWA is a plus

 