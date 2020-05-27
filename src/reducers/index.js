import { combineReducers } from 'redux'
import {
  RECIEVE_SPECILITY,
  RECIEVE_LOCATION,
  RECIEVE_INSURANCE,
  RECIEVE_SIGNUP_RESPONSE,
  RECIEVE_DOCTORS_LIST,
  RECIEVE_TIME_SLOT,
  RECIEVE_SIGNIN_ERROR_RESPONSE,
  UNAUTH_USER,
  AUTH_USER,
  RECIEVE_DOCTORS_BY_ID,
  RECIEVE_USER_BY_ID,
  RECIEVE_USER_APPOINTMENT,
  EMPTY_TIME_SLOT,
  FORGET_PASSWORD_ERROR,
  RESET_PASS_SUBMIT,
  RESET_PASS_RECIEVE,
  RESET_PASS_SUCESS,
  RESET_PASS_MODEL,
  LOGIN_SUBMIT_LOADER,
  CLOSE_LOGIN_LOADER,
  SIGNUP_SUBMIT_LOADER,
  CLOSE_SIGNUP_LOADER,
  OTP_MODEL_SHOW,
  OTP_MODEL_HIDE,
  OTP_ERROR,
  RECIEVE_NOTIFICATION,
  REMOVE_NOTIFICATION_COUNT,
  STEP_2,
  STEP_3,
  STEP_END,
  RECIEVE_LANGUAGES,
  DOCTOR_PROFILE,
  DOCTOR_APPOINTMENT,
  DOCTOR_AVAILABILITY,
  DOCTOR_S_APPOINTMENT,
  DOCTOR_MESSAGE,
  DOCTOR_BILLING,
  DOCTOR_PASS,
  DOCTOR_SETTING,
  DOCTOR_LINK,
  DOCTOR_FEED,
  DOCTOR_LOCATION,
  RECIEVE_DOCTOR_APPOINTMENT,
  COUNTRY,
  CITY,
  MESSAGE_LIST,
  MESSAGES,
  ADDRESS_REQUIRE,
  ADDRESS_NOT_REQUIRED,
  BILING_INFO,
  INSERTED_MESSAGE,
  LAT_LONG,
  ADD_LAT_LONG,
  REMOVE_LATLNG,
  ADD_CLINIC_NAME,
  ADD_CLINIC_NAME1,
  TERMS_CONDITIONS,
  UPDATE_DAY,
  UPDATE_TIME_SESSION1,
  UPDATE_TIME_SESSION2,
  ADD_TIMMING,
  REMOVE_TIMMING,
  EMPTY_TIMMING,
  DISABLE_CHECK,
  ARABIC,
  ENGLISH,
  GET_SLOTS,
  ADD_INSURANCE_CHECK,
  REMOVE_INSURANCE_CHECK,
  DELETE_ADD_INSURANCE_CHECK,
  DELETE_REMOVE_INSURANCE_CHECK,
  GET_DOCTOR_INSURANCE,
  DELETE_INSURANCE_CHECK,
  RESET_CHECK,
  SUBSCRIPTION_PLAN,
  DOCTOR_CLINIC_LOCATION,
  DOCTOR_FEEDBACK_GET,
  REMOVE_LOCATION,
  DOCTOR_DELETE
} from '../actions'
import { reducer as reduxFormReducer } from 'redux-form';

/////////////////////specility reducer/////////////////////////////////
const recievespecility = (state = { specialities: [] }, action) => {
  switch (action.type) {
    case RECIEVE_SPECILITY:
      return {
        specialities: action.specialities
      };
    default:
      return state
  }
}
/////////////////////location reducer/////////////////////////////////
const recievelocation = (state = { cities: [] }, action) => {
  switch (action.type) {
    case RECIEVE_LOCATION:
      return {
        cities: action.cities
      };
    default:
      return state
  }
}
/////////////////////insurance reducer/////////////////////////////////
const recieveinsurance = (state = { insurance: [] }, action) => {
  switch (action.type) {
    case RECIEVE_INSURANCE:
      return {
        insurance: action.insurance
      };
    default:
      return state
  }
}
///////////////////////signup error reducer///////////////////////////////
const Signuperror = (state = { signuperror: "" }, action) => {
  switch (action.type) {
    case RECIEVE_SIGNUP_RESPONSE:
      return {
        signuperror: action.error
      };
    default:
      return state
  }
}

