import React from 'react';
import { Link } from 'react-router-dom';
import { Badge, Button, UncontrolledTooltip } from 'reactstrap';

const LinkCell = ({ toParam, value, onClickCallback }) => {
    function onClickHandler() {
        if (onClickCallback != null) {
            onClickCallback(value);
        }
    }
    return (
        <Link to={toParam} onClick={onClickHandler} className="fw-bold link-primary"><small><u>{value ? value : ''}</u></small></Link>
    );
};

const TextCell = (cell) => {
    return cell.value ? cell.value : '';
};

const TextValueCell = ({ value }) => {
    return value ? value : '';
};

const Imagecell = (cell) => {
    return (
        <img
            src={cell.value}
            height="40"
        />
    );
};

const TextIconCell = ({ text, iconSource }) => {
    return (
        <span>
            <img
                src={iconSource}
                className="avatar-sm rounded-circle bg-light me-2"
            />
            {text}
        </span>
    );
}

const EditDeleteButtonsCell = ({ props, item, onDeleteCallback, onEditCallback }) => {
    return (

        <div
            className="btn-group btn-group-sm"
            role="group"
            aria-label="Basic example"
        >
            <Button
                color="info"
                className="btn-info"
                data-toggle="tooltip"
                data-placement="top"
                title={props.t("Edit")}
                onClick={() => onEditCallback(item)}
            >
                <i className="fas fa-pen"></i>
            </Button>
            <Button
                color="danger"
                className="btn-danger"
                data-toggle="tooltip"
                data-placement="top"
                title={props.t("Delete")}
                onClick={() => onDeleteCallback(item)}
            >
                <i className="fas fa-trash"></i>
            </Button>

        </div>
    );
}


const BooleanCell = (cell) => {
    return (
        <Badge
            className={"badge badge-pill bg-pill font-size-12 bg-soft-" + (cell.value ? "success" : "danger")}>
            {cell.value ? "True" : 'False'}
        </Badge>
    )
};

const EnableDisableCell = (cell) => {
    return (
        <Badge
            className={"badge badge-pill bg-pill font-size-12 bg-soft-" + (cell.value ? "success" : "danger")}>
            {cell.value ? "Enabled" : 'Disabled'}
        </Badge>
    )
};

const StatusCell = (cell) => {
    return (
        <Badge
            className={"badge badge-pill bg-pill font-size-12 bg-soft-" + (cell.value === 0 ? "success" : "danger")}>
            {cell.value === 0 ? "Open" : 'Closed'}
        </Badge>
    )
};

const BadgeCell = ({ color, title }) => {
    return (
        <Badge
            pill
            color={color}>
            {title}
        </Badge>
    )
};



const DateTimeCell = (cell) => {
    if (cell.value) {
        return (<small>{new Date(cell.value).toLocaleString()}</small>);
    }
    else {
        return '';
    }
};

const DateCell = (cell) => {
    if (cell.value) {
        return (<small>{new Date(cell.value).toLocaleDateString()}</small>);
    }
    else {
        return '';
    }
};

const FromDateToDateCell = ({ props, from, to }) => {

    var maxDate = new Date("9999-12-31T23:59:59");
    var fromDate = new Date(from).toLocaleDateString();
    var toDate = new Date(to).toLocaleDateString();

    return (<>
        <small><strong>{props.t("From")}</strong> {new Date(from) < maxDate ? fromDate : "∞"}</small>
        <br />
        <small><strong>{props.t("To")}</strong> {new Date(to) < maxDate ? toDate : "∞"}</small>
    </>);
};

const OpenDetailsCell = ({ title, linkTo }) => {
    return (
        <Link to={linkTo}
            title={title}
            className='btn-info btn btn-sm'>
            <i className="fas fa-eye me-2"></i>
            {title}
        </Link>
    );
}

export {
    LinkCell,
    TextCell,
    TextValueCell,
    BooleanCell,
    EnableDisableCell,
    StatusCell,
    DateCell,
    DateTimeCell,
    EditDeleteButtonsCell,
    Imagecell,
    TextIconCell,
    OpenDetailsCell,
    FromDateToDateCell,
    BadgeCell
};