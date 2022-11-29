import { useEffect, useState } from "react";
import { FormCheck } from "react-bootstrap";

const FilterItem = ({ groupName, name, filterObj }) => {
  const [applied, setApplied] = useState(false);
  const { filters, setFilters, reset } = filterObj;

  useEffect(() => {
    if (reset) {
      setApplied(false);
    }
  }, [reset]);

  const onChange = (e) => {
    const copy = { ...filters };
    if (!applied) {
      copy[groupName].push(name);
      setFilters(copy);
      setApplied(true);
    } else {
      copy[groupName] = copy[groupName].filter((item) => item !== name);
      setFilters(copy);
      // turn filter off
      console.log("filter off");

      setApplied(false);
    }

    console.log(`applied filters: ${copy[groupName]}`);
  };

  return (
    <FormCheck
      type="checkbox"
      id={`${groupName}-${name}-filter`}
      label={name}
      checked={applied}
      onChange={onChange}
    />
  );
};

export default FilterItem;
