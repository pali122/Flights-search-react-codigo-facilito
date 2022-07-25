import { useNavigate } from "react-router-dom";
import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Collapse,
} from "@mui/material";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import Badge from "@mui/material/Badge";
import ConnectingAirportsIcon from "@mui/icons-material/ConnectingAirports";
import FlightClassIcon from "@mui/icons-material/FlightClass";
import { Divider, Button } from "@mui/material";
import { StoreContext } from "../../store/StoreProvider";
import { types } from "../../store/StoreReducer";

function formatTime(tiempo) {
  const formatedTime = tiempo
    .split("PT")[1]
    .replace("H", " horas y ")
    .replace("M", " minutos");
  return formatedTime;
}

const FlightsItem = ({
  source,
  id,
  lastTicketingDate,
  itineraries,
  numberOfBookableSeats,
  price,
  travelerPricings,
}) => {
  const [open, setOpen] = React.useState(true);
  const [store, dispatch] = React.useContext(StoreContext);
  const navigate = useNavigate();
  const handleClick = () => {
    setOpen(!open);
  };

  const tiempoformatter = (tiempo) => formatTime(tiempo);

  const classTypes = (data) => {
    const unique = [...new Set(data.map((item) => item.cabin))];
    return unique.toString().replace("_", " ").replace(",", " - ");
  };

  const generateNestedList = (datos, texto) => {
    const element = datos.map((row, index) => (
      <ListItem
        key={row.number + index}
        className="text-flight-card text-flight-card-caption  "
        sx={{ pl: 4 }}
      >
        <ListItemText
          primary={`${texto} ${row.number} : ${tiempoformatter(row.duration)}`}
        />
      </ListItem>
    ));

    return element;
  };

  return (
    <>
      <div className="card-flight-style">
        <div className="card-internal-flex">
          <div className="padding-data">
            <div className="name-flight-card text-flight-card">
              <AirplaneTicketIcon className="icon-card" />
              {source}
              {" : "}
              <span className="font-class">
                {" "}
                {classTypes(travelerPricings[0].fareDetailsBySegment)}
              </span>
            </div>
            <List dense={true}>
              <ListItem className="text-flight-card text-flight-card-caption  ">
                <ListItemText primary={`id : ${id}`} />
              </ListItem>
              <ListItem className="text-flight-card text-flight-card-caption  ">
                <ListItemText
                  primary={
                    <>
                      Asientos disponibles :
                      <Badge
                        badgeContent={numberOfBookableSeats}
                        color="secondary"
                      >
                        <FlightClassIcon className="icon-row" />
                      </Badge>
                    </>
                  }
                />
              </ListItem>
              <ListItem className="text-flight-card text-flight-card-caption  ">
                <ListItemText
                  primary={`Último día para reservar : ${lastTicketingDate}`}
                />
              </ListItem>
              <ListItemButton
                className="text-flight-card text-flight-card-caption  "
                onClick={handleClick}
              >
                <ListItemText
                  className="collapse-space"
                  primary={`Duración total : ${tiempoformatter(
                    itineraries[0].duration
                  )}`}
                />
                {open ? <div>&#9650;</div> : <div>&#9660;</div>}
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List dense={true} component="div" disablePadding>
                  {generateNestedList(
                    itineraries[0].segments,
                    "Duración vuelo"
                  )}
                </List>
              </Collapse>
              <ListItem className="text-flight-card text-flight-card-caption  ">
                <ListItemText
                  primary={
                    <>
                      Número de escalas :
                      <Badge
                        badgeContent={itineraries[0].segments.length}
                        color="secondary"
                      >
                        <ConnectingAirportsIcon className="icon-row" />
                      </Badge>
                    </>
                  }
                />
              </ListItem>
            </List>
          </div>
          <div className="btn-div">
            <div className="card-price">
              <label className="card-label">
                Precio Total ({price.currency})
              </label>
              <section className="card-body">
                <div className="graph">
                  <div className="txt-color txt-box txt-size">
                    <div className="price-flex">
                      <sup className="txt-unit-size">$</sup> {price.total}
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <Divider className="divider" />
            <Button
              className="btn-flight"
              variant={"outlined"}
              onClick={() => {
                dispatch({
                  type: types.dataTicket,
                  payload: {
                    it: itineraries,
                    price: price,
                    tPrice: travelerPricings,
                  },
                });
                navigate(`/ticket/${id}`);
              }}
            >
              Ver itenerarios
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlightsItem;
