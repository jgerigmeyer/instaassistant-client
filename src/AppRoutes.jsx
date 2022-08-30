import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// ------- REDUX -------
import { Provider } from "react-redux";
import store from "./redux";

//View Imports
import App from 'App';
import { Billing } from 'View/Billing';
import { Profile } from 'View/Profile';
import { Account } from 'View/Account';
import { Accounts } from 'View/Accounts';
import { FAQ } from 'View/FAQ';
import { Login } from 'View/Login';
import { SignUp } from 'View/SignUp';
import { Task } from 'View/Task';
import Tasks from 'View/Tasks';

// NextUI import
import { NextUIProvider, createTheme } from '@nextui-org/react';

const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: {
            // brand colors
            primaryLight: '$green200',
            primaryLightHover: '$green300',
            primaryLightActive: '$green400',
            primaryLightContrast: '$green600',
            primary: '#4ADE7B',
            primaryBorder: '$green500',
            primaryBorderHover: '$green600',
            primarySolidHover: '$green700',
            primarySolidContrast: '$white',
            primaryShadow: '$green500',
      
            gradient: 'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
            link: '#5E1DAD',
      
            // you can also create your own color
            myColor: 'rgba(95, 95, 95, 0.4)',
            menue: 'rgb(34, 34, 34)'

      
            // ...  more colors
    },
  },
});

const lightTheme = createTheme({
  type: 'light',
  theme: {
    colors: {
      // brand colors
      primaryLight: '$green200',
      primaryLightHover: '$green300',
      primaryLightActive: '$green400',
      primaryLightContrast: '$green600',
      primary: '#4ADE7B',
      primaryBorder: '$green500',
      primaryBorderHover: '$green600',
      primarySolidHover: '$green700',
      primarySolidContrast: '$white',
      primaryShadow: '$green500',

      gradient: 'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
      link: '#5E1DAD',

      // you can also create your own color
      myColor: 'rgba(0, 0, 0, 0.2)',
      menue: 'rgb(212, 212, 212)'

      // ...  more colors
},
  },
});

function AppRoutes() {
  const [theme, setTheme] = useState(darkTheme);

  return (
    <NextUIProvider theme={theme}>
      <Provider store={store}>
        <Routes>
          <Route
            path="/"
            element={
              <App
                setTheme={setTheme}
                lightTheme={lightTheme}
                darkTheme={darkTheme}
                theme={theme}
              />
            }
          >
            <Route index element={<Profile />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/instagram/account/:account_id" element={<Account />} />
            <Route path="/FAQ" element={<FAQ />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/task" element={<Task />} />
            <Route path="/tasks" element={<Tasks />} />
          </Route>
        </Routes>
      </Provider>
    </NextUIProvider>
  );
}

export default AppRoutes;
