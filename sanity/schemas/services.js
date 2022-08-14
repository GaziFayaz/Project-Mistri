export default {
  name: "services",
  title: "Services",
  type: "document",
  fields: [
    {
      name: "service",
      title: "Service",
      type: "array",
      of: [{ type: "string" }],
    },
  ],
};
