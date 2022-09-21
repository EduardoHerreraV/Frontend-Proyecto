<template>
  <div class="q-pa-xl q-gutter-y-md">
    <div class="q-mb-lg">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/" />
        <q-breadcrumbs-el label="Inicio" to="/" />
        <q-breadcrumbs-el label="Editar Iniciativa" />
      </q-breadcrumbs>
    </div>
    <q-card>
      <q-card-section>
        <div class="text-h6">
          Editar Iniciativa
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
                  @click="$router.push('/initiative')"
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
      </q-card-section>
    </q-card>
    <q-card>
      <q-card-section>
        <q-form ref="project_form" @submit.prevent="() => {}">
          <br />
          <div class="row q-col-gutter-sm q-mb-md">
            <div class="col-xs-12 col-sm-6 col-md-6">
            <q-select
              class="project_id"
              outlined
              clearable
              map-options
              emit-value
              :options="projects"
              option-value="id"
              option-label="name"
              v-model="initiative.project_id"
              label="Elegir proyecto"
              :rules="[(val) => !!val || 'Este campo es obligatorio']"
            />
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6">
              <q-input
                v-model="initiative.name"
                class="name"
                round
                outlined
                label="Nombre de Iniciativa"
                :rules="[(val) => !!val || 'Este campo es obligatorio']"
              />
            </div>
          </div>
        </q-form>
        <div class="row q-mb-md">
          <div class="col-6 text-subtitle1">Repositorios de código</div>
          <div class="col-6 text-right">
            <q-btn
              class="q-mx-xs"
              round
              size="sm"
              outlined
              color="primary"
              icon="add"
              @click="addRepository()"
            >
              <q-tooltip>Agregar</q-tooltip>
            </q-btn>
          </div>
        </div>
        <div
          class="row q-col-gutter-sm q-mb-md"
          v-for="(item) of initiative.repository"
          :key="item.id"
        >
          <div class="col-xs-12 col-sm-6 col-md-4">
            <q-input
              v-model="item.repository_name"
              class="repository_name"
              round
              outlined
              label="Nombre"
              :rules="[(val) => !!val || 'Este campo es obligatorio']"
            />
          </div>
          <div class="col-xs-12 col-sm-6 col-md-4">
            <q-input
              v-model="item.url"
              class="url"
              round
              outlined
              label="URL"
              :rules="[(val) => !!val || 'Este campo es obligatorio']"
            />
          </div>
          <div class="col-xs-12 col-sm-6 col-md-4">
            <q-input
              v-model="item.description"
              class="description"
              round
              outlined
              label="Descripción"
              :rules="[(val) => !!val || 'Este campo es obligatorio']"
            />
          </div>
          <div class="col-xs-12 col-sm-12 col-md-12">
            <q-btn-group class="float-right" rounded>
              <q-btn
                size="sm"
                color="negative"
                icon="delete"
                outline
                @click="idElim = item.id; confirmDelete = true"
              />
            </q-btn-group>
          </div>
        </div>
        <div class="row q-mb-md">
          <div class="col-6 text-subtitle1">Áreas de conocimiento</div>
          <div class="col-6 text-right">
            <q-btn
              class="q-mx-xs"
              round
              size="sm"
              outlined
              color="primary"
              icon="add"
              @click="addKnowledge()"
            >
              <q-tooltip>Agregar</q-tooltip>
            </q-btn>
          </div>
        </div>
        <div
          class="row q-col-gutter-sm q-mb-md"
          v-for="(item, index) of initiative.knowledge"
          :key="item.id"
        >
          <div class="col-xs-12 col-sm-6 col-md-6">
            <q-select
              v-model="item.cat_knowledge_area_types_id"
              class="cat_knowledge_area_types_id"
              outlined
              clearable
              map-options
              emit-value
              option-value="id"
              option-label="name"
              @input="selectTechnologiesType(index)"
              :options="catalogs.cat_knowledge_area_types"
              label="Áreas de conocimiento"
              :rules="[(val) => !!val || 'Este campo es obligatorio']"
            />
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6">
            <q-select
              v-model="item.cat_specific_knowledge_id"
              class="cat_specific_knowledge_id"
              outlined
              clearable
              map-options
              emit-value
              option-value="id"
              option-label="name"
              :options="catalogs.cat_specific_knowledge"
              label="Conocimiento específico "
              :rules="[(val) => !!val || 'Este campo es obligatorio']"
            />
          </div>
          <div class="col-xs-12 col-sm-12 col-md-12">
            <q-btn-group class="float-right" rounded>
              <q-btn
                size="sm"
                color="negative"
                icon="delete"
                outline
                @click="idDelete = item.id; confirmDeleteKnowledge = true"
              />
            </q-btn-group>
          </div>
        </div>
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
              @click="$router.push('/initiative')"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="confirmDelete" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar
              icon="warning"
              color="negative"
              text-color="white"
              size="md"
            />
            <span class="q-ml-sm"
              >Se eliminará el registro seleccionado de manera permanente</span
            >
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancelar" color="primary" v-close-popup />
            <q-btn
              flat
              label="Eliminar"
              color="negative"
              v-close-popup
              @click="deleteElement(idElim)"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="confirmDeleteKnowledge" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar
              icon="warning"
              color="negative"
              text-color="white"
              size="md"
            />
            <span class="q-ml-sm"
              >Se eliminará el registro seleccionado de manera permanente</span
            >
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancelar" color="primary" v-close-popup />
            <q-btn
              flat
              label="Eliminar"
              color="negative"
              v-close-popup
              @click="deleteKnowledge(idDelete)"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-card>
  </div>
