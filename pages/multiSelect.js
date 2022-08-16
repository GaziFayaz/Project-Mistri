import React from "react";
import Multiselect from "multiselect-react-dropdown";
import { useRef } from "react";

const multiSelect = () => {
  //   const multiselectref = React.createRef();

  //   const dropdown = () => {
  //     console.log(multiselectref.getSelectedItems);
  //   };

  const constructor = () => {
    this.multiselectRef = React.createRef();
  };
  return (
    <div>
      <Multiselect
        isObject={false}
        ref={this.multiselectRef}
        onKeyPressFn={function noRefCheck() {}}
        onRemove={function noRefCheck() {}}
        onSearch={function noRefCheck() {}}
        onSelect={function noRefCheck() {}}
        options={["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"]}
      />
      <button onClick={dropdown}>submit</button>
    </div>
  );
};

export default multiSelect;
