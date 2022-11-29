import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";

const AddButton = ({ teamObj, obj }) => {
  const { team, setTeam, count } = teamObj;
  const [show, setShow] = useState(false);
  const target = useRef(null);

  return (
    <>
      <Button
        ref={target}
        onClick={() => {
          if (count.current >= 6) {
            setShow(!show);
          } else {
            setShow(false);
            console.log(count.current);
            const newObj = { key: count.current, ...obj };
            console.log(newObj);
            setTeam([...team, newObj]);
            count.current++;
          }
        }}
      >
        Add to Team
      </Button>
      <Overlay target={target.current} show={show} placement="right">
        {(props) => (
          <Tooltip {...props}>
            Your party can only contain 6 pokemon at once!
          </Tooltip>
        )}
      </Overlay>
    </>
  );
};

export default AddButton;
