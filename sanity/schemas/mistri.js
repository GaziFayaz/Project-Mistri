export default {
    name: "mistri",
    title: "Mistri",
    type: "document",
    fields: [
      {
        name: "first_name",
        title: "First Name",
        type: "string",
      },
      {
        name: "last_name",
        title: "Last Name",
        type: "string",
      },
      {
        name: "email",
        title: "Email",
        type: "string",
      },
      {
        name: "phone_number",
        title: "Phone Number",
        type: "string",
      },
      {
        name: "address",
        title: "Address",
        type: "string",
      },
      {
        name: "dateOfBirth",
        title: "Date of Birth",
        type: "date",
      },
      {
        name: "expertises",
        title: "Expertises",
        type: "array",
        of: [
          {
            type: "string",
          },
        ],
      },
      {
        name: "experience",
        title: "Experience",
        type: "string",
      },
      {
        name: "certification",
        title: "Certification",
        type: "string",
      },
      {
        name: "photo",
        title: "Photo",
        type: "string",
      },
    ],
  };
  