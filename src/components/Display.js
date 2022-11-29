import { Container, Row, Col } from "react-bootstrap";
import Pokemon from "./Pokemon";

const Display = ({ displayList, teamObj, loaded }) => {
  if (!loaded) {
    return <p>Loading Pokemon...</p>;
  } else {
    return (
      <Container>
        <Row>
          {displayList.map((pokeobj) => (
            <Col key={pokeobj.id}>
              <Pokemon obj={pokeobj} teamObj={teamObj}></Pokemon>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
};

export default Display;
