import React, { useEffect, useMemo, useState } from 'react';
import { Box, makeStyles, Grid, Button, Fade } from '@material-ui/core'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import TinkerCard from './TinkerCard';

interface ITinkerList {
	users?: Array<{
		id: string;
		firstName: string;
		lastName: string;
		picture: string;
	}>;
	onPrefetch?: () => void;
	onFetchNextPage?: () => void;
	className?: string;
}

const useStyles = makeStyles((theme) => ({
	cardWrapper: {
		backgroundColor: 'white',
		position: 'absolute',
		width: '100%',
		height: '100%'
	},
	card: {
		width: '100%',
		height: '100%'
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

const TinkerList = ({
	users = [],
	onPrefetch,
	onFetchNextPage,
	className
}: ITinkerList): JSX.Element | null => {
	const classes = useStyles();
	const [activeUser, setActiveUser] = useState<string | undefined>();

	const renderUsers = useMemo(() => {
		if (!activeUser) {
			return [];
		}

		const foundIndex = users.findIndex((user) => user.id === activeUser)

		if (foundIndex < 0) {
			return [];
		}

		const showingUsers = [];

		if (foundIndex > 0) {
			showingUsers.push(users[foundIndex - 1])
		}

		showingUsers.push(users[foundIndex])

		if (users[foundIndex + 1]) {
			showingUsers.push(users[foundIndex + 1])
		}

		return showingUsers;
	}, [activeUser, users]);

	const nextUser = useMemo(() => {
		if (!activeUser) {
			return null;
		}

		const foundIndex = users.findIndex((user) => user.id === activeUser);
		if (typeof foundIndex === 'number') {
			if (foundIndex < users.length - 1) {
				return users[foundIndex + 1].id;
			}
		}

		return null;
	}, [activeUser]);

	const renderUserComponents = useMemo(() => renderUsers.map((user) => (
		<Fade key={user.id} in={activeUser === user.id} timeout={500}>
			<Box className={classes.cardWrapper} >
				<TinkerCard
					user={user}
					className={classes.card}
					isShowing={activeUser === user.id}
					isNext={nextUser === user.id}
				/>
			</Box>
		</Fade>
	)), [renderUsers]);

	useEffect(() => {
		if (users && users.length) {
			setActiveUser(users[0].id)
		}
	}, [users])

	if (users.length === 0) {
		return null;
	}

	const onClickPass = () => {
		const foundIndex = users.findIndex((user) => user.id === activeUser);
		if (foundIndex < users.length - 1) {
			if (foundIndex === users.length - 3) {
				if (onPrefetch) {
					onPrefetch();
				}
			}
			setActiveUser(users[foundIndex + 1].id)
			return;
		}

		if (onFetchNextPage){
			onFetchNextPage();
		}
	}

	const onClickLike = () => {
		const foundIndex = users.findIndex((user) => user.id === activeUser);
		if (foundIndex < users.length - 1) {
			if (foundIndex === Math.round((users.length - 1) / 2)) {
				if (onPrefetch) {
					onPrefetch();
				}
			}
			setActiveUser(users[foundIndex + 1].id)
			return;
		}

		if (onFetchNextPage){
			onFetchNextPage();
		}
	}

	return(
		<Box className={className}>
			<Box width='100%' height="100%" display='flex' flexDirection='column'>
				<Box flex="1" position='relative' >
					{renderUserComponents}
				</Box>
				<Box flex={0} className={classes.actionWrapper}>
					<Grid container>
						<Grid item xs={6}>
							<Button className={`${classes.button} ${classes.passButton}`} variant="text" onClick={onClickPass}>
								<ClearRoundedIcon />
							</Button>
						</Grid>
						<Grid item xs={6}>
							<Button className={`${classes.button} ${classes.likeButton}`} variant="text" onClick={onClickLike}>
								<FavoriteBorderOutlinedIcon />
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Box>
	)
}

export default TinkerList;