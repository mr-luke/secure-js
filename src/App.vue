<template>
  <div id="app" v-if="user">
    <p :class="{ 'error': errorKeys.includes('id') }">
      <strong>ID:</strong>
      <span v-html="user.id"></span>
    </p>
    <p :class="{ 'error': errorKeys.includes('guid') }">
      <strong>GUID:</strong>
      <span v-html="user.guid"></span>
    </p>
    <p :class="{ 'error': errorKeys.includes('isActive') }">
      <strong>Active:</strong>
      <span v-if="user.isActive === true">Active</span>
      <span v-else-if="user.isActive === false">Not active</span>
      <span v-else>ERROR</span>
    </p>
    <p :class="{ 'error': errorKeys.includes('balance') }">
      <strong>Balance:</strong>
      {{ user.balance.slice(1).replace(',', '') }} USD
    </p>
    <p :class="{ 'error': errorKeys.includes('picture') }">
      <strong>Picture:</strong>
      <img style="display: inline-block;" :src="user.picture" />
    </p>
    <p :class="{ 'error': errorKeys.includes('age') }">
      <strong>Age:</strong>
      {{ user.age * 2 / 2 }}
    </p>
    <p :class="{ 'error': errorKeys.includes('eyeColor') }">
      <strong>eyeColor:</strong>
      <span
        style="display: inline-block; width: 32px; height: 32px;"
        :style="{ 'background-color': user.eyeColor }"
      ></span>
    </p>
    <p :class="{ 'error': errorKeys.includes('name') }">
      <strong>Name:</strong>
      <span v-html="user.name"></span>
    </p>
    <p :class="{ 'error': errorKeys.includes('gender') }">
      <strong>Gender:</strong>
      <span v-if="user.gender === 'male'">M</span>
      <span v-else-if="user.gender === 'female'">F</span>
      <span v-else>ERROR</span>
    </p>
    <p :class="{ 'error': errorKeys.includes('company') }">
      <strong>Company:</strong>
      <span v-html="user.company"></span>
    </p>
    <p :class="{ 'error': errorKeys.includes('email') }">
      <strong>Email:</strong>
      <a :href="`mailto:${user.email}`">{{ user.email }}</a>
    </p>
    <p :class="{ 'error': errorKeys.includes('phone') }">
      <strong>Phone:</strong>
      <a :href="`tel:${user.phone}`">{{ user.phone }}</a>
    </p>
    <p :class="{ 'error': errorKeys.includes('address') }">
      <strong>Address:</strong>
      <span v-html="user.address"></span>
    </p>
    <p :class="{ 'error': errorKeys.includes('about') }">
      <strong>About:</strong>
      <span v-html="user.about"></span>
    </p>
    <p :class="{ 'error': errorKeys.includes('registered') }">
      <strong>Registered:</strong>
      {{ new Date(user.registered) }}
    </p>
    <p :class="{ 'error': errorKeys.includes('latitude') }">
      <strong>Latitude:</strong>
      <span v-html="user.latitude"></span>
    </p>
    <p :class="{ 'error': errorKeys.includes('longitude') }">
      <strong>Longitude:</strong>
      <span v-html="user.longitude"></span>
    </p>
    <p :class="{ 'error': errorKeys.includes('tags') }">
      <strong>Tags:</strong>
      {{ user.tags.join(', ') }}
    </p>
    <p :class="{ 'error': errorKeys.includes('friends') }">
      <strong>Friends:</strong>
      {{ user.friends.map(f => `${f.name} (ID: ${f.id})`).join(', ') }}
    </p>
    <p :class="{ 'error': errorKeys.includes('greeting') }">
      <strong>Greeting:</strong>
      <span v-html="user.greeting"></span>
    </p>
  </div>
</template>

<script>
import { UserService } from "../lib/user-service";

export default {
  name: "App",
  data() {
    return {
      user: null,
      errorKeys: []
    };
  },
  mounted() {
    const validPayload = {
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
          name: "Jenny Ortega"
        },
        {
          id: 1,
          name: "Tricia Cantrell"
        },
        {
          id: 2,
          name: "Mcknight Ford"
        }
      ],
      greeting: "Hello, Dena Battle! You have 9 unread messages."
    };

    fetch("http://localhost:8080")
      .then(res => res.json())
      .then(u => {
        console.log(u);
        Object.keys(u).forEach(key => {
          if (JSON.stringify(u[key]) !== JSON.stringify(validPayload[key])) {
            console.warn(
              `Key "${key}" value is "${u[key]}". Should be "${validPayload[key]}"`
            );
            this.errorKeys.push(key);
          }
        });

        this.user = new UserService();
        this.user.user = u;
      });
  },
  computed: {
    userData() {
      return Object.keys(this.user).filter(key => !key.includes("user"));
    }
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 0;
  margin-bottom: 1rem;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

p.error {
  background-color: brown;
}
</style>
