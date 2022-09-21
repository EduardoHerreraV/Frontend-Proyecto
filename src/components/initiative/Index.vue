<template>
  <div class="q-pa-xl q-gutter-y-md">
    <div class="q-mb-lg">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/" />
        <q-breadcrumbs-el label="Inicio" to="/"/>
        <q-breadcrumbs-el label="Iniciativa" />
      </q-breadcrumbs>
    </div>
    <q-card>
      <q-card-section>
        <div class="text-h6">
          Iniciativa
        <q-btn @click="confirmsalir = true" round size="sm" color="primary" class="q-ml-sm float-right" icon="arrow_back">
          <q-tooltip>Salir</q-tooltip>
        </q-btn>
        <q-btn @click="$router.push('initiative/create')" round size="sm" color="positive" class="q-ml-sm float-right btnCreate" icon="add">
          <q-tooltip>Crear</q-tooltip>
        </q-btn>
        </div>
      </q-card-section>
    </q-card>
    <q-dialog v-model="confirmsalir" persistent>
        <q-card>
          <q-card-section class="bg-primary items-center text-white">
            <div class="text-h6">Confirmacion</div>
          </q-card-section>
          <q-separator />
          <q-card-section class="row items-center">
            <span class="q-ml-sm"
              >¿Deseas salir?</span
            >
            <br />
          </q-card-section>
          <q-card-actions align="center">
            <q-btn flat label="No" color="negative" v-close-popup />
            <q-btn
              flat
              label="Si"
              color="positive"
              v-close-popup
              @click="$router.push('/')"
            />
          </q-card-actions>
          </q-card>
        </q-dialog>
    <div class="q-mt-xl">
      <Table/>
    </div>
  </div>
</template>

<script>
import Table from './Table.vue'

export default {
  components: {
    Table
  },
  data () {
    return {
      confirmsalir: false
    }
  },
  methods: {

  }
}
</script>
