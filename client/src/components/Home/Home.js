import React, {useState, useEffect} from 'react'
import { Container, Grow} from '@material-ui/core'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import { useDispatch } from 'react-redux'
import { getPosts } from '../../actions/posts'

const Home = () => {
    const [currentId, setCurrentId] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])

    return (
        <Grow in>
            <Container>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
              <Posts setCurrentId={setCurrentId} />
            </Container>
        </Grow>
    )
}

export default Home
