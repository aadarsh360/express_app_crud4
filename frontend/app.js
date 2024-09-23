const userForm = document.querySelector('#userForm');
const userTable = document.getElementById('userTable');

let editUserId = null;


// fetch all user
function fetchUsers(){

    fetch('http://localhost:3000/api/users')
    .then(response => response.json())
    .then((data) => {
        userTable.innerHTML='';
        data.forEach( user =>{
            const row = document.createElement('tr');
            row.innerHTML = `<th scope="row">${user.id}</th>
            <td>${user.name}</td>
            <td>${user.mobile}</td>
            <td>${user.email}</td>
            <td>${user.age}</td>
            <td>
                <button class="btn btn-primary" onclick="editUser(${user.id}, '${user.name}', ${user.mobile}, '${user.email}', ${user.age})" >Update</button>
                <button class="btn btn-danger" onclick="deleteUser(${user.id})">Delete</button>
            </td>`;

            userTable.appendChild(row);
        });
    });
}

userForm.addEventListener('submit', (event)=>{

    event.preventDefault();
    const name = document.getElementById('userName').value;
    const mobile = document.getElementById('userMobile').value;
    const email = document.getElementById('userEmail').value;
    const age = document.getElementById('userAge').value;

    if(editUserId){
        const id = editUserId;
        
        fetch('http://localhost:3000/api/update', {
            method: 'PUT',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({id, name, mobile, email, age}),

        })
        .then(()=>{
            fetchUsers();
            userForm.reset();
            editUserId = null;
        })
    }
    else{
        // add new user
        fetch('http://localhost:3000/api/create',{

            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({name, mobile, email, age}),
    
        })
        .then(()=>{
            fetchUsers();
            userForm.reset();
        })
    }

})

function editUser(id, name, mobile, email, age){
    console.log(name, mobile, email, age);
    document.getElementById('userName').value = name;
    document.getElementById('userMobile').value = mobile;
    document.getElementById('userEmail').value = email;
    document.getElementById('userAge').value = age;
    editUserId = id;

}

function deleteUser(id){

    fetch('http://localhost:3000/api/delete', {
        method: 'DELETE',
        headers:{
            'content-type':'application/json',
        },
        body:JSON.stringify({id}),
    })
    .then(()=>{
        fetchUsers();
    })
}
fetchUsers();