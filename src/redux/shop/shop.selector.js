import { createSelector } from "reselect";

// const COLLECTION_ID_MAP = {
//   hats: 1,
//   sneakers: 2,
//   jackets: 3,
//   womens: 4,
//   mens: 5,
// };
const selectShop = (state) => state.shop;

export const selectShopData = createSelector(
  [selectShop],
  (shop) => shop.collection
);

// export const selectCollection = (collectionUrlParam) =>
//   createSelector([selectShopData], (collection) =>
//     collection.find(
//       (collectionItem) =>
//         collectionItem.id === COLLECTION_ID_MAP[collectionUrlParam]
//     )
//   );

//after state normalization
export const selectCollection = (collectionUrlParam) =>
  createSelector([selectShopData], (collection) =>
    collection ? collection[collectionUrlParam] : null
  );

export const selectCollectionsForPreview = createSelector(
  [selectShopData],
  (collection) =>
    collection ? Object.keys(collection).map((key) => collection[key]) : []
  // Object.keys(collection).map((key) => collection[key])
);