///////////////////////signup error reducer///////////////////////////////
const Signinerr = (state = { signinerr: "" }, action) => {
  switch (action.type) {
    case RECIEVE_SIGNIN_ERROR_RESPONSE:
      return {
        signinerr: action.error
      };
    default:
      return state
  }
}


////////////////////doctors list reducer///////////////////////

const doctorslist = (state = { doctors: { fetching: true, data: [] } }, action) => {
  switch (action.type) {
    case RECIEVE_DOCTORS_LIST:
      return {
        fetching: false,
        doctors: action.doctors
      };
    default:
      return state
  }
}

////////////////////languages list reducer///////////////////////

const languages = (state = { langs: [] }, action) => {
  switch (action.type) {
    case RECIEVE_LANGUAGES:
      return {
        langs: action.langs
      };
    default:
      return state
  }
}


//////////////////doctors time slot reducer//////////////////////////



const doctorstimeslot = (state = { slot: [] }, action) => {

  switch (action.type) {
    case RECIEVE_TIME_SLOT:
      if (state.slot.length == 0) {
        return {
          slot: action.slots
        };
      } else {
        var filter = state.slot.filter((sl) => {
          if (sl.doctor.doctor_id == action.slots[0].doctor.doctor_id) {
            return Object.assign(sl.doctor.dates, action.slots[0].doctor.dates);
          }
        })
        return {
          slot: [...new Set(state.slot.concat(filter))]
        }
      }
    case EMPTY_TIME_SLOT:
      return {
        slot: action.slots
      }
    default:
      return state
  }
}

////////////////////auth reducer/////////////////////////

const auth = (state = {}, action) => {
  switch (action.type) {
    case AUTH_USER:
      return { authenticated: true };
    case UNAUTH_USER:
      return { authenticated: false };
    default:
      return state
  }
}
//////////////reducer get doctor by id//////////////////////////
const doctorsbyid = (state = { doctor: {} }, action) => {
  switch (action.type) {
    case RECIEVE_DOCTORS_BY_ID:
      return {
        doctor: action.doctor
      };
    default:
      return state
  }
}

//////////////reducer get doctor by id//////////////////////////
const userbyid = (state = { user: {} }, action) => {
  switch (action.type) {
    case RECIEVE_USER_BY_ID:
      return {
        user: action.user
      };
    default:
      return state
  }
}
//////////////////reducer get appointment///////////////
const getappointment = (state = { appointments: [] }, action) => {
  switch (action.type) {
    case RECIEVE_USER_APPOINTMENT:
      return {
        appointments: action.appointments
      };
    default:
      return state
  }
}
//////////////////forget password error/////////////////
const forgetPassError = (state = { message: "" }, action) => {
  switch (action.type) {
    case FORGET_PASSWORD_ERROR:
      return {
        message: action.message
      };
    default:
      return state
  }
}
///////////////otp  error//////

const otpError = (state = { message: "" }, action) => {
  switch (action.type) {
    case OTP_ERROR:
      return {
        message: action.error
      };
    default:
      return state
  }
}
////////////////////loader reducer///////////////////////
const loaderReducer = (state = { resetpass: true, resetpasssucess: false, loginloader: false, signuploader: false, otpmodel: false }, action) => {
  switch (action.type) {
    case RESET_PASS_SUBMIT:
      return {
        ...state,
        resetpass: false
      }
    case RESET_PASS_RECIEVE:
      return {
        ...state,
        resetpass: true
      };
    case RESET_PASS_SUCESS:
      return {
        ...state,
        resetpasssucess: true
      }
    case RESET_PASS_MODEL:
      return {
        ...state,
        resetpasssucess: false
      }
    case LOGIN_SUBMIT_LOADER:
      return {
        ...state,
        loginloader: true
      }
    case CLOSE_LOGIN_LOADER:
      return {
        ...state,
        loginloader: false
      }

    case SIGNUP_SUBMIT_LOADER:
      return {
        ...state,
        signuploader: true
      }
    case CLOSE_SIGNUP_LOADER:
      return {
        ...state,
        signuploader: false
      }
    case OTP_MODEL_SHOW:
      return {
        ...state,
        otpmodel: true
      }
    case OTP_MODEL_HIDE:
      return {
        ...state,
        otpmodel: false
      }
    default:
      return state
  }
}
///////////////////////doctor signup step/////////////////
const doctorsingnupstep = (state = { step1: true, step2: false, step3: false }, action) => {
  switch (action.type) {
    case STEP_2:
      return {
        step1: false,
        step2: true,
        step3: false
      };
    case STEP_3:
      return {
        step1: false,
        step2: false,
        step3: true
      }
    case STEP_END:
      return {
        step1: true,
        step2: false,
        step3: false
      }
    default:
      return state
  }
}
///////////////////notification recieve reducer//////////////////////
const notificationrecieve = (state = { message: [], count: 0 }, action) => {
  switch (action.type) {
    case RECIEVE_NOTIFICATION:
      return {
        message: action.message,
        count: action.count
      };
    case REMOVE_NOTIFICATION_COUNT:
      return {
        ...state,
        count: 0
      }
    default:
      return state
  }
}
//////////////////////doctor profile tab/////////////////////////////

