import React, { useEffect, useState } from 'react';
import { Box, makeStyles, Grid, Button } from '@material-ui/core'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import TinkerCard from './TinkerCard';

interface ITinkerList {
	users?: any[];
	className?: any;
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
	className
}: ITinkerList) => {
	const classes = useStyles();
	const [activeUser, setActiveUser] = useState();

	if (users.length === 0) {
		return null;
	}

	useEffect(() => {
		if (users && users.length) {
			setActiveUser(users[0].id)
		}
	}, [users])

	return(
		<Box className={className}>
			<Box width='100%' height="100%" display='flex' flexDirection='column'>
				<Box flex="1" position='relative' >
					{users.map((user, index) => (
						<Box key={user.id} zIndex={-index} className={classes.cardWrapper}>
							<TinkerCard
								id={user.id}
								fullName={[user.firstName, user.lastName].join(' ')}
								imageUrl={user.picture}
								className={classes.card}
								isShowing={activeUser === user.id}
							/>
						</Box>
					))}
				</Box>
				<Box flex={0} className={classes.actionWrapper}>
					<Grid container>
						<Grid item xs={6}>
							<Button className={`${classes.button} ${classes.passButton}`} variant="text">
								<ClearRoundedIcon />
							</Button>
						</Grid>
						<Grid item xs={6}>
							<Button className={`${classes.button} ${classes.likeButton}`} variant="text">
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