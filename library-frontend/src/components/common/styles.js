import Button from "@mui/material/Button";
import styled from "styled-components";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
      primary: {
        main: "#FFFFFF",
      },
      secondary: {
        main: "#E0C2FF",
        light: "#F5EBFF",
        contrastText: "#47008F",
      },
    },
  });
  
export const StyledNavButton = styled(Button)`
    && {
      color: ${theme.palette.primary.main};
    }
  `;
  
export const StyledTypography = styled("div")`
    margin-right: 2px;
    font-family: monospace;
    font-weight: 700;
    letter-spacing: 0.3rem;
    color: inherit;
    text-decoration: none;
  
    @media (max-width: 900px) {
      display: ${(props) => (props.isXs ? "flex" : "none")};
    }
    @media (min-width: 900px) {
      display: ${(props) => (props.isXs ? "none" : "flex")};
    }
  `;