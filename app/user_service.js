module.exports = {
  authenticate,add
};
//Mock users
var Users = [{firstname:'Jane',lastname:'Doe',email:'jane.doe@yahoo.com',username:'janedoe123',password:'123123'},
             {firstname:'John',lastname:'Doe',email:'john.doe@yahoo.com',username:'john.doe@lostcity.org',password:'123123'}];

function authenticate({username, password}) {
  const user = Users.find(u => { return u.username == username});
  if(user && user.password == password) {
      return user;
  }
}

function add(user) {
  const existing = Users.find(u => { return u.username == user.username});
  if(existing) {
    return "failed";
  }
  if(!user.firstname || !user.lastname || !user.username || !user.password || !user.email) {
    return "failed";
  } else {
    Users.push(user);
    return "success";
  }
  
}
