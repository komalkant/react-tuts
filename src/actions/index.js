import { apitest } from '../../credential.json';
import axios from 'axios';
import moment from 'moment';
export const RECIEVE_SIGNUP_RESPONSE = 'RECIEVE_SIGNUP_RESPONSE'
export const RECIEVE_SPECILITY = 'RECIEVE_SPECILITY'
export const RECIEVE_LOCATION = 'RECIEVE_LOCATION'
export const RECIEVE_LANGUAGES = 'RECIEVE_LANGUAGES'
export const RECIEVE_INSURANCE = 'RECIEVE_INSURANCE'
export const RECIEVE_DOCTORS_LIST = 'RECIEVE_DOCTORS_LIST'
export const RECIEVE_TIME_SLOT = 'RECIEVE_TIME_SLOT'
export const RECIEVE_SIGNIN_ERROR_RESPONSE = 'RECIEVE_SIGNIN_ERROR_RESPONSE'
export const RECIEVE_DOCTORS_BY_ID = 'RECIEVE_DOCTORS_BY_ID'
export const UNAUTH_USER = 'UNAUTH_USER'
export const AUTH_USER = 'AUTH_USER'
export const RECIEVE_USER_BY_ID = 'RECIEVE_USER_BY_ID'
export const RECIEVE_USER_APPOINTMENT = "RECIEVE_USER_APPOINTMENT"
export const EMPTY_TIME_SLOT = "EMPTY_TIME_SLOT"
export const FORGET_PASSWORD_ERROR = "FORGET_PASSWORD_ERROR"
export const RESET_PASS_SUBMIT = 'RESET_PASS_SUBMIT';
export const RESET_PASS_RECIEVE = 'RESET_PASS_RECIEVE';
export const RESET_PASS_SUCESS = 'RESET_PASS_SUCESS';
export const RESET_PASS_MODEL = 'RESET_PASS_MODEL';
export const LOGIN_SUBMIT_LOADER = "LOGIN_SUBMIT_LOADER";
export const CLOSE_LOGIN_LOADER = "CLOSE_LOGIN_LOADER"
export const SIGNUP_SUBMIT_LOADER = 'SIGNUP_SUBMIT_LOADER'
export const CLOSE_SIGNUP_LOADER = 'CLOSE_SIGNUP_LOADER'
export const OTP_MODEL_SHOW = 'OTP_MODEL_SHOW'
export const OTP_MODEL_HIDE = 'OTP_MODEL_HIDE'
export const OTP_ERROR = 'OTP_ERROR'
export const RECIEVE_NOTIFICATION = "RECIEVE_NOTIFICATION"
export const REMOVE_NOTIFICATION_COUNT = 'REMOVE_NOTIFICATION_COUNT'
export const STEP_2 = 'STEP_2'
export const STEP_3 = 'STEP_3'
export const STEP_END = 'STEP_END'
export const DOCTOR_PROFILE = "DOCTOR_PROFILE";
export const DOCTOR_APPOINTMENT = "DOCTOR_APPOINTMENT";
export const DOCTOR_AVAILABILITY = "DOCTOR_AVAILABILITY"
export const DOCTOR_S_APPOINTMENT = "DOCTOR_S_APPOINTMENT"
export const DOCTOR_MESSAGE = "DOCTOR_MESSAGE"
export const DOCTOR_BILLING = "DOCTOR_BILLING"
export const DOCTOR_PASS = "DOCTOR_PASS"
export const DOCTOR_SETTING = "DOCTOR_SETTING"
export const DOCTOR_LINK = "DOCTOR_LINK"
export const DOCTOR_FEED = "DOCTOR_FEED"
export const DOCTOR_LOCATION = "DOCTOR_LOCATION"
export const RECIEVE_DOCTOR_APPOINTMENT = 'RECIEVE_DOCTOR_APPOINTMENT'
export const COUNTRY = 'COUNTRY'
export const CITY = 'CITY'
export const MESSAGE_LIST = "MESSAGE_LIST"
export const MESSAGES = "MESSAGES"
export const ADDRESS_REQUIRE = 'ADDRESS_REQUIRE'
export const ADDRESS_NOT_REQUIRED = 'ADDRESS_NOT_REQUIRED'
export const BILING_INFO = 'BILING_INFO'
export const INSERTED_MESSAGE = 'INSERTED_MESSAGE'
export const LAT_LONG = "LAT_LONG"
export const ADD_LAT_LONG = "ADD_LAT_LONG"
export const REMOVE_LATLNG = "REMOVE_LATLNG"
export const ADD_CLINIC_NAME = "ADD_CLINIC_NAME"
export const ADD_CLINIC_NAME1 = "ADD_CLINIC_NAME1"
export const TERMS_CONDITIONS = "TERMS_CONDITIONS"
export const UPDATE_DAY = "UPDATE_DAY"
export const UPDATE_TIME_SESSION1 = "UPDATE_TIME_SESSION1"
export const UPDATE_TIME_SESSION2 = "UPDATE_TIME_SESSION2"
export const ADD_TIMMING = "ADD_TIMMING"
export const REMOVE_TIMMING = "REMOVE_TIMMING"
export const EMPTY_TIMMING = "EMPTY_TIMMING"
export const DISABLE_CHECK = "DISABLE_CHECK"
export const ARABIC = "ARABIC"
export const ENGLISH = "ENGLISH"
export const GET_SLOTS = "GET_SLOTS"
export const ADD_INSURANCE_CHECK = "ADD_INSURANCE_CHECK"
export const DELETE_ADD_INSURANCE_CHECK = "DELETE_ADD_INSURANCE_CHECK"
export const REMOVE_INSURANCE_CHECK = "REMOVE_INSURANCE_CHECK"
export const DELETE_REMOVE_INSURANCE_CHECK = "DELETE_REMOVE_INSURANCE_CHECK"
export const ADD_INSURANCE_PACKAGE = "ADD_INSURANCE_PACKAGE"
// export const REMOVE_INSURANCE_PACKAGE = "REMOVE_INSURANCE_PACKAGE"
export const GET_DOCTOR_INSURANCE = "GET_DOCTOR_INSURANCE"
export const DELETE_INSURANCE_CHECK = "DELETE_INSURANCE_CHECK"
export const RESET_CHECK = "RESET_CHECK"
export const SUBSCRIPTION_PLAN = "SUBSCRIPTION_PLAN"
export const DOCTOR_CLINIC_LOCATION = "DOCTOR_CLINIC_LOCATION"
export const DOCTOR_FEEDBACK_GET = "DOCTOR_FEEDBACK_GET"
export const REMOVE_LOCATION = "REMOVE_LOCATION"
export const DOCTOR_DELETE = "DOCTOR_DELETE"
import { browserHistory } from 'react-router';

