<template>
  <div class="q-gutter-y-md">
    <q-card class="q-pa-md">
      <q-form ref="task_assignment_form" @submit.prevent="() => {}">
        <div class="text-h6 q-mt-md q-mb-lg">Asignar Nueva Tarea</div>
        <div class="row q-col-gutter-sm">
          <div class="col-xs-12 col-sm-12 col-md-12 q-mb-lg">
            <q-select
            class="psp"
              outlined
              clearable
              label="Buscar PSP"
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
              hint="Buscar PSP por RFC"
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
          <div class="col-xs-12 col-sm-6 col-md-6">
            <q-select
            class="choose_project"
              outlined
              clearable
              map-options
              emit-value
              :options="projects"
              option-value="id"
              option-label="name"
              v-model="assigned_task.project_id"
              label="Elegir proyecto"
              :rules="[(val) => !!val || 'Este campo es obligatorio']"
            />
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6">
            <q-select
              class="choose_task"
              outlined
              clearable
              map-options
              emit-value
              :options="tasks"
              option-value="id"
              option-label="name"
              v-model="assigned_task.task_id"
              @input="getTask()"
              label="Elegir Tarea"
              :rules="[(val) => !!val || 'Este campo es obligatorio']"
            />
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6">
            <q-input
            class="start_date"
              outlined
              v-model="assigned_task.start_date"
              mask="date"
              :rules="[(val) => !!val || 'Este campo es obligatorio']"
              label="Fecha de Inicio Tarea"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxy"
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="assigned_task.start_date">
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
              class="comment"
              outlined
              v-model="status_task.comment"
              label="Comentario"
              :rules="[(val) => !!val || 'Este campo es obligatorio']"
            />
          </div>
        </div>
      </q-form>
      <q-card-actions align ="right">
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
          @click="storeTaskAssignment()"
        />
      </q-card-actions>
      <q-dialog v-model="confirmCancel" persistent>
        <q-card>
          <q-card-section class="bg-primary items-center text-white">
            <div class="text-h6">Confirmacion</div>
          </q-card-section>
          <q-separator />
          <q-card-section class="row items-center">
            <span class="q-ml-sm"
              >¿Estàs seguro de que desea cancelar el registro?</span
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
              @click="hideForm()"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-card>
  </div>
</template>
<script>
import * as EmployeeService from 'src/services/EmployeeService'
import * as TaskService from 'src/services/TaskService'
import * as StatusTaskService from 'src/services/StatusTaskService'
import * as ProjectService from 'src/services/ProjectService'

export default {
  props: {
    hideTaskAssigmentForm: Function
  },
  data () {
    return {
      employees: [],
      not_assigned_psp: [],
      psp_existence: '',
      psp: [],
      projects: [],
      tasks: [],
      employeeOptions: [],
      status_task: {
        cat_status_id: '',
        comment: ''
      },
      assigned_task: {
        employee_id: '',
        project_id: '',
        task_id: '',
        cat_statuses_id: 2,
        start_date: ''
      },
      confirmDelete: false,
      confirmCancel: false
    }
  },
  created () {
    // EmployeeService.index()
    //   .then((employees) => {
    //     this.employees = employees
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })

    // EmployeeService.findUser()
    //   .then((data) => {
    //     this.not_assigned_psp = data.employees
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })

    ProjectService.index()
      .then((project) => {
        this.projects = project.data
      })
      .catch((err) => {
        console.log(err)
      })
  },
  watch: {
    'assigned_task.project_id': function (val) {
      const search = val
      const status = 1
      TaskService.getUnasignatedTasks({ params: { search, status } })
        .then((tasks) => {
          this.tasks = tasks
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  methods: {
    getTask () {
      EmployeeService.getTask(this.assigned_task.project_id).then((tasks) => {
        this.tasks = tasks
      })
    },
    hideForm () {
      this.$emit('hideTaskAssigmentForm', false)
    },
    storeTaskAssignment () {
      this.$refs.task_assignment_form.validate().then((valid) => {
        if (valid) {
          const search = this.psp.rfc
          EmployeeService.checkPSPExistence({ params: { search } })
            .then((data) => {
              this.psp_existence = data.existence
              if (this.psp_existence === true) {
                console.log(data.psp)
                this.assigned_task.employee_id = data.psp.id
                const taskForm = this.assigned_task
                const id = this.assigned_task.task_id
                TaskService.update(taskForm, id)
                  .then((data) => {
                    this.status_task.task_id = data.task.id
                    this.status_task.cat_status_id = data.task.cat_statuses_id
                    const formStatusTask = this.status_task
                    this.storeTaskStatuses(formStatusTask)
                    this.hideForm()
                  })
                  .catch(err => {
                    console.log(err)
                  })
              } else {
                const pspForm = this.psp
                EmployeeService.store(pspForm)
                  .then((employee) => {
                    console.log(employee)
                    this.assigned_task.employee_id = employee.id
                    const taskForm = this.assigned_task
                    const id = this.assigned_task.task_id
                    TaskService.update(taskForm, id)
                      .then((data) => {
                        this.status_task.task_id = data.task.id
                        this.status_task.cat_status_id = data.task.cat_statuses_id
                        const formStatusTask = this.status_task
                        this.storeTaskStatuses(formStatusTask)
                        this.hideForm()
                        console.log(data)
                      })
                      .catch(err => {
                        console.log(err)
                      })
                  })
                  .catch((err) => {
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
    filterFn (val, update, abort) {
      if (val.length < 5) {
        abort()
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.employeeOptions = this.not_assigned_psp.filter(
          (v) => v.rfc.toLowerCase().indexOf(needle) > -1 || v.name.toLowerCase().indexOf(needle) > -1
        )
      })
    },
    storeTaskStatuses (formStatusTask) {
      StatusTaskService.store(formStatusTask)
        .then((data) => {
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
