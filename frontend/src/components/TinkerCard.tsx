import React, { useMemo } from 'react';
import { Box, Grid, makeStyles, Button, Container, Typography } from '@material-ui/core';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';

const useStyles = makeStyles((theme) => ({
	image: {
		width: '100%',
		height: '70%'
	},
	button: {
		width: "100%",
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		minHeight: "40px"
	},
	infoWrapper: {
		flex: 1,
		padding: theme.spacing(3)
	},
	actionWrapper: {
		flex: 0,
		borderTop: "1px solid #f1f2f4"
	}
}))

interface ITinkerCard {
	id: string;
	fullName: string;
	imageUrl: string;
	className?: any;
	onLike?: (id: string) => void;
	onPass?: (id: string) => void;
}

const TinkerCard = ({
	id,
	fullName,
	imageUrl,
	onLike,
	onPass,
	className
}: ITinkerCard) => {
	const classes = useStyles();

	const onClickLike = () => {
		if (onLike) {
			onLike(id);
		}
	}

	const onClickPass = () => {
		if (onPass) {
			onPass(id);
		}
	}

	return(
		<Box display='flex' flexDirection='column' className={className}>
			<img src={imageUrl} alt={fullName} className={classes.image}/>
			<Box width="100%" className={classes.infoWrapper}>
				<Container>
					<Typography variant="h6">
						{fullName}
					</Typography>
				</Container>
			</Box>
			<Grid container className={classes.actionWrapper}>
				<Grid item xs={6}>
					<Button className={classes.button} variant="text" onClick={onClickPass}>
						<ClearRoundedIcon />
					</Button>
				</Grid>
				<Grid item xs={6}>
					<Button className={classes.button} variant="text" onClick={onClickLike}>
						<FavoriteBorderOutlinedIcon />
					</Button>
				</Grid>
			</Grid>
		</Box>
	)
}

export default TinkerCard;