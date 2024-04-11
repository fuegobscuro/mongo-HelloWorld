import * as Yup from 'yup';

const currentYear = new Date().getFullYear();

const programmingLanguageSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name can't be blank")
    .max(30, 'Name must be less than 30 characters'),
  year: Yup.number()
    .required("Year can't be blank")
    .min(1901, 'Year must be after 1900')
    .max(currentYear, `Year can't be set in the future`),
  creator: Yup.string()
    .required("Creator can't be blank")
    .max(55, 'Creator must be less than 55 characters'),
  description: Yup.string()
    .required("Description can't be blank")
    .max(200, 'Description must be less than 200 characters'),
  helloWorldCode: Yup.string().required("'Hello, World!' Code can't be blank"),
  tiobeRank: Yup.number()
    .required("TIOBE Rank can't be blank")
    .max(200, 'TIOBE Rank must be less than 200'),
  codeLang: Yup.string(),
  codeDevicon: Yup.string(),
  codeSimpleIcons: Yup.string(),
  isActive: Yup.boolean(),
});

export default programmingLanguageSchema;
