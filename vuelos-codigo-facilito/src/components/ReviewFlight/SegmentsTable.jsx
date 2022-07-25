import { Divider, Button } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../store/StoreProvider";
import { useContext } from "react";
import dayjs from "dayjs";
import HailIcon from "@mui/icons-material/Hail";
import Badge from "@mui/material/Badge";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  ListItemButton,
} from "@mui/material";
import LuggageIcon from "@mui/icons-material/Luggage";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import ConnectingAirportsIcon from "@mui/icons-material/ConnectingAirports";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";

function formatTime(tiempo) {
  const formatedTime = tiempo
    .split("PT")[1]
    .replace("H", " Hrs y ")
    .replace("M", "min");
  return formatedTime;
}

{
  /* <ListItemButton
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
              </Collapse> */
}

const SegmentItineraries = ({
  arrival,
  departure,
  duration,
  number,
  numberOfStops,
  stops,
}) => {
  // console.log(props);
  const [open, setOpen] = React.useState(true);
  let Stops = "";
  const handleClick = () => {
    setOpen(!open);
  };

  if (numberOfStops > 0) {
    Stops = stops.map((row, index) => (
      <ListItem
        key={row.iataCode}
        className="text-flight-card text-flight-card-caption  "
        sx={{ pl: 4 }}
      >
        <ListItemText primary={`Duración : ${formatTime(row.duration)}`} />
      </ListItem>
    ));
  } else {
    Stops = (
      <ListItem
        className="text-flight-card text-flight-card-caption  "
        sx={{ pl: 4 }}
      >
        <ListItemText primary={"No"} />
      </ListItem>
    );
  }

  return (
    <>
      <div className="itineraries-class">
        <FlightTakeoffIcon className="icons-side" />
        <div>
          {" "}
          <h3>{departure.iataCode}</h3>
          <h3>{departure.at.split("T")[0]}</h3>
          <h3>
            Terminal :{" "}
            {departure.terminal == undefined ? "NA" : departure.terminal}
          </h3>
        </div>
        <KeyboardDoubleArrowRightIcon className="icons-side" />
        <div>
          <h3>{arrival.iataCode}</h3>
          <h3>{arrival.at.split("T")[0]}</h3>
          <h3>
            Terminal : {arrival.terminal == undefined ? "NA" : arrival.terminal}
          </h3>
        </div>
        <FlightLandIcon className="icons-side" />
      </div>
      <div>Vuelo : {number}</div>
      <div>Duración : {formatTime(duration)}</div>
      <ListItemButton
        className="text-flight-card text-flight-card-caption  "
        onClick={handleClick}
      >
        <ListItemText className="collapse-space" primary={"Paradas"} />
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding dense={true}>
          {Stops}
        </List>
      </Collapse>
    </>
  );
};

const SegmentsTable = () => {
  let { flightID } = useParams();
  const navigate = useNavigate();
  const [store, dispatch] = useContext(StoreContext);

  const { dataTicket, searchedData } = store;
  const { it, price, tPrice } = dataTicket;

  console.log(dataTicket);
  console.log(searchedData);

  const tableItems = it[0].segments.map((row, index) => (
    <React.Fragment key={row.id}>
      {console.log(row)}
      <SegmentItineraries {...row} />
      {index < it[0].segments.length - 1 ? (
        <>
          {" "}
          <Divider className="divider" />{" "}
          <ConnectingAirportsIcon className="icons-center" />
          <Divider className="divider" />
        </>
      ) : (
        <Divider className="divider" />
      )}
    </React.Fragment>
  ));

  return (
    <>
      <div className="flight-table">
        <div className="text-center padding-bottom-2">
          <h2>Vuelo</h2>
          <div className="text-center itineraries-class">
            <div>
              <h3>{searchedData.from.city}</h3>{" "}
              <h3>{searchedData.from.country} </h3>
            </div>
            <h3>
              <AirplaneTicketIcon />
            </h3>
            <div>
              <h3>{searchedData.to.city}</h3>{" "}
              <h3>{searchedData.to.country} </h3>
            </div>
          </div>
        </div>
        <div className="card-internal-flex">
          <List>
            <ListItem
              className="text-flight-card text-flight-card-caption  "
              sx={{ pl: 4 }}
            >
              <ListItemText
                primary={`Para el día : ${dayjs(searchedData.dateFrom).format(
                  "DD-MM-YYYY"
                )}`}
              />
            </ListItem>
            <ListItem
              className="text-flight-card text-flight-card-caption  "
              sx={{ pl: 4 }}
            >
              <ListItemText
                primary={
                  <>
                    Número de pasajeros :
                    <Badge
                      badgeContent={
                        searchedData.nAdults + searchedData.nChildren
                      }
                      color="primary"
                    >
                      <HailIcon className="icon-txt icon-row" />
                    </Badge>
                  </>
                }
              />
            </ListItem>
            <ListItem
              className="text-flight-card text-flight-card-caption  "
              sx={{ pl: 4 }}
            >
              <ListItemText
                primary={
                  <>
                    Peso máximo maleta incluida (
                    {
                      tPrice[0].fareDetailsBySegment[0].includedCheckedBags
                        .weightUnit
                    }
                    ) :
                    <Badge
                      badgeContent={
                        tPrice[0].fareDetailsBySegment[0].includedCheckedBags
                          .weight
                      }
                      color="primary"
                    >
                      <LuggageIcon className="icon-txt icon-row" />
                    </Badge>
                  </>
                }
              />
            </ListItem>
          </List>
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
        </div>
        <div></div>
        <h2 className="text-center padding-bottom-1">Itinerarios</h2>
        <h3>Duración total: {formatTime(it[0].duration)} </h3>
        <Divider className="divider" />
        <div className="flight-table text-center">{tableItems}</div>
      </div>
      <div>
        <Button
          color="secondary"
          variant="contained"
          size="large"
          onClick={() => navigate(-1)}
        >
          Regresar
        </Button>
      </div>
    </>
  );
};

export default SegmentsTable;
