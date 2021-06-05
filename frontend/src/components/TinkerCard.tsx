import React, { useEffect, useMemo } from 'react';
import { Box, makeStyles, Container, Typography } from '@material-ui/core';
import { differenceInYears } from 'date-fns';
import { useLazyFetchUserDetail } from '../store/api/user';

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
	id: string;
	fullName: string;
	imageUrl: string;
	isShowing?: boolean;
	className?: any;
}

const TinkerCard = ({
	id,
	fullName,
	imageUrl,
	isShowing = false,
	className
}: ITinkerCard) => {
	const { data, loading, setFetch} = useLazyFetchUserDetail(id);

	const classes = useStyles();

	useEffect(() => {
		setFetch(isShowing);
	}, [isShowing])

	const age = useMemo(() => {
		return isShowing && !loading && !!data ? differenceInYears(new Date(), new Date(data.dateOfBirth)) : 0;
	}, [isShowing, loading, data])

	return(
		<Box display='flex' flexDirection='column' className={className}>
			<img src={imageUrl} alt={fullName} className={classes.image}/>
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