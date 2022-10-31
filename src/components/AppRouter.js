import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router";
// import { Context } from "..";
import { publicRoutes,  } from "../routes";

 
const AppRouter = observer(() => {
//   const { user } = useContext(Context);
  return (
    <Routes>
        {    
        publicRoutes.map((route) => (
            <Route
                key={route.path}
                path={route.path}
                element={route.Element}
                exact
            />
            ))
        }
        <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
});

export default AppRouter;
