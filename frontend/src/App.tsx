import React, { useState } from 'react';
import { CircularProgress, Box, Container, makeStyles } from '@material-ui/core'
import { useFetchUsers, useLazyFetchUsers } from './store/api/user';
import TinkerList from './components/TinkerList';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		backgroundColor: "#6F8EAD",
		minHeight: "100vh",
		minWidth: "100vw"
	},
	list: {
		height: '100%'
	},
	container: {
		maxWidth: "500px",
		height: "100vh"
	},
	actionWrapper: {
		borderTop: "1px solid #d8dadf",
		background: 'white'
	},
	button: {
		width: "100%",
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		minHeight: "40px",
		borderRadius: 0,
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	likeButton: {
		borderLeft: "0.5px solid #d8dadf"
	},
	passButton: {
		borderRight: "0.5px solid #d8dadf"
	},
}))

function App() {
	const classes = useStyles();
	const [page, setPage] = useState(0);
	const [prefetchPage, setPrefetchPage] = useState(1);
	const { data: { data } = { data: []}, loading } = useFetchUsers({
		page
	});

	const { setFetch, isFetching: isPreFetching  } = useLazyFetchUsers({
		page: prefetchPage
	});

	if (loading) {
		return (
			<Box className={classes.wrapper} >
				<Container className={classes.container}>
					<Box width="100%" height="100%" display='flex' justifyContent="center" alignItems="center">
						<CircularProgress size="5rem" />
					</Box>
				</Container>
			</Box>
		)
	}

	const onFetchNextPage = () => {
		setPage((p) => p + 1);
	}

	const onPrefetch = () => {
		setPrefetchPage((p) => p + 1)
		if (!isPreFetching ) {
			setFetch(true);
		}
	}

  return (
		<Box minWidth="100wh" minHeight="100vh" className={classes.wrapper} >
			<Container className={classes.container}>
				<TinkerList users={data} className={classes.list} onPrefetch={onPrefetch} onFetchNextPage={onFetchNextPage} />
			</Container>
		</Box>
  );
}

export default App;
