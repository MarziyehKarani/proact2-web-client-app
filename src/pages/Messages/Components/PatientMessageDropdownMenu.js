import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { useState } from 'react';
const PatientMessageDropdownMenu = ({props, onMessageDeleteButtonClick}) => {

    const [isOpen, setIsOpen] = useState();

    return (
        <Dropdown
            isOpen={isOpen}
            toggle={() => setIsOpen(!isOpen)}
            className="d-inline-block"
        >
            <DropdownToggle
                className="btn header-item waves-effect"
                id="page-header-user-dropdown"
                tag="button"
            >
                <i className="fas fa-ellipsis-v font-size-18 text-muted"></i>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
                <DropdownItem
                    onClick={onMessageDeleteButtonClick}>
                    <i className="fas fa-trash font-size-18 align-middle me-2 text-muted"></i>
                    <span>{props.t("DeleteMessageDialogTitle")}</span>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}

export default PatientMessageDropdownMenu;