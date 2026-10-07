import axios from "axios";
import { showAlert } from "./alerts";

const api = axios.create({
  withCredentials: true,
});

export const login = async(email, password) => {
try{ const res= await api({
    method:'POST',
    url:'/api/v1/users/login',
    data:{
        email,
        password
    }
  });
  if(res.data.status==='success'){
    showAlert('success','Logged in succesfully');
    window.setTimeout(()=>{
      location.assign('/');
    },1500);
  }}
  catch(err){
    const message = err.response && err.response.data ? err.response.data.message : 'Login failed';
    showAlert('error', message);
  }
};
export const signup = async (name, email, password, passwordConfirm) => {
  try {
    const res = await api({
      method: 'POST',
      url: '/api/v1/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Account created successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    const message = err.response && err.response.data ? err.response.data.message : 'Signup failed';
    showAlert('error', message);
  }
};
export const logout=async()=>{
  try{
    const res=await api({
      method:'GET',
      url:'/api/v1/users/logout'
    });
    if(res.data.status==='success'){
      location.reload(true);
    }

  }
  catch(err){
    showAlert('error','Eroor logging out try again')
  }
}
