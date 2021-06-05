import React, { useMemo } from 'react';
import { CircularProgress } from '@material-ui/core'
import { useFetchUser } from './store/api/user';

function App() {
	const { data = [], loading, error } = useFetchUser();

	if (loading) {
		return (
			<CircularProgress />
		)
	}

	console.log(data);

  return (
		null	
  );
}

export default App;
