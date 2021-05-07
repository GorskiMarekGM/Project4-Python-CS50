
var user = '{{request.user}}'

function getToken(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

var csrftoken = getToken('csrftoken')


// document.addEventListener('DOMContentLoaded', function() {


//     // Use buttons to toggle between views
//     document.querySelector('#all_posts').addEventListener('click', () => get_posts());
//     document.querySelector('#following').addEventListener('click', () => get_following_posts());
//     //document.querySelector('#network').addEventListener('click', () => get_posts());
//     // document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
    
//     // Listen for user name click
//     //document.querySelector('.get-user').addEventListener('click', () => get_profile(dataset.user));
//     // document.querySelector('#compose').addEventListener('click', compose_email);
//     //data-user="${obj.author_id}"
//      // Show compose view and hide other views
//     //document.querySelector('#compose-view').style.display = 'block';

//     get_profile_page();
//     console.log('current user'+get_current_user_id());
// });

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
    console.log("profile id" + profile_id)

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
                <div class="col-sm" id="insert-button">
                    `+
                    insert_follow_btn(profile_id)                   
                +`</div>
            <div class="col-sm">${data.following}</div>
        </div>
    </div>
      `;

    //after displaying profile display user posts
    get_user_posts(profile_id);
  });
}

function insert_follow_btn(profile_id){
    current_user = get_current_user_id();
    if (profile_id != current_user) {

        fetch('/is_follower/'+ current_user +'/'+profile_id)
        .then(response => response.json())
        .then(data => { 
            result = data.result
            console.log("result: " + result)
            if(result == true){
                document.getElementById('insert-button').innerHTML = `
                <button type="button" id="button" class="btn btn-primary" onclick = "unfollow_profile(${profile_id})">Unfollow</button>`;
            }else{
                document.getElementById('insert-button').innerHTML = `
                <button type="button" id="button" class="btn btn-primary" onclick = "follow_profile(${profile_id})">Follow</button>`;
            }
        })
        console.log('PID:'+profile_id+' CURR: '+ current_user);
        
    }else{
        return ``;
    }
}

function follow_profile(profile_id){
    fetch('/follow/'+profile_id, {
        method: 'PUT',
        headers:{
            'Content-Type':'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({
            profile_id: profile_id
        })
      })
}

function unfollow_profile(profile_id){
    console.log("im at unfollow profile")
    fetch('/unfollow/'+profile_id, {
        method: 'PUT',
        headers:{
            'Content-Type':'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({
            profile_id: profile_id
        })
      })
}

function read_true(id){
    fetch('/emails/'+id, {
      method: 'PUT',
      headers:{
        'Content-Type':'application/json',
        'X-CSRFToken': csrftoken,
        },
      body: JSON.stringify({
          read: true
      })
    })
  }


function get_posts(){
    document.querySelector('.new_post').style.display = 'none';
    document.querySelector('.posts-view').innerHTML = '';

    fetch('/all_posts')
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

function get_following_posts(){
    document.querySelector('.new_post').style.display = 'none';
    document.querySelector('.posts-view').innerHTML = '';

    fetch('/following_posts')
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
function get_current_user_id(){
    try {
        //get current user
        user_id = JSON.parse(document.getElementById('user_id').textContent);
        console.log('current_user_id: '+user_id);
    } catch (error) {
        console.log('User is not logged in!')
    }
    return user_id
}
function send(){
    var title = document.getElementById('title').value
    console.log(title)
    var area = document.getElementById('textArea').value
    console.log(area)
}


function edit_post(post_id, title, text){
    var field = document.getElementById(post_id)

    field.innerHTML = `
        <div class="post-edit-container">
            <h3>Edit your post!</h3>
            <hr>
            <h5>Title: </h5> <input id="title" name="title" value="${title}"></input>
            <br>
            <br>
            <textarea class="form-control rounded-0" id="textArea" name="postText" rows="5">${text}</textarea>
        
            <br>
            <div class="btn btn-primary mb-2" onclick=send() >Edit</div>
        </div>
        `;
    
}




