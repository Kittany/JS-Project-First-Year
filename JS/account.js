const username = document.getElementById("username");
username.innerText = sessionStorage.key(
  sessionStorage.key(0) != "IsThisFirstTime_Log_From_LiveServer" ? 0 : 1
);
const account = JSON.parse(sessionStorage.getItem(username.innerText));
const status = document.getElementById("status");
const signOut = document.getElementById("signOut");
const post = document.querySelector("#post");
const thoughts = document.getElementById("thoughts");
const postButton = document.getElementById("postButton");
const communityPosts = document.getElementById("communityPosts");
const adminPage = document.getElementById("adminPage"); //Admin page nav link
const details = document.getElementById("details");
fillDetails();

//Picture settings
const profilePicture = document.getElementById("profilePicture");
profilePicture.src = account.profilePicture;
profilePicture.style.width = "100%";
profilePicture.style.height = "33%";
profilePicture.style.paddingBottom = "10px";

status.innerText = account.isAdmin ? "Administrator" : "Member";
adminPage.style.display = account.isAdmin ? "flex" : "none";

//Events
signOut.addEventListener("click", () => sessionStorage.clear());
document.getElementById("gamesTab").addEventListener("click", () => {
  
  location.href = "/loadingPage.html";
});

// Update the community posts after signing in to the user
if (JSON.parse(localStorage.getItem("posts")) != null) {
  for (let i = JSON.parse(localStorage.getItem("posts")).length; i >= 0; i--) {
    if (communityPosts.children.length > 4)
      communityPosts.removeChild(communityPosts.lastChild);

    let div = document.createElement("div");
    div.id = "post";
    div.innerHTML += JSON.parse(localStorage.getItem("posts"))[i];

    //EDIT THIS
    communityPosts.insertBefore(div, communityPosts.children[3]);
  }
}

postButton.addEventListener("click", () => {
  //Can't paste emptiness that's for sure.
  if (thoughts.value.length == 0) return;

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
  communityPosts.insertBefore(newPost, communityPosts.children[3]);
  thoughts.value = "";

  //Store the posts in an array & then to the local storage
  let posts = [];
  Array.from(communityPosts.children).forEach((child) => {
    if (child.id == "post") posts.push(child.innerHTML);
  });

  localStorage.setItem("posts", JSON.stringify(posts));
});

function fillDetails() {
  details.innerHTML = `${account.firstName} ${account.lastName}<br>${account.email}`;
}
