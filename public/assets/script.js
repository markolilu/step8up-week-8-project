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
            alert("User Logged In successfully");
            

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

const categoryMap = {
    1: 'Technology',
    2: 'Lifestyle',
    3: 'Travel',
    4: 'Food',
    5: 'Education'
};

function createPost() {
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;
    const categoryId = document.getElementById('postCategory').value;
    fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title, content, category_id: categoryId, postedBy: "user" })
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
    const category = document.getElementById("filterCategory").value;

    console.log("Selected category:", category);


    let url = "http://localhost:3000/api/posts";

    if (category) {
        url += `?category=${category}`;
    }

    fetch(url, {
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
            postElement.innerHTML = `<h3>${post.title}</h3>
                                      <p>${post.content}</p>
                                      <p>Category: ${categoryMap[post.category_id] || 'Uncategorised'}</p>
                                      <p>Posted by: ${post.user ? post.user.username : 'Unknown'}</p>
                                      <button onclick="updatePost('${post.id}')">Edit</button>
                                      <button onclick="deletePost('${post.id}')">Delete</button>`;
            postsContainer.appendChild(postElement);
        });
    })
    .catch(error => {
        console.error("Error fetching posts:", error);
    });
}

function updatePost(postId) {
    const newTitle = prompt("Enter new title:");
    const newContent = prompt("Enter new content:");
    const newCategoryId = prompt("Enter new category ID:");

    const updatedData = {};

    if (newTitle !== null) updatedData.title = newTitle;
    if (newContent !== null) updatedData.content = newContent;
    if (newCategoryId !== null) updatedData.category_id = newCategoryId;

    fetch(`http://localhost:3000/api/posts/${postId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(updatedData)
    })
    .then((response) => response.json())
    .then(data => {
        console.log("Post updated:", data);
        fetchPosts();
    })
    .catch(error => {
        console.error("Error updating post:", error);
    });
}

function deletePost(postId) {
    fetch(`http://localhost:3000/api/posts/${postId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    .then((response) => response.json())
    .then(data => {
        console.log("Post deleted:", data);
        fetchPosts();
    })
    .catch(error => {
        console.error("Error deleting post:", error);
    });
}