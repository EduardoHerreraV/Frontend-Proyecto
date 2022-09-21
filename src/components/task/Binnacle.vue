<template>
  <div class="q-pa-xl q-gutter-y-md">
    <div class="q-mb-lg">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/" />
        <q-breadcrumbs-el label="Inicio" to="/" />
        <q-breadcrumbs-el label="Bitácora de Tarea" />
      </q-breadcrumbs>
    </div>
    <q-card>
      <q-card-section>
        <div class="text-h6">
          Bitácora de Tarea
          <q-btn
            @click="confirmsalir = true"
            round
            size="sm"
            color="primary"
            class="q-ml-sm float-right"
            icon="arrow_back"
          >
            <q-tooltip>Salir</q-tooltip>
          </q-btn>
          <q-dialog v-model="confirmsalir" persistent>
            <q-card>
              <q-card-section class="bg-primary items-center text-white">
                <div class="text-h6">Confirmacion</div>
              </q-card-section>
              <q-separator />
              <q-card-section class="row items-center">
                <span class="q-ml-sm">¿Deseas salir?</span>
                <br />
              </q-card-section>
              <q-card-actions align="center">
                <q-btn flat label="No" color="negative" v-close-popup />
                <q-btn
                  flat
                  label="Si"
                  color="positive"
                  v-close-popup
                  @click="$router.push('/Task')"
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
      </q-card-section>
    </q-card>
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">Datos generales</div>
      </q-card-section>
      <q-card-section class="row">
        <div class="col-md-6">
          <div class="col-xs-12 col-sm-6 col-md-3 q-mb-md">
            <div class="text-subtitle1 text-weight-bold">Proyecto:</div>
            <div class="text-subtitle1">{{ binnacle.project }}</div>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-3 q-mb-md">
            <div class="text-subtitle1 text-weight-bold">Iniciativa:</div>
            <div class="text-subtitle1">{{ binnacle.initiative }}</div>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-3 q-mb-md">
            <div class="text-subtitle1 text-weight-bold">Project Manager:</div>
            <div class="text-subtitle1">{{ binnacle.pm }}</div>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-3 q-mb-md">
            <div class="text-subtitle1 text-weight-bold">Asignado a:</div>
            <div class="text-subtitle1">{{ binnacle.asign }}</div>
          </div>
        </div>
        <div class="row col-xs-12 col-sm-12 col-md-6">
          <div class="col-xs-12 col-md-6 q-mb-md">
            <div class="text-subtitle1 text-weight-bold">
              Total de interrupciones:
            </div>
            <div style="font-size: 40px">{{ binnacle.interrupt }}</div>
          </div>
          <div class="col-xs-12 col-md-6">
            <div class="text-subtitle1 text-weight-bold">
              Tiempo total de la tarea:
            </div>
            <div style="font-size: 40px">
              {{ binnacle.timeTotal }}<span class="text-h5"> hrs</span>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-table
      title="Tabla de cambios"
      :data="rows"
      :columns="columns"
      separator="cell"
      @request="onRequest"
    >
    {{ task }}
      <template v-slot:no-data="{}">
        <div class="full-width row flex-center q-gutter-sm">
          <q-icon size="2em" name="sentiment_dissatisfied" />
          <span>No se encontraron resultados</span>
        </div>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props" no-hover>
          <q-td key="action" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="date_time" :props="props">
            {{ props.row.created_at }}
          </q-td>
          <q-td key="elapsed_time" :props="props">
            {{ props.row.time }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import * as TaskService from 'app/src/services/TaskService'

export default {
  data () {
    return {
      task: '',
      binnacle: [],
      confirmsalir: false,
      confirmCancel: false,
      columns: [
        {
          name: 'action',
          align: 'center',
          label: 'Acción',
          field: 'action'
        },
        {
          name: 'date_time',
          align: 'center',
          label: 'Fecha y hora',
          field: 'date_time'
        },
        {
          name: 'elapsed_time',
          align: 'center',
          label: 'Tiempo transcurrido (min)',
          field: 'elapsed_time'
        }
      ],
      rows: []
    }
  },
  mounted () {
    this.onRequest()
  },
  methods: {
    onRequest () {
      const task = this.$route.params.id
      console.log(task)
      TaskService.binnacle({ params: { task } })
        .then((data) => {
          this.binnacle = data
          this.rows = data.data
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
