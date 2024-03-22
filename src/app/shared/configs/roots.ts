export const roots = {
  auth: {
    login: '/Account/login',
    isEmailFound: "/Account/IsEmailFound",
    isUserNameFound: "/Account/IsUserNameFound",
    isVatIdAvailableRegister: '/Application/IsVatNumberAvailable',
    checkCompanyNameAvailability: 'Supplier/checkCompanyNameAvailability',
    register: "/Application/Register",
    forgetPassword: '/Account/ForgetPassword',
    validateCode: '/Account/ValidateCode',
    resetNewPassword: '/Account/ResetPassword'
  },
  supplier: {
    getCountries: "/Country/GetCountrys",
    getCitiesByCountryId: "/City/GetCitysByCountryId",
  }

}
