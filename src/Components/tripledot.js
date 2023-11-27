import * as React from 'react';
import Popover from '@mui/material/Popover';
import { IconButton, Stack } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';

export default function TripleDotOption(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const [loading, setLoading] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deletePost = async () =>{
    setLoading(true);
    await deleteDoc(doc(db,"Posts",props.postID))
    .then(()=>{
      props.setReload(!props.reload)
      setLoading(false)
    }).catch((err)=>{
      console.log(err)
    })
  }
  const deleteComment = async (id) =>{
    setLoading(true)
    await deleteDoc(doc(db,"Comments",props.commentID))
    .then(()=>{
      props.getComments()
      setLoading(false)
    }).catch((err)=>{
      console.log(err)
    })
  }

  const editComment = () =>{
    props.setEditingComment(false)
  }
  const editPost = ()=>{
    props.setEditingPost(true)
  }
  return (
    <div>
      <IconButton onClick={handleClick} aria-label="delete">
        <MoreHorizIcon/>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
      >
       <Stack direction="column" spacing={0}>
        <LoadingButton
          size="small"
          color='error'
          onClick={props.action === "Post"?deletePost:deleteComment}
          endIcon={<DeleteOutlineIcon/>}
          loading={loading}
          loadingPosition="end"
          variant="outlined"
          sx={{borderRadius:'0px'}}
        >
        <span>Delete</span>
        </LoadingButton>
        <LoadingButton
          size="small"
          onClick={props.action === "Comment"?editComment:editPost}
          endIcon={<EditIcon/>}
          // loading={editLoading}
          loadingPosition="end"
          variant="outlined"
          sx={{borderRadius:'0px'}}
        >
        <span>Edit</span>
        </LoadingButton>
       </Stack>
      </Popover>
    </div>
  );
}

