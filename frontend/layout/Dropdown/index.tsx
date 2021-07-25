import React from "react";
// import Default from "./Default";
// import Select from "./Select";
// import Clickable from "./Clickable";
import SelectSearch from "./SelectSearch";

interface DropdownProps {
  style?: any;
  // switch:
  type?: 'selectSearch' | 'clickable';
  // all:
  gridArea?: string;
  title: string;
  data: any;
  name: string;
  label?: string;
  // clickable, select, selectSearch:
  // selectSearch:
  shadow: "container" | "background";
  onMountAlert?: boolean;
}

const Dropdown: React.FunctionComponent<DropdownProps> = ({
  type,
  ...props
}) => {
  function renderDropdown(type: any) {
    switch (type) {
      // case "clickable":
      //   return (
      //     <Clickable
      //       showDropdown={showDropdown}
      //       toggleDropdown={toggleDropdown!}
      //       data={data}
      //       title={title}
      //       elementToggle={elementToggle!}
      //     />
      //   );

      // case "select":
      //   return (
      //     <Select
      //       showDropdown={showDropdown}
      //       toggleDropdown={toggleDropdown!}
      //       data={data}
      //       title={title}
      //       elementToggle={elementToggle!}
      //     />
      //   );

      case "selectSearch":
        return <SelectSearch {...props} />;

      default:
        return (
          // <Default
          //   showDropdown={showDropdown}
          //   toggleDropdown={toggleDropdown!}
          //   data={data}
          //   title={title}
          // />
          <div>.</div>
        );
    }
  }

  return renderDropdown(type);
};

export default Dropdown;
