<template>
  <form>
    <div>
      <notifications group="foo" position="top left" />
    </div>
    <label>{{$t('message.firstName')}}:</label>
    <input required v-model="user.first_name" />
    <label>{{$t('message.lastName')}}:</label>
    <input required v-model="user.last_name" />
    <label>{{$t('message.email')}}:</label>
    <input type="email" required v-model="user.email" />
    <label>{{$t('message.password')}}:</label>
    <input type="password" required v-model="user.password" />
    <b-button
      style="float: right; margin-left: 5px"
      class="btn btn-dark"
      @click="CheckAndRegister(user)"
      >{{$t('message.register')}}</b-button>
    <br />
  </form>
</template>

<script>
import axios from "axios";
export default {
  name: "Register",
  data() {
    return {
      user: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        role: "2",
      },
      reg: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
    };
  },
  mounted() {},
  methods: {
    register(user) {
      this.user = user;
      axios
        .post(`http://localhost:3000/api/user/register`, this.user)
        .then((response) => {
          console.log(response);
          if (response.data.success === true) {
            this.$notify({
              group: "foo",
              type: "success",
              title: "SUCCESS !",
              text: response.data.message,
            });
            this.$router.push("login");
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
    isEmailValid() {
      return !this.reg.test(this.user.email)
    },
    CheckAndRegister(user) {
        console.log("User: " + user)
      if (this.user.first_name != "" && this.user.last_name != "" && this.user.email != "", this.user.password != "" && this.user.password.length >= 6) {
        const emailCheck =  this.isEmailValid()
        console.log("Email check: "+emailCheck)
        if(emailCheck == false) {
            this.register(user)
        }else {
            this.$notify({
            group: "foo",
            type: "warn",
            title: "Warning",
            text: "Please enter the correct email.",
        });
        }
      } else {
        this.$notify({
          group: "foo",
          type: "warn",
          title: "Warning !",
          text: "Please, fill in all fields",
        });
      }
    },
  },
};
</script>

<style scoped>
</style>