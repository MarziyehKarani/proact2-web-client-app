import React from 'react';
import { Badge } from 'reactstrap';
import messageType from '../../constants/messageType';

const MessageTypeBadge = ({ props, type }) => {

    if (type == messageType.MEDIC) {
        return (<Badge className='ms-1' color='danger'>{props.t("Medic")}</Badge>)
    }
    else if (type == messageType.NURSE) {
        return (<Badge className='ms-1' color='success'>{props.t("Nurse")}</Badge>)
    }
    else if (type == messageType.PATIENT) {
        return (<Badge className='ms-1' color='info'>{props.t("Patient")}</Badge>)
    }
    else {
        return "";
    }
}

export default MessageTypeBadge;