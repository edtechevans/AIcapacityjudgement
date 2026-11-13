// Optional Microsoft Entra ID sign-in. Leave clientId blank until your school identity administrator approves the app registration.
// IMPORTANT: Client-side sign-in alone is not an authorization system or secure gradebook.
// Do not store sensitive student data here. For production, add approved backend storage and access controls.
window.AUTH_CONFIG={
  clientId:"",
  authority:"https://login.microsoftonline.com/organizations"
};