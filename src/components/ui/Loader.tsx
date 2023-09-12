import CircularProgress from '@mui/material/CircularProgress';

export  const Loader = () => {
  return <div className='ui-loader'>
    <CircularProgress disableShrink />;
  </div> 
}