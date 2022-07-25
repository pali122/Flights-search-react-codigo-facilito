import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Formik, Form, Field } from "formik";
import DatePicker from "../SharedComponents/DatePicker";
import TypeSelect from "../SharedComponents/TypeSelect";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import * as Yup from "yup";
// const url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=SYD&destinationLocationCode=BKK&departureDate=2022-11-01&adults=1&nonStop=false&max=250`;
import airports from "../../assets/airports";
import { useContext, useEffect } from "react";
import { StoreContext } from "../../store/StoreProvider";
import { types } from "../../store/StoreReducer";

const getAuthData = async (dispatch) => {
  const urlAuth = "https://test.api.amadeus.com/v1/security/oauth2/token";

  const client_id = import.meta.env.VITE_AMADEUS_CLIENT_ID;
  const client_secret = import.meta.env.VITE_AMADEUS_CLIENT_SECRET;

  const options = {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`,
    method: "POST",
  };

  const response = await fetch(urlAuth, options);
  if (!response.ok) {
    throw new Error(response.status);
  }

  const dataToken = await response.json();

  if (dataToken) {
    dispatch({ type: types.token, payload: dataToken.access_token });
  }
};

const FormSchema = Yup.object().shape({
  from: Yup.object().required("Required"),
  to: Yup.object().required("Required"),
});

const IndexForm = ({ propsTree }) => {
  const navigate = useNavigate();
  const [store, dispatch] = useContext(StoreContext);
  useEffect(() => {
    getAuthData(dispatch);
  }, []);
  let initValues;
  if (!store.searchedData) {
    initValues = {
      from: undefined,
      to: undefined,
      dateFrom: dayjs(),
      dateTill: null,
      nChildren: 0,
      nAdults: 1,
    };
  } else {
    initValues = store.searchedData;
  }

  const filterOptions = createFilterOptions({
    limit: 100,
  });

  // console.log(useFetch(url, {}));

  return (
    <div className="page-transition">
      <Formik
        initialValues={initValues}
        validationSchema={FormSchema}
        onSubmit={async (values) => {
          //   await new Promise((r) => setTimeout(r, 500));
          // alert(JSON.stringify(values, null, 2));
          dispatch({ type: types.data, payload: values });
          let dateF = values.dateFrom;
          let dateT = values.dateTill;
          dateF = dateF.format("YYYY-MM-DD");
          if (dateT) {
            dateT = dateT.format("YYYY-MM-DD");
          }
          navigate(
            `../date/${values.from.IATA}/${values.to.IATA}/${dateF}/${dateT}/${values.nAdults}/${values.nChildren}`
          );
        }}
      >
        {({ errors, setFieldValue, values, touched }) => (
          <Form>
            <div className="wrapper">
              <div>
                <Autocomplete
                  disablePortal
                  options={airports}
                  value={values.from}
                  groupBy={(option) => option.country}
                  filterOptions={filterOptions}
                  getOptionLabel={(option) => `${option.name} - ${option.IATA}`}
                  sx={{ width: 300 }}
                  onChange={(e, value) => {
                    setFieldValue(
                      "from",
                      value !== null ? value : initValues.from
                    );
                    propsTree[1](`[${value.lat},${value.lon}]`, "purple");
                  }}
                  renderInput={(params) => (
                    <TextField name="from" {...params} label="Origen" />
                  )}
                />
                {errors.from && touched.from ? (
                  <div className="text-center padding-top font-red">
                    {errors.from}
                  </div>
                ) : null}
              </div>
              <div>
                <Autocomplete
                  disablePortal
                  options={airports}
                  value={values.to}
                  groupBy={(option) => option.country}
                  filterOptions={filterOptions}
                  getOptionLabel={(option) => `${option.name} - ${option.IATA}`}
                  sx={{ width: 300 }}
                  id="to"
                  name="to"
                  onChange={(e, value) => {
                    setFieldValue("to", value !== null ? value : initValues.to);
                    propsTree[1](`[${value.lat},${value.lon}]`, "cyan");
                  }}
                  renderInput={(params) => (
                    <TextField name="to" {...params} label="Destino" />
                  )}
                />
                {errors.to && touched.to ? (
                  <div className="text-center padding-top font-red">
                    {errors.from}
                  </div>
                ) : null}
              </div>
              <div>
                <Field
                  name="dateFrom"
                  label="Fecha de salida"
                  component={DatePicker}
                />
              </div>
              <div>
                <Field
                  name="dateTill"
                  label="Fecha de Regreso"
                  component={DatePicker}
                />
              </div>
              <div>
                <Field
                  name="nAdults"
                  label="Número de Adultos"
                  component={TypeSelect}
                />
              </div>
              <div>
                <Field
                  name="nChildren"
                  label="Número de niños"
                  component={TypeSelect}
                />
              </div>
            </div>
            <div className="full-width">
              <Button
                color="primary"
                variant="contained"
                size="large"
                type="submit"
              >
                Buscar vuelos
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default IndexForm;
