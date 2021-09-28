import React,{useRef} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { TextField } from '@material-ui/core';


const useStyles = makeStyles({
  list: {
    width: 360,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer({toggleDrawer, state}) {
  const classes = useStyles();

  const roomNameRef = useRef();

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
    >
             <TextField required id="standard-required"  defaultValue="Hello World" inputRef={roomNameRef}/>

    </div>
  );

  return (
    <div>
{['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
