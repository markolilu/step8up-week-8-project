let token = localStorage.getItem('authToken');

function registerUser() {
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ username, email, password })
    })
    .then((response) => response.json())
    .then(data => {
        console.log("User registered:", data);
    })
    .catch(error => {
        console.error("Error registering user:", error);
    });
}

function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email, password })
    })
    .then((response) => response.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem('authToken', data.token);
            token = data.token;
            document.getElementById('auth-container').classList.add('hidden');
            document.getElementById('app-container').classList.remove('hidden');
        }
    })
    .catch(error => {
        console.error("Error logging in:", error);
    });
}

function logout() {
    fetch("http://localhost:3000/api/users/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    localStorage.removeItem('authToken');
    token = null;
    document.getElementById('app-container').classList.add('hidden');
    document.getElementById('auth-container').classList.remove('hidden');
}


function createPost() {
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;
    const category = document.getElementById('postCategory').value;
    fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title, content, category, postedBy: "user" })
    })
    .then((response) => response.json())
    .then(data => {
        console.log("Post created:", data);
    })
    .catch(error => {
        console.error("Error creating post:", error);
    });
}

function fetchPosts() {
    fetch("http://localhost:3000/api/posts", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    .then((response) => response.json())
    .then(data => {
        console.log("Posts fetched:", data);
        const postsContainer = document.getElementById('posts-list');
        postsContainer.innerHTML = '';
        data.forEach(post => {
            const postElement = document.createElement('div');
            dispatchEvent.innerHTML = `<h3>${post.title}</h3>
                                      <p>${post.content}</p>
                                      <p>Category: ${post.category}</p>
                                      <p>Posted by: ${post.postedBy}</p>`;
            postsContainer.appendChild(postElement);
        });
    })
    .catch(error => {
        console.error("Error fetching posts:", error);
    });
}

function updatePost(postId)

function deletePost(postId)