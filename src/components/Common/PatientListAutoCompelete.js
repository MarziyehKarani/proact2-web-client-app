import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import getPatients from '../../infrastructure/services/network/apiCalls/patientsApiService';
import useEnvironment from '../../infrastructure/session/useEnvironment';
import { apiErrorToast, showLoadingToast, showSuccessToast } from '../../helpers/toastHelper';
import CircularProgress from '@mui/material/CircularProgress';

const PatientFilter = ({patients,onChange}) => {

    //const defaultPatient = { name: "select a Patient", id: 0 };
    // const [patients, setPatients] = useState([]);
    const [value, setValue] = useState(patients[0]);
    const [inputValue, setInputValue] = useState('');
    const environment = useEnvironment();
  

    // useEffect(() => {
    //   if (environment)  {
    //         loadPatients();
    //     }
    //     return () => {
    //       // Cleanup tasks before unmounting
    //     };
    // }, [environment]);

    // function loadPatients() {
    //     getPatients(
    //         environment.medicalTeamId,
    //         handleLoadPatientsSuccess,
    //         apiErrorToast);
    // }

    // function handleLoadPatientsSuccess(data) {
    //  // var options = getPatientSelectOptionsFromItems(data);
    //     setPatients(data);

    //     if (data.length > 0) {
    //       setValue(data[0]);
    //     }
    // }

  //   function getPatientSelectOptionsFromItems(items) {
  //     var options = [];
  //     items.forEach(item => {
  //         var optionItem = {};
  //         optionItem.label = item.name;
  //         optionItem.value = item.userId;
  //         options.push(optionItem);
  //     });

  //     return options;
  // }


    const handleOnChange = (event, value) => {
      console.log(value);
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
        //{patients}
        getOptionLabel={(option) => option.name}
        sx={{ width: 500 }}
        renderInput={(params) => <TextField {...params} label="select a Patient" />}
       
      />
    );
  }


  export default PatientFilter;
  



