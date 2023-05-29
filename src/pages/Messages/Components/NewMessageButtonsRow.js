import React from 'react';
import {
    Button,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { useState } from 'react';

const NewMessageButtonsRow = ({
    props,
    onInfoMessageButtonClick,
    onTextMessageButtonClick,
    onAudioMessageButtonClick,
    onVideoMessageButtonClick }) => {

    const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

    return (
        <div className="d-flex align-items-center">
            <div className="me-2">
                <Button
                    onClick={onInfoMessageButtonClick}
                    style={{ background: "#EBF4FF", color: "#213384", borderColor: "#213384" }} >
                    <i className="fas fa-info-circle fa-lg me-2"></i>{props.t("InfoMessage")}
                </Button>
            </div>

            <ButtonDropdown
                isOpen={dropdownIsOpen}
                toggle={() => {
                    setDropdownIsOpen(!dropdownIsOpen);
                }}>
                <DropdownToggle
                    caret
                    style={{ background: "#FFEBF8", color: "#FE387B", borderColor: "#FE387B" }} >
                    <i className="fas fa-heartbeat fa-lg me-2"></i>{props.t("HealthMessage")}<i className="mdi mdi-chevron-down ms-1"></i>
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem
                        onClick={onTextMessageButtonClick}>
                        <i className="fas fa-pen me-2"></i>{props.t("TextTypeMessage")}
                    </DropdownItem>
                    <DropdownItem
                        onClick={onAudioMessageButtonClick}>
                        <i className="fas fa-microphone me-2"></i>{props.t("VoiceTypeMessage")}
                    </DropdownItem>
                    <DropdownItem
                        onClick={onVideoMessageButtonClick}>
                        <i className="fas fa-video me-2"></i>{props.t("VideoTypeMessage")}
                    </DropdownItem>
                </DropdownMenu>
            </ButtonDropdown>
        </div>
    );
}

export default NewMessageButtonsRow;