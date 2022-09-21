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
          <q-td key="initiative_name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="project_name" :props="props">
            <div v-for="item in props.row.project" :key="item.id">
            {{ item.name }}
          </div>
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

import * as InitiativeService from 'src/services/InitiativeService'
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
        'initiative_name',
        'project_name',
        'actions'
      ],
      columns: [
        {
          name: 'initiative_name',
          align: 'center',
          label: 'Nombre de Iniciativa',
          field: 'initiative_name'
        },
        {
          name: 'project_name',
          align: 'center',
          label: 'Nombre de Proyecto',
          field: 'project_name'
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
      InitiativeService.index({ params: { page, rowsPerPage, search } }).then((initiative) => {
        this.data = initiative.data
        this.pagination.rowsPerPage = initiative.per_page
        this.pagination.page = initiative.current_page
        this.pagination.rowsNumber = initiative.total
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    destroy (deleteOption) {
      InitiativeService.destroy(deleteOption).then(() => {
        this.confirm = false
        this.onRequest({
          pagination: this.pagination,
          filter: undefined
        })
        notifySuccess('Se borró el registro con éxito')
      }).catch(() => {
        this.$q.loading.hide()
      })
    },
    edit (id) {
      this.$router.push(`initiative/${id}/edit`)
    }
  }
}
</script>
