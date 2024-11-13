import Box from '@mui/material/Box'
const Icon = ({width="69px",height="51px",src}:{width?:string,height?:string,src:string}) => {
  return (
    <Box style={{width,height}}>
        <img src={src} style={{width:"100%",height:"100%",objectFit:"contain"}}/>
    </Box>
  )
}

export default Icon