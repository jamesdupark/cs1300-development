import { useState, useEffect, useRef } from "react";
import StickyBox from "react-sticky-box";

import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  ListGroup,
  Button,
} from "react-bootstrap";
import Team from "./components/Team";
import Header from "./components/Header";
import FilterGroup from "./components/FilterGroup";

// using pokeAPI to pull pokemon info from: https://github.com/PokeAPI/pokedex-promise-v2
import Pokedex from "pokedex-promise-v2";
import Display from "./components/Display";
import SortGroup from "./components/SortGroup";

// configuring our pokedex
const options = {
  protocol: "https",
  versionPath: "/api/v2/",
  timeout: 5 * 1000, // 5s
};
const P = new Pokedex(options);
const typeSet = new Set();

class Pokeobj {
  constructor(id, name, special, types, desc, bsTotal, sprite) {
    this.id = id;
    this.name = name;
    this.is_special = special;
    this.types = types;
    this.desc = desc;
    this.bsTotal = bsTotal;
    this.sprite = sprite;
    // this.filterAttrs = {[]: }
  }
}

function App() {
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [display, setDisplay] = useState(data);
  const [filters, setFilters] = useState({});
  const [team, setTeam] = useState([]);
  const [selected, setSelected] = useState("id");
  const [reset, setReset] = useState(false);
  const count = useRef(0);
  let total = 0;

  useEffect(() => {
    // load pokemon data
    let ignore = false;
    const newData = [];
    const loadData = async () => {
      // with Async/Await
      for (let i = 1; i <= 151; i++) {
        try {
          const pokemon = await P.getPokemonByName(i);
          const species = await P.getPokemonSpeciesByName(pokemon.name);
          const desc = species.flavor_text_entries.filter((entry) => {
            return entry.language.name === "en";
          })[0].flavor_text;
          const obj = new Pokeobj(
            pokemon.id,
            pokemon.name,
            {
              is_mythical: species.is_mythical,
              is_legendary: species.is_legendary,
            },
            pokemon.types.map((type) => {
              typeSet.add(type.type.name);
              return type.type.name;
            }),
            desc.replace("\f", " "),
            pokemon.stats.reduce((a, b) => a + b.base_stat, 0),
            pokemon.sprites.front_default
          );
          newData.push(obj);
        } catch (error) {
          throw error;
        }
      }

      console.log("done loading!");
      setLoaded(true);
      setData(newData);
    };

    if (!ignore) {
      loadData();
    }

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => setDisplay(data), [data]);

  useEffect(() => {
    // call whenever filters is updated
    let newDisplay = [...data];
    for (const group in filters) {
      // for each filtergroup
      const names = filters[group];
      if (names.length === 0) {
        console.log("no filters");
        continue;
      } else {
        for (const name of names) {
          newDisplay = newDisplay.filter((pokeobj) => {
            // for each individual filter
            const filterAttr = { ...pokeobj[group] }; // convert to object
            for (const key in filterAttr) {
              const value = filterAttr[key];
              if (value === name) {
                return true;
              } else if (key === name) {
                return value;
              }
            }
            return false;
          });
        }
      }
    }

    setDisplay(newDisplay);
  }, [filters, data]);

  const resetAll = () => {
    setReset(true);
    const copy = { ...filters };
    for (const group in copy) {
      copy[group] = [];
    }

    setFilters(copy);
    setSelected("id");
    setTimeout(() => setReset(false), 0); // reverts reset code after function exits
  };

  return (
    <div className="App">
      <header className="App-header">
        <Header></Header>
      </header>
      <Container className="mt-2">
        <Row>
          <Col lg={2}>
            <StickyBox>
              <h3>Filter/Sort</h3>
              <Form>
                <FilterGroup
                  filterKey={"types"}
                  items={typeSet}
                  filterObj={{ filters, setFilters, reset }}
                  loaded={loaded}
                ></FilterGroup>
                <hr />
                <FilterGroup
                  filterKey={"is_special"}
                  items={["is_mythical", "is_legendary"]}
                  filterObj={{ filters, setFilters, reset }}
                  loaded={loaded}
                ></FilterGroup>
                <hr />
                <SortGroup
                  selectedObj={{ selected, setSelected }}
                  setDisplay={setDisplay}
                ></SortGroup>
                <Button onClick={resetAll}>Reset</Button>
              </Form>
            </StickyBox>
          </Col>
          <Col>
            <Display
              displayList={display}
              teamObj={{ team, setTeam, count }}
              loaded={loaded}
            ></Display>
          </Col>
          <Col lg={3}>
            <StickyBox>
              <Team teamObj={{ team, setTeam, count }} total={total}></Team>
            </StickyBox>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
