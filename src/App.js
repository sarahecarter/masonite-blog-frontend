// Import Components
import AllPosts from "./pages/AllPosts";
import SinglePost from "./pages/SinglePost";
import Form from "./pages/Form";

// Import Hooks from React 
import {useState, useEffect} from "react"

// Import components from React Router
import {Route, Routes, Link, useNavigate} from "react-router-dom"

function App() {

  ////////////////////
  // Style Objects
  ////////////////////
  const h1 = {
    textAlign: "center",
    margin: "10px"
  }

  const button = {
    backgroundColor: "navy",
    display: "block",
    margin: "auto"
  }

  ////////////////////////////
  // State & Other Variables
  ////////////////////////////
  const navigate = useNavigate()

  // API URL
  const url = "https://sc-masonite-blog-backend.herokuapp.com/blog/"

  // State to hold all blog posts 
  const [posts, setPosts] = useState([])

  // Empty blog post to initialize create form
  const nullBlogPost = {
    title: "",
    body: ""
  }

  const [targetBlogPost, setTargetBlogPost] = useState(nullBlogPost)

  //////////////
  // Functions
  //////////////
  const getBlogPosts = async () => {
    const response = await fetch(url)
    const data = await response.json()
    setPosts(data)
  }

  const addBlogPosts = async (newBlogPost) => {
    await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newBlogPost)
    })

    getBlogPosts()
  }

  const getTargetBlogPost = (blogPost) => {
    setTargetBlogPost(blogPost)
    navigate("/edit")
  }

  const updateBlogPost = async (blogPost) => {
    await fetch(url + blogPost.id, {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(blogPost)
    })

    getBlogPosts()
  }

  const deleteBlogPost = async (blogPost) => {
    await fetch(url + blogPost.id, {
      method: "delete"
    })

    getBlogPosts()
    navigate("/")
  }

  //////////////
  // useEffects
  //////////////
  useEffect(() => {
    getBlogPosts()
  }, [])

  /////////////////////
  // returned JSX
  /////////////////////
  return (
    <div className="App">
      <h1 style={h1}>My Blog</h1>
      <Link to="/new"><button style={button}>Create a New Post</button></Link>
      <Routes>
        <Route path="/" element={<AllPosts posts={posts}/>}/>
        <Route path="/post/:id" element={<SinglePost 
        posts={posts}
        edit={getTargetBlogPost}
        deleteBlogPost={deleteBlogPost}
        />}/>
        <Route path="/new" element={<Form
          initialBlogPost={nullBlogPost}
          handleSubmit={addBlogPosts}
          buttonLabel="Create Blog Post"
        />} />
        <Route path="/edit" element={<Form
          initialBlogPost={targetBlogPost}
          handleSubmit={updateBlogPost}
          buttonLabel="Update Blog Post"
        />}/>
      </Routes>
    </div>
  );
}

export default App;