/////////////recieve Specility list /////////////////////////

const receiveSpecility = (specialities) => ({
  type: RECIEVE_SPECILITY,
  specialities
})

/////////////fetching Specility list/////////////////////////

export const getSpecility = () => {
  return (dispatch) => {
    axios.get(`${apitest}/speciality-list`)
      .then(function (response) {
        dispatch(receiveSpecility(response.data.specialities));
      })
      .catch(function (error) {
        console.log(error);
      })
  }
}


////////////// recieve location list ///////////////////

const receiveLocation = (cities) => ({
  type: RECIEVE_LOCATION,
  cities
})

//////////////fetching location list ///////////////////

export const getLocation = () => {
  return (dispatch) => {
    axios.get(`${apitest}/location-list`)
      .then(function (response) {
        dispatch(receiveLocation(response.data.cities));
      })
      .catch(function (error) {
        console.log(error);
      })
  }
}

/////////////recieve insurance list///////////////

const receiveInsurance = (insurance) => ({
  type: RECIEVE_INSURANCE,
  insurance
})
/////////////fetch insurance list///////////////
export const getInsurance = () => {
  return (dispatch) => {
    axios.get(`${apitest}/insurance-list`)
      .then(function (response) {
        dispatch(receiveInsurance(response.data.insurance));
      })
      .catch(function (error) {
        console.log(error);
      })
  }
}

/////////////recieve language list///////////////

const receiveLanguage = (langs) => ({
  type: RECIEVE_LANGUAGES,
  langs
})
/////////////fetch insurance list///////////////
export const getLanguage = () => {
  return (dispatch) => {
    axios.get(`${apitest}/languages`)
      .then(function (response) {
        dispatch(receiveLanguage(response.data));
      })
      .catch(function (error) {
        console.log(error);
      })
  }
}
////////////////////////doctors list recieved///////////////////////////
const receiveDoctorsList = (doctors) => ({
  type: RECIEVE_DOCTORS_LIST,
  doctors
})
/////////////////////////doctors list search////////////////////////////
export const getDoctorsList = ({ specility, locations, insurance, clinic, name, lang, page }) => {
  var doctor_id = []
  var today = moment().add(0, "day").format("YYYY-MM-DD");
  var tommorow = moment().add(1, "day").format("YYYY-MM-DD");
  var dayaftertommorow = moment().add(2, "day").format("YYYY-MM-DD");
  var c = moment().add(3, "day").format("YYYY-MM-DD");
  var dates = [today, tommorow, dayaftertommorow, c]

  return (dispatch) => {
    axios.get(`${apitest}/search-doctors?speciality=${(!specility) ? "" : specility}&location=${(!locations) ? "" : locations}&insurance=${(!insurance) ? "" : insurance}&clinic=${(!clinic) ? "" : clinic}&name=${(!name) ? "" : name}&lang=${(!lang) ? "" : lang}&page=${(!page) ? "" : page}`)
      .then(function (response) {
        if (response.data.code == 200) {
          dispatch(receiveDoctorsList(response.data.doctors));
          for (var x of response.data.doctors.data) {
            doctor_id.push(x.doctor_id.toString())
          }
          dispatch(getTimeSlot({ doctor_id, dates }))
        } else {
          dispatch(receiveDoctorsList({ data: [] }));
        }

      })
      .catch(function (error) {
        console.log(error);
      })
  }
}


//////////////////////signup error recieved//////////////////////////

export const Signuperror = (error) => ({
  type: RECIEVE_SIGNUP_RESPONSE,
  error
})
////////////////////post signup form data//////////////////////////////////

