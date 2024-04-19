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
    resetNewPassword: '/Account/ResetPassword',
    isEmailAvailable: "/Account/IsEmailAvailable",
  },
  supplier: {
    getCountries: "/Country/GetCountrys",
    getCitiesByCountryId: "/City/GetCitysByCountryId",
  },
  suppliersRegister: {
    supplierRefresh: 'Supplier/refresh',
    getItemsCategoryTypes: 'SAPItemsCategoryType/GetItemsCategoryTypes',
    isCRNumberAvailable: 'Supplier/checkCRAvailability',
    checkCompanyNameAvailability: 'Supplier/checkCompanyNameAvailability',
    isUserNameAvailable: 'Application/IsUserNameAvailable',
    isVatIdAvailable: 'Application/IsVatNumberAvailableInStep',
    isVatIdAvailableRegister: 'Application/IsVatNumberAvailable',
    isTaxIdAvailable: 'Application/IsTaxIdAvailable',
    isDunsNumberAvailable: 'Application/IsDunsNumberAvailable',
    addBank: 'Supplier/add-supplier-bank',
    addCustomerReference: 'Supplier/add-customer-reference',
    addParentCompany: 'Supplier/add-attachment-file',
    completeSupplierData: 'Supplier/CompleteSupplierData',
    saveAttachmentFile: 'Supplier/SaveFile',
    supplierDetails: 'Supplier/details',
    supplierAddress: 'Supplier/address',
    supplierContacts: 'Supplier/contacts',
    supplierBanks: 'Supplier/bank',
    supplierCustomerReference: 'Supplier/customer-reference',
    supplierRelatedCompany: 'Supplier/related-company',
    supplierAttachment: 'Supplier/attachment',
    attachmentsType: 'Supplier/attachment-types',
    finalize: 'Supplier/finalize-reg',
    searchSupplier: 'Supplier/search-supplier',
    addNewSupplier: 'Supplier/add-new-supplier',
    getRfqNoAutoComplete: 'RequestQutation/GetRfqNoAutoComplete',
    getRFQById: 'RequestQutation/GetRFQById',
    getReplacementItemTypes: 'ReplacementItemType/getReplacementItemTypes',
    submitRequestQutation: 'RequestQutation/submitRequestQutationToAdminByAdmin',
    getQutationByIdWithFiles: 'RequestQutation/getQutationByIdWithFiles',
    getSupplierQuotation: 'RequestQutation/getSupplierQuotation',
    getRFQByIdWithFiles: 'RequestQutation/GetRFQByIdWithFiles',
    getCurrencies: "getCurrencies",
    getOwnerShip: "getOwnerShip"
  },
  dashboard: {
    availability: {
      IsNationalIdentityAvailable: "Client/IsIdentityAvailable",
      IsEmailAvailable: "Client/IsEmailAvailable",
      IsPhoneAvailable: "Client/IsPhoneNumberAvailable",
      IsRecordNumberAvailable: "ClientHistory/IsNumberAvailable",
      IsOperatingCardAvailable: "Employee/IsIdentityAvailable",
      IsResidencyNumberAvailable: 'Employee/IsIdentityAvailable'
    },
    clients: {
      getClients: 'Client/AllClients',
      getSingleClient: 'Client/GetSingleClient',
      addClient: 'Client/AddClient',
      editClient: '/Client/UpdateClient',
      deleteClients: '/deleteClients',
    },
    records: {
      getRecords: 'ClientHistory/AllClientHistorys',
      getSingleHistory: 'ClientHistory/GetSingleHistory',
      addRecords: 'ClientHistory/AddClientHistory',
      editRecords: 'ClientHistory/UpdateClientHistory'
    },
    employees: {
      getEmployees: 'Employee/AllEmployees',
      addEmployee: 'Employee/AddEmployee',
      editEmployee: 'Employee/UpdateEmployee',
      deleteEmployee: 'Employee/DeleteEmployee'
    },
    vehicles: {
      getVehicles: 'Car/AllCars',
      addVehicle: 'Car/AddCar',
      editVehicle: 'Car/UpdateCar'
    }
  }
}
