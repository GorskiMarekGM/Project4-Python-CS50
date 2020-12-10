document.addEventListener('DOMContentLoaded', function() {


    // Use buttons to toggle between views
    document.querySelector('.post').addEventListener('click', () => console.log('Post clicked!'));

    get_user_posts(2);
});


//   // Show compose view and hide other views
//   document.querySelector('#posts-view').style.display = 'none';
//   document.querySelector('#compose-view').style.display = 'block';

function get_profile(profile_id){
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
  });
}

async function get_posts(){
    const response = await fetch('/all_posts');
    const data = await response.json();

    fetch('/all_posts')
      .then(response => response.json())
      .then(data.forEach(obj => {
        document.querySelector('.posts-view').innerHTML += `
        <div class="post">
            <h3>${obj.fields.title}</h3>
            <hr>
            
            <h5>${obj.fields.text}</h5>
            <br>
            <h5 style="font-size: 15px;">Created by: ${obj.fields.author.username}</h5>
            
            <div class="date">
                Date of creation: <br>
                ${obj.fields.creation_date}
            </div> 
            <div class="likes">
                likes: ${obj.fields.likes}
            </div>
        </div>
          `;
      })
    );
}

async function get_user_posts(profile_id){
    const response = await fetch('/user_posts/'+profile_id);
    const data = await response.json();

    fetch('/user_posts/'+profile_id)
      .then(response => response.json())
      .then(data.forEach(obj => {
        document.querySelector('.posts-view').innerHTML += `
        <div class="post">
            <h3>${obj.fields.title}</h3>
            <hr>
            
            <h5>${obj.fields.text}</h5>
            <br>
            <h5 style="font-size: 15px;">Created by: ${obj.fields.author.username}</h5>
            
            <div class="date">
                Date of creation: <br>
                ${obj.fields.creation_date}
            </div> 
            <div class="likes">
                likes: ${obj.fields.likes}
            </div>
        </div>
          `;
      })
    );
}