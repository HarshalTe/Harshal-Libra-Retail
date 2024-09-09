import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import LockIcon from "@mui/icons-material/Lock";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEllipsisH,
  faEye,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

//*
import ChangePassword from "./ChangePassword";
import EditUser from "./EditUser";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

function Actions(props) {
  console.log("actions data", props);
  const [anchorEl, setAnchorEl] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const handleClose = () => {
    // setAnchorEl(!anchorEl);
    console.log("first", props.actions);
    props.setActions(!props.actions);
    console.log("second", props.actions);
  };
  const editClose = () => {
    setEdit(!edit);
  };
  const open = Boolean(props?.actions);
  const handleClick = (event) => {
    // setAnchorEl(event.currentTarget);
    props.setActions(event.currentTarget);
  };

  return (
    <div>
      <Tooltip title="Actions" placement="right">
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls="long-menu"
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <span className="icon icon-sm">
            <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
            {/* <MoreHorizIcon className="color-dark" /> */}
          </span>
        </IconButton>
      </Tooltip>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={props.actions}
        open={open}
        onClose={handleClose}
      >
        <EditUser
          handleClose={handleClose}
          data={props.data}
          // editClose={editClose}
          // edit={edit}
          openEdit={props.openEdit}
          setOpenEdit={props.setOpenEdit}
        />
        <ChangePassword handleClose={handleClose} data={props.data} />

        {/* <MenuItem onClick={handleClose} disableRipple>
          <LockIcon />
          Change Password
        </MenuItem> */}
        {/* <Divider sx={{ my: 0.5 }} /> */}
        {/* <MenuItem onClick={handleClose} disableRipple>
          <ArchiveIcon />
          Archive
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <MoreHorizIcon />
          More
        </MenuItem> */}
      </StyledMenu>
    </div>
  );
}

export default Actions;