import * as React from 'react';
import Avatar from '@mui/material/Avatar';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name,size) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: size,
      height: size,
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

export default function BackgroundLetterAvatars(props) {
  const userName = props.name.split(" ")
  return (
    <>
    {userName[1] === "" ||userName[1] === undefined?<Avatar sx={{width:props.size,height:props.size,}}>{userName[0].substring(0,1)}</Avatar>:<Avatar {...stringAvatar(props.name,props.size)} />}
    </>
    
  );
}