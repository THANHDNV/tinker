import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import TinkerCard from './TinkerCard';

interface ITinkerList {
	users?: any[];
}

const useStyles = makeStyles(() => ({
	cardWrapper: {
		backgroundColor: 'white',
		position: 'absolute',
		width: '100%',
		height: '100%'
	},
	card: {
		width: '100%',
		height: '100%'
	}
}))

const TinkerList = ({
	users = []
}: ITinkerList) => {
	const classes = useStyles();

	if (users.length === 0) {
		return null;
	}

	return(
		<Box position='relative' width='100%' height="100vh">
			{users.map((user, index) => (
				<Box key={user.id} zIndex={-index} className={classes.cardWrapper}>
					<TinkerCard
						id={user.id}
						fullName={[user.firstName, user.lastName].join(' ')}
						imageUrl={user.picture}
						className={classes.card}
					/>
				</Box>
			))}
		</Box>
	)
}

export default TinkerList;