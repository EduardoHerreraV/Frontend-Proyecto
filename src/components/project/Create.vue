<template>
  <div class="q-pa-xl q-gutter-y-md">
    <div class="q-mb-lg">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/" />
        <q-breadcrumbs-el label="Inicio" to="/" />
        <q-breadcrumbs-el label="Registrar Proyecto" />
      </q-breadcrumbs>
    </div>
    <q-card>
      <q-card-section>
        <div class="text-h6">
          Registrar Proyecto
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
        <div class="text-h6">Crear registro</div>
        <q-form ref="project_form" @submit.prevent="() => {}">
          <br />
          <div class="row q-col-gutter-sm q-mb-md">
            <div class="col-xs-12 col-sm-12 col-md-12 q-mb-lg">
              <q-select
                class="projectManager"
                outlined
                clearable
                label="Buscar Administrador de Proyecto"
                v-model="psp"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                emit-value
                map-options
                option-label="full_name"
                :options="employeeOptions"
                :rules="[(val) => !!val || 'Este campo es obligatorio']"
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
            <div class="col-xs-12 col-sm-6 col-md-8">
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
                class="startDate"
                outlined
                v-model="project.contract_start_date"
                mask="date"
                :rules="[(val) => !!val || 'Este campo es obligatorio']"
                label="Inicio de contrato"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy"
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                      :rules="[(val) => !!val || 'Este campo es obligatorio']"
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
                outlined
                v-model="project.contract_end_date"
                mask="date"
                :rules="[(val) => !!val || 'Este campo es obligatorio']"
                label="Final de contrato"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy"
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                      :rules="[(val) => !!val || 'Este campo es obligatorio']"
                    >
                      <q-date
                        v-model="project.contract_end_date"
                        :options="getDates"
                      >
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
        class="btnAccept"
          flat
          label="Guardar"
          color="positive"
          @click="storeProject()"
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
            <span class="q-ml-sm">¿Estás seguro de cancelar el registro?</span>
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
import * as EmployeeService from 'src/services/EmployeeService'
import * as ProjectService from 'src/services/ProjectService'
import { notifyError, notifySuccess } from 'src/utils/notify'
export default {
  data () {
    return {
      model: null,
      employeeOptions: [],
      employees: [],
      not_assigned_psp: [],
      psp_existence: '',
      psp: [],
      project: {
        psp_id: '',
        name: '',
        contract_number: '',
        contract_start_date: '',
        contract_end_date: ''
      },
      confirmsalir: false,
      confirmCancel: false
    }
  },
  created () {
    EmployeeService.findUser()
      .then((data) => {
        this.not_assigned_psp = data.employees
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    // eslint-disable-next-line space-before-function-paren
    store() {
      this.$refs.visitor_form.validate().then((valid) => {
        if (valid) {
          const form = { ...this.project }
          ProjectService.store(form).then((response) => {
            notifySuccess('Se creó el registro con éxito')
            this.$router.push('/project')
          })
        } else {
          notifyError('Complete los datos del formulario')
        }
      })
    },
    storeProject () {
      this.$refs.project_form.validate().then((valid) => {
        if (valid) {
          const search = this.psp.rfc
          EmployeeService.checkPSPExistence({ params: { search } })
            .then((data) => {
              this.psp_existence = data.existence
              if (this.psp_existence === true) {
                console.log(data.psp)
                this.project.psp_id = data.psp.id
                const projectForm = this.project
                ProjectService.store(projectForm).then((response) => {
                  console.log(response)
                  this.$router.push('/project')
                })
              } else {
                const pspForm = this.psp
                EmployeeService.store(pspForm)
                  .then((employee) => {
                    console.log(employee)
                    this.project.psp_id = employee.id
                    const projectForm = this.project
                    ProjectService.store(projectForm).then((response) => {
                      console.log(response)
                      this.$router.push('/project')
                    })
                  })
                  .catch((err) => {
                    notifySuccess('El proyecto ha sido guardado')
                    console.log(err)
                  })
              }
            })
            .catch((err) => {
              console.log(err)
            })
        }
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
        this.employeeOptions = this.not_assigned_psp.filter(
          (v) =>
            v.rfc.toLowerCase().indexOf(needle) > -1 ||
            v.name.toLowerCase().indexOf(needle) > -1
        )
      })
    }
  }
}
</script>
