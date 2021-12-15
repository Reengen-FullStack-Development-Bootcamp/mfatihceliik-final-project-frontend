<template>
  <form>
    <div>
      <notifications group="foo" position="top left" />
    </div>
    <label>{{ $t("message.email") }}:</label>
    <input type="email" required v-model="user.email" />
    <label>{{ $t("message.password") }}:</label>
    <input type="password" required v-model="password" />
    <b-button
      style="float: right; margin-left: 5px"
      class="btn btn-dark"
      @click="register()"
      >{{ $t("message.register") }}</b-button
    >
    <b-button
      style="float: right"
      class="btn btn-dark"
      @click="login(user.email, password)"
      >{{ $t("message.login") }}</b-button
    >
    <label>{{ $t("message.remember") }}</label>
    <input
      type="checkBox"
      :value="isChecked"
      :checked="isChecked"
      @change="check()"
    />
    <br />
  </form>
</template>

<script>
import axios from "./plugins/Axios/axios";
export default {
  name: "Login",
  data() {
    return {
      password: "",
      user: { first_name: "", last_name: "", email: "", role: "", token: "" },
      isChecked: false,
      reg: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
    };
  },
  mounted() {
    if (JSON.parse(localStorage.isChecked) == true) {
      this.user.first_name = localStorage.first_name;
      this.user.email = localStorage.email;
      this.user.role = localStorage.role;
      this.user.token = localStorage.token;
      this.isChecked = JSON.parse(localStorage.isChecked);
    }
  },
  methods: {
    async login(email, password) {
      axios
        .post("user/login", { email, password })
        .then((response) => {
          if (this.isChecked === true && response.data.success === true) {
            localStorage.first_name = response.data.data.first_name;
            localStorage.last_name = response.data.data.last_name;
            localStorage.email = response.data.data.email;
            localStorage.role = response.data.data.role;
            localStorage.token = response.data.token;
            localStorage.isChecked = this.isChecked;
            this.$notify({
              group: "foo",
              type: "success",
              title: "SUCCESS !",
              text: response.data.message,
            });
            console.log("token: " + localStorage.token);
            setTimeout(() => {
              this.$router.push("factories");
            }, 2000);
          }
        })
        .catch((error) => {
          console.log("girdi");
          this.$notify({
            group: "foo",
            type: "error",
            title: "Error !",
            text: error.response.data.message,
          });
        });
    },
    check() {
      if (this.isChecked == false) this.isChecked = true;
      else this.isChecked = false;
    },
    register() {
      this.$router.push("register");
    },
  },
};
</script>

<style>
form {
  max-width: 460px;
  margin: 30px auto;
  background: #2c2c2b;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}
label {
  color: white;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
input {
  display: block;
  padding: 10px 6px;
  widows: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1 px solid #ddd;
  color: #555;
}
</style>