export const patientSignup = (body) => {
  var headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  return (dispatch) => {
    axios.post(`${apitest}/patient/sign-up`, body, headers
    )
      .then(function (response) {
        if (response.data.code != 200) {
          if (response.data.code == 409) {
            localStorage.setItem("cred", response.data.user.api_token)
            dispatch({ type: CLOSE_SIGNUP_LOADER })
            dispatch(Signuperror(response.data.message));
            dispatch({ type: OTP_MODEL_SHOW })
          } else {
            dispatch({ type: CLOSE_SIGNUP_LOADER })
            dispatch(Signuperror(response.data.message));
          }

        } else {
          localStorage.setItem("cred", response.data.user.api_token)
          dispatch({ type: CLOSE_SIGNUP_LOADER })
          dispatch({ type: OTP_MODEL_SHOW })
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }
}
/////////////////////signin error recieved/////////////////////////////
export const Signinerror = (error) => ({
  type: RECIEVE_SIGNIN_ERROR_RESPONSE,
  error
})

/////////////////////////sign in form data//////////////////////
export const patientSignin = (body) => {
  return (dispatch) => {
    axios.post(`${apitest}/login`, body
    )
      .then(function (response) {
        if (response.data.code != 200) {
          dispatch({ type: CLOSE_LOGIN_LOADER });
          dispatch(Signinerror(response.data.message[0]));
        } else {
          dispatch({ type: CLOSE_LOGIN_LOADER });
          dispatch({ type: AUTH_USER });
          localStorage.setItem('token', response.data.data.api_token);
          // localStorage.setItem('name', response.data.data.first_name);
          // localStorage.setItem('imageurl', response.data.data.photo);
          localStorage.setItem('type', response.data.data.type);
          if (localStorage.getItem('location') == null) {
            browserHistory.push(`/`);
          } else {
            browserHistory.push(`/${localStorage.getItem('location')}`);
          }

        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }
}
/////////////////signout action/////////////////////////

export const signoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('name');
  localStorage.removeItem('imageurl')

  return { type: UNAUTH_USER };
}
//////////////////////////////////////
export const EmptyTimeSlot = (slots) => ({
  type: EMPTY_TIME_SLOT,
  slots
})
/////////////////////time slot of doctors recieved///////////////////////////////
const RecieveTimeSlot = (slots) => ({
  type: RECIEVE_TIME_SLOT,
  slots
})
////////////////////////fetch time slot of doctors//////////////////////////////////////

export const getTimeSlot = (body) => {
  // console.log("body",body);
  return (dispatch) => {
    return new Promise(function (resolve, reject) {
      axios.post(`${apitest}/get-time-slots`, body
      )
        .then(function (response) {
          // console.log("time slot", response.data);
          // console.log("body",body);

          if (response.data.code != 200) {
            // console.log(response.data)
          } else {
            resolve(response.data.data)
            dispatch(RecieveTimeSlot(response.data.data))
          }
        })
        .catch(function (error) {
          reject(error)
          console.log(error);
        })
    });
  }
}
//////////////////recieved doctor by id///////////////////////////////
const Recievedoctorbyid = (doctor) => ({
  type: RECIEVE_DOCTORS_BY_ID,
  doctor
})
////////////////get single doctor detaial by id////////////////////////////
export const getdoctorbyid = (doctorid) => {
  return (dispatch) => {
    axios.get(`${apitest}/get-doctor?doctor_id=${doctorid}&lang=`
    )
      .then(function (response) {
        if (response.data.code != 200) {
          // console.log(response.data)
        } else {
          dispatch(Recievedoctorbyid(response.data.doctor))
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }
}
/////////////////recieve user by token////////////////////////////
export const Recieveuserbyid = (user) => ({
  type: RECIEVE_USER_BY_ID,
  user
})

//////////////////////get user detail by token/////////////////////
export const getuserbyid = (token) => (dispatch) => {
  return new Promise(function (resolve, reject) {
    axios.get(`${apitest}/user-details`,
      { headers: { token } }
    )
      .then(function (response) {
        if (response.data.code == 200) {
          dispatch(Recieveuserbyid(response.data))
        }
        resolve(response.data)
      })
      .catch(function (error) {
        reject(error);
      })
  })
}
//////////////////////update user detail/////////////////////////////
export const updateuser = (token, body) => (dispatch) => {
  return new Promise(function (resolve, reject) {
    axios.post(`${apitest}/user_edit`,
      body,
      { headers: { token } }
    )
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
        console.log(error);
      })
  })
}

/////////////////change user password//////////////////////

export const changepassword = (body, token) => (dispatch) => {
  return new Promise(function (resolve, reject) {
    axios.post(`${apitest}/changePassword`, body,
      { headers: { token } }
    )
      .then(function (response) {
        resolve(response.data)
      })
      .catch(function (error) {
        reject(error)
        console.log(error);
      })
  })

}

/////////////////recieve user appointment////////////////////////////
const Recieveappointment = (appointments) => ({
  type: RECIEVE_USER_APPOINTMENT,
  appointments
})
/////////////////get user appointment//////////////////

export const getappointment = () => {
  var token = localStorage.getItem("token")
  return (dispatch) => {
    axios.get(`${apitest}/appointment`,
      { headers: { token } }
    )
      .then(function (response) {
        if (response.data.code != 200) {
          // console.log(response.data)
        } else {
          dispatch(Recieveappointment(response.data.appointments))
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }
}

/////////////////foget password error////////////////////////////
export const forgetpassworderror = (message) => ({
  type: FORGET_PASSWORD_ERROR,
  message
})

///////////////////forget password//////////////////

export const forgetpassword = (body) => {
  return (dispatch) => {
    axios.post(`${apitest}/forgot-password`, body
    )
      .then(function (response) {
        if (response.data.code != 200) {
          dispatch({ type: RESET_PASS_RECIEVE });
          dispatch(forgetpassworderror(response.data.message))
        } else {
          dispatch({ type: RESET_PASS_RECIEVE });
          dispatch({ type: RESET_PASS_SUCESS });
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }
}

///////////////reset-pass-submit////////////
export const resetpasssubmit = () => ({
  type: RESET_PASS_SUBMIT
})
//////////////////reset forget pass model////////////////
export const resetpassmodel = () => ({
  type: RESET_PASS_MODEL
})
////////////////login submit loader//////////////

export const loginsubmitloader = () => ({
  type: LOGIN_SUBMIT_LOADER
})

////////////////signup submit loader//////////////

export const signupsubmitloader = () => ({
  type: SIGNUP_SUBMIT_LOADER
})
////////////////otp error//////////////

export const otperror = (error) => ({
  type: OTP_ERROR,
  error
})

export const otphide = () => ({
  type: OTP_MODEL_HIDE
})
////////////////otp verify//////////////

export const OtpVerify = (body, token) => (dispatch) => {

  return new Promise(function (resolve, reject) {
    axios.post(`${apitest}/verify-otp`, body,
      { headers: { token } }
    )
      .then(function (response) {
        resolve(response.data)
        if (response.data.code != 200) {
          dispatch(otperror(response.data.message))
        } else {
          // localStorage.removeItem("cred")
          dispatch(otphide())
        }
      })
      .catch(function (error) {
        reject(error)
        console.log(error);
      })
  })

}

//////////////// resend otp //////////////

export const ResendOtp = () => {
  var token = localStorage.getItem("cred")
  return (dispatch) => {
    axios.get(`${apitest}/resend-otp`,
      { headers: { token } }
    )
      .then(function (response) {
        if (response.data.code != 200) {
          // console.log(response.data)
        } else {
          // console.log(response.data)
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }
}
//////////////////recieve notification////////////
const recievenotification = (message, count) => ({
  type: RECIEVE_NOTIFICATION,
  message,
  count
})
//////////////////////remove notification count///////////////////////
const removenotificationcount = () => ({
  type: REMOVE_NOTIFICATION_COUNT,
})
/////////////////////////get notification////////

export const getnotification = (token, count) => (dispatch) => {
  return new Promise(function (resolve, reject) {
    axios.get(`${apitest}/notification?count=${(!count) ? "" : count}`,
      { headers: { "api-token": token } }
    )
      .then(function (response) {
        resolve(response.data);
        if (response.data.code == 200) {
          dispatch(recievenotification(response.data.messages, response.data.count))
        }
      })
      .catch(function (error) {
        reject(error);
        console.log(error);
      })
  })
}

////////////////////remove notification//////

export const removenotification = (token) => (dispatch) => {
  return new Promise(function (resolve, reject) {
    axios.get(`${apitest}/update-notification`,
      { headers: { "api-token": token } }
    )
      .then(function (response) {
        resolve(response.data);
        if (response.data.code == 200) {
          dispatch(removenotificationcount())
        }
      })
      .catch(function (error) {
        reject(error);
        console.log(error);
      })
  })
}


////////////////signup step2//////////////

export const doctorsignupstep2 = () => ({
  type: STEP_2
})
////////////////signup step3//////////////

export const doctorsignupstep3 = () => ({
  type: STEP_3
})
////////////////signup step end//////////////

export const doctorsignupstepend = () => ({
  type: STEP_END
})

////////////////////signup step1 api//////

export const postsignupstep1 = (body) => (dispatch) => {
  return new Promise(function (resolve, reject) {
    axios.post(`${apitest}/doctor/signup-step-1`,
      body
    )
      .then(function (response) {
        resolve(response.data);
        if (response.data.code == 200) {
          dispatch({ type: OTP_MODEL_SHOW })
          localStorage.setItem("cred", response.data.user.api_token)
        }
      })
      .catch(function (error) {
        reject(error);
        console.log(error);
      })
  })
}
//////////////////signup step2 api/////////////////
export const postsignupstep2 = (body, token) => (dispatch) => {
  return new Promise(function (resolve, reject) {
    axios.post(`${apitest}/doctor/signup-step-2`, body,
      { headers: { "Api-Token": token } }
    )
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
        console.log(error);
      })
  })
}
//////////////////signup step2 api/////////////////
export const postsignupstep3 = (body, token) => (dispatch) => {
  return new Promise(function (resolve, reject) {
    axios.post(`${apitest}/doctor/signup-step-3`, body,
      { headers: { "Api-Token": token } }
    )
      .then(function (response) {
        // console.log("step 3", response.data)
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
        console.log(error);
      })
  })
}

/////////////////////doctor profile tabbing////////////////////////////////////
export const doctorprofile = () => ({
  type: DOCTOR_PROFILE
})
export const doctorappointment = () => ({
  type: DOCTOR_APPOINTMENT
})
export const doctoravailability = () => ({
  type: DOCTOR_AVAILABILITY
})
export const doctorsappointment = () => ({
  type: DOCTOR_S_APPOINTMENT
})
export const doctormessage = () => ({
  type: DOCTOR_MESSAGE
})
export const doctorbilling = () => ({
  type: DOCTOR_BILLING
})
export const doctorpass = () => ({
  type: DOCTOR_PASS
})
export const doctorsetting = () => ({
  type: DOCTOR_SETTING
})
export const doctorlink = () => ({
  type: DOCTOR_LINK
})
export const doctorfeed = () => ({
  type: DOCTOR_FEED
})
export const doctorlocation = () => ({
  type: DOCTOR_LOCATION
})
export const doctordelete = () => ({
  type: DOCTOR_DELETE
})
// doctorlocation
/////////////////recieve appointment request//////////////////
const recievedoctorappointment = (appoint) => ({
  type: RECIEVE_DOCTOR_APPOINTMENT,
  appoint
})
/////////////////doctor appointment request fetch////////////////////

export const doctorappointmentrequest = (name, date) => (dispatch) => {
  const token = localStorage.getItem("token")
  return new Promise(function (resolve, reject) {
    axios.get(`${apitest}/doctor/appointment-requests?name=${(!name) ? "" : name}&date=${(!date) ? "" : date}`,
      { headers: { "api-token": token } }
    )
      .then(function (response) {
        dispatch(recievedoctorappointment(response.data.appointments.data))
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
        console.log(error);
      })
  })
}
///////////////recieve country///////////
const recievecountry = (countries) => ({
  type: COUNTRY,
  countries
})
/////////////////get all country////////////////////

export const getallcountry = (lang) => (dispatch) => {
  return new Promise(function (resolve, reject) {
    axios.get(`${apitest}/get-countries?lang=${(!lang) ? "" : lang}`
    )
      .then(function (response) {
        // console.log("country",response.data.countries) 
        dispatch(recievecountry(response.data.countries))
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
        console.log(error);
      })
  })
}

///////////////recieve city///////////
const recievecity = (cities) => ({
  type: CITY,
  cities
})
/////////////////get all cities////////////////////

export const getallcities = (country, lang) => (dispatch) => {
  return new Promise(function (resolve, reject) {
    axios.get(`${apitest}/get-cities?lang=${(!lang) ? "" : lang}&country=${(!country) ? "" : country}`
    )
      .then(function (response) {
        if (response.data.code == 200) {
          dispatch(recievecity(response.data.cities))
        }
        resolve(response.data);

      })
      .catch(function (error) {
        reject(error);
        console.log(error);
      })
  })
}
///////////////message list recieve///////////
const recievemessagelist = (list) => ({
  type: MESSAGE_LIST,
  list
})

/////////////////fetch message list////////////////////

export const messagelist = (date, name) => (dispatch) => {
  const token = localStorage.getItem("token")
  return new Promise(function (resolve, reject) {
    axios.get(`${apitest}/last_message?name=${(!name) ? "" : name}&date=${(!date) ? "" : date}`,
      { headers: { "api-token": token } }
    )
      .then(function (response) {
        if (response.data.code == 200) {
          dispatch(recievemessagelist(response.data.chat_list))
        }
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
        console.log(error);
      })
  })
}
///////////////message list recieve///////////
const chats = (messages, photo) => ({
  type: MESSAGES,
  messages,
  photo

})
/////////////////user chat by id////////////////////

export const message = (body) => (dispatch) => {
  const token = localStorage.getItem("token")
  return new Promise(function (resolve, reject) {
    axios.post(`${apitest}/message`,
      body,
      { headers: { "api-token": token } }
    )
      .then(function (response) {
        // console.log("data", response.data);
        if (response.data.code == 200) {
          dispatch(chats(response.data.messages, response.data.photos))
        }
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
        console.log(error);
      })
  })
}

/////////////////payment ////////////////////

export const payment = (body) => (dispatch) => {

  const token = localStorage.getItem("token")
  return new Promise(function (resolve, reject) {
    axios.post(`${apitest}/payment`,
      body,
      { headers: { "api-token": token } }
    )
      .then(function (response) {
        // console.log("payment", response.data)
        if (response.data.response_code == 4001) {
          dispatch({ type: ADDRESS_REQUIRE })
        } else {
          window.location = response.data.payment_url
        }
        //  window.location = response.data.payment_url

        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
        console.log(error);
      })
  })
}
/////////////////book appointment////////////////////

export const bookappointment = (body) => (dispatch) => {
  const token = localStorage.getItem("token")
  return new Promise(function (resolve, reject) {
    axios.post(`${apitest}/patient/book-appointments`,
      body,
      { headers: { "api-token": token } }
    )
      .then(function (response) {
        if (response.data.code == 200) {
          browserHistory.push(`/payment?doctor=${body.doctor_id}&appoint=${response.data.appointment_id}`)
          // dispatch(payment({ doctor_id: body.doctor_id }))

        }
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
        console.log(error);
      })
  })
}

///////////Paymentinfo//////////////

export const Paymentinfo = () => (dispatch) => {

  const token = localStorage.getItem("token")
  return new Promise(function (resolve, reject) {
    axios.get(`${apitest}/payinfo`,
      { headers: { "api-token": token } }
    )
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
        console.log(error);
      })
  })
}

////////////////appointment status///////////////////


export const appointmentstatus = (body) => (dispatch) => {

  const token = localStorage.getItem("token")
  return new Promise(function (resolve, reject) {
    axios.post(`${apitest}/patient/statusAppointment`,
      body,
      { headers: { "api-token": token } }
    )
      .then(function (response) {
        // console.log("apointmentstatus", response.data)
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
        console.log(error);
      })
  })
}
//////////////////////////////save billing address////////////// savebillingaddress

export const savebillingaddress = (body) => (dispatch) => {

  const token = localStorage.getItem("token")
  return new Promise(function (resolve, reject) {
    axios.post(`${apitest}/patientaddress`,
      body,
      { headers: { "api-token": token } }
    )
      .then(function (response) {
        // console.log("billing address", response.data)
        if (response.data.code == 200) {
          dispatch({ type: ADDRESS_NOT_REQUIRED })
        }
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
        console.log(error);
      })
  })
}
///////////////recieve billing info///////////
const receiveBillingInfo = (bill, total, perpage) => ({
  type: BILING_INFO,
  bill,
  total,
  perpage
})

//////////////////////////////get billing info////////////// savebillingaddress

export const billinginfo = (body, page) => (dispatch) => {

  const token = localStorage.getItem("token")
  return new Promise(function (resolve, reject) {
    axios.post(`${apitest}/doctor/billing?page=${(!page) ? "" : page}`,
      body,
      { headers: { "api-token": token } }
    )
      .then(function (response) {
        //  console.log("billing info", response.data)
        if (response.data.code == 200) {
          dispatch(receiveBillingInfo(response.data.message.data, response.data.message.total, response.data.message.per_page))
        }
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
        console.log(error);
      })
  })
}

///////////////recieve inserted message///////////
const RecieveInsertedMessage = (message) => ({
  type: INSERTED_MESSAGE,
  message
})
////////////////////////message insert////////////////////////////////

export const insertmessage = (body) => (dispatch) => {

  const token = localStorage.getItem("token")
  return new Promise(function (resolve, reject) {
    axios.post(`${apitest}/insert_message`,
      body,
      { headers: { "api-token": token } }
    )
      .then(function (response) {
        // console.log("insert message", response.data.message)
        if (response.data.code == 200) {
          dispatch(RecieveInsertedMessage(response.data.message))
        }
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
        console.log(error);
      })
  })
}

export const appointmentstatuschange = (body) => (dispatch) => {

  const token = localStorage.getItem("token")
  return new Promise(function (resolve, reject) {
    axios.post(`${apitest}/doctor/update-appointment`,
      body,
      { headers: { "api-token": token } }
    )
      .then(function (response) {
        //  console.log("status change", response.data)
        if (response.data.code == 200) {
          dispatch(doctorappointmentrequest())
        }
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
        console.log(error);
      })
  })
}

//////////////////////medical record detail submit////////////////////////////// 

export const MedicalRecordDetailPost = (body) => (dispatch) => {

  const token = localStorage.getItem("token")
  return new Promise(function (resolve, reject) {
    axios.post(`${apitest}/medicalrecords`,
      body,
      { headers: { "api-token": token } }
    )
      .then(function (response) {
        //  console.log("medical record", response.data)
        // if (response.data.code == 200) {
        //   // dispatch(doctorappointmentrequest())
        // }
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
        console.log(error);
      })
  })
}

/////////////////////medical image upload//////////////////////////
// savedoc
export const savedoc = (body) => (dispatch) => {

  const token = localStorage.getItem("token")
  return new Promise(function (resolve, reject) {
    axios.post(`${apitest}/medical_history`,
      body,
      { headers: { "api-token": token } }
    )
      .then(function (response) {
        //  console.log("medical_history", response.data)
        // if (response.data.code == 200) {
        //   // dispatch(doctorappointmentrequest())
        // }
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
        console.log(error);
      })
  })
}

// documents_of_patient
export const documents_of_patient = (body) => (dispatch) => {

  const token = localStorage.getItem("token")
  return new Promise(function (resolve, reject) {
    axios.post(`${apitest}/documents_of_patient`,
      body,
      { headers: { "api-token": token } }
    )
      .then(function (response) {
        // console.log("documents_of_patient", response.data)
        // if (response.data.code == 200) {
        //   // dispatch(doctorappointmentrequest())
        // }
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
        console.log(error);
      })
  })
}

// patient/patient_insurance

export const patient_insurance = (body) => (dispatch) => {

  const token = localStorage.getItem("token")
  return new Promise(function (resolve, reject) {
    axios.post(`${apitest}/patient/patient_insurance`,
      body,
      { headers: { "api-token": token } }
    )
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
        console.log(error);
      })
  })
}


///////////////lat long//////////////////
export const findlatlong = (cord) => ({
  type: LAT_LONG,
  cord
})
export const addlatlong = (cord) => ({
  type: ADD_LAT_LONG,
  cord
})
export const addclinicname = (name) => ({
  type: ADD_CLINIC_NAME1,
  name
})
//////////////remove address//////
// REMOVE_LATLNG
export const removelatlong = (index) => ({
  type: REMOVE_LATLNG,
  index
})
// clinicnameupdate
export const clinicnameupdate = (name, index) => ({
  type: ADD_CLINIC_NAME,
  name,
  index
})

////////////////////////////////////////////////////////
const recieveterms = (plan) => ({
  type: TERMS_CONDITIONS,
  plan
})
/////////////////terms & conditions/////////////////

export const terms = () => (dispatch) => {

  const token = localStorage.getItem("token")
  return new Promise(function (resolve, reject) {
    axios.get(`${apitest}/company-policies`,
      { headers: { "api-token": token } }
    )
      .then(function (response) {
        // console.log("response", response.data)
        if (response.data.code == 200) {
          dispatch(recieveterms(response.data.plans))
        }
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
        console.log(error);
      })
  })
}



// updateday
export const updateday = (day, status, index) => ({
  type: UPDATE_DAY,
  day,
  status,
  index
})





export const arabic = () => ({
  type: ARABIC
})

export const english = () => ({
  type: ENGLISH
})

// resetpassword
export const resetpassword = (body) => (dispatch) => {

  return new Promise(function (resolve, reject) {
    axios.post(`${apitest}/chngforgetPassword`,
      body
    )
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
        console.log(error);
      })
  })
}


// Saveinsurance

export const Saveinsurance = (body) => (dispatch) => {
  const token = localStorage.getItem("token")
  return new Promise(function (resolve, reject) {
    axios.post(`${apitest}/patient/insurance_card`,
      body,
      { headers: { "api-token": token } }
    )
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
        console.log(error);
      })
  })
}


// submitslots
export const submitslots = (body) => (dispatch) => {
  const token = localStorage.getItem("token")
  return new Promise(function (resolve, reject) {
    axios.post(`${apitest}/doctor/save_availability`,
      body,
      { headers: { "api-token": token } }
    )
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
        console.log(error);
      })
  })
}
const slots = (slot) => ({
  type: GET_SLOTS,
  slot
})

export const getsubmitslots = (body) => (dispatch) => {
  const token = localStorage.getItem("token")
  return new Promise(function (resolve, reject) {
    axios.get(`${apitest}/doctor/get_availability`,
      { headers: { "api-token": token } }
    )
      .then(function (response) {
        if (response.data.code == 200) {
          dispatch(slots(response.data.data))
        }
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
        console.log(error);
      })
  })
}

export const deleteslot = (body) => (dispatch) => {
  const token = localStorage.getItem("token")
  return new Promise(function (resolve, reject) {
    axios.post(`${apitest}/doctor/delete_availability`,
      body,
      { headers: { "api-token": token } }

    )
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
        console.log(error);
      })
  })
}

// insuranceaddcheck
export const insuranceaddcheck = (plan_id) => ({
  type: ADD_INSURANCE_CHECK,
  plan_id
})

// removecheckbyindex
export const removecheckbyindex = (plan_id) => ({
  type: REMOVE_INSURANCE_CHECK,
  plan_id
})

export const deleteinsuranceaddcheck = (plan_id) => ({
  type: DELETE_ADD_INSURANCE_CHECK,
  plan_id
})

// removecheckbyindex
export const deleteremovecheckbyindex = (plan_id) => ({
  type: DELETE_REMOVE_INSURANCE_CHECK,
  plan_id
})





// insurancedeletecheck
export const insurancedeletecheck = (id, status) => ({
  type: DELETE_INSURANCE_CHECK,
  id,
  status
})

// save doctor insurance
export const savedoctorinsurance = (body) => (dispatch) => {
  const token = localStorage.getItem("token")
  return new Promise(function (resolve, reject) {
    axios.post(`${apitest}/doctor/update_doctor_insurance`,
      body,
      { headers: { "api-token": token } }

    )
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
        console.log(error);
      })
  })
}
///////////////////////
export const getinsure = (insure) => ({
  type: GET_DOCTOR_INSURANCE,
  insure
})
// doctor/get_insurance
export const getdoctorinsurance = () => (dispatch) => {
  const token = localStorage.getItem("token")
  return new Promise(function (resolve, reject) {
    axios.get(`${apitest}/doctor/get_insurance`,
      { headers: { "api-token": token } }
    )
      .then(function (response) {
        dispatch(getinsure(response.data.data))
        // console.log("Get doctor insurance",response.data.data)
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
        console.log(error);
      })
  })
}

