<template>
  <div class="q-gutter-y-md">
    <q-table
      :data="data"
      :columns="columns"
      separator="cell"
      :pagination.sync="pagination"
      :loading="loading"
      @request="onRequest"
      :filter="search"
    >
     <template v-slot:top-right>
        <q-input outlined dense debounce="300" v-model="search" placeholder="Buscar">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props" no-hover>
          <q-td key="project" :props="props">
            {{ props.row.project_name}}
          </q-td>
          <q-td key="task" :props="props">
            {{ props.row.task_number }}
          </q-td>
          <q-td key="psp" :props="props">
            {{ props.row.psp_name + ' ' + props.row.psp_last_name + ' ' + props.row.psp_second_last_name }}
          </q-td>
          <q-td key="status" :props="props">
            {{ props.row.status }}
          </q-td>
        </q-tr>
      </template>
      <template v-slot:no-data="{}">
        <div class="full-width row flex-center q-gutter-sm">
          <q-icon size="2em" name="sentiment_dissatisfied" />
          <span>No se encontraron resultados</span>
        </div>
      </template>
    </q-table>
  </div>
</template>
<script>
import * as TaskAssignmentService from 'src/services/TaskAssignmentService'

export default {
  data () {
    return {
      data: [],
      loading: false,
      pagination: {
        page: 1,
        rowsPerPage: 5,
        rowsNumber: ''
      },
      search: '',
      filter: '',
      columns: [
        {
          name: 'project',
          align: 'center',
          label: 'Proyecto',
          field: 'project'
        },
        {
          name: 'task',
          align: 'center',
          label: 'Tarea',
          field: 'task'
        },
        {
          name: 'psp',
          align: 'center',
          label: 'PSP',
          field: 'psp'
        },
        {
          name: 'status',
          align: 'center',
          label: 'Estatus',
          field: 'status'
        }
      ]
    }
  },
  created () {
  },
  mounted () {
    this.onRequest({
      pagination: this.pagination,
      filter: undefined
    })
  },
  methods: {
    onRequest (props) {
      const { page, rowsPerPage } = props.pagination
      const { search } = this
      this.loading = true
      TaskAssignmentService.index({ params: { page, rowsPerPage, search } }).then((pagination) => {
        this.data = pagination.data
        this.pagination.rowsPerPage = pagination.per_page
        this.pagination.page = pagination.current_page
        this.pagination.rowsNumber = pagination.total
        this.loading = false
      }).catch((err) => {
        console.log(err)
        this.loading = false
      })
    }
  }
}
</script>
