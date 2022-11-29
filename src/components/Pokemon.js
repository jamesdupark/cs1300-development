import { Button, Card } from "react-bootstrap";
import AddButton from "./AddButton";

const Pokemon = ({ obj, teamObj }) => {
  let tag = "";
  if (obj.is_special.is_mythical) {
    tag = " (M)";
  } else if (obj.is_special.is_legendary) {
    tag = " (L)";
  }

  const pokeCard = (
    <Card className="mb-1" style={{ width: "14rem" }}>
      <Card.Img variant="top" src={obj.sprite} />
      <Card.Body>
        <Card.Title>{obj.name + tag}</Card.Title>
        <Card.Subtitle>
          <p>Type(s): {obj.types.reduce((a, b) => a + " / " + b)}</p>
          <p>Base stat total: {obj.bsTotal}</p>
        </Card.Subtitle>
        <Card.Text>{obj.desc}</Card.Text>
      </Card.Body>
      <Card.Footer className="d-flex flex-column align-items-end">
        <AddButton teamObj={teamObj} obj={obj} />
      </Card.Footer>
    </Card>
  );

  return pokeCard;
};

export default Pokemon;
