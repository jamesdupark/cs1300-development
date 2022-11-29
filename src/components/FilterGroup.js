import { useEffect } from "react";
import { FormGroup, FormLabel } from "react-bootstrap";
import FilterItem from "./FilterItem";

const FilterGroup = ({ filterKey, items, filterObj, loaded }) => {
  const { filters, setFilters } = filterObj;

  useEffect(() => {
    setFilters((prevState) => {
      prevState[filterKey] = [];
      return prevState;
    });
  }, []);

  if (!loaded) {
    return (<p>Loading filters...</p>)
  } else {
    return (
      <FormGroup>
        <FormLabel>{filterKey}</FormLabel>
        {[...items].sort().map((item, index) => (
          <FilterItem
            key={index}
            groupName={filterKey}
            name={item}
            filterObj={filterObj}
          />
        ))}
      </FormGroup>
    );
  }
};

export default FilterGroup;
