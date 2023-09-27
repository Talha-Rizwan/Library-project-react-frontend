import styled from "@emotion/styled";
import { Stack } from "@mui/material";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";

export const FormStyles = styled.button`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border: none;
`;

export const CustomStack = styled(Stack)`
  display: flex;
  gap: ${(props) => (props.useFlexGap ? "initial" : `${props.spacing}px`)};
  flex-wrap: ${(props) => props.flexWrap};
  flex-direction: ${(props) => props.direction.xs};

  @media (min-width: 600px) {
    flex-direction: ${(props) => props.direction.sm};
  }

  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
`;

export const StyledButton = styled(Button)`
  color: ${(props) => props.buttonColor};
`;

export const DetailCard = styled(Card)`
  width: 50%;
  margin: 50px;
`;

export const CustomHeading = styled(Typography)`
  margin: 50px;
  color: green;
  text-decoration: underline;
`;

export const CustomAppBar = styled(AppBar)`
  background-color: white;
`;

export const HeaderTypography = styled(Typography)`
  flex-grow: 1;
  color: black;
  display: none;

  @media (min-width: 600px) {
    display: block;
  }
`;

export const BoxStyles = styled.button`
  padding: 32px;
  background-color: white;
  font-size: 24px;
  border-radius: 1px;
  color: black;
  font-weight: bold;
`;

export const CardStyle = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border: none;
  width: 345px;
`;

export const CustomWideCard = styled(Card)`
  width: ${(props) => props.width}px;
  min-width: ${(props) => props.minWidth}px;
`;
