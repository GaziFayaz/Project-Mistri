export default async function handler(req, res) {
  try {
    const data = JSON.parse(req.body);
    const mutations = [
      {
        create: {
          _type: "userForm",
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone_number: data.phoneNumber,
          address: data.address,
          dateOfBirth: data.dateOfBirth,
          photo: data.image,
        },
      },
    ];
    const apiEndpoint = `https://k4gt4798.api.sanity.io/v2021-06-07/data/mutate/production`;

    const result = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.tokenWithWriteAccess}`,
      },
      body: JSON.stringify({ mutations }),
    });

    const json = await result.json();
  } catch (error) {
    console.log("error", error);
  }

  res.status(200).json({ name: "Added" });
}
