import { Divider, Button } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../store/StoreProvider";
import { useContext } from "react";
import dayjs from "dayjs";
import HailIcon from "@mui/icons-material/Hail";
import Badge from "@mui/material/Badge";
import { List, ListItem, ListItemText } from "@mui/material";
import LuggageIcon from "@mui/icons-material/Luggage";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import ConnectingAirportsIcon from "@mui/icons-material/ConnectingAirports";

const SegmentItineraries = ({ props }) => {
  return <div>{JSON.stringify(props)}</div>;
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
      <SegmentItineraries {...row} />
      {index < it[0].segments.length - 1 ? (
        <ConnectingAirportsIcon />
      ) : (
        <Divider className="divider" />
      )}
    </React.Fragment>
  ));

  return (
    <>
      <div>
        <h3>
          {`Vuelo desde
          ${searchedData.from.city} - ${searchedData.from.country} a
          ${searchedData.to.city} - ${searchedData.to.country}`}
        </h3>
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
        <h2>Itinerarios</h2>
        <Divider className="divider" />
        <div className="flight-table">{tableItems}</div>
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
      </div>
    </>
  );
};

export default SegmentsTable;
