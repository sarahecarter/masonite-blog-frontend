import {Link, useParams} from "react-router-dom"

const SinglePost = ({posts, edit, deleteBlogPost}) => {
    // get the params from the url
    const params = useParams()
    const id = parseInt(params.id)

    // find the particular post
    const post = posts.find((p) => p.id === id)

    ////////////////////
    // Style Object
    /////////////////////
    const div = {
        textAlign: "center",
        border: "3px solid green",
        width: "80%",
        margin: "30px auto"
    }

    return <div style={div}>
        <h1>{post.title}</h1>
        <h3>{post.body}</h3>
        <button onClick={() => deleteBlogPost(post)}>Delete Post</button>
        <button onClick={() => edit(post)}>Edit Post</button>
        <Link to="/">
            <button>Go Back</button>
        </Link>
    </div>
}

export default SinglePost