// doctor/delete_doctor_insurance
export const deletedoctorinsurance = (body) => (dispatch) => {
  const token = localStorage.getItem("token")
  return new Promise(function (resolve, reject) {
    axios.post(`${apitest}/doctor/delete_doctor_insurance`,
      body,
      { headers: { "api-token": token } }

    )
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
        console.log(error);
      })
  })
}

// checktoken
export const checktoken = (body) => (dispatch) => {
  return new Promise(function (resolve, reject) {
    axios.post(`${apitest}/tokencheck`,
      body
    )
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
        console.log(error);
      })
  })
}

// resetcheck
export const resetcheck = () => ({
  type: RESET_CHECK
})

// doctor/add_insurance
export const add_insurance = (body) => (dispatch) => {
  const token = localStorage.getItem("token")
  return new Promise(function (resolve, reject) {
    axios.post(`${apitest}/doctor/add_insurance`,
      body,
      { headers: { "api-token": token } }

    )
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
        console.log(error);
      })
  })
}

// spaceused

export const spaceused = () => (dispatch) => {
  const token = localStorage.getItem("token")
  return new Promise(function (resolve, reject) {
    axios.get(`${apitest}/space_used`,
      { headers: { "api-token": token } }

    )
      .then(function (response) {
        // console.log("space", response.data)
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
        console.log(error);
      })
  })
}
const subscriptionplan = (plan) => ({
  type: SUBSCRIPTION_PLAN,
  plan
})
// getsubscriptionplan
export const getsubscriptionplan = () => (dispatch) => {
  const token = localStorage.getItem("token")
  return new Promise(function (resolve, reject) {
    axios.get(`${apitest}/get-subscription-plan?lang=`,
      { headers: { "api-token": token } }

    )
      .then(function (response) {
        if (response.data.code == 200) {
          dispatch(subscriptionplan(response.data.subscriptionPlans))
        }
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
        console.log(error);
      })
  })
}
// sociallinksave
export const sociallinksave = (body) => (dispatch) => {
  const token = localStorage.getItem("token")
  return new Promise(function (resolve, reject) {
    axios.post(`${apitest}/doctor/social_sharing`,
      body,
      { headers: { "api-token": token } }

    )
      .then(function (response) {
        // console.log("social link save", response.data)
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
        console.log(error);
      })
  })
}

