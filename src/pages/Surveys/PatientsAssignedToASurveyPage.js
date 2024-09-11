import React, { useState, useEffect, useMemo } from 'react';
import { Container, Card, CardBody, Badge } from 'reactstrap';
import useUserSession from '../../infrastructure/session/useUserSession';
import useEnvironment from '../../infrastructure/session/useEnvironment';
import { apiErrorToast } from '../../helpers/toastHelper';
import { OpenDetailsCell, TextIconCell, FromDateToDateCell } from '../../components/Common/TableCells';
import TableContainer from '../../components/Common/TableContainer';
import { LoadingSpinner } from '../../components/Common/LoadingSpinner';
import { withTranslation } from "react-i18next"
import Breadcrumbs from '../../components/Common/Breadcrumb';
import userSubscriptionState from '../../constants/userSubscriptionState'
import { getPatientsAssignedToASurvey } from '../../infrastructure/services/network/apiCalls/surveysApiService';
import { toLocalDatetime } from '../../common/formattedDatetime';

const PatientsAssignedToASurveyPage = (props) => {

    const surveyId = props.match.params.id;

    const [assignations, setAssignations] = useState();
    const userSession = useUserSession();
    const environment = useEnvironment();

    useEffect(() => {
        if (environment) {
            loadAssignations();
        }
    }, [environment]);

    function loadAssignations() {
        getPatientsAssignedToASurvey(
            surveyId,
            handleLoadAssignationsSuccess,
            apiErrorToast);
    }

    function handleLoadAssignationsSuccess(data) {
        setAssignations(data);
    }

    const columns = useMemo(
        () => [
            {
                Header: props.t("Name"),
                accessor: "name",
                maxWidth: 800,
                width: 800,
                disableFilters: true,
                disableGlobalFilter: false,
                filterable: true,
                Cell: (cellProps) => {
                    const assignation = cellProps.row.original;
                    return <TextIconCell
                        text={assignation.user.name}
                        iconSource={assignation.user.avatarUrl} />;
                }
            },
            {
                Header: props.t("Status"),
                accessor: "state",
                maxWidth: 800,
                width: 800,
                disableFilters: true,
                disableGlobalFilter: false,
                filterable: true,
                Cell: (cellProps) => {
                    const assignation = cellProps.row.original;
                    if (assignation.completed) {
                        return <Badge color='success'>{props.t("Completed")} {toLocalDatetime(assignation.completedDateTime)}</Badge>
                    }
                    else if (assignation.expired) {
                        return <Badge color='danger'>{props.t("Expired")} {toLocalDate(assignation.expireTime)}</Badge>
                    }
                    else {
                        return <Badge color='warning'>{props.t("Expire")} {toLocalDate(assignation.expireTime)}</Badge>
                    }
                }
            },
            {
                Header: props.t("Action"),
                accessor: "action",
                disableFilters: true,
                disableGlobalFilter: true,
                filterable: false,
                Cell: (cellProps) => {
                    const assignation = cellProps.row.original;
                    if (assignation.completed) {
                        return <OpenDetailsCell
                            linkTo={`/surveys/compiled/${assignation.id}`}
                            title={props.t("Show")} />;

                    }
                    else {
                        return "";
                    }


                }
            }
        ],
        [props.t]
    );

    return (
        <Container>
            <Breadcrumbs
                useHistory={true}
                history={props.history}
                title={props.t("StudySurveys")}
                breadcrumbItem={props.t("PatientsAssignedToASurvey")} />
            <Card >
                <CardBody>
                    {assignations == null ?
                        <LoadingSpinner />
                        :
                        <TableContainer
                            columns={columns}
                            data={assignations}
                            isGlobalFilter={true}
                            isAddTableWithoutBorderStrap={true}
                        />
                    }
                </CardBody>
            </Card>
        </Container>
    )
}

export default withTranslation()(PatientsAssignedToASurveyPage)