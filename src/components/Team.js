import { ListGroup, Card, Badge } from "react-bootstrap";

const Team = ({ teamObj, total }) => {
  const { team, setTeam, count } = teamObj;
  const removeObj = (e) => {
    setTeam((prev) => prev.filter((item) => item.key !== Number(e.target.id)));
    count.current--;
  };

  return (
    <div>
      <h1>My Team</h1>
      <Card>
        <Card.Body>
          <ListGroup variant="flush">
            {team.map((pokemon) => {
              const name = pokemon.name;
              const bsTotal = pokemon.bsTotal;
              const key = pokemon.key;
              total += bsTotal;
              return (
                <ListGroup.Item
                  key={key}
                  className="d-flex justify-content-between"
                >
                  <p>
                    <b>{name}</b>: total stats - {bsTotal}
                  </p>
                  <Badge
                    id={key}
                    bg="danger"
                    className="align-self-start"
                    onClick={removeObj}
                    as="button"
                  >
                    x
                  </Badge>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Card.Body>
        <Card.Footer>Total team stats: {total}</Card.Footer>
      </Card>
    </div>
  );
};

export default Team;