const profiletab = (state = { text: "profile" }, action) => {
  switch (action.type) {
    case DOCTOR_PROFILE:
      return {
        text: "profile"
      };
    case DOCTOR_APPOINTMENT:
      return {
        text: "appointment"
      }
    case DOCTOR_AVAILABILITY:
      return {
        text: "avail"
      }
    case DOCTOR_S_APPOINTMENT:
      return {
        text: "appoint"
      }
    case DOCTOR_MESSAGE:
      return {
        text: "message"
      }
    case DOCTOR_BILLING:
      return {
        text: "billing"
      }
    case DOCTOR_PASS:
      return {
        text: "pass"
      }
    case DOCTOR_SETTING:
      return {
        text: "set"
      }
    case DOCTOR_LINK:
      return {
        text: "link"
      }
    case DOCTOR_FEED:
      return {
        text: "feed"
      }
    case DOCTOR_LOCATION:
      return {
        text: "loc"
      }
    case DOCTOR_DELETE:
      return {
        text: "del"
      }
    default:
      return state
  }
}
//////////////////////////////////////////////

const doctorappointment = (state = { appoint: [] }, action) => {
  switch (action.type) {
    case RECIEVE_DOCTOR_APPOINTMENT:
      return {
        appoint: action.appoint,
      };
    default:
      return state
  }
}
////////////////country reducer////////////////

const countries = (state = { countries: [] }, action) => {
  switch (action.type) {
    case COUNTRY:
      return {
        countries: action.countries,
      };
    default:
      return state
  }
}

//////////////////city reducer////////////////////////

const cities = (state = { cities: [] }, action) => {
  switch (action.type) {
    case CITY:
      return {
        cities: action.cities,
      };
    default:
      return state
  }
}

//////////////////chatlist reducer////////////////////////

const chatlist = (state = { list: [] }, action) => {
  switch (action.type) {
    case MESSAGE_LIST:
      return {
        list: action.list,
      };
    default:
      return state
  }
}

//////////////////chat reducer////////////////////////

const chats = (state = { messages: [], photos: {} }, action) => {
  switch (action.type) {
    case MESSAGES:
      return {
        messages: action.messages,
        photos: action.photo
      };
    case INSERTED_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.message]
      }
    default:
      return state
  }
}
//////////////////chat reducer////////////////////////

const billingaddress = (state = { add: false }, action) => {
  switch (action.type) {
    case ADDRESS_REQUIRE:
      return {
        add: true,
      };
    case ADDRESS_NOT_REQUIRED:
      return {
        add: false
      }
    default:
      return state
  }
}
//////////////////chat reducer////////////////////////

const billinginfo = (state = { bill: [], total: 0, perpage: 0 }, action) => {
  switch (action.type) {
    case BILING_INFO:
      return {
        bill: action.bill,
        total: action.total,
        perpage: action.perpage
      };
    default:
      return state
  }
}
// ADD_LAT_LONG
const addlatlong = (state = { cord: [] }, action) => {

  switch (action.type) {
    case ADD_LAT_LONG:
      if (state.cord.length == 0) {
        return {
          ...state,
          cord: [action.cord]
        }
      } else {
        return {
          ...state,
          cord: state.cord.map(
            (content, i) => i === 0 ? { ...content, lat: action.cord.lat, lng: action.cord.lng, address: action.cord.address }
              : content
          )
        }
      }


    case ADD_CLINIC_NAME1:
      if (state.cord.length == 0) {
        return {
          ...state,
          cord: [{ clinicname: action.name }]
        }
      } else {
        return {
          ...state,
          cord: state.cord.map(
            (content, i) => i === 0 ? { ...content, clinicname: action.name }
              : content
          )
        }
      }
    case REMOVE_LOCATION:
      return {
        ...state,
        cord: []
      }

    default:
      return state
  }
}

