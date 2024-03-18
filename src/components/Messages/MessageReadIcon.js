import React from 'react';



const MessageReadIcon = ({iconSizeClass }) => {
    var iconClassName ="fas fa-check " + iconSizeClass;

        return (
            <div className='mt-1' style={{marginLeft:5}} >
            <span style={{ color: "#0093ff" }}><i className={iconClassName}></i></span>
            </div>
        );
   
}
 
export default MessageReadIcon;