const gethospitallocation = (location) => ({
  type: DOCTOR_CLINIC_LOCATION,
  location
})

// doctor/hospital-location
export const hospitallocation = () => (dispatch) => {
  const token = localStorage.getItem("token")
  return new Promise(function (resolve, reject) {
    axios.get(`${apitest}/doctor/hospital-location`,
      { headers: { "api-token": token } }

    )
      .then(function (response) {
        // console.log("doctor/hospital-location", response.data)
        if (response.data.code == 200) {
          dispatch(gethospitallocation(response.data.data))
        }
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
        console.log(error);
      })
  })
}

// patientcancelappointment
export const patientcancelappointment = (body) => (dispatch) => {
  const token = localStorage.getItem("token")
  return new Promise(function (resolve, reject) {
    axios.post(`${apitest}/patient/cancel-appointment`,
      body,
      { headers: { "api-token": token } }

    )
      .then(function (response) {
        // console.log("social link save", response.data)
        if (response.data.code == 200) {
          dispatch(getappointment())
        }
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
        console.log(error);
      })
  })
}

// savefeedback
export const savefeedback = (body) => (dispatch) => {
  const token = localStorage.getItem("token")
  return new Promise(function (resolve, reject) {
    axios.post(`${apitest}/patient/feedback_form_insert`,
      body,
      { headers: { "api-token": token } }

    )
      .then(function (response) {
        // console.log("feedback", response.data)
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
        console.log(error);
      })
  })
}

