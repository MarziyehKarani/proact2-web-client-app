import React from 'react';
import messageScope from '../../constants/messageScope';


const MessageScopeIcon = ({ scope, iconSizeClass }) => {
    var iconClassName = "";

    if (scope == messageScope.INFO) {
        iconClassName = "fas fa-info-circle " + iconSizeClass;
        return (
            <span style={{ color: "#213384" }}><i className={iconClassName}></i></span>
        );
    }
    else if (scope == messageScope.HEALTH) {
        iconClassName = "fas fa-heartbeat " + iconSizeClass;
        return (
            <span style={{ color: "#FE387B" }}><i className={iconClassName}></i></span>
        );
    }
    else {
        return ("");
    }
}
 
export default MessageScopeIcon;