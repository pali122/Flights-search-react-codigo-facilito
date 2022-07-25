import useFetch from "../../services/useFetch";
import { Divider, Button } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FlightsItem from "./FlightsItem";

const FlightsTable = () => {
  let { from, to, dateFrom, dateTill, nAdults, nChildren } = useParams();
  const navigate = useNavigate();
  const url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${from}&destinationLocationCode=${to}${
    dateTill != "null" ? `&returnDate=${dateTill}` : ""
  }&departureDate=${dateFrom}&adults=${nAdults}${
    nChildren != 0 ? `&children=${nChildren}` : ""
  }&nonStop=false&max=250`;

  const { data, error } = useFetch(url, {});

  if (error) {
    return <p className="text-center">There is an error. {error.message}</p>;
  }
  if (!data) return <p className="text-center">Loading...</p>;

  if (data.data.length == 0)
    return (
      <p className="text-center">No se encontraron vuelos para su ruta.</p>
    );

  console.log(data.data);

  const tableItems = data.data.map((row) => (
    <React.Fragment key={row.id}>
      <FlightsItem {...row} />
      <Divider className="divider" />
    </React.Fragment>
  ));

  return (
    <>
      <div className="flight-table">{tableItems}</div>
      {}
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

export default FlightsTable;
