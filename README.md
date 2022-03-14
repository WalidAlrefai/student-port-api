# student-port-apiDesicrption
Create files for the project.
create the important packages like sequrlize and express etc.
create server , root index , router and middlewear and models.
create /signin and /signup route /users routes.
Two middleware : BasicAuth ,BeareAuth ,


## Path and body
post/signup

post/signin



body{

    "firstName" take string
    "lastName" take string
    "username" take string 
    "password" take string 
    "role" take string {admin , student }
}

to use route /users you need signin before and take token put in bearerAuth 

/users => get , get(id) , put(id) , delete(id)  

for update student just can update firstName and lastName , admin can update everything 
