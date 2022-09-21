<template>
  <div class="q-pa-xl q-gutter-y-md">
    <div class="q-mb-lg">
       <q-breadcrumbs>
         <q-breadcrumbs-el icon="home" to="/" />
         <q-breadcrumbs-el label="Inicio" to="/"/>
         <q-breadcrumbs-el label="Registrar Tarea" />
       </q-breadcrumbs>
    </div>
    <q-card>
      <q-card-section>
        <div class="text-h6">
          Registrar Tarea
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
    <div class="q-mb-lg">
      <q-card>
        <q-card-section>
          <q-form ref="task_form" @submit.prevent="() => {}">
            <div class="row q-col-gutter-sm">
              <div class="col-xs-12 col-sm-6 col-md-6">
                <q-select
                class="project"
                round outlined
                label="Proyecto"
                v-model="task.project_id"
                option-value="id"
                option-label="name"
                :options="catalogs.project"
                :rules="[(val) => !!val || 'Este campo es obligatorio']"/>
              </div>
            </div>
            <br />
            <div class="row q-col-gutter-sm">
              <div class="col-12 text-subtitle1">Datos de la tarea</div>
              <div class="col-xs-12 col-sm-6 col-md-6">
                <q-input
                class="name"
                round outlined
                label="Nombre"
                v-model="task.name"
                :rules="[(val) => !!val || 'Este campo es obligatorio']"/>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6">
                <q-input
                class="description"
                round outlined
                label="Descripción"
                v-model="task.description"
                :rules="[(val) => !!val || 'Este campo es obligatorio']"/>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-3">
                <q-input
                class="sprint"
                round outlined
                label="Número de sprint"
                v-model="task.sprint"
                :rules="[(val) => !!val || 'Este campo es obligatorio']"/>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-9">
                <q-input
                class="dependencies"
                round outlined
                label="Dependencias"
                v-model="task.dependencies"
                :rules="[(val) => !!val || 'Este campo es obligatorio']"/>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <q-select
                class="size"
                  round
                  outlined
                  label="Tamaño"
                  v-model="task.cat_size_id"
                  option-value="id"
                  option-label="name"
                  :options="catalogs.cat_sizes"
                  :rules="[(val) => !!val || 'Este campo es obligatorio']"/>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <q-select
                class="phase"
                  round
                  outlined
                  label="Fase"
                  v-model="task.cat_phase_id"
                  option-value="id"
                  option-label="name"
                  :options="catalogs.cat_phases"
                  :rules="[(val) => !!val || 'Este campo es obligatorio']"/>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <q-input
                class="planned_hours"
                round outlined
                label="Horas planeadas"
                v-model="task.hours"
                :rules="[(val) => !!val || 'Este campo es obligatorio']"/>
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
          class="btnAcept"
          flat color="positive"
          label="Guardar"
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
  </div>
</template>
<script>
import * as TaskService from 'src/services/TaskService'
import { notifyError, notifySuccess } from 'src/utils/notify'

export default {
  data () {
    return {
      task: {
        name: '',
        description: '',
        sprint: '',
        dependencies: '',
        hours: '',
        project_id: '',
        cat_size_id: '',
        cat_phase_id: ''
      },
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
    },
    canEdit () {
      return this.canShow('catalogs-edit')
    }
  },
  created () {
    setTimeout(() => {
      const catalogsConfiguration = {
        cat_sizes: true,
        cat_phases: true,
        project: true
      }
      this.$store.dispatch('catalogs/setCatalogs', { params: catalogsConfiguration }).then(() => {
      })
    }, 1000)
  },
  methods: {
    store () {
      this.$refs.task_form.validate().then((valid) => {
        if (valid) {
          const task = { ...this.task }
          const payload = {
            name: task.name,
            description: task.description,
            sprint: task.sprint,
            dependencies: task.dependencies,
            hours: task.hours,
            project_id: task.project_id.id,
            cat_statuses_id: 1,
            cat_size_id: task.cat_size_id.id,
            cat_phase_id: task.cat_phase_id.id
          }
          console.log(payload)
          TaskService.store(payload).then((response) => {
            if (response.success) {
              notifySuccess('Se ha creado correctamente la tarea')
              this.$router.push('/Task')
            }
          })
        } else {
          notifyError('Complete los datos del formulario')
        }
      })
    }
  }
}
</script>
