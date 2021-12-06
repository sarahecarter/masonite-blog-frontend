import Post from "../components/Post"

const AllPosts = ({posts}) => {
    return posts.map((post) => {
        return <Post key={post.id} post={post}/>
    })
}

export default AllPosts