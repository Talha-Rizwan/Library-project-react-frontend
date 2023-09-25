import React, { useEffect } from "react";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

import DashboardCard from "../../components/librarian/DashboardCard";
import { DashboardItems } from "../../constants";
import { isLibrarian, isTokenVaild } from "../../utils/authUtils";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isTokenVaild() === true && isLibrarian() === "false") {
      navigate("/");
    } else if (isTokenVaild() === false) {
      navigate("/login/");
    }
  });

  return (
    <Stack
      direction="column"
      spacing={{ xs: 8 }}
      sx={{ margin: "10px" }}
      justifyContent="center"
      alignItems="center"
    >
      <h1>Librarian Dashboard</h1>
      <Stack
        direction={{ xs: "column", lg: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        sx={{ margin: "10px" }}
      >
        {DashboardItems.map((item) => (
          <DashboardCard
            name={item.name}
            url={item.url}
            description={item.description}
          />
        ))}
      </Stack>
    </Stack>
  );
};
export default Dashboard;
