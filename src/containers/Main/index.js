import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import routes from 'Constants/routes';

import Home from 'Containers/Home';
import Contact from 'Containers/Contact';
import NotFound from 'Containers/NotFound';
import AboutUs from '../AboutUs';


const Main = () => {
  return (
    <main>
      {/* <Toaster /> */}
      <Switch>
        <Route exact path={routes.HOME} component={Home} />
        <Route path={routes.ABOUTUS} component={AboutUs} />
        <Route path="*" component={NotFound} />
      </Switch>
    </main>
  );
};

export default Main;
