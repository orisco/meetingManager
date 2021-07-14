import { FC } from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "../containers/homepage"

const AppRoutes: FC = () => {
  return (
    <Switch>
      <Route path="/" component={HomePage}/>
    </Switch>
  )
}

export default AppRoutes;