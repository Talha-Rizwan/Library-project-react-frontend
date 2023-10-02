import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import DashboardCard from "../../components/librarian/DashboardCard";
import { DashboardItems } from "../../constants";
import { isLibrarian, isTokenVaild } from "../../utils/authUtils";
import { CustomStack } from "../../emotionStyle";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isTokenVaild() && isLibrarian() === "false") {
      navigate("/");
    } else if (!isTokenVaild()) {
      navigate("/login/");
    }
  });

  return (
    <CustomStack
      useFlexGap
      spacing={{ xs: 8 }}
      flexWrap="wrap"
      direction={{ xs: "column", sm: "column" }}
      justifyContent="center"
      alignItems="center"
    >
      <h1>Librarian Dashboard</h1>
      <CustomStack
        useFlexGap
        spacing={{ xs: 1, sm: 2, md: 4 }}
        flexWrap="wrap"
        direction={{ xs: "column", sm: "row" }}
        justifyContent="center"
        alignItems="center"
      >
        {DashboardItems.map((item) => (
          <DashboardCard
            name={item.name}
            url={item.url}
            description={item.description}
          />
        ))}
      </CustomStack>
    </CustomStack>
  );
};
export default Dashboard;
