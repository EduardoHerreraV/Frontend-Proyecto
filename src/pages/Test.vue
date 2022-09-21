<!--<template>
  <div class="q-pa-md" style="max-width: 300px">
  {{ edata }}
    <div class="q-gutter-md">
      <q-badge color="secondary" multi-line> Model: "{{ model }}" </q-badge>
      <q-select
        outlined
        v-model="model"
        use-input
        hide-selected
        multiple
        fill-input
        input-debounce="0"
        emit-value
        map-options
        option-value="id"
        option-label="name"
        :options="initiativeOptions"
        @filter="filterFn"
        @new-value="createValue"
        hint=""
        style="width: 250px; padding-bottom: 32px"
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
              <q-item-label v-html="scope.opt.name"></q-item-label>
              <q-item-label caption>{{ scope.opt.description }}</q-item-label>
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
  </div>
</template>

<script>
import * as InitiativeService from 'src/services/InitiativeService'

export default {
  data () {
    return {
      edata: [],
      model: null,
      initiativeOptions: []
    }
  },
  created () {
    InitiativeService.index()
      .then((employees) => {
        this.edata = employees.data
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    filterFn (val, update, abort) {
      if (val.length < 2) {
        abort()
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.initiativeOptions = this.edata.filter(
          (v) => v.name.toLowerCase().indexOf(needle) > -1
        )
      })
    },
    createValue (val, done) {
      // Calling done(var) when new-value-mode is not set or "add", or done(var, "add") adds "var" content to the model
      // and it resets the input textbox to empty string
      // ----
      // Calling done(var) when new-value-mode is "add-unique", or done(var, "add-unique") adds "var" content to the model
      // only if is not already set
      // and it resets the input textbox to empty string
      // ----
      // Calling done(var) when new-value-mode is "toggle", or done(var, "toggle") toggles the model with "var" content
      // (adds to model if not already in the model, removes from model if already has it)
      // and it resets the input textbox to empty string
      // ----
      // If "var" content is undefined/null, then it doesn't tampers with the model
      // and only resets the input textbox to empty string

      if (val.length > 2) {
        if (!this.initiativeOptions.includes(val)) {
          done(val, 'add-unique')
        }
      }
    }
  }
}
</script> -->

<template>
  <div class="q-pa-md">
    <div class="col-sm-12 col-md-12">
      <q-select
        outlined
        v-model="model"
        use-input
        use-chips
        multiple
        input-debounce="0"
        :options="filterOptions"
        option-value="id"
        option-label="name"
        map-options
        emit-value
        @filter="initiativeOptionsFilter"
        @new-value="addNewInitiativeValue"
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
              <q-item-label v-html="scope.opt.name"></q-item-label>
              <q-item-label caption>{{ scope.opt.repository_name }}</q-item-label>
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
  </div>
</template>

<script>
import * as InitiativeService from 'src/services/InitiativeService'

export default {
  data () {
    return {
      model: null,
      initiativesData: [],
      filterOptions: []
    }
  },
  created () {
    InitiativeService.index()
      .then((employees) => {
        this.initiativesData = employees.data
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    addNewInitiativeValue (val, done) {
      if (val.length > 0) {
        if (!this.initiativesData.includes(val)) {
          this.initiativesData.push(val)
        }
        done(val, 'toggle')
      }
    },

    initiativeOptionsFilter (val, update, abort) {
      if (val.length < 5) {
        abort()
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.filterOptions = this.initiativesData.filter(
          (v) => v.name.toLowerCase().indexOf(needle) > -1
        )
      })
    }
  }
}
</script>
