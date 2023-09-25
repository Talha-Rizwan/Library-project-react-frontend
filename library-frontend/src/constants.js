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

export const ADD_BOOK = "Add Book";
export const UPDATE_BOOK = "Update";
export const APPROVE_TICKET = "Approve";
export const REJECT_TICKET = "Reject";
export const USER_TICKET = "User Ticket";
export const ACCESS_TOKEN = "access_token";
export const REFRESH_TOKEN = "refresh_token";
export const LIBRARIAN_ROLE = "librarian";

export const DashboardItems = [
  {
    name: "Requests",
    url: "requests/",
    description: "User book requests",
  },
  {
    name: "Books",
    url: "books/",
    description: "All library books",
  },
  {
    name: "Tickets",
    url: "tickets/",
    description: "User new book tickets",
  },
];

export const REQUEST_STATUS = {
  PENDING_STATUS: "P",
  APPROVED_STATUS: "A",
  REJECTED_STATUS: "R",
  RETURN_REQUEST_STATUS: "B",
  CLOSED_STATUS: "C",
};

export const TICKET_STATUS = {
  PENDING_STATUS: "P",
  APPROVED_STATUS: "A",
  REJECTED_STATUS: "R",
};

export const URL = `http://127.0.0.1:8000`;
