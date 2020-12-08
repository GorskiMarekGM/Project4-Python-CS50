document.addEventListener('DOMContentLoaded', function() {


    // Use buttons to toggle between views
    document.querySelector('.post').addEventListener('click', () => console.log('Post clicked!'));
   
  });


function get_profile(profile_id){
fetch('/profile/'+id)
  .then(response => response.json())
  .then(data => {
    document.querySelector('#here').innerHTML += `
    <div class="profile-container">
        <div class="row" style="text-align: center;">
            <div class="col-sm-2"></div>
            <div class="col-sm-8">${data.username}</div>
            <div class="col-sm-2"></div>
        </div>
        <div class="row" style="text-align: center;">
            <div class="col-sm">Followers</div>
            <div class="col-sm"></div>
            <div class="col-sm">Following</div>
        </div>
        <div class="row" style="text-align: center;">
            <div class="col-sm">${data.followers}</div>
            {% if user.is_authenticated %}
                <div class="col-sm"><button type="button" id="button" class="btn btn-primary">Follow</button></div>
            {% endif %}
            <div class="col-sm">${data.following}</div>
        </div>
    </div>
      `;

  });
}