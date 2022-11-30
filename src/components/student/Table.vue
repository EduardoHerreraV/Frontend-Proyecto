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
      :visible-columns="visibleColumns"
    >
     <template v-slot:top-right>
        <q-input outlined dense debounce="400" v-model="search" placeholder="Buscar">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props" no-hover>
          <q-td key="name" :props="props">
             {{ props.row.matter }}
          </q-td>
          <q-td key="calification" :props="props">
             {{ props.row.calification }}
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

import * as DataService from 'src/services/StudentService'

export default {
  props: {
    audit: Function
  },
  async mounted () {
    // get initial data from server (1st page)
    await this.$q.loading.show()
    await this.onRequest({
      pagination: this.pagination,
      filter: undefined
    })
    await this.$q.loading.hide()
  },
  data () {
    return {
      data: [],
      loading: false,
      pagination: {
        page: 1,
        rowsPerPage: 5,
        rowsNumber: ''
      },
      confirm: false,
      search: '',
      separator: 'vertical',
      visibleColumns: [
        'name',
        'calification'
      ],
      columns: [
        {
          name: 'name',
          align: 'center',
          label: 'Nombre de la materia',
          field: 'psp'
        },
        {
          name: 'calification',
          align: 'center',
          label: 'Calificación',
          field: 'calification'
        }
      ]
    }
  },
  methods: {
    onRequest (props) {
      const { page, rowsPerPage } = props.pagination
      const { search } = this
      this.loading = true
      DataService.index({ params: { page, rowsPerPage, search } }).then((project) => {
        this.data = project.data
        this.pagination.rowsPerPage = project.per_page
        this.pagination.page = project.current_page
        this.pagination.rowsNumber = project.total
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>
