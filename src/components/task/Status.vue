<template>
    <div class="q-pa-xl q-gutter-y-md">
      <div class="q-mb-lg">
        <q-breadcrumbs>
          <q-breadcrumbs-el icon="home" to="/" />
          <q-breadcrumbs-el label="Inicio" to="/"/>
          <q-breadcrumbs-el label="Estatus de Tarea" />
        </q-breadcrumbs>
      </div>
      <q-card>
        <q-card-section>
          <div class="text-h6">
          Estatus de Tarea
          <q-btn @click="confirmsalir = true" round size="sm" color="primary" class="q-ml-sm float-right" icon="arrow_back">
            <q-tooltip>Salir</q-tooltip>
          </q-btn>
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
              @click="$router.push('/Task')"
            />
          </q-card-actions>
          </q-card>
        </q-dialog>
        </div>
        </q-card-section>
      </q-card>
      <q-card>
        <q-card-section>
          <q-form ref="task_form" @submit.prevent="() => {}">
          <br />
          <div class="row q-col-gutter-sm q-mb-md">
            <div class="col-xs-12 col-sm-6 col-md-9">
              <q-select

                  class="assigned_task"
                  :rules="[val => !!val || 'Este campo es requerido']"
                  :readonly="true"
                  clearable
                  outlined
                  use-input
                  new-value-mode="add-unique"
                  v-model.lazy="status_tasks.task_id"
                  option-value="task_id"
                  option-label="name"
                  map-options
                  emit-value
                  :options="tasks"
                  label="Elegir tarea asignada"
                />
          </div>
          <br />
          <br />
            <!-- <div class="col-xs-7 text-subtitle2">
              Validar tarea
            </div>
            <div class="col-xs-5 text-subtitle2">
              Cancelar tarea
            </div> -->
            <!-- <div class="col-xs-7" >
            <q-toggle
            class="validate_task"
            v-model="status_tasks.cat_status_id"
            color="green"
            round
            outlined
            :rules="[(val) => !!val || 'Este campo es obligatorio']"
           />
          </div>
            <div class="col-xs-5" >
            <q-toggle
            class="cancel_task"
            v-model="status_tasks.cat_status_cancel"
            color="green"
            round
            outlined
            :rules="[(val) => !!val || 'Este campo es obligatorio']"
            />
            </div> -->
            <div class="row col-6">
                <q-checkbox
                  class="col-12"
                  v-model="status_tasks.cat_status_validation"
                  label="Validar Tarea"
                />
                <q-checkbox
                  class="col-12 cancel_task"
                  v-model="status_tasks.cat_status_cancel"
                  :disable="status_tasks.cat_status_validation == true"
                  label="Cancelar Tarea"
                />
              </div>
            <div class="col-xs-12 col-sm-6 col-md-12" >
              <q-input
              class="notes"
              v-model="status_tasks.comment"
              round
              outlined
              label="Notas"
              :disable="status_tasks.cat_status_validation == true"
              />
            </div>
          </div>
        </q-form>
          <q-card-actions align="right">
        <q-btn
          flat
          @click="confirmCancel = true"
          label="Cancelar"
          color="negative"
        />
        <q-btn
        class="btnSave"
          flat
          label="Guardar"
          color="positive"
          @click="store()"
        />
          </q-card-actions>
      </q-card-section>
                <q-dialog v-model="confirmCancel" persistent>
        <q-card>
          <q-card-section class="bg-primary items-center text-white">
            <div class="text-h6">Confirmacion</div>
          </q-card-section>
          <q-separator />
          <q-card-section class="row items-center">
            <span class="q-ml-sm"
              >¿Estás seguro de cancelar el registro?</span
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
              @click="$router.push('/Task')"
            />
          </q-card-actions>
          </q-card>
          </q-dialog>
      </q-card>
    </div>
</template>

<script>
import * as StatusTaskService from 'src/services/StatusTaskService'
import { notifyError, notifySuccess } from 'src/utils/notify'

export default {
  data () {
    return {
      status_tasks:
        {
          task_id: [],
          cat_status_id: null,
          cat_status_validation: false,
          cat_status_cancel: false,
          comment: '',
          name: ''
        },
      tasks: [],
      confirmsalir: false,
      confirmCancel: false
    }
  },
  computed: {
    catalogs: {
      get () {
        return this.$store.state.catalogs
      },
      set (val) {
        this.$store.commit('catalogs/setCatalogs', val)
      }
    }
  },
  created () {
    setTimeout(() => {
      const { id } = this.$route.params
      const catalogsConfiguration = {
        tasks: true
      }
      this.$q.loading.show()
      this.$store.dispatch('catalogs/setCatalogs', { params: catalogsConfiguration }).then(() => {
        StatusTaskService.edit(id).then((data) => {
          this.task = data
          this.$q.loading.hide()
        }).catch(() => {
          this.$q.loading.hide()
        })
        this.$q.loading.hide()
      })
      StatusTaskService.getStatus(id).then((tasks) => {
        this.tasks = tasks
        this.status_tasks.task_id = tasks[0].name
        this.status_tasks.name = tasks[0].name
      })
    }, 1000)
  },
  watch: {
    'status_tasks.cat_status_validation': function () {
      this.status_tasks.cat_status_cancel = false
      this.status_tasks.comment = ''
    }
  },
  methods: {
    store () {
      this.$refs.task_form.validate().then((valid) => {
        if (valid) {
          const { id } = this.$route.params
          this.status_tasks.task_id = id
          if (this.status_tasks.cat_status_validation === false) {
            this.status_tasks.cat_status_id = '7'
          }
          if (this.status_tasks.cat_status_validation === true) {
            this.status_tasks.cat_status_id = '6'
          }
          const statusTasks = this.status_tasks
          StatusTaskService.store(statusTasks)
            .then(() => {
              this.$router.push('/Task')
              notifySuccess('Se actualizo el estatus con éxito')
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          notifyError('Complete los datos del formulario')
        }
      })
    }
  }
}
</script>
