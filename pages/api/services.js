export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const data = JSON.parse(req.body);
      const mutations = [
        {
          create: {
            _type: "services",
            name: data.name,
            price: data.price,
            image: data.image,
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
  }

  // Delete
  else if (req.method === "DELETE") {
    console.log("delete");
    try {
      const data = JSON.parse(req.body);
      const mutations = [
        {
          delete: {
            // _type: "services",
            // name: "Carpentry",
            // unset: {

            // },
          },
        },
      ];
      const apiEndpoint = `https://k4gt4798.api.sanity.io/v2021-06-07/data/mutate/production`;

      const result = await fetch(apiEndpoint, {
        method: "DELETE",
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
  }

  // res.status(200).json({ name: "Added" });
}
