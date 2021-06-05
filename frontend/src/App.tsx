import React, { useMemo } from 'react';
import { CircularProgress, Box, Container, makeStyles } from '@material-ui/core'
import { useFetchUser } from './store/api/user';
import TinkerList from './components/TinkerList';

const useStyles = makeStyles(() => ({
	wrapper: {
		backgroundColor: "#6F8EAD"
	},
	container: {
		maxWidth: "500px",
		height: "100vh"
	}
}))

function App() {
	const classes = useStyles();
	const { data: { data } = { data: []}, loading, error } = useFetchUser();

	if (loading) {
		return (
			<Box minWidth="100wh" minHeight="100vh" className={classes.wrapper} >
				<Container className={classes.container}>
					<Box width="100%" height="100%" display='flex' justifyContent="center" alignItems="center">
						<CircularProgress size="5rem" />
					</Box>
				</Container>
			</Box>
		)
	}

  return (
		<Box minWidth="100wh" minHeight="100vh" className={classes.wrapper} >
			<Container className={classes.container}>
				<TinkerList users={data} />
			</Container>
		</Box>
  );
}

export default App;
