import React, { useRef, useState, useContext } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { IconButton } from "@material-ui/core";
import { ShowSearchListContext } from "../../contexts/ShowSearchListContext";
import SearchIcon from "@material-ui/icons/Search";
import useStyles from "./styles";
import SearchList from '../SearchList/SearchList';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default function TemporaryDrawer({ toggleDrawer, state }) {
  const classes = useStyles();

  const roomNameRef = useRef();

  const { openSearchList, showSearchList, closeSearchList } = useContext(
    ShowSearchListContext
  );

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTermChange = (e) => {
    openSearchList();
    setSearchTerm(e.target.value);
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
    >
      <div className={classes.sidebar_search__container}>
        <IconButton onClick={toggleDrawer("left", false)}>
          <ArrowBackIcon/>
        </IconButton>
        
        <div className={classes.sidebar_search}>
          <div className={classes.sidebar_searchicon_div}>
            <SearchIcon className={classes.searchIcon} />
          </div>
          <input
            type="text"
            placeholder="search your friend here"
            className={classes.inputField}
            onChange={handleSearchTermChange}
          />
        </div>
      </div>

      {showSearchList && <SearchList searchTerm={searchTerm} toggleDrawer={toggleDrawer} state={state} /> }

    </div>


  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
