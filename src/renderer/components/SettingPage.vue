<template>
  <div id="app">
    <header class=" mdc-top-app-bar">
      <div class="mdc-top-app-bar__row">
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">
          <button v-on:click="event => {this.$router.push({ path: '/' })}" class="mdc-icon-button material-icons mdc-top-app-bar__action-item--unbounded" aria-label="Bookmark this page">close</button>
        </section>
      </div>
    </header>
    <div class="mdc-top-app-bar--fixed-adjust">
      <div class="mdc-form-field">
        <div class="mdc-text-field">
          <input class="mdc-text-field__input" id="text-field-hero-input">
          <label for="text-field-hero-input" class="mdc-floating-label">Personal Access Token</label>
        </div>
      </div>
      <div class="mdc-form-field">
        <button v-on:click="saveToken" class="mdc-button mdc-button--raised">Save</button>
      </div>
      <div class="mdc-form-field">
        <i class="material-icons mdc-text-field__icon" tabindex="0">{{ icon }}</i>
      </div>
    </div>
  </div>
</template>

<script>
  import {MDCFormField} from '@material/form-field';
  import {MDCTextField} from '@material/textfield';
  import { mapState, mapActions } from 'vuex';

  export default {
    name: 'setting-page',
    computed: Object.assign(
      mapState('Credential', {
        token: state => state.personalAccessToken
      })
    ),
    data: function () {
      return {
        formField: null,
        textField: null,
        icon: "done_outline"
      }
    },
    mounted: function () {
      this.formField = new MDCFormField(document.querySelector('.mdc-form-field'));
      this.textField = new MDCTextField(document.querySelector('.mdc-text-field'));

      this.textField.value = this.token
      this.saveToken(this.token)
    },
    methods: Object.assign({
      saveToken: function (event) {
        this.icon = "autorenew"
        this.$http
          .get('/user', {
            headers: { "Authorization": "token ".concat(this.textField.value) },
          }).then(response => {
            this.saveCredential(this.textField.value)
            this.icon = "done_outline"
          }).catch(err => {
            this.icon = "error"
          });
      }
    },
      mapActions('Credential', [
        'saveCredential'
      ]),
    )
  }
</script>

<style>
  /* CSS */
</style>
