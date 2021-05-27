import React, {useState, useEffect} from 'react'
import useStyles from './style'
import { TextField, Button, Typography, Paper } from '@material-ui/core'  
import FileBase from 'react-file-base64'
import { useDispatch,useSelector } from 'react-redux'
import { createPost, updatePost } from '../../actions/posts'

const Form = ({currentId, setCurrentId}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId): null)
    const user = JSON.parse(localStorage.getItem('profile'))

    const [postData, setPostData] = useState({
        messages: '', tags: '', selectedFile: '' 
    })

    useEffect(() => {
        if(post) setPostData(post)
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if(currentId) {
            dispatch(updatePost(currentId, {...postData, name: user?.result?.name }))
        } else {
            dispatch(createPost({...postData, name: user?.result?.name }))
        }
        
        clear()
    }

    const clear = () => {
        setCurrentId(null)
        setPostData({ messages: '', tags: '', selectedFile: '' })
    }
    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant='h6'>
                   Please sign in to post
                </Typography>
            </Paper>
        )
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant='h6' align="left"> 
                    {currentId ? 'Edit' : 'Create'} a Post
                </Typography>

                <TextField 
                    name='messages' 
                    variant='outlined' 
                    label='Messages' 
                    fullWidth 
                    rows={4}
                    multiline={true}
                    value={postData.messages} 
                    onChange={(e) => setPostData({ ...postData, messages: e.target.value})} />

                <TextField 
                    name='tags' 
                    variant='outlined' 
                    label='Tags' 
                    fullWidth 
                    value={postData.tags} 
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',')})} />

                <div className={classes.fileInput}>
                    <FileBase 
                        type="file" 
                        multiple={false} 
                        onDone={({base64}) => setPostData({ ...postData, selectedFile: base64})} />
                </div>
                <Button 
                    className={classes.buttonSubmit}
                    variant='contained' 
                    color='primary' size='large' 
                    type='submit' 
                    fullWidth>
                    Submit
                </Button>
                <Button 
                    variant='contained' 
                    color='secondary' size='large' 
                    onClick={clear}
                    fullWidth>
                    Cancel
                </Button>
            </form>
        </Paper>
    )
}

export default Form
