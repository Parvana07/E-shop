import React from "react";
import { connect } from "react-redux";

import "./category.styles.scss";

import CollectionItem from "../collection/collection-item/collection-item";
import { selectCollection } from "../../redux/shop/shop.selector";

const CategoryPage = ({ collection: { items, title } }) => {
  console.log(items);
  return (
    <div className="collection-page">
      <h2 className="title">{title} </h2>
      <div className="items">
        {items.map((item) => (
          <CollectionItem item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state),
});
export default connect(mapStateToProps)(CategoryPage);
