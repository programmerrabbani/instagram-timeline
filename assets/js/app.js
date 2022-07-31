

document.title = ' Instagram App ';

const insta_post_form = document.getElementById('insta_post_form');
const insta_edit_form = document.getElementById('insta_edit_form');
const msg = document.querySelector('.msg');
const all_post = document.querySelector('.all_post');


// get all data

const getAllData = () =>{

    const posts = readeLSData('insta_post');

    let list = '';

    if (!posts) {
        
          list = `<div class="card my-3"><div class="card-body shadow-sm text-center">No Posts Found</div></div>`
         return false;

    }
        
        posts.reverse().map((item) => {

            list +=`
            
            <div class="insta_timeline my-4">
        <div class="card shadow-sm">
          <div class="card-body">
            <div class="post_augth">
              <div class="user_info my-3">
                <a href="#"><img src="${item.aphoto}" alt=""></a>
                <div class="user_details">
                  <span>${item.aname}</span>
                </div>
              </div>
              <div class="dropdown my-3">
                <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fa-solid fa-ellipsis"></i>
                </a>

                <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <li><a class="dropdown-item edit_post" href="#insta_edit_modal" data-bs-toggle="modal" post_id=${item.id}>Edite</a></li>
                     <li><a class="dropdown-item delete_post" post_id=${item.id} href="#">Delete</a></li>
                  </ul>
            </div>
            </div>
            <div class="post_content my-3 ">
              <p>${item.pcontent}</p>
            </div>
          </div>
          <img src="${item.pphoto}" alt="">
          <div class="post_footer my-3">
            <div class="post_icon">
              <ul>
                <li><a href="#"><svg aria-label="Like" class="_ab6-" color="#8e8e8e" fill="#8e8e8e" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path></svg></a></li>
                <li><a href="#"><svg aria-label="Comment" class="_ab6-" color="#8e8e8e" fill="#8e8e8e" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg></a></li>
                <li><a href="#"><svg aria-label="Share Post" class="_ab6-" color="#8e8e8e" fill="#8e8e8e" height="24" role="img" viewBox="0 0 24 24" width="24"><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon></svg></a></li>
              </ul>
            </div>
            <div class="post_middle_icon">
             <i class="fa-solid fa-ellipsis"></i>
            </div>
            <div class="post_last_icon">
             <a href="#"><svg aria-label="Save" class="_ab6-" color="#8e8e8e" fill="#8e8e8e" height="24" role="img" viewBox="0 0 24 24" width="24"><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon></svg></a>
            </div>
          </div>
        </div>
       </div>
            
            
            `;

        });


    all_post.innerHTML = list;

}


getAllData();


// submit form

insta_post_form.onsubmit = (e) =>{

    e.preventDefault();

    const form_data = new FormData(e.target);

    const postData = Object.fromEntries(form_data.entries());

    const { aname , aphoto , pcontent , pphoto } = Object.fromEntries(form_data.entries());

   

    if ( !aname || !aphoto || !pcontent ) {
        

        msg.innerHTML = setAlert(' All Fields Are Required ');

    } else {
         const randid = Math.floor(Math.random() * 1000000) + '_' + Date.now();
      let make_data = {...postData , id : randid};

      

        createLSData('insta_post', make_data);

        msg.innerHTML = '';
        e.target.reset();

        getAllData();


    }

}



// delete post

all_post.onclick = (e) =>{

  e.preventDefault()

  if (e.target.classList.contains('delete_post')) {
    
    const postid = e.target.getAttribute('post_id');

    const posts = readeLSData('insta_post');

    const delete_post = posts.filter(data => data.id !== postid);


    updateLSData('insta_post', delete_post);

     getAllData();

  } else if (e.target.classList.contains('edit_post')) {
    
    const postid = e.target.getAttribute('post_id');

    const posts = readeLSData('insta_post');

    const edit_post = posts.findIndex(data => data.id == postid);

  

    const { aname , aphoto , pcontent , pphoto , id } =posts[edit_post];


    insta_edit_form.innerHTML = `
    
    <div class="my-3">
            <label for="">
              <div class="my-3">
                <label for="">Augth Name</label>
                <input name="aname" type="text" value="${aname}" class="form-control">
                <input name="id" type="hidden" value="${id}" class="form-control">
              </div>
              <div class="my-3">
                <label for="">Augth Photo</label>
                <input name="aphoto" type="text" value="${aphoto}"  class="form-control">
              </div>
              <div class="my-3">
                <label for="">Post Content</label>
                <textarea name="pcontent" class="form-control">${pcontent}</textarea>
              </div>
              <div class="my-3">
                <label for="">Post Photo</label>
                <input name="pphoto" type="text" value="${pphoto}" class="form-control">
              </div>
              <div class="my-3">
                <input type="submit" value="Update Now" class="btn btn-primary w-100">
              </div>
            </label>
          </div>
    
    `;


  }

}


insta_edit_form.onsubmit = (e) =>{

  e.preventDefault();

  const form_data = new FormData(e.target);

  const { aname , aphoto , pcontent , pphoto , id } = Object.fromEntries(form_data.entries());

  const allData = readeLSData('insta_post');

  const index = allData.findIndex(item => item.id == id);

   allData[index] = { aname , aphoto , pcontent , pphoto , id };


  updateLSData('insta_post', allData);

  getAllData();

}