import React from "react"
import Slider from "react-rangeslider"
import "react-rangeslider/lib/index.css"
import { useState, useEffect,useRef } from "react"

const NumericSlider = ({ min, max, minLabel, maxLabel, onValueChange }) => {
  var labels = []
  const [value, setValue] = useState()
  const sliderRef = useRef(null)

  function handleValueChange(value) {
    setValue(value)
    onValueChange(value)
  }

  for (let index = min; index <= max; index++) {
    labels[index] = index
  }

  const getLabelPosition = () => {
    if (!sliderRef.current) return 0
    const sliderWidth = sliderRef.current.offsetWidth
    const valuePercent = (value / 100) * 100 // Convert value to percentage (assuming max is 100)
    return (sliderWidth * valuePercent) / 100
  }

  useEffect(() => {
    // Recalculate the label position whenever the slider value changes
  }, [value])

  return (
    <div ref={sliderRef}>
      <div className="d-flex justify-content-between">
        <strong>{minLabel}</strong>

        <strong>{maxLabel}</strong>
      </div>
      <Slider
        value={value}
        min={min}
        max={max}
        // labels={labels}
        orientation="horizontal"
        onChange={value => {
          handleValueChange(value)
        }}
      />
      <div
        style={{
          position: "absolute",
          left: `${getLabelPosition()}px`,
          top: "65px", // Adjust the distance between the label and the slider
          transform: "translateX(-50%)",
          fontSize: "14px",
        }}
      >
        {value}
      </div>
    </div>
  )
}

export default NumericSlider
