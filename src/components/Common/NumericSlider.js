import React from 'react';
import Slider from 'react-rangeslider';
import "react-rangeslider/lib/index.css";
import { useState, useEffect } from 'react';


const NumericSlider = ({ min, max, minLabel, maxLabel, onValueChange }) => {

    var labels = {};
    const [value, setValue] = useState();

    function handleValueChange(value) {
        setValue(value);
        onValueChange(value)
    }

    for (let index = min; index <= max; index++) {
        labels[index] = index;
    }

    return (

        <div>
            <div className="d-flex justify-content-between">
                <strong>{minLabel}</strong>
                <strong>{maxLabel}</strong>
            </div>
            <Slider
                value={value}
                min={min}
                max={max}
                labels={labels}
                orientation="horizontal"
                onChange={value => {
                    handleValueChange(value);
                }}
            />
        </div>
    );
}

export default NumericSlider;