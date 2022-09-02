export default {
  name: "hireReq",
  title: "Hire Request",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Service Name",
      type: "string",
    },
    {
      name: "description",
      title: "Mistri Description",
      type: "text",
    },
    {
      name: "cId",
      title: "Customer ID",
      type: "string",
    },
    {
      name: "cName",
      title: "Customer Name",
      type: "string",
    },
    {
      name: "cphone",
      title: "Customer Phone Number",
      type: "string",
    },
    {
      name: "cAddress",
      title: "Customer Address",
      type: "string",
    },
    {
      name: "Approved",
      title: "Request Approval",
      type: "boolean",
    },
  ],
};
