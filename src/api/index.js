// General api to access data
import ApiConstants from './ApiConstants';

export default function api (path, params, method, token) {
  let options;
  options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token && { "Authorization": `Bearer ${token}` }),
    },
    method: method,
    ...(params && { body: JSON.stringify(params) }),
  };

  return fetch(ApiConstants.BASE_URL + path, options).then((resp) => {
    // reform response
    if (!resp.ok) {
      if (resp.status === 401) {
        return {
          status: 401,
          errMsg: 'Unauthorized'
        };
      }
    }
    return resp.json();
  }).then((json) => {
    // reform response
    if(json == null)
      return {
      success: false,
      }

    if (json['status'] && json['status'] == 401) {
      return {
        ...json,
        success: false
      };
    }

    return {
      success: true,
      data: json
    };
  }).catch((error) => error);
}
