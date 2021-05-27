// Remove an important info.
const clearUserData = data => {
  delete data.salt;
  delete data.regKey;
  delete data.password;
  delete data.createdAt;
  delete data.updatedAt;
  delete data.expireRegDate;
  delete data.expireRecoverSecretCode;
  delete data.expireRecoverPasswordDate;

  return data;
};


export default clearUserData;