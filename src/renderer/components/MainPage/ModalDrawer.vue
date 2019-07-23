<template>
  <span>
    <aside class="mdc-drawer mdc-drawer--modal">
      <div class="mdc-drawer__header">
        <h3 class="mdc-drawer__title">Repositories</h3>
      </div>
      <div class="mdc-drawer__content">
        <span v-for='byOwner in repositories'>
          <h6 class="mdc-list-group__subheader">{{ byOwner.owner }}</h6>
          <nav class="mdc-list" v-for='repository in byOwner.repositories'>
            <a v-on:click="repositorySelect(repository)" class="mdc-list-item mdc-list-item--activated"  tabindex="0" aria-selected="true">
              <i class="material-icons mdc-list-item__graphic" aria-hidden="true">storage</i>
              {{ repository }}
            </a>
          </nav>
        </span>
        <hr class="mdc-list-divider">
        <a v-on:click="goSetting()" class="mdc-list-item mdc-list-item--activated"  tabindex="0" aria-selected="true">
              <i class="material-icons mdc-list-item__graphic" aria-hidden="true">settings</i>
              Settings
            </a>
      </div>
    </aside>
    <div class="mdc-drawer-scrim"></div>
  </span>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  export default {
    name: 'modal-drawer',
    computed: Object.assign(
      mapState('Repositories', {
        repositories: state => state.repositories
      }),
    ),
    created: async function () {
      try {
        await this.fetchRepoSummary(this.$http)
      } catch (err) {
        this.$router.push({path: "/setting"})
      }
    },
    methods: Object.assign({
      repositorySelect: function(repository) {
        this.selectRepository({http: this.$http, owner: this.repositories.find(x => x.repositories.includes(repository)), repository: repository})
      },
      goSetting: function() {
        this.$router.push({path: "/setting"})
      }
    },
      mapActions('Repositories', [
        'fetchRepoSummary',
        'selectRepository'
      ])
    )
  }
</script>

<style>
</style>
