const filter = document.getElementById('filter');
const newsFeed = document.getElementById('news-feed-container');
const loader = document.getElementById('loader');

let limit = 4;
let page = 1

async function fetchPosts(){
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
    const data = await res.json();
    // console.log(data);
    return data;
}

async function updatePost(){
    const posts = await fetchPosts();
    posts.forEach(post => {
        // console.log(post);
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.innerHTML = `
            <div class="post-id">${post.id}</div>
                <div class="post-content">
                    <div class="post-title">${post.title}</div>
                    <div class="post-body">${post.body}</div>
            </div>
        `
        newsFeed.appendChild(postDiv)
    });
}

function showPost(){
    loader.classList.add('show');
    page++;
    updatePost();
    // loader.classList.remove('show')
}

function filterPosts(e){
    const filterKeyword = e.target.value.toLowerCase();
    const posts = document.querySelectorAll('.post');
    posts.forEach(post => {
        const title = post.querySelector('.post-title').innerText;
        const body = post.querySelector('.post-body').innerText;
        if(title.indexOf(filterKeyword) >= 0 || body.indexOf(filterKeyword) >= 0){
            post.style.display = 'flex'
        }else{
            post.style.display = 'none'
        }
    })
}

updatePost()

window.addEventListener('scroll', () =>{
    const {scrollTop, scrollHeight,clientHeight} = document.documentElement
    console.log(scrollTop,scrollHeight,clientHeight);
    if(scrollTop + clientHeight >= scrollHeight -1){
        showPost();
    }
})

filter.addEventListener('input', filterPosts)