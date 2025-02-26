import {
  InstagramTaskTypes,
  UserViewPath,
  UserLoginPath,
  CreateUserPath,
  BotAccountPath,
  faqPath,
  CreateAccountPath,
  BotIndexPath,
  AccountPatchPath,
  AccountShowPath,
  snapshotPath,
  TaskPath,
  AccountTaskPath,
  CheckoutEndpoint,
  unstickAccountPath,
  GenerateResetTokenPath,
  editProfilePath,
  changePasswordPath,
  accountsManagedPath,
} from './endpoints';

// ----------- Start User

export const CreateUserPost = async (userInfo) => {
  const response = await fetch(CreateUserPath, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(userInfo),
  });
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Something went wrong');
  }
};

export const loginFetch = async (userInfo) => {
  const resp = await fetch(UserLoginPath, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(userInfo),
  });
  const resp_1 = await resp.json();
  if (resp_1.error) {
    alert(resp_1.error, 'The email or password you provided is incorrect!');
    throw new Error(resp_1.error);
  } else {
    localStorage.setItem('user', JSON.stringify(resp_1.user));
    localStorage.setItem('token', resp_1.jwt);
    localStorage.setItem('email', JSON.stringify(resp_1.email));
    window.location.replace('/');
  }
};

export const Logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('email');
  window.location.replace('/');
};

export const GetUserInfo = async () => {
  const response = await fetch(UserViewPath + localStorage.getItem('user'), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: localStorage.getItem('token'),
    },
  });
  return await response.json();
};

export const EditProfilePatch = async (newData) => {
  console.log('newData', newData);
  const response = await fetch(editProfilePath, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: localStorage.getItem('token'),
    },
    body: JSON.stringify(newData),
  });
  if (response.ok) {
    console.log('success');
    return await response.json();
  } else {
    console.log('failed from client');
    throw new Error('Something went wrong');
  }
};

export const ChangePasswordPatch = async (newData) => {
  console.log('newData', newData);
  const response = await fetch(changePasswordPath, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: localStorage.getItem('token'),
    },
    body: JSON.stringify(newData),
  });
  const resp = await response.json();

  if (resp.error) {
    alert(resp.error);
  } else if (resp.success) {
    console.log('success');
    return resp;
  }
};

export const GetAccountsManaged = async () => {
  const response = await fetch(accountsManagedPath, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: localStorage.getItem('token'),
    },
  });
  return await response.json();
};

// END USER

// -------------- START ACCOUNTS

export const CreateAccount = async (formData) => {
  const response = await fetch(
    CreateAccountPath[0] + localStorage.getItem('user') + CreateAccountPath[1],
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify(formData),
    }
  );

  const resp_1 = await response.json();

  if (resp_1.error) {
    alert(resp_1.error);
  } else {
    return resp_1;
  }
};

export const PatchAccount = async (formData, account_id) => {
  const response = await fetch(AccountPatchPath + account_id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: localStorage.getItem('token'),
    },
    body: JSON.stringify(formData),
  });
  const res = await response.json();
  if (res.error) {
    alert(res.error);
  } else {
    return res;
  }
};
/**
 *
 * FIXME: Should return error in event of error.
 */
export const indexAccounts = async () => {
  const response = await fetch(BotIndexPath, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: localStorage.getItem('token'),
    },
  });
  const res = await response.json();
  if (res.error) {
    alert(res.error);
  } else {
    return res;
  }
};

export const ShowAccount = async (id) => {
  const response = await fetch(AccountShowPath + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: localStorage.getItem('token'),
    },
  });
  return await response.json();
};

export const DeleteAccount = async (id) => {
  const response = await fetch(BotAccountPath + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: localStorage.getItem('token'),
    },
  });
  return await response.json();
};

export const unstickAccount = async (account_id) => {
  const response = await fetch(unstickAccountPath + account_id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: localStorage.getItem('token'),
    },
  });
  return await response.json();
};

// END ACCOUNTS

// ---------------------- START TASKS

export const PostTask = async (formData) => {
  const response = await fetch(TaskPath, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: localStorage.getItem('token'),
    },
    body: JSON.stringify(formData),
  });
  const res = await response.json();
  if (res.error) {
    alert('Something went wrong. Please try again later!', res.error);
    console.log('nope', res.error);
    throw new Error(res.error);
  } else {
    return res;
  }
};

export const GetTasks = async (account_id) => {
  const response = await fetch(AccountTaskPath + '/' + account_id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: localStorage.getItem('token'),
    },
  });
  const res = await response.json();
  if (res.error) {
    throw new Error(res.error);
  } else {
    return res;
  }
};

export const GetTask = async (task_id) => {
  const response = await fetch(TaskPath + '/' + task_id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: localStorage.getItem('token'),
    },
  });
  const res = await response.json();
  if (res.error) {
    throw new Error(res.error);
  } else {
    return res;
  }
};

// END TASKS

// ---------- START SNAPSHOTS

export const getSnapshots = async (account_id) => {
  const response = await fetch(snapshotPath + '/' + account_id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: localStorage.getItem('token'),
    },
  });
  return await response.json();
};

// END SNAPSHOTS

// --------- Static APIs

export const GetFAQs = async () => {
  const response = await fetch(faqPath);
  return await response.json();
};

export const FetchInstagramTaskTypes = async () => {
  const response = await fetch(InstagramTaskTypes);
  return await response.json();
};

// END STATIC

//* START PAYMENT/CHECKOUT

export const CreateCheckoutSession = async (formData) => {
  const response = await fetch(CheckoutEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: localStorage.getItem('token'),
    },
    body: JSON.stringify(formData),
  });
  return await response.json();
};

export const GenerateResetToken = async (formData) => {
  const response = await fetch(GenerateResetTokenPath, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(formData),
  });
  const resp_1 = await response.json();

  if (resp_1.error) {
    alert(resp_1.error);
  } else if (resp_1.success) {
    console.log('success');
    return resp_1;
  }
};
