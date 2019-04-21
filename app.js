const commentlist  = document.querySelector('#cafe-list');
const form  = document.querySelector('#add-comment-form');
//create element and render with ui

function renderComment(doc){
    let li = document.createElement('li');
    let comment_text = document.createElement('span');
    let timestamp = document.createElement('span');
    let user_name = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id',doc.id);
    comment_text.textContent = doc.data().comment_text;
    timestamp.textContent = doc.data().timestamp;
    user_name.textContent = doc.data().user_name;
    cross.textContent = 'x';

    li.appendChild(comment_text);
    //li.appendChild(timestamp);
    li.appendChild(user_name);
    li.appendChild(cross);
    commentlist.appendChild(li);

    cross.addEventListener('click',(e) =>{
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('social').doc(id).delete();
    });
}

//get data
    //db.collection('social').get().then((snapshot)=>{
      //  snapshot.docs.forEach(doc =>{
        //    renderComment(doc);
        //})
    //})



//save data
form.addEventListener('submit',(e) => {
    e.preventDefault();
    db.collection('social').add({
        comment_text: form.comment_text.value,
        user_name: form.user_name.value

    });
    form.comment_text.value = '';
    form.user_name.value = '';
});

// real time data
db.collection('social').onSnapshot(snapshot =>{
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == 'added'){
            renderComment(change.doc);
        }else if(change.type == 'removed'){
            let li = commentlist.querySelector('[data-id='+change.doc.id+']');
            commentlist.removeChild(li);
        }
    });
});