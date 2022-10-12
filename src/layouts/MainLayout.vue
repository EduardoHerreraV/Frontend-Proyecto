<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar style="height: 60px">
        <img src="~/assets/icon.png" alt="" style="width: 50px;" class="q-mr-lg">
        <q-toolbar-title class="pointer text-h6" @click="$router.push('/')">
          Ingenieria en Software
        </q-toolbar-title>
        <div class="row items-center q-mr-xl">
          <q-btn label="Control escolar" dense flat color="white"  icon-right="arrow_drop_down" no-caps class="q-ml-sm q-px-sm">
            <q-menu>
              <q-list dense class="text-grey-8" style="min-width: 100px">
                <q-item @click.native="$router.push('/user').catch(err => {})" clickable>
                <q-item-section>Registrar nuevo Alumno</q-item-section>
                  <q-item-section avatar>
                    <q-icon color="primary" name="person" />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
        <div class="row items-center q-mr-xl">
          <q-btn label="Administrador" dense flat color="white"  icon-right="arrow_drop_down" no-caps class="q-ml-sm q-px-sm">
            <q-menu>
              <q-list dense class="text-grey-8" style="min-width: 100px">
                <q-item @click.native="$router.push('/catalogs').catch(err => {})" clickable>
                <q-item-section>Catalogos</q-item-section>
                  <q-item-section avatar>
                    <q-icon color="primary" name="person" />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
        <div class="row items-center">
          <q-btn :label="user.name" dense flat color="white" icon-right="arrow_drop_down" no-caps class="q-ml-sm q-px-sm avatar" >
            <q-menu>
              <q-list dense class="text-grey-8 btnLogout" style="min-width: 100px">
                <q-item @click="CloseSession = true" clickable>
                  <q-item-section>Cerrar sesión</q-item-section>
                  <q-item-section avatar>
                    <q-icon color="primary" name="exit_to_app" />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-dialog v-model="CloseSession">
      <q-card style="min-width: 400px">
        <q-card-section align="center">
          <div class="text-h6">¿Seguro desea cerrar sesión?</div>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn flat label="Cancelar" color="negative" v-close-popup />
          <q-btn flat label="Cerrar Sesión" color="positive" @click="logout()" class="btnConfirmLogout" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data () {
    return {
      CloseSession: false
    }
  },
  mounted () {
    if (!this.user.name) {
      this.$q.loading.show()
      this.$store
        .dispatch('user/refreshInformation')
        .then((res) => {
          if (res) {
            this.$router.push('/')
          }
        })
        .finally(() => {
          this.$q.loading.hide()
        })
    }
  },
  computed: {
    user: {
      get () {
        return this.$store.state.user.information
      }
    }
  },
  methods: {
    logout () {
      this.$q.loading.show()
      this.$store.dispatch('user/clearInformation').then((response) => {
        this.$router.push('/login')
        // location.reload()
      }).finally(() => {
        this.$q.loading.hide()
      })
    }
  }
}
</script>
