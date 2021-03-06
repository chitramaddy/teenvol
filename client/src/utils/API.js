import axios from 'axios';

export default {
  
  login: function (loginCreds) {
    console.log("loginCreds " + loginCreds);
    return axios.post('/api/users/login', loginCreds)
  },

  /*Path to check if user is logged in*/

  loginCheck: function () {
    return axios.get('/api/users/login')
  },

  /*Path to logout*/

  logout: function () {
    return axios.get('/api/users/logout')
  },

  /*Path to register new user*/
  register: function (userInfo) {
    console.log(userInfo);
    return axios.post("/api/users/register", userInfo)
  },

  getUserTimeSheet: function() {
    return axios.get("/api/users/timesheets")
  },

  setStartTime: function(startTime, date) {
    return axios.post("/api/users/timesheets", {startTime: startTime, date: date})
  },

  setEndTime: function(endTime, date, duration) {
    return axios.put("/api/users/timesheets", {endTime: endTime, date: date, duration: duration})
  },

  getReport: function(){
    return axios.get('api/users/report')
  }
}