// doctor/hospital_location_insert addlocationbydoctor
export const addlocationbydoctor = (body) => (dispatch) => {
  const token = localStorage.getItem("token")
  return new Promise(function (resolve, reject) {
    axios.post(`${apitest}/doctor/hospital_location_insert`,
      body,
      { headers: { "api-token": token } }

    )
      .then(function (response) {
        if (response.data.code == 200) {
          dispatch(hospitallocation())
          dispatch({ type: REMOVE_LOCATION })
        }
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
        console.log(error);
      })
  })
}
// getfeedbackdoctor

const getfeedbackdoctor = (feed) => ({
  type: DOCTOR_FEEDBACK_GET,
  feed
})
// doctorfeedback
export const doctorfeedback = () => (dispatch) => {
  const token = localStorage.getItem("token")
  return new Promise(function (resolve, reject) {
    axios.get(`${apitest}/doctor/feedback_form_get`,
      { headers: { "api-token": token } }

    )
      .then(function (response) {
        // console.log("doctor feedback get", response.data)
        if (response.data.code == 200) {
          dispatch(getfeedbackdoctor(response.data.message))
        }
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
        console.log(error);
      })
  })
}

// getpatientinsurance
export const getpatientinsurance = () => (dispatch) => {
  const token = localStorage.getItem("token")
  return new Promise(function (resolve, reject) {
    axios.get(`${apitest}/patient/insurance_card_get`,
      { headers: { "api-token": token } }
    )
      .then(function (response) {
        // console.log("patient insurance card", response.data)
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
        console.log(error);
      })
  })
}

