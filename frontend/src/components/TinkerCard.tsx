import React, { useEffect, useMemo } from 'react';
import { Box, makeStyles, Container, Typography } from '@material-ui/core';
import { differenceInYears } from 'date-fns';
import { useLazyFetchUserDetail } from '../store/api/user';
import { IUser } from '../types';

const useStyles = makeStyles((theme) => ({
	image: {
		width: '100%',
		height: '65%'
	},
	infoWrapper: {
		flex: 1,
		padding: theme.spacing(3),
		boxSizing: 'border-box'
	},
}))

interface ITinkerCard {
	user: IUser
	isShowing?: boolean;
	isNext?: boolean;
	className?: string;
}

const TinkerCard = ({
	user,
	isShowing = false,
	isNext = false,
	className
}: ITinkerCard): JSX.Element | null => {
	const { data, loading, isFetching, setFetch} = useLazyFetchUserDetail(user.id);

	const classes = useStyles();

	useEffect(() => {
		if (!isFetching) {
			setFetch(isShowing || isNext);
		}
	}, [isShowing, isNext, isFetching])

	const age = useMemo(() => {
		return isShowing && !loading && !!data ? differenceInYears(new Date(), new Date(data.dateOfBirth)) : 0;
	}, [isShowing, loading, data])

	if (!isShowing) {
		return null;
	}

	const fullName = [user.firstName, user.lastName].join(" ");

	return(
		<Box display='flex' flexDirection='column' className={className}>
			<img src={user.picture} alt={fullName} className={classes.image}/>
			<Box width="100%" className={classes.infoWrapper}>
				<Container>
					<Typography variant="h6">
						{[fullName, age].join(' ')}
					</Typography>
				</Container>
			</Box>
		</Box>
	)
}

export default TinkerCard;