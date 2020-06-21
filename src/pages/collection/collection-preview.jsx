import React from "react";
import CollectionItem from "./collection-item/collection-item";
import "./collection-preview.styles.scss";

const CollectionPreview = ({ title, items }) => {
  // console.log(items);
  return (
    <div className="collection-preview">
      <h1 className="title">{title.toUpperCase()}</h1>
      <div className="preview">
        {/* {items
          .filter((ele, idx) => idx < 4)
          .map(({ id, ...itemProps }) => (
            <CollectionItem key={id} {...itemProps} />
          ))} */}
        {items
          .filter((ele, idx) => idx < 4)
          .map((item) => (
            <CollectionItem key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
};

export default CollectionPreview;
