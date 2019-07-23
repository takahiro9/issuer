<template>
  <div id="app">
    <header class="mdc-top-app-bar drawer-top-app-bar" id="app-bar">
      <div class="mdc-top-app-bar__row">
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
        <button 
            v-on:click="event => {$router.push({ name: 'main-page' })}"
            class="mdc-icon-button material-icons mdc-top-app-bar__navigation-icon mdc-ripple-upgraded--unbounded mdc-ripple-upgraded"
            style="--mdc-ripple-fg-size:28px; --mdc-ripple-fg-scale:1.71429; --mdc-ripple-left:10px; --mdc-ripple-top:10px;">keyboard_arrow_left</button>
        </section>
      </div>
    </header>
    <div class="mdc-top-app-bar--fixed-adjust"></div>
    <div class="mdc-layout-grid">
      <div class="mdc-layout-grid__inner">
        <div class="mdc-layout-grid__cell--span-6">
          <div class="mdc-text-field" id="title">
            <input v-model="title" class="mdc-text-field__input" id="text-field-title-input">
            <label for="text-field-title-input" class="mdc-floating-label">title</label>
          </div>
          <p></p>
          <div class="mdc-text-field mdc-text-field--textarea" id="body">
            <textarea v-on:input="changed" v-model="body" id="textarea" class="mdc-text-field__input" rows="8" cols="40">{{mode == 'edit' ? issue.body : ""}}</textarea>
            <div class="mdc-notched-outline">
              <div class="mdc-notched-outline__leading"></div>
              <div class="mdc-notched-outline__notch">
                <label for="textarea" class="mdc-floating-label">body</label>
              </div>
              <div class="mdc-notched-outline__trailing"></div>
            </div>
          </div>
        </div>
        <div id="preview" class="mdc-layout-grid__cell--span-6"></div>
      </div>
    </div>
    <div class="mdc-layout-grid">
      <div class="mdc-layout-grid__inner">
        <div class="mdc-layout-grid__cell--span-12 mdc-layout-grid--align-right">
          <button v-on:click="saveOrUpdate" class="mdc-button mdc-button--raised">{{ mode == "edit" ? 'Update' : 'Regist' }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import showdown from 'showdown';
  import {MDCTextField} from '@material/textfield';
  import { mapState, mapActions } from 'vuex';

  export default {
    name: 'settingdetail-page',
    props: ['issue', 'mode'],
    data: function () {
      return {
        title: null,
        body: null
      }
    },
    computed: Object.assign(
      mapState('Repositories', {
        selected: state => state.selected
      })
    ),
    mounted: function () {
      new MDCTextField(document.querySelector('#title'))
      this.title = this.issue ? this.issue.title : '';
      new MDCTextField(document.querySelector('#body'))
      this.body = this.issue ? this.issue.body : '';

      const converter = new showdown.Converter()
      document.querySelector('#preview').innerHTML = converter.makeHtml(this.issue ? this.issue.body : '')
    },
    methods: Object.assign({
      changed: function(event) {
        const converter = new showdown.Converter()
        document.querySelector('#preview').innerHTML = converter.makeHtml(event.target.value)
      },
      saveOrUpdate: async function(event) {
        const params = {
          issue: this.issue,
          owner: this.selected.owner,
          repository: this.selected.repository,
          update: {
            title: this.title,
            body: this.body
          }
        }

        switch (this.mode) {
          case 'edit':
            await this.updateIssue(params)
            break;
          case 'regist':
            await this.createIssue(params)
            break;
          default:
        }

        this.$router.push({ name: 'main-page' })
      }
      
    },
      mapActions('Issues', [
        'updateIssue',
        'createIssue'
      ]),
    )
  }
</script>

<style>
  /* CSS */
</style>
