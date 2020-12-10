document.addEventListener('DOMContentLoaded', function() {


    // Use buttons to toggle between views
    document.querySelector('#all_posts').addEventListener('click', () => get_posts());
    //document.querySelector('#network').addEventListener('click', () => get_posts());
    // document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
    
    // Listen for user name click
    //document.querySelector('.get-user').addEventListener('click', () => get_profile(dataset.user));
    // document.querySelector('#compose').addEventListener('click', compose_email);
    //data-user="${obj.author_id}"
     // Show compose view and hide other views
    //document.querySelector('#compose-view').style.display = 'block';

    get_profile_page();

    console.log('user: '+ get_current_user())
    console.log('here'+user_id)
    //get_user_posts(2);
    //get_posts();
});

function get_profile_page(){
    try {
        const userData = document.querySelector('#profile_link');
        
        // Use buttons to toggle between views
        document.querySelector('#profile_link').addEventListener('click', () => get_profile(userData.dataset.userid));

    } catch (error) {
        
    }
}
//   // Show compose view and hide other views
//   document.querySelector('#posts-view').style.display = 'none';
//   document.querySelector('#compose-view').style.display = 'block';

function get_profile(profile_id){

document.querySelector('.new_post').style.display = 'none';
document.querySelector('.posts-view').innerHTML = '';

fetch('/profile/'+profile_id)
  .then(response => response.json())
  .then(data => {
    document.querySelector('.posts-view').innerHTML += `
    <div class="profile-container">
        <div class="row" style="text-align: center;">
            <div class="col-sm-2"></div>
            <div class="col-sm-8">${data.userName}</div>
            <div class="col-sm-2"></div>
        </div>
        <div class="row" style="text-align: center;">
            <div class="col-sm">Followers</div>
            <div class="col-sm"></div>
            <div class="col-sm">Following</div>
        </div>
        <div class="row" style="text-align: center;">
            <div class="col-sm">${data.followers}</div>
                <div class="col-sm"><button type="button" id="button" class="btn btn-primary">Follow</button></div>
            <div class="col-sm">${data.following}</div>
        </div>
    </div>
      `;

    //after displaying profile display user posts
    get_user_posts(profile_id);
  });
}

function get_posts(){
    document.querySelector('.new_post').style.display = 'none';
    document.querySelector('.posts-view').innerHTML = '';

    fetch('/all_posts')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        data.forEach(obj => {
            document.querySelector('.posts-view').innerHTML += `
            <div class="post">
                <h3>${obj.title}</h3>
                <hr>
                
                <h5>${obj.text}</h5>
                <br>
                <div class="get-user" onclick = "get_profile(${obj.author_id})">
                    <h5 style="font-size: 15px;">Created by: ${obj.author}</h5>
                </div>
                <div class="date">
                    Date of creation: <br>
                    ${obj.creation_date}
                </div> 
                <div class="likes">
                    likes: ${obj.likes}
                </div>
            </div>
            `;
      });
    });
}

function get_user_posts(profile_id){
    fetch('/user_posts/'+profile_id)
    .then(response => response.json())
    .then(data => {
        data.forEach(obj => {
            document.querySelector('.posts-view').innerHTML += `
            <div class="post">
                <h3>${obj.title}</h3>
                <hr>
                
                <h5>${obj.text}</h5>
                <br>
                <div class="get-user" onclick = "get_profile(${obj.author_id})">
                    <h5 style="font-size: 15px;">Created by: ${obj.author}</h5>
                </div>
                <div class="date">
                    Date of creation: <br>
                    ${obj.creation_date}
                </div> 
                <div class="likes">
                    likes: ${obj.likes}
                </div>
            </div>
            `;
        });
    });
}

function get_current_user(){
    var user_id;

    fetch('/get_user')
    .then(response => response.json())
    .then(data => {
            user_id = data.id;
            console.log(user_id);
        });
    return user_id;
}
console.log('curr user: '+get_current_user())