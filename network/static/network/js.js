document.addEventListener('DOMContentLoaded', function() {


    // Use buttons to toggle between views
    //document.querySelector('.post').addEventListener('click', () => console.log('Post clicked!'));
                
    get_profile_page();
    //get_user_posts(2);
    //get_posts();
});

function get_profile_page(){
    try {
        const userData = document.querySelector('#profile_link');

        // Use buttons to toggle between views
        //document.querySelector('#profile_link').addEventListener('click', () => get_user_posts(parseInt(userData.dataset.userid)));
        document.querySelector('#profile_link').addEventListener('click', () => get_profile(userData.dataset.userid));

    } catch (error) {
        
    }
}


//   // Show compose view and hide other views
//   document.querySelector('#posts-view').style.display = 'none';
//   document.querySelector('#compose-view').style.display = 'block';

function get_profile(profile_id){

document.querySelector('.new_post').innerHTML = '';
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

//Fix this function
function get_profile_name(profile_id){

    var username;
    
    fetch('/profile/'+profile_id)
      .then(response => response.json())
      .then(data => {
          username = data.userName.toString();
          console.log(username);
        
      });
    return username;
}

function get_posts(){
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
                <h5 style="font-size: 15px;">Created by: ${obj.author}</h5>
                
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
// 
function get_inbox(mailbox){
    let i = 0;
    fetch('/emails/'+mailbox)
    .then(response => response.json())
    .then(emails => {
  
      emails.forEach(email => {
  
        document.querySelector('#emails-view').innerHTML += `<div class="card" style="width: 18rem;">
              <div id="email-${i}">
                <div class="card-body" style="cursor:pointer;">
                  <h5 class="card-title">${email.subject}</h5>
                  <h6 class="card-subtitle mb-2">From: ${email.sender}</h6>
                  <p class="card-text">${email.body}</p>
                  <h6 class="card-subtitle mb-2">${email.timestamp}</h6>
                  <button onclick="archive(${email.id})" class="btn btn-sm btn-outline-primary" style="background-color:white" >Archive</button>
                </div>
              </div>
            </div>
        `;
        i++;
      });
  
    });
  }
//

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
                <h5 style="font-size: 15px;">Created by: ${obj.author}</h5>
                
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