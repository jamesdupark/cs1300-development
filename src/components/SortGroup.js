import { FormCheck, FormGroup, FormLabel } from "react-bootstrap";
import SortItem from "./SortItem";

const SortGroup = ({ selectedObj, setDisplay }) => {
  const { selected, setSelected } = selectedObj;

  const onChange = (e) => {
    const sortType = e.target.id;
    setSelected(sortType);
    setDisplay((prev) =>
      [...prev].sort((a, b) => {
        const a1 = a[sortType];
        const b1 = b[sortType];
        return a1 < b1 ? -1 : a1 > b1 ? 1 : 0;
      })
    );
  };

  return (
    <FormGroup>
      <FormLabel>Sort by...</FormLabel>
      <SortItem
        id={"id"}
        label={"National Dex Sort (default)"}
        selected={selected}
        onChange={onChange}
      />
      <SortItem
        id={"bsTotal"}
        label={"base stat total (ascending)"}
        selected={selected}
        onChange={onChange}
      />
    </FormGroup>
  );
};

export default SortGroup;
