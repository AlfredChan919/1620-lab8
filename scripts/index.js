function populateSelectionOptions(users) {
    const options = document.querySelector('select');
    for (let user of users) {
      const option = document.createElement('option');
      option.value = user.id;
      option.textContent = user.name;
      options.appendChild(option);
    }
}

function displayPosts(posts, user) {
  /**
   * Display posts for a particular user
   * Add a heading in the form of 'User name's posts'
   * Add a list of posts
   */
  const heading = document.createElement('h2');
  const list = document.createElement('ul');
  const container = document.querySelector('.posts');

  if (!user) {
    heading.textContent = 'My posts';
  } else {
    heading.textContent = `${user}'s posts`;
  }
  
  container.appendChild(heading);
  container.appendChild(list);

  for (let post of posts) {
    const postContainer = document.createElement('li');
    const title = document.createElement('h3');
    const body = document.createElement('p');
    title.textContent = post.title;
    body.textContent = post.body;

    postContainer.append(title, body);
    list.appendChild(postContainer);
  }
}

function displayOwnPosts() {
  /**
   * Display my own posts
   * Get the list of posts from local storage
   * Call displayPosts()
   */
  if (!localStorage.getItem('posts')) return;

  const posts = JSON.parse(localStorage.getItem('posts'));
  displayPosts(posts);
}

document.querySelector('select').addEventListener('change', (e) => {
  document.querySelector('.posts').innerHTML = '';
  if (e.target.value === '') return;

  if (e.target.value === '0') {
      displayOwnPosts();
      return;
  }
  const options = e.target.options;
  const idx = e.target.selectedIndex;
  const id = options[idx].value;
  const name = options[idx].textContent;
  getPosts({id, name});
});

window.addEventListener('storage', () => {
  const select = document.querySelector('select');
  const event = new Event('change');
  select.value = '0';
  select.dispatchEvent(event);
});


/** COMPLETE THIS PART */

async function getUsers() {
  /**
   * Fetch the list of users from jsonplaceholder
   * If request successful, populate the select
   * element options with the returned data.
   * 
   */

  // Your code here
  try{
      const url = "https://jsonplaceholder.typicode.com/users";
      const response = await fetch(url);
      const users= await response.json();
      // const userlist = document.querySelector('#user');
      // for (let user of users) {
      //   const option = document.createElement('option');
      //   option.value=user.id;
      //   option.textContent=user.name;
      //   userlist.appendChild(option)
        
        
      // }
      populateSelectionOptions(users);
  }catch(error){
    console.error(error)
  }
  

}

async function getPosts(user) {
/**
 * Fetch posts belonging to this user
 * If request successful, display the posts
 */

// Your code here
  try{
    // const url = "https://jsonplaceholder.typicode.com/posts/";
    const url = `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`;

    const response = await fetch(url);
    const posts= await response.json();
    // const div =document.querySelector('.posts');
    displayPosts(posts,user.name);

    // for(let post of posts){
    //   // if (user.id == post.userId){
    //     const title = document.createElement('h3');
    //     const posting = document.createElement('p');
    //     title.textContent=post.title;
    //     posting.textContent=post.body;
        
    //     // div.appendChild(title);
    //     // div.appendChild(posting);

    //   // }
    // }
  }catch(error){
  console.error(error)
}
} 

getUsers();

  



  
