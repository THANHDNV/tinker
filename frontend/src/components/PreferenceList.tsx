import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Drawer, Box, CircularProgress, Typography, makeStyles, RootRef } from '@material-ui/core';
import { useLazyFetchPreference, IFetchPreference } from '../store/api/preference';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';

const useStyles = makeStyles((theme) => ({
	drawer: {},
	paper: {
		maxWidth: "500px",
		height: "50vh",
		display: 'flex',
		margin: 'auto',
		background: 'transparent',
		paddingLeft: theme.spacing(3),
		paddingRight: theme.spacing(3),
		boxSizing: 'border-box',
		boxShadow: "none"
	},
	wrapper: {
		background: 'white',
		height: "100%",
		boxShadow: "0px 8px 10px -5px rgb(0 0 0 / 20%), 0px 16px 24px 2px rgb(0 0 0 / 14%), 0px 6px 30px 5px rgb(0 0 0 / 12%);"
	},
	list: {
		overflowY: 'scroll',
		height: '100%',
	},
	row: {
		minHeight: '56px',
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #d8dadf',
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
		boxSizing: 'border-box'
	}
}))

interface IPreferenceList {
	open: boolean;
}

interface IPreferenceDrawer extends IPreferenceList {
	onToggle: (open: boolean) => void;
}

const PreferenceList = ({ open }: IPreferenceList): JSX.Element => {
	const classes = useStyles();

	const [page, setPage] = useState(0);
	const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

	const {
		setFetch,
		data: {
			data,
			page: fetchPage,
			limit,
			total
		} = {
			data: [] as IFetchPreference[],
			page: 0,
			limit: 10,
			total: 0
		},
		loading
	} = useLazyFetchPreference({
		page,
	});

	const [preferences, setPreferences] = useState<IFetchPreference[]>([]);

	const listRef = useRef<any>(null);

	const onScroll = useCallback((e: any) => {
		if (isLoadingMore || loading) {
			return;
		}

		const el = e.target;

		if (el.scrollHeight > el.scrollTop + el.clientHeight) {
			return;
		}

		if (limit * (fetchPage + 1) >= total) {
			// out of items
			return;
		}

		setIsLoadingMore(true);
	}, [isLoadingMore, loading])

	useEffect(() => {
		if (data.length) {
			if (fetchPage === 0) {
				setPreferences(data);
				return;
			}
			
			if (isLoadingMore) {
				setPreferences((list) => [
					...list,
					...data
				]);
				setIsLoadingMore(false);
			}
		}
	}, [data, fetchPage, isLoadingMore])

	useEffect(() => {
		if (isLoadingMore) {
			if (!loading) {
				if (limit * (fetchPage + 1) < total) {
					setPage((p) => p + 1)
					return;
				}
				setIsLoadingMore(false);
			}
		}
	}, [isLoadingMore, loading])

	useEffect(() => {
    const currentTarget = listRef.current;

		if (currentTarget) {
			currentTarget.addEventListener('scroll', onScroll);
		}

		return () => {
			if (currentTarget) {
				currentTarget.removeEventListener('scroll', onScroll);
			}
		}
	}, [listRef, onScroll])

	useEffect(() => {
		setFetch(open);
	}, [open])

	if (loading && !preferences.length) {
		return (
			<RootRef rootRef={listRef}>
				<Box width="100%" height="100%" display='flex' justifyContent="center" alignItems="center">
					<CircularProgress size="5rem" />
				</Box>
			</RootRef>
		)
	}

	if (!preferences.length && !loading) {
		return (
			<RootRef rootRef={listRef}>
				<Box 
					width="100%" 
					height="100%" 
					display='flex'
					justifyContent="center" 
					alignItems="center"
				>
					<Typography variant="body2">
						Make some connections!
					</Typography>
				</Box>
			</RootRef>
		)
	}

	return (
		<RootRef rootRef={listRef}>
			<Box className={classes.list}>
				{preferences.map((p) => {
					const StatusIcon = p.matched ? FavoriteOutlinedIcon : p.isLiked ? FavoriteBorderOutlinedIcon : ClearRoundedIcon;

					return (
						<Box
							width="100%"
							display='flex'
							justifyContent='space-between'
							className={classes.row}
							key={p.targetId}
						>
							<Typography variant='body2'>
								{[p.target.firstName, p.target.lastName].join(' ')}
							</Typography>
							<StatusIcon />
						</Box>
					);
				})}
				{isLoadingMore && (
					<Box 
						width="100%"
						display={'flex'}
						justifyContent="center" 
						alignItems="center" 
						py={2}
					>
						<CircularProgress size="2rem" />
					</Box>
				)}
				
			</Box>
		</RootRef>
	)
}

const PreferenceDrawer = ({
	open,
	onToggle
}: IPreferenceDrawer) => {
	const classes = useStyles();
	const onClose = () => onToggle(false);

	return (
		<Drawer anchor='top' open={open} onClose={onClose} className={classes.drawer} classes={{
			paper: classes.paper
		}}>
			<Box className={classes.wrapper}>
				<PreferenceList open={open} />
			</Box>
		</Drawer>
	)
}

export default PreferenceDrawer;