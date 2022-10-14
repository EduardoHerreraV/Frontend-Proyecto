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
             {{ props.row.name }}
          </q-td>
          <q-td key="actions" :props="props">
          <q-btn-group>
            <q-btn round size="sm" @click="edit(props.row.id)" color="positive"  icon="edit" class="btnEdit">
                <q-tooltip>Editar</q-tooltip>
            </q-btn>
          </q-btn-group>
          <q-btn-group>
            <q-btn round size="sm" @click="confirm = true; deleteOption=props.row.id;"  color="negative" icon="delete" class="btnDelete">
                <q-tooltip>Eliminar</q-tooltip>
            </q-btn>
          </q-btn-group>
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
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
            <span class="q-ml-sm">¿Seguro que desea eliminar este registro?</span>
            </q-card-section>
            <q-card-actions align="right">
            <q-btn flat label="Cancelar" color="primary" v-close-popup/>
            <q-btn flat label="Eliminar" color="red"  v-close-popup @click="destroy(deleteOption);" class="aceptEliminacion"/>
            </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>

import * as DegreeService from 'src/services/admin/Catalogs/Degree/DegreeService'
import { notifySuccess } from 'src/utils/notify'

export default {
  props: {
    audit: Function
  },
  data () {
    return {
      editOption: '',
      deleteOption: '',
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
        'actions'
      ],
      columns: [
        {
          name: 'name',
          align: 'center',
          label: 'Nombre de la Licenciatura',
          field: 'psp'
        },
        {
          name: 'actions',
          align: 'center',
          label: 'Acciones',
          field: 'actions'
        }
      ]
    }
  },
  created () {
  },
  mounted () {
    // get initial data from server (1st page)
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
      DegreeService.index({ params: { page, rowsPerPage, search } }).then((project) => {
        this.data = project.data
        this.pagination.rowsPerPage = project.per_page
        this.pagination.page = project.current_page
        this.pagination.rowsNumber = project.total
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    destroy (deleteOption) {
      DegreeService.destroy(deleteOption).then(() => {
        this.confirm = false
        this.onRequest({
          pagination: this.pagination,
          filter: undefined
        })
        notifySuccess('Se borró el registro con exito')
      }).catch(() => {
        this.$q.loading.hide()
      })
    },
    edit (id) {
      this.$router.push(`degree/${id}/edit`)
    }
  }
}
</script>
