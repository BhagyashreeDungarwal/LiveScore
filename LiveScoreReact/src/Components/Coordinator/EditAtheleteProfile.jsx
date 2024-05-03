import { AddPhotoAlternateRounded } from '@mui/icons-material'
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { GetAtheleteByIdApi } from '../../Redux/Action/CoordinatorAction'


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const EditAtheleteProfile = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { atheleteByIddata } = useSelector(state => state.coordinator)
  const [image, setImage] = React.useState(atheleteByIddata ? atheleteByIddata.imageUrl :"");
  const [selectedFile, setSelectedFile] = React.useState()
const navigate = useNavigate()  

  useEffect(() => {
    dispatch(GetAtheleteByIdApi(id));
  }, [dispatch,id])

  const handleClose = () => {
    navigate("/coordinator/athelete")
  };


  const handleImage = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file)

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleUpdateImage = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("ImageFile", selectedFile);
      console.log(formData.get("ImageFile"))
    //   dispatch(CoordinatorUpdateProfilePicApi(cid, formData))
    //   dispatch(clearMessage())
    //   handleClose();

    } else {
      toast.error("Please First Select Image...")
    }
  }
    return (
        <Dialog
            open="true"
            TransitionComponent={Transition}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>Update Athlete Picture</DialogTitle>
            <DialogContent>

                <Avatar 
                 src={atheleteByIddata ? atheleteByIddata.imageUrl : image} 
                sx={{
                    height: "12rem",
                    width: "12rem",
                    margin: "auto",
                    boxShadow: "3px 3px 6px"
                }} />
                <TextField
                    // sx={{ margin: "2rem 0 ", }}
                    id="name"
                    onChange={handleImage}
                    sx={{ margin: "1rem 0 " }}
                    type="file"
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ display: "block" }}
                    fullWidth
                    onClick={handleUpdateImage}
                    startIcon={<AddPhotoAlternateRounded />}>
                    Update Image
                </Button>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}

export default EditAtheleteProfile