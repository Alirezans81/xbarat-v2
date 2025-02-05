import * as Yup from "yup";

const getErrorMessages = (lang) => ({
  first_name: {
    required: lang["first-name-required"] || "First name is required",
    pattern:
      lang["first-name-pattern"] || "First name must only contain letters",
  },
  last_name: {
    required: lang["last-name-required"] || "Last name is required",
    pattern: lang["last-name-pattern"] || "Last name must only contain letters",
  },
  phone: {
    required: lang["phone-required"] || "Phone number is required",
    pattern:
      lang["phone-pattern"] ||
      "Phone must be a valid international number starting with +",
  },
  address: {
    required: lang["address-required"] || "Address is required",
    length:
      lang["address-length"] || "Address must be between 5 and 100 characters",
  },
  nationality: {
    required: lang["nationality-required"] || "Please Select a Nationality",
  },
  country: {
    required: lang["country-required"] || "Please Select a Country",
  },
  city: {
    required: lang["city-required"] || "Please Select a City",
  },
  identity_code: {
    required: lang["identity_code-required"] || "Identity Code is required",
    length:
      lang["identity_code-pattern"] ||
      "Identity Code must be between 5 and 100 characters",
  },
  wallet_asset_currency: {
    required:
      lang["wallet-asset-currency-required"] || "Please Select a Currency",
    pattern: "",
  },
  wallet_tank_type: {
    required:
      lang["wallet_tank_type-required"] || "Please Select a Type of Account",
    pattern: "",
  },
  cardholder_name: {
    required:
      lang["cardholder-name-required"] || "Cardholder's name is required",
    pattern:
      lang["cardholder-name-pattern"] ||
      "Cardholder's name must only contain letters and spaces",
  },
  account_number_or_address: {
    required:
      lang["account-number-or-address-required"] ||
      "Account number or address is required",
    pattern:
      lang["account-number-or-address-pattern"] ||
      "Account number or address must be valid",
  },
  bank_name: {
    required: lang["bank-name-required"] || "Bank name is required",
    pattern:
      lang["bank-name-pattern"] ||
      "Bank name must only contain letters and spaces",
  },
});

const getValidationSchema = (currentStep, lang) => {
  const errorMessages = getErrorMessages(lang);

  switch (currentStep) {
    case 1:
      return Yup.object({
        first_name: Yup.string()
          .matches(/^[a-zA-Z]+$/, errorMessages.first_name.pattern)
          .required(errorMessages.first_name.required),
        last_name: Yup.string()
          .matches(/^[a-zA-Z]+$/, errorMessages.last_name.pattern)
          .required(errorMessages.last_name.required),
        phone: Yup.string()
          .matches(
            /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
            errorMessages.phone.pattern
          )
          .required(errorMessages.phone.required),
        address: Yup.string()
          .matches(/^.{5,100}$/, errorMessages.address.length)
          .required(errorMessages.address.required),
      });
    case 2:
      return Yup.object({
        nationality: Yup.string().required(errorMessages.nationality.required),
        country: Yup.string().required(errorMessages.country.required),
        city: Yup.string().required(errorMessages.city.required),
      });
    case 3:
      return Yup.object({
        identity_code: Yup.string()
          .matches(/^.{5,100}$/, errorMessages.identity_code.length)
          .required(errorMessages.identity_code.required),
      });
    case 4:
      return Yup.object({
        wallet_asset_currency: Yup.string().required(
          errorMessages.wallet_asset_currency.required
        ),
        wallet_tank_type: Yup.string().required(
          errorMessages.wallet_tank_type.required
        ),
        title: Yup.string()
          .matches(/^[a-zA-Z\s]+$/, errorMessages.cardholder_name.pattern)
          .required(errorMessages.cardholder_name.required),
        bank_info: Yup.string()
          .matches(
            /^[a-zA-Z0-9\s]+$/,
            errorMessages.account_number_or_address.pattern
          )
          .required(errorMessages.account_number_or_address.required),
        bank_name: Yup.string()
          .matches(/^[a-zA-Z\s]+$/, errorMessages.bank_name.pattern)
          .required(errorMessages.bank_name.required),
      });
    default:
      return Yup.object();
  }
};

export { getValidationSchema, getErrorMessages };
