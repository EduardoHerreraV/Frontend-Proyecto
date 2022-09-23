<template>
  <div class="q-pa-xl">
    <div class="col-auto text-h5 q-mb-xl">
      Bienvenido:
      <span>
        {{ user.name }} {{ user.last_name }} {{ user.second_last_name }}</span
      >
    </div>
    <!-- <div class="text-h5">Acciones</div> -->
    <q-separator spaced />
    <!-- <div class="row q-col-gutter-sm q-mt-lg">
      <div
        class="home-card pointer col-xs-12 col-sm-12 col-md-6"
        @click="$router.push('/project')"
      >
        <q-card class="row items-center justify-between">
          <q-card-section>
            <div class="text-h5 q-mt-sm q-mb-xs">Proyecto</div>
            <div class="text-caption text-grey">
              Registrar un nuevo proyecto
            </div>
          </q-card-section>
          <q-card-section>
            <q-icon name="person" size="4.1em" color="primary" />
          </q-card-section>
        </q-card>
      </div>
       <div
        class="home-card pointer col-xs-12 col-sm-12 col-md-6"
        @click="$router.push('/initiative')"
      >
        <q-card class="row items-center justify-between">
          <q-card-section>
            <div class="text-h5 q-mt-sm q-mb-xs">Iniciativa</div>
            <div class="text-caption text-grey">
              Registrar una nueva iniciativa
            </div>
          </q-card-section>
          <q-card-section>
            <q-icon name="person" size="4.1em" color="primary" />
          </q-card-section>
        </q-card>
      </div>
      <div
        class="home-card pointer col-xs-12 col-sm-12 col-md-6"
        @click="$router.push('/Task')"
      >
        <q-card class="row items-center justify-between">
          <q-card-section>
            <div class="text-h5 q-mt-sm q-mb-xs">Tarea</div>
            <div class="text-caption text-grey">Registrar una nueva tarea</div>
          </q-card-section>
          <q-card-section>
            <q-icon name="article" size="3.7em" color="primary" />
          </q-card-section>
        </q-card>
      </div>
      <div
        class="home-card pointer col-xs-12 col-sm-12 col-md-6"
        @click="$router.push('/task-assignment')"
      >
        <q-card class="row items-center justify-between">
          <q-card-section>
            <div class="text-h5 q-mt-sm q-mb-xs">Asignar Tarea</div>
            <div class="text-caption text-grey">
              Asignar tareas
            </div>
          </q-card-section>
          <q-card-section>
            <q-icon name="article" size="3.7em" color="primary" />
          </q-card-section>
        </q-card>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      title: 'Sistema'
    }
  },
  computed: {
    user: {
      get () {
        return this.$store.state.user.information
      }
    }
  },
  methods: {}
}
</script>
<style scoped>
.home-card:hover {
  color: #621132;
}
</style>