</template>
<script>
import * as InitiativeService from 'src/services/InitiativeService'
import * as ProjectService from 'src/services/ProjectService'
import { notifySuccess, notifyError } from 'src/utils/notify'
export default {
  data () {
    return {
      idDelete: 0,
      idElim: 0,
      projects: [],
      TechnologyOptions: [],
      initiative:
        {
          project_id: '',
          name: '',
          repository: [
            {
              repository_name: '',
              url: '',
              description: ''
            }
          ],
          knowledge: [
            {
              cat_knowledge_area_types_id: '',
              cat_specific_knowledge_id: ''
            }
          ]
        },
      confirmDeleteKnowledge: false,
      confirmDelete: false,
      deleteOption: null,
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
        cat_knowledge_area_types: true,
        cat_specific_knowledge: true
      }
      this.$q.loading.show()
      this.$store.dispatch('catalogs/setCatalogs', { params: catalogsConfiguration }).then(() => {
        InitiativeService.edit(id).then((data) => {
          this.initiative = data
          this.$q.loading.hide()
        }).catch(() => {
          this.$q.loading.hide()
        })
        this.$q.loading.hide()
        ProjectService.index()
          .then((project) => {
            this.projects = project.data
          })
          .catch((err) => {
            console.log(err)
          })
      })
    }, 1000)
    ProjectService.index()
      .then((project) => {
        this.projects = project.data
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    addKnowledge () {
      this.initiative.knowledge.push({
        cat_knowledge_area_types_id: '',
        cat_specific_knowledge_id: ''
      })
    },
    deleteKnowledge (id) {
      InitiativeService.destroyKnowledge(id).then(() => {
        const index = this.initiative.knowledge.findIndex(element => element.id === this.idDelete)
        this.initiative.knowledge.splice(index, 1)
        notifySuccess('Se borró el registro con exito')
      }).catch(() => {
        this.$q.loading.hide()
      })
      console.log(id)
    },
    addRepository () {
      this.initiative.repository.push({
        repository_name: '',
        url: '',
        description: ''
      })
    },
    deleteElement (id) {
      InitiativeService.destroyRepository(id).then(() => {
        const index = this.initiative.repository.findIndex(element => element.id === this.idElim)
        this.initiative.repository.splice(index, 1)
        notifySuccess('Se borró el registro con éxito')
      }).catch(() => {
        this.$q.loading.hide()
      })
    },
    update () {
      const project = { ...this.initiative }
      const { id } = this.$route.params
      InitiativeService.update(project, id).then((response) => {
        if (response.success) {
          notifySuccess('Se actualizó el registro con éxito')
          this.$router.push('/initiative')
        } else {
          notifyError()
        }
      }).catch((err) => {
        notifyError(err)
      })
    },
    selectTechnologiesType (index) {
      this.TechnologyOptions[index] = this.catalogs.cat_specific_knowledge.filter(technology =>
        technology.cat_knowledge_area_types_id === this.initiative.knowledge[index].cat_knowledge_area_types_id)
    }
  }
}
</script>
