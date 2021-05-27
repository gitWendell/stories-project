import React from 'react'
import Post from './Post/Post'
import useStyles from './style'
import {useSelector} from 'react-redux'
import { CircularProgress } from '@material-ui/core'

const Posts = ({ setCurrentId }) => {
    const classes = useStyles()
    const posts = useSelector((state) => state.posts)
    
    return (
        !posts.length ? <CircularProgress /> : (
            <div className={classes.container}>
              {posts.map((post) => (
                  <Post key={post._id} post={post} setCurrentId={setCurrentId} />
              ))}
            </div>
        )
    )
}

export default Posts
