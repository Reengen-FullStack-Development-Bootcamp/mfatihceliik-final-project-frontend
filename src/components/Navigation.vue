<template>
  <div id="navigation">
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item>{{ $t("message.welcome") }}, {{ userName }}</b-nav-item>
        <select
          class="custom-select"
          v-model="lang"
          @change="handleChange($event)"
        >
          <option value="en">English</option>
          <option value="tr">Turkish</option>
        </select>
        <b-button class="btn btn-danger custom-select" @click="signOut()">{{
          $t("message.signOut")
        }}</b-button>
      </b-navbar-nav>
    </b-navbar>
    <notifications group="foo" position="top left" />
  </div>
</template>

<script>
export default {
  name: "Navigation",
  props: {},
  data() {
    const lang = localStorage.getItem("lang") || "en";
    return {
      lang: lang,
      userName: localStorage.first_name,
    }
  },
  methods: {
    handleChange(event) {
      localStorage.setItem("lang", event.target.value);
      window.location.reload();
    },
    signOut() {
      if (this.$route.path == "/") {
        this.$notify({
          group: "foo",
          type: "warn",
          title: "Warning",
          text: "Already sign out.",
        });
      } else {
        if (localStorage.token != null) localStorage.token = null;
        setTimeout(() => {
          this.$router.push('/');
        }, 1000);
      }
    },
  },
  created() {
    if (localStorage.getItem("lang") == null)
      localStorage.setItem("lang", "en");
  },
};
</script>

<style scoped>
.custom-select {
  margin-left: 10px;
}
</style>