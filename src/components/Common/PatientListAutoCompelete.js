import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import getPatients from '../../infrastructure/services/network/apiCalls/patientsApiService';
import useEnvironment from '../../infrastructure/session/useEnvironment';
import { apiErrorToast, showLoadingToast, showSuccessToast } from '../../helpers/toastHelper';

const PatientFilter = ({onChange}) => {

    const [patients, setPatients] = useState({});
    const [value, setValue] = useState();
    const [inputValue, setInputValue] = React.useState('');
    const environment = useEnvironment();

    useEffect(() => {
        if (environment) {
            loadPatients();
        }
    }, [environment]);

    function loadPatients() {
        console.log(environment.medicalTeamId);
        getPatients(
            environment.medicalTeamId,
            handleLoadPatientsSuccess,
            apiErrorToast);
    }

    function handleLoadPatientsSuccess(data) {
        setPatients(data);
        if(patients!=null)
          setValue(patients[0]);
    }

    const handleOnChange = (event, value) => {
      setValue(value)
      onChange(value);
    }
    
    return (

      <Autocomplete
       value={value}
       onChange={handleOnChange}
       inputValue={inputValue}
       onInputChange={(event, newInputValue) => {
         setInputValue(newInputValue);
       }}
        disablePortal
        id="combo-box-demo"
        options={patients}
        getOptionLabel={(option) => option.name}
        sx={{ width: 500 }}
        renderInput={(params) => <TextField {...params} label="Patient" />}
       
      />
    );
  }


  export default PatientFilter;
  



