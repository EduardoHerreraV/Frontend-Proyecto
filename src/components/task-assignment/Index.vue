<template>
  <div class="q-pa-xl">
    <div class="q-mb-lg">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/" />
        <q-breadcrumbs-el label="Inicio" to="/"/>
        <q-breadcrumbs-el label="Asignar Tarea" />
      </q-breadcrumbs>
    </div>
    <q-card>
      <q-card-section>
        <div class="text-h6">
          Asignar Tarea
        <q-btn @click="$router.push('/')" round size="sm" color="primary" class="q-ml-sm float-right" icon="arrow_back" v-if="showTaskAssignmentForm != true">
          <q-tooltip>Salir</q-tooltip>
        </q-btn>
        <q-btn @click="showTaskAssignmentForm = false" round size="sm" color="primary" class="q-ml-sm float-right" icon="arrow_back" v-if="showTaskAssignmentForm != false">
          <q-tooltip>Regresar</q-tooltip>
        </q-btn>
        <q-btn @click="showTaskAssignmentForm = true" round size="sm" color="positive" class="q-ml-sm float-right btnCreate" icon="add" v-if="showTaskAssignmentForm != true">
          <q-tooltip>Asignar nueva tarea</q-tooltip>
        </q-btn>
        </div>
      </q-card-section>
    </q-card>
    <q-separator />
    <div class="q-mt-xl" v-if="showTaskAssignmentForm != true">
      <Table/>
    </div>
    <div class="q-mt-xl" v-if="showTaskAssignmentForm != false">
      <Form @hideTaskAssigmentForm="hideTaskAssigmentForm($event)" />
    </div>
  </div>
</template>

<script>
import Table from './partials/Table.vue'
import Form from './partials/Form.vue'

export default {
  components: {
    Table,
    Form
  },

  data () {
    return {
      showTaskAssignmentForm: false
    }
  },
  methods: {
    hideTaskAssigmentForm (status) {
      this.showTaskAssignmentForm = status
    }
  }
}
</script>