// getdoctorinsuranceforpatient
export const getdoctorinsuranceforpatient = (body) => (dispatch) => {
  const token = localStorage.getItem("token")
  return new Promise(function (resolve, reject) {
    axios.post(`${apitest}/patient/get_insurance`,
      body,
      { headers: { "api-token": token } }

    )
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
        console.log(error);
      })
  })
}
// deleteaccount
// updateStatus
export const deleteaccount = () => (dispatch) => {
  const token = localStorage.getItem("token")
  return new Promise(function (resolve, reject) {
    axios.get(`${apitest}/updateStatus`,
      { headers: { "api-token": token } }
    )
      .then(function (response) {


        if (response.data.code == 200) {
          localStorage.removeItem("token");
          localStorage.removeItem("type")
          browserHistory.push("/login")
          dispatch({ type: UNAUTH_USER })
        }

        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
        console.log(error);
      })
  })
}
// purchaseplan
export const purchaseplan = (body) => (dispatch) => {
  const token = localStorage.getItem("token")
  return new Promise(function (resolve, reject) {
    axios.post(`${apitest}/purchase_plan`,
      body,
      { headers: { "api-token": token } }

    )
      .then(function (response) {
        if (response.data.response_code == 4001) {
          // dispatch({ type: ADDRESS_REQUIRE })
        } else {
          window.location = response.data.payment_url
        }
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
        console.log(error);
      })
  })
}