// Public GitHub Pages preview: grade selection is a convenience, not an access control.
// A future SharePoint/SPFx deployment must use approved Microsoft Entra ID sign-in,
// server-verified grade entitlement and server-side permission checks. Setting
// deployment to "sharepoint" below only hides the preview grade-change control:
// it does NOT authenticate or authorise a student or protect curriculum files.
window.AUTH_CONFIG={
  deployment:"preview",
  clientId:"",
  authority:"https://login.microsoftonline.com/organizations"
};
