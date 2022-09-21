<template>
    <div class="q-pa-xl q-gutter-y-md">
      <div class="q-mb-lg">
        <q-breadcrumbs>
          <q-breadcrumbs-el icon="home" to="/" />
          <q-breadcrumbs-el label="Inicio" to="/"/>
          <q-breadcrumbs-el label="Editar Proyecto" />
        </q-breadcrumbs>
      </div>
      <q-card>
        <q-card-section>
          <div class="text-h6">
          Editar Proyecto
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
              @click="$router.push('/project')"
            />
          </q-card-actions>
          </q-card>
        </q-dialog>
        </div>
        </q-card-section>
      </q-card>
      <q-card>
        <q-card-section>
          <div class="text-h6">
          Editar registro
          </div>
          <q-form ref="visitor_form" @submit.prevent="() => {}">
          <br />
          <div class="row q-col-gutter-sm q-mb-md">
            <div class="col-xs-12 col-sm-12 col-md-12 q-mb-lg">
            <q-select
              class="projectManager"
              outlined
              clearable
              label="Buscar Administrador de Proyecto"
              v-model="project.psp_name "
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              emit-value
              map-options
              option-value="id"
              option-label="full_name"
              :options="employeeOptions"
              @filter="filterFn"
              hint="Buscar Administrador de Proyecto por RFC o Nombre"
            >
              <template v-slot:no-option>
                <q-item class="row items-center justify-center">
                  <div class="q-mr-sm">No hay resultados</div>
                  <q-icon name="sentiment_dissatisfied" />
                </q-item>
              </template>
              <template v-slot:option="scope">
                <q-item
                  v-if="!scope.opt.group"
                  v-bind="scope.itemProps"
                  v-on="scope.itemEvents"
                >
                  <q-item-section avatar>
                    <q-icon name="person" color="primary"></q-icon>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label v-html="scope.opt.full_name"></q-item-label>
                    <q-item-label caption>{{ scope.opt.rfc }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item
                  v-if="scope.opt.group"
                  v-bind="scope.itemProps"
                  v-on="scope.itemEvents"
                >
                  <q-item-label header>{{ scope.opt.group }}</q-item-label>
                </q-item>
              </template>
            </q-select>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
                <q-input
                class="numberProject"
                v-model="project.contract_number"
                round
                outlined
                label="Número de proyecto"
                 :rules="[(val) => !!val || 'Este campo es obligatorio']"
             />
            </div>
            <div class="col-xs-12 col-sm-6 col-md-8" >
              <q-input
              class="nameProject"
              v-model="project.name"
              round
              outlined
              label="Nombre de proyecto"
               :rules="[(val) => !!val || 'Este campo es obligatorio']"
              />
            </div>
          </div>
        <div class="row q-col-gutter-sm">
          <div class="col-xs-12 col-sm-6 col-md-6">
              <q-input
              outlined v-model="project.contract_start_date"
              mask="date"
              :rules="[(val) => !!val || 'Este campo es obligatorio']"
              label="Inicio de contrato"
              class="startDate">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy"
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="project.contract_start_date">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6">
              <q-input
               class="endDate"
               outlined v-model="project.contract_end_date"
               mask="date"
               :rules="[(val) => !!val || 'Este campo es obligatorio']"
               label="Final de contrato">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy"
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="project.contract_end_date" :options="getDates">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
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
        class="btnUpdate"
          flat
          label="Actualizar"
          color="positive"
          @click="update()"
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
              >¿Estás seguro de cancelar la edición del registro?</span
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
              @click="$router.push('/project')"
            />
          </q-card-actions>
          </q-card>
        </q-dialog>
      </q-card>
    </div>
</template>

<script>
import * as ProjectService from 'src/services/ProjectService'
import { notifySuccess, notifyError } from 'src/utils/notify'
export default {
  data () {
    return {
      employeeOptions: [],
      project:
        {
          psp_id: '',
          name: '',
          contract_number: '',
          contract_start_date: '',
          contract_end_date: ''
        },
      confirmCancel: false,
      confirmsalir: false
    }
  },
  created () {
    const { id } = this.$route.params
    this.$q.loading.show()
    ProjectService.edit(id).then((data) => {
      this.project = data
      this.$q.loading.hide()
    }).catch(() => {
      this.$q.loading.hide()
    })
    this.$q.loading.hide()

    // EmployeeService.index()
    //   .then((employees) => {
    //     this.psp = employees
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })

  //   EmployeeService.findUser()
  //     .then((data) => {
  //       this.test = data
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  },
  methods: {
    update () {
      const project = { ...this.project }
      const { id } = this.$route.params
      ProjectService.update(project, id).then((response) => {
        if (response.success) {
          notifySuccess('Se actualizó el registro con éxito')
          this.$router.push('/project')
        } else {
          notifyError()
        }
      }).catch((err) => {
        notifyError(err)
      })
    },
    getDates (day) {
      const calendarDate = new Date(day)
      const startDate = new Date(this.project.contract_start_date)
      return calendarDate >= startDate
    },
    filterFn (val, update, abort) {
      if (val.length < 5) {
        abort()
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.employeeOptions = this.psp.filter(
          (v) => v.rfc.toLowerCase().indexOf(needle) > -1 || v.name.toLowerCase().indexOf(needle) > -1
        )
      })
    }
  }
}
</script>
