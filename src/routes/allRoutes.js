import React from "react"
import { Redirect } from "react-router-dom"
// Messages
import Messages from "../pages/Messages/index"
// Profile
import CurrentUserProfile from "../pages/Users/CurrentUserProfile"
// Surveys
import CompiledSurveysMine from "../pages/Surveys/CompiledSurveysMine"
import NotCompiledSurveysMine from "../pages/Surveys/NotCompiledSurveysMine"
import SurveyResults from "../pages/Surveys/SurveyResults"
import SurveyResultsMine from "../pages/Surveys/SurveyResultsMine"
import CompileNewSurveyPage from "../pages/Surveys/CompileNewSurveyPage"
import CompiledSurveys from "../pages/Surveys/CompiledSurveys"
import ProjectSurveysPage from "../pages/Surveys/ProjectSurveysPage"
import PatientsAssignedToASurveyPage from "../pages/Surveys/PatientsAssignedToASurveyPage"
import SurveyResultsOverTheTimePage from "../pages/Surveys/SurveyResultsOverTheTimePage"
import SurveyStatsPage from "../pages/Surveys/SurveyStatsPage"
// Others
import ContactPage from "../pages/ContactPage"
import PatientsPage from "../pages/Users/PatientsPage"
import UnauthorizedPage from "../pages/UnauthorizedPage"

const userRoutes = [
  //Messages
  { path: "/messages", component: Messages },

  //profile
  { path: "/profile", component: CurrentUserProfile },

  //surveys
  { path: "/surveys/compiled/mine", component: CompiledSurveysMine },
  { path: "/surveys/compiled/mine/:id", component: SurveyResultsMine },
  { path: "/surveys/notcompiled/mine", component: NotCompiledSurveysMine },
  { path: "/surveys/compile/:id/:assegnationId", component: CompileNewSurveyPage },
  { path: "/surveys/compiled/:id", component: SurveyResults },
  { path: "/surveys/study", component: ProjectSurveysPage },
  { path: "/surveys/study/:id", component: PatientsAssignedToASurveyPage },
  { path: "/surveys/:id/patient/stats", component: SurveyResultsOverTheTimePage },
  { path: "/surveys/:id/stats", component: SurveyStatsPage },

  //Patients
  { path: "/patients", component: PatientsPage },
  { path: "/patients/surveys/:id", component: CompiledSurveys },

  //Others
  { path: "/contact", component: ContactPage },
  { path: "/unauthorized", component: UnauthorizedPage },

  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/messages" /> },
]

export { userRoutes }