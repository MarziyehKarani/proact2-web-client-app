import React from "react"
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import { Row, Col, BreadcrumbItem } from "reactstrap"
import { BackButton } from "../../components/Common/BackButton";
import { HistoryBackButton } from "./HistoryBackButton";
const Breadcrumb = props => {

  function handleClick() {
    if(props.useHistory)
      props.history.goBack();
}


  return (
    <Row>
      <Col className="col-12">
        <div className="page-title-box d-flex align-items-center justify-content-between">

          <h4 className="mb-0">
            {
              !props.backButtonHidden &&
              <>
               { props.useHistory ?
                <HistoryBackButton title="Back" history={props.history} />
                :
                <BackButton linkTo={props.backButtonLinkTo} title="Back" />}
              </>
            }
            {" "} {props.breadcrumbItem}
          </h4>

          <div className="page-title-right">
            <ol className="breadcrumb m-0">
              <BreadcrumbItem>
                <Link to={ !props.useHistory ? props.backButtonLinkTo : "#"} onClick={handleClick} >{props.title}</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>
                <Link to="#">{props.breadcrumbItem}</Link>
              </BreadcrumbItem>
            </ol>
          </div>
        </div>
      </Col>
    </Row>
  )
}

Breadcrumb.propTypes = {
  breadcrumbItem: PropTypes.string,
  title: PropTypes.string,
  backButtonHidden: PropTypes.bool,
  useHistory: PropTypes.bool
}

export default Breadcrumb