const latlong = (state = { cord: [] }, action) => {

  switch (action.type) {
    case LAT_LONG:
      return {
        ...state,
        cord: [...state.cord, action.cord]
      }
    case REMOVE_LATLNG:
      return {
        cord: [...state.cord.slice(0, action.index), ...state.cord.slice(action.index + 1)]
      }
    case ADD_CLINIC_NAME:
      return {
        ...state,
        cord: state.cord.map(
          (content, i) => i === action.index ? { ...content, clinicname: action.name }
            : content
        )
      }

    default:
      return state
  }
}

// TERMS_CONDITIONS
const terms = (state = { plan: [] }, action) => {
  switch (action.type) {
    case TERMS_CONDITIONS:
      return {
        plan: action.plan
      };
    default:
      return state
  }
}
/////////////////////////////////////

const doctoravail = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_DAY:
      return {
        ...state,
        [action.day]: action.status
      }
    default:
      return state
  }
}

const langchange = (state = { lang: "en" }, action) => {
  switch (action.type) {
    case ARABIC:
      return { lang: "ar" };
    case ENGLISH:
      return { lang: "en" };
    default:
      return state
  }
}


const slots = (state = [], action) => {
  switch (action.type) {
    case GET_SLOTS:
      return action.slot;

    default:
      return state
  }
}

// ADD_INSURANCE_CHECK
const addinsurancecheck = (state = [], action) => {
  switch (action.type) {
    case RESET_CHECK:
      return []
    case REMOVE_INSURANCE_CHECK:
      return state.filter(element => element.plan_id !== action.plan_id);

    case ADD_INSURANCE_CHECK:
      return [...state, { plan_id: action.plan_id }]

    default:
      return state
  }
}
// DELETE_INSURANCE_CHECK
const deleteinsurancecheck = (state = {}, action) => {
  switch (action.type) {
    case RESET_CHECK:
      return []
    case DELETE_REMOVE_INSURANCE_CHECK:
      return state.filter(element => element.plan_id !== action.plan_id);

    case DELETE_ADD_INSURANCE_CHECK:
      return [...state, { plan_id: action.plan_id }]

    default:
      return state
  }
}
// GET_DOCTOR_INSURANCE
const doctorinsurace = (state = [], action) => {
  switch (action.type) {
    case GET_DOCTOR_INSURANCE:
      return action.insure;

    default:
      return state
  }
}
// SUBSCRIPTION_PLAN
const plans = (state = [], action) => {
  switch (action.type) {
    case SUBSCRIPTION_PLAN:
      return action.plan;

    default:
      return state
  }
}
// DOCTOR_CLINIC_LOCATION
const hospitals = (state = [], action) => {
  switch (action.type) {
    case DOCTOR_CLINIC_LOCATION:
      return action.location;

    default:
      return state
  }
}
// DOCTOR_FEEDBACK_GET
const feed = (state = [], action) => {
  switch (action.type) {
    case DOCTOR_FEEDBACK_GET:
      return action.feed;

    default:
      return state
  }
}

//////////////combining all reducers////////////////////
const rootReducer = combineReducers({
  recievespecility,
  recievelocation,
  recieveinsurance,
  Signuperror,
  Signinerr,
  doctorslist,
  doctorstimeslot,
  auth,
  doctorsbyid,
  userbyid,
  getappointment,
  forgetPassError,
  loaderReducer,
  otpError,
  notificationrecieve,
  doctorsingnupstep,
  languages,
  profiletab,
  doctorappointment,
  countries,
  cities,
  chatlist,
  chats,
  billingaddress,
  billinginfo,
  latlong,
  terms,
  "form": reduxFormReducer,
  doctoravail,
  langchange,
  slots,
  addinsurancecheck,
  deleteinsurancecheck,
  doctorinsurace,
  plans,
  hospitals,
  addlatlong,
  feed
});

export default rootReducer;
