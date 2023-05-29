import React, { useState } from 'react';
import { Input } from 'reactstrap';


const TextareaWithMaxlength = ({ id, value, maxLength, rows, onChange, onBlur }) => {

    const [textcount, settextcount] = useState(0)
    const [textareabadge, settextareabadge] = useState(false)
    const [badgeColor, setbadgeColor] = useState("badgecount badge bg-success");

    function onChangeHandle(event) {
        const count = event.target.value.length
        settextareabadge(count > 0);
        updateBadgeColor(count);
        settextcount(event.target.value.length)
        if (onChange) {
            onChange(event);
        }
    }

    function onBlurHandle(event) {
        if (onBlur) {
            onBlur(event);
        }
    }

    function updateBadgeColor(textareaLength) {
        if (textareaLength == maxLength) {
            setbadgeColor("badgecount badge bg-danger")
        }
        else if (textareaLength > maxLength - (maxLength / 3)) {
            setbadgeColor("badgecount badge bg-warning")
        }
        else {
            setbadgeColor("badgecount badge bg-success")
        }
    }

    return (
        <div>
            <Input
                className='form-control'
                id={id}
                type="textarea"
                value={value}
                onChange={onChangeHandle}
                onBlur={onBlurHandle}
                maxLength={maxLength}
                rows={rows}
            />
            {textareabadge ? (
                <span className={badgeColor}>
                    {" "}
                    {textcount} / {maxLength}{" "}
                </span>
            ) : null}
        </div>
    );
}

export default TextareaWithMaxlength;