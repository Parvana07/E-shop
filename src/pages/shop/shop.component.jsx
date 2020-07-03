import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
// import { createStructuredSelector } from "reselect";
// import { firestore } from "../../firebase/firebase.utils";

// import { convertCollectionSnapshotToMap } from "../../firebase/firebase.utils";
// import CollectionOverview from "../collections-overview/collections-overview.component";
import CollectionOverviewContainer from "../collections-overview/collections-overview.container";
import CategoryPageContainer from "../category/category.container";
// import CategoryPage from "../category/category.component";
// import { fetchCollectionStartAsync } from "../../redux/shop/shop.actions";
import { fetchCollectionStart } from "../../redux/shop/shop.actions";
// import WithSpinner from "../with-spinner/with-spinner.component";
// import {
//   selectIsCollectionFetching,
//   selectIsCollectionLoaded,
// } from "../../redux/shop/shop.selector";

// const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
// const CategoryPageWithSpinner = WithSpinner(CategoryPage);

class ShopPage extends Component {
  // state = {
  //   isLoading: true,
  // };

  unsubscribeFromSnapshot = null;
  // without promise
  // componentDidMount() {
  //   const { updateCollections } = this.props;
  //   const collectionRef = firestore.collection("collection");
  //   //whenever the collection updates or runs for the first time this collection ref will send us the snapshot representing the code of our collections objects array
  //   //at the time when this code renders
  //   collectionRef.onSnapshot(async (snapshot) => {
  //     const collectionMap = convertCollectionSnapshotToMap(snapshot);
  //     console.log("i am collection", collectionMap);
  //     updateCollections(collectionMap);
  //     this.setState({ isLoading: false });
  //   });
  // }

  //with promise
  componentDidMount() {
    const { fetchCollectionStart } = this.props;
    fetchCollectionStart();
    // console.log(fetchCollectionStartAsync);
    // fetch(
    //   "https://firestore.googleapis.com/v1/projects/e-shop-db-59460/databases/(default)/documents/collection"
    // )
    //   .then((res) => res.json())
    //   .then((collections) => console.log(collections));
  }

  render() {
    // const { match } = this.props;
    const { match, isLoading, isCollectionLoaded } = this.props;

    return (
      <div className="shop-page">
        {/* <Route exact path={`${match.path}`} component={CollectionOverview} />
        <Route path={`${match.path}/:collectionId`} component={CategoryPage} /> */}
        <Route
          exact
          path={`${match.path}`}
          // render={(otherProps) => (
          //   <CollectionOverviewWithSpinner
          //     isLoading={isLoading}
          //     {...otherProps}
          //   />
          // )}
          component={CollectionOverviewContainer}
        />
        <Route
          exact
          path={`${match.path}/:collectionId`}
          // render={(otherProps) => (
          //   <CategoryPageWithSpinner
          //     isLoading={!isCollectionLoaded}
          //     {...otherProps}
          //   />
          // )}
          component={CategoryPageContainer}
        />
      </div>
    );
  }
}

// const mapStateToProps = ({ shop: { isFetching } }) => ({
//   isLoading: isFetching,
// });

// const mapStateToProps = createStructuredSelector({
//    isLoading: selectIsCollectionFetching,
//   isCollectionLoaded: selectIsCollectionLoaded,
// });

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionStart: () => dispatch(fetchCollectionStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
