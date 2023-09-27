import Button from "@mui/material/Button";
import styled from "styled-components";
import { createTheme } from "@mui/material/styles";
import { css } from '@emotion/react';

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


export const MODAL_STYLE = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// export const HEADER_TYPOGRAPHY_STYLE = {
//   flexGrow: 1,
//   display: { xs: "none", sm: "block" },
//   color: "black",
// }

export const HEADER_APPBAR_STYLE = { backgroundColor: "white" }

export const HEADER_TYPOGRAPHY_STYLE = css`
  flex-grow: 1;
  display: none;
  color: black;

  @media (min-width: 600px) {
    display: block;
  }
`;


