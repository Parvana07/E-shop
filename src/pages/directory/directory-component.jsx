import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectDirectorySections } from "../../redux/directory/directory.selectors";
import MenuItem from "../menu-item/menu-item.component";

const Directory = ({ sections }) => {
  const images = sections.map(({ id, ...otherSections }) => (
    <MenuItem key={id} {...otherSections} />
  ));
  return <div className="directory-menu">{images}</div>;
};

// const mapStateToProps = ({ directory: { sections } }) => ({
//   sections: sections,
// });
const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections,
});

export default connect(mapStateToProps)(Directory);
