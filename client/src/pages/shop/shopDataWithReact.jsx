import React, { Component } from "react";
import SHOP_DATA from "./shop.data";
import CollectionPreview from "../collection/collection-preview";

export class ShopPage extends Component {
  constructor() {
    super();
    this.state = {
      collections: SHOP_DATA,
    };
  }
  render() {
    const { collections } = this.state;
    const collection = collections.map(({ id, ...otherCollectionProps }) => (
      <CollectionPreview key={id} {...otherCollectionProps} />
    ));
    return <div className="shop-page">{collection}</div>;
  }
}

export default ShopPage;
