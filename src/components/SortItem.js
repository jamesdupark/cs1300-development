import { FormCheck } from "react-bootstrap";

const SortItem = ({ id, label, selected, onChange }) => {
  return (
    <FormCheck
      type="radio"
      id={id}
      label={label}
      checked={selected === id}
      name="sort"
      onChange={onChange}
    />
  );
}

export default SortItem;