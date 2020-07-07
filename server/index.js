const express = require("express");
const source = require("./source.json");

const truthy = {
  _id: "5f035b83ed8b498daaf05405",
  guid: "be9c7403-5685-4828-a9dd-299282dde7fc",
  isActive: true,
  balance: "$3,301.20",
  picture: "http://placehold.it/32x32",
  age: 33,
  eyeColor: "green",
  name: "Dena Battle",
  gender: "female",
  company: "GORGANIC",
  email: "denabattle@gorganic.com",
  phone: "+1 (825) 560-3865",
  address: "856 Rugby Road, Kiskimere, Colorado, 5208",
  about:
    "Incididunt enim mollit aliquip dolore proident ut nostrud. Reprehenderit nulla tempor sunt ullamco mollit dolor ea Lorem elit eiusmod incididunt officia. Amet cupidatat cupidatat velit sunt elit eu amet. Minim ullamco voluptate ipsum sit ullamco minim. Reprehenderit cupidatat ut commodo nostrud id fugiat exercitation nisi consequat fugiat cupidatat ullamco. Quis sit eu pariatur exercitation est sit adipisicing commodo laborum dolor.\r\n",
  registered: "2020-07-07T09:31:55.900Z",
  latitude: -4.566768,
  longitude: 137.308872,
  tags: ["ad", "labore", "veniam", "Lorem", "nostrud", "in", "et"],
  friends: [
    {
      id: 0,
      name: "Jenny Ortega",
    },
    {
      id: 1,
      name: "Tricia Cantrell",
    },
    {
      id: 2,
      name: "Mcknight Ford",
    },
  ],
  greeting: "Hello, Dena Battle! You have 9 unread messages.",
};

const app = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/", (req, res) => {
  const newObject = JSON.parse(JSON.stringify(truthy));

  const touchedKeys = [];
  const randomize = () => {
    source.forEach((element) => {
      const keys = Object.keys(element);
      const rKey = keys[Math.floor(Math.random() * keys.length)];
      if (touchedKeys.includes(rKey)) {
        return;
      } else if (
        JSON.stringify(truthy[rKey]) !== JSON.stringify(element[rKey])
      ) {
        touchedKeys.push(rKey);
      }

      newObject[rKey] = element[rKey];
    });
  };

  while (touchedKeys.length < 1) {
    randomize();
  }

  res.json(newObject);
});

const server = app.listen(8080, "0.0.0.0");
server.on("listening", () => {
  console.log("Server listening on 0.0.0.0:8080");
});
