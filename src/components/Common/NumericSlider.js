import React from "react"
import Slider from "react-rangeslider"
import "react-rangeslider/lib/index.css"
import { useState, useEffect, useRef } from "react"

const NumericSlider = ({
  min,
  max,
  minLabel,
  maxLabel,
  step,
  isVertical,
  onValueChange,
  valueTitle,
}) => {
  var labels = []
  const [value, setValue] = useState()
  const sliderRef = useRef(null)

  // Calculate the height of the slider based on the range
  const range = max - min
  const minHeight = 250 // Minimum height in pixels
  var Height = range * 5 // Maximum height in pixels
  if (Height < minHeight) Height = minHeight

  const sliderHeight = `${Height}px`

  function handleValueChange(value) {
    setValue(value)
    onValueChange(value)
  }

  for (let index = min; index <= max; index += step) {
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
      {!isVertical && (
        <>
          <div className="d-flex justify-content-between">
            <strong>{minLabel}</strong>

            <strong>{maxLabel}</strong>
          </div>
          <div>
            <Slider
              value={value}
              min={min}
              max={max}
              // step={step}
              labels={labels}
              orientation="horizontal"
              onChange={value => {
                handleValueChange(value)
              }}
            />
          </div>
          {/*   <div
            style={{
              position: "absolute",
              left: `${getLabelPosition()}px`,
              top: "65px", // Adjust the distance between the label and the slider
              transform: "translateX(-50%)",
              fontSize: "14px",
            }}
          >
            {value}
          </div> */}

          <div className="mt-5 text-center">
            <strong>
              {" "}
              {valueTitle}: <span className="m-2">{value}</span>{" "}
            </strong>
          </div>
        </>
      )}

      {isVertical && (
        <div className="d-flex">
          <div className="d-flex align-items-center">
            <span>{valueTitle}:</span>
            <span
              className="m-2"
              style={{
                border: "1px solid black",
                width: "30px",
                height: "30px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "6px",
              }}
            >
              {value}
            </span>
          </div>

          <div
            className="d-flex flex-column justify-content-between align-items-center ms-auto"
            style={{ marginLeft: "auto" }} // This pushes the slider div to the right
          >
            <div className="maxLabel-vertical">
              <strong>{maxLabel}</strong>
            </div>
            {/* <div className="d-flex align-items-center"> */}
            <div style={{ height: sliderHeight }}>
              <Slider
                value={value}
                min={min}
                max={max}
                // step={step}
                labels={labels}
                orientation="vertical"
                onChange={value => {
                  handleValueChange(value)
                }}
                className="rangeslider-vertical"
              ></Slider>
            </div>
            {/* </div> */}
            <div className="minLabel-vertical">
              <strong>{minLabel}</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NumericSlider
