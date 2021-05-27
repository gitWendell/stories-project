import React from 'react'
import useStyles from './style'
import { useDispatch } from 'react-redux'
import { Card, CardActions, TextField, CardContent, CardMedia, Button, Typography } from '@material-ui/core'
import {AiFillDelete} from 'react-icons/ai'
import {FiMoreHorizontal} from 'react-icons/fi'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import moment from 'moment'
import { useState } from 'react'

import { deletePost, likePost, commentPost, deleteComment } from '../../../actions/posts'

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles() 
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'))
    const [content, setContent] = useState({
        post: {}, content: ''
    })

    const handleSubmit = (e) => {
      e.preventDefault()

      console.log(content)
      dispatch(commentPost(content['_id'], content))
    }

    const handleFocusOut = (e) => {
      if(e.which == 13 || e.keyCode == 13) {

        e.target.value = ''
        e.target.blur()
      }
    }

    const Likes = () => {
      if (post.likes.length > 0) {
        return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
          ? (
            <><ThumbUpAltIcon fontSize="small" />&nbsp;&nbsp;&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
          ) : (
            <><ThumbUpAltOutlined fontSize="small" />&nbsp;&nbsp;&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
          );
      }
  
      return <><ThumbUpAltOutlined fontSize="small" />&nbsp;&nbsp;&nbsp;Like</>;
    };

    return (
      <Card data-aos="fade-down" className={classes.card}>
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">{moment(post.createAt).fromNow()}</Typography>
        </div>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && ( 
          <div className={classes.overlay2}>
            <Button size="large" onClick={() => { 
                setCurrentId(post._id); 
                window.scrollTo({top: 0, behavior: 'smooth'})
              }}>
                <FiMoreHorizontal fontSize="default" />
              </Button>
          </div>
        )}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">{post.messages}</Typography>
        </CardContent>
        <div className={classes.details}>
          <Typography component="h2" color="textPrimary">
            {post.tags.map((tag) => (
              <div key={tag} className={classes.tag}>
                {tag}
              </div>
            ))}
            </Typography>
        </div>
        <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
        <CardActions className={classes.cardActions}>
          <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
            <Likes />
          </Button>
          {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
            <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
              <AiFillDelete fontSize="small" />&nbsp;&nbsp; Delete &nbsp;
            </Button>
          )}
        </CardActions>
        { !user?.result ?
        <div className={classes.comments}>
          <Typography variant="h6">Please sign in to view and add comments</Typography>
        </div>
        : (
        <div className={classes.comments}>
          <Typography variant="h5">Comments</Typography>
          <form onSubmit={handleSubmit}>
            <TextField 
              name='content' 
              variant='outlined' 
              label='Comment something ...' 
              fullWidth 
              onKeyPress={handleFocusOut}
              onChange={(e) => setContent({...post, comments: { content:e.target.value, name: user?.result?.name }} ) } />
          </form>
          <br />
          <div className={classes.commentsList} color="textPrimary">
            <div className={classes.scroll}>
              {post.comments.map((comment, index) => (
                <div className={classes.comment} key={index}>
                  <Typography className={classes.name}>
                    {comment['name']}
                    {(user?.result?.googleId === comment['ownerId'] || user?.result?._id === comment['ownerId']) && (
                      <Button size="small" color="secondary" onClick={() => dispatch(deleteComment(post._id, index, post))}>
                        &nbsp;Delete
                      </Button>
                    )}
                  </Typography>
                  <Typography >{comment['content']}</Typography>
                </div>
              ))}
            </div>
          </div>
        </div>
        )}
      </Card>
    )
}

export default Post
