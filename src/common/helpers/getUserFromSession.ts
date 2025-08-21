 
export default function getUserFromSession(){
    const user = sessionStorage.getItem('_AUTH');
    return user ? (typeof user == 'object' ? user : JSON.parse(user)) : null;
  };

  