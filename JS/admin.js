const username = document.getElementById('username');
username.innerText = sessionStorage.key(sessionStorage.key(0) != "IsThisFirstTime_Log_From_LiveServer"? 0 : 1); 
const account = JSON.parse(sessionStorage.getItem(username.innerText));
const status = document.getElementById('status');
const signOut = document.getElementById('signOut');
const details = document.getElementById('details');
fillDetails();

//Picture & Account settings
const profilePicture = document.getElementById('profilePicture');
profilePicture.src = account.profilePicture;
profilePicture.style.width = "100%";
profilePicture.style.height = "33%";
profilePicture.style.paddingBottom = "10px";
status.innerText = account.isAdmin? "Administrator" : "Member";


//Fill the list with all the members
const membersList = document.getElementById('membersList');
for(let i = 0; i < localStorage.length; i++)
{
  if (localStorage.key(i) != 'posts' && localStorage.key(i) != account.username)
  {
      let user = JSON.parse(localStorage.getItem(localStorage.key(i)));
      let li = document.createElement('li');
      li.innerHTML = `<div id="${user.username}"><img src="${user.profilePicture}" id="membersIMG"> ${user.username}</div> ${user.firstName} ${user.lastName} || ${user.birthDate} || ${user.email} || ${user.phoneNumber} || ${user.city} || ${user.street} <button type="button" class="btn btn-danger btn-sm">Remove</button>`;
      li.className = 'member';
      membersList.appendChild(li);
  }
}
let delUserButtons = document.querySelectorAll('.member');


//Events
signOut.addEventListener('click',() => sessionStorage.clear());
delUserButtons.forEach(li => li.lastChild.addEventListener('click',()=>
{
  if (confirm('Are you sure you want to delete this user?'))
  {
  localStorage.removeItem(li.firstChild.id); //Remove the user from the local storage based on the div ID which is the username
  li.remove();
  }
}));


// Update the community posts after signing in to the user
if (JSON.parse(localStorage.getItem('posts')) != null)
{
      for(let i = JSON.parse(localStorage.getItem('posts')).length; i >= 0 ; i--)
      {
        if (communityPosts.children.length > 4)
             communityPosts.removeChild(communityPosts.lastChild);

           let div = document.createElement('div');
           div.id = 'post';
           div.innerHTML+= JSON.parse(localStorage.getItem('posts'))[i];
           communityPosts.insertBefore(div,communityPosts.children[3]);
      }
}


postButton.addEventListener('click',()=>
{
    //Can't paste emptiness that's for sure.
    if (thoughts.value.length == 0)
      return;

    //This makes sure overflow doesn't happen (not allow more than 3 posts)
    if (communityPosts.children.length > 4)
       communityPosts.removeChild(communityPosts.lastChild);

    //Create a new post and remove the oldest post
    let newPost = post.cloneNode(true);
    newPost.children[1].src = account.profilePicture; 
    newPost.children[2].innerText = account.username;
    newPost.children[3].innerText = thoughts.value;
    let tempDate = new Date();
    newPost.children[4].innerText = tempDate.toDateString();
    communityPosts.insertBefore(newPost,communityPosts.children[3]);
    thoughts.value = ""

    //Store the posts in an array & then to the local storage
    let posts = [];
    Array.from(communityPosts.children).forEach(child => {
    if (child.id == 'post')
        posts.push(child.innerHTML); });

    localStorage.setItem("posts",JSON.stringify(posts));
});


function fillDetails()
{
details.innerHTML = `${account.firstName} ${account.lastName}<br>${account.email}`
}







