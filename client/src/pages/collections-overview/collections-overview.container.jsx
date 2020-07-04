import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import WithSpinner from "../with-spinner/with-spinner.component";
import CollectionOverview from "./collections-overview.component";
import { selectIsCollectionFetching } from "../../redux/shop/shop.selector";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching,
});

const CollectionOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionOverview);
//or
// const CollectionOverviewContainer = connect(mapStateToProps)(withSpinner(CollectionOverview))

export default CollectionOverviewContainer;
