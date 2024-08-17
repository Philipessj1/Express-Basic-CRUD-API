const output = document.querySelector('#output');
const button = document.querySelector('#get-posts-btn');
const form = document.querySelector('#add-post-form');

const handleCreatePostEl = post => {
    const postEl = document.createElement('div');
    postEl.textContent = post.title;
    output.appendChild(postEl);
}

// Get and show posts
const showPosts = async () => {

    try {
        const res = await fetch('http://localhost:8000/api/posts');
        if (!res.ok) throw new Error('Failed to fetch posts!');

        const posts = await res.json();
        output.innerHTML = '';

        posts.forEach(post => {
            handleCreatePostEl(post);
        });
    } catch (error) {

        console.log('Error fetching posts: ', error);
    }
}

//Submit new post
const addPost = async e => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', document.getElementById('title').value);

    const title = formData.get('title');
    try {
        
        const res = await fetch('http://localhost:8000/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title })
        })
        
        const newPost = await res.json();
        handleCreatePostEl(newPost);
        showPosts();

    } catch (error) {
        console.error(error);
    }
}

// Event listeners
button.addEventListener('click', showPosts);
form.addEventListener('submit', addPost);
