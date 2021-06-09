import React, { useEffect, useState } from 'react';
import { CircularProgress, Box, Container, makeStyles } from '@material-ui/core'
import { useLazyFetchUsers } from './store/api/user';
import TinkerList from './components/TinkerList';
import { AuthProvider, useAuthContext } from './store/context/auth';

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

const Layout = () => {
	const { loading: authLoading } = useAuthContext();
	const classes = useStyles();
	const [page, setPage] = useState(0);
	const [prefetchPage, setPrefetchPage] = useState(0);

	const { setFetch, data: { data } = { data: []}, loading } = useLazyFetchUsers({
		page
	});

	const { setFetch: setPreFetch, isFetching: isPreFetching  } = useLazyFetchUsers({
		page: prefetchPage
	});

	useEffect(() => {
		setFetch(!authLoading);
	}, [authLoading]);

	const onFetchNextPage = () => {
		setPage((p) => p + 1);
	}

	const onPrefetch = () => {
		setPrefetchPage((p) => p + 1)
		if (!isPreFetching ) {
			setPreFetch(true);
		}
	}

	if (loading) {
		return (
			<Box width="100%" height="100%" display='flex' justifyContent="center" alignItems="center">
				<CircularProgress size="5rem" />
			</Box>
		)
	}

	return (
		<TinkerList
			users={data}
			className={classes.list}
			onPrefetch={onPrefetch}
			onFetchNextPage={onFetchNextPage}
		/>
  );
}

function App(): JSX.Element {
	const classes = useStyles();

	return (
		<AuthProvider>
			<Box className={classes.wrapper} >
				<Container className={classes.container}>
					<Layout />
				</Container>
			</Box>
		</AuthProvider>
	)
}

export default App;
