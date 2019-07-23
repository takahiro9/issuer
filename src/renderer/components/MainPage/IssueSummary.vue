<template>
  <div class="drawer-frame-app-content">
    <header class="mdc-top-app-bar drawer-top-app-bar" id="app-bar">
      <div class="mdc-top-app-bar__row">
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start"><button
            class="mdc-icon-button material-icons mdc-top-app-bar__navigation-icon mdc-ripple-upgraded--unbounded mdc-ripple-upgraded"
            style="--mdc-ripple-fg-size:28px; --mdc-ripple-fg-scale:1.71429; --mdc-ripple-left:10px; --mdc-ripple-top:10px;">menu</button><span
            class="mdc-top-app-bar__title">{{ selected.repository }} ( {{issues.length}} ) </span></section>
      </div>
    </header>
    <div class="drawer-main-content" id="main-content">
      <div class="mdc-top-app-bar--fixed-adjust"></div>

      <div class="mdc-layout-grid">
        <div class="mdc-layout-grid__inner">
          <div class="mdc-layout-grid__cell" v-for='issue in issues'>
            <div class="mdc-card issue-card">
              <div class="mdc-card demo-card">
                <div class="mdc-card__primary-action demo-card__primary-action" tabindex="0">
                  <div class="demo-card__primary">
                    <h2 class="demo-card__title mdc-typography mdc-typography--headline6">{{ issue.title }}</h2>
                  </div>
                  <div class="demo-card__secondary mdc-typography mdc-typography--body2">{{ issue.body.substr(0, 100).concat('...') }}</div>
                </div>
                <div class="mdc-card__actions">
                  <div class="mdc-card__action-buttons">
                    <button v-on:click="event => {$router.push({ name: 'detail-page', params: {issue: issue, mode: 'edit'} })}" class="mdc-button mdc-card__action mdc-card__action--button">read more</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p></p>
        <div class="mdc-layout-grid__inner">
          <div class="mdc-layout-grid__cell--span-12 mdc-layout-grid--align-right">
            <button v-if="selected.repository != undefined" v-on:click="event => {$router.push({ name: 'detail-page', params: {mode: 'regist'} })}" class="mdc-button mdc-button--raised material-icons">add</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {MDCTopAppBar} from "@material/top-app-bar";
  import {MDCDrawer} from "@material/drawer";
  import {MDCRipple} from '@material/ripple';
  import { mapState } from 'vuex';

  export default {
    name: 'issue-summary',
    computed: Object.assign(
      mapState('Issues', {
        issues: state => state.issues
      }),
      mapState('Repositories', {
        selected: state => state.selected
      })
    ),
    mounted: function () {
      const topAppBar = MDCTopAppBar.attachTo(document.getElementById('app-bar'));
      const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));

      topAppBar.setScrollTarget(document.getElementById('main-content'));
      topAppBar.listen('MDCTopAppBar:nav', () => {
        drawer.open = !drawer.open;
      });
    }
  }
</script>

<style>
  .demo-card {
    padding: 16px;
  }
</style>
