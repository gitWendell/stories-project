import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()

const notify = (data) => {
    if(data['type'] === 'success') {
        toast.success(data['message'])
    } else {
        toast.error(data['message'])
    }
}

const check = (data) => { 
    data.then(response => {
        if(response.status >= 200 && response.status < 300) {
            console.log(response.data)
            notify(response.data)
        } 
    }).catch(error => {
        notify(error.response.data)
    })
  
    return data;
}

const API = axios.create({ baseURL: 'https://stories-sproject.herokuapp.com'})

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})

export const fetchPosts = () => API.get('/posts')

export const createPost = (newPost) => {
    let data = API.post('/posts', newPost)
    
    return check(data)
} 

export const updatePost = (id, updatePost) => {
    let data = API.patch(`/posts/${id}`, updatePost)

    return check(data)
} 

export const commentPost = (id, updatePost) => API.patch(`/posts/${id}/comments`, updatePost)
export const deleteComment = (id, key, post) => API.patch(`/posts/${id}/comments/${key}`, post)

export const deletePost = (id) => {
    let data = API.delete(`/posts/${id}`)

    return check(data)
} 

export const likePost = (id) => API.patch(`/posts/${id}/likePost`)

export const signIn = (formData) => {
    let data = API.post('/user/signin', formData)

    return check(data)
}

export const signUp = (formData) => {
    let data = API.post('/user/signup', formData)

    return check(data)
} 