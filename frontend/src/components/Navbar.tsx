import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, makeStyles } from '@material-ui/core';
import PreferenceDrawer from './PreferenceList';

const useStyles = makeStyles(() => ({
	toolbar: {
		justifyContent: 'space-between'
	}
}))

const Navbar = () => {
	const classes = useStyles();
	const [open, setOpen] = useState<boolean>(false);

	const onClickView = () => {
		setOpen(true);
	}
	
	return(
		<AppBar position='static'>
			<Toolbar className={classes.toolbar}>
				<Typography variant="h6">
					Tinker
				</Typography>
				<Button color="inherit" onClick={onClickView}>View history</Button>
				<PreferenceDrawer open={open} onToggle={setOpen} />
			</Toolbar>
		</AppBar>
	)
}

export default Navbar;