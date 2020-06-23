import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CollectionPreview from "../collection/collection-preview";
import { selectCollectionsForPreview } from "../../redux/shop/shop.selector";
import "./collections-overview.styles.scss";

const CollectionOverview = ({ shopData }) => {
  return (
    <div className="collections-overview">
      {shopData.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  shopData: selectCollectionsForPreview,
});

export default connect(mapStateToProps)(CollectionOverview);
