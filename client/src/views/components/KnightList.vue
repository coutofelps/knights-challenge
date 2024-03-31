<template>
  <div class="container mt-5">
    <h3 class="text-center mb-3">Lista de Knights</h3>

    <div class="d-flex flex-row-reverse mb-3">
      <div class="d-flex justify-content-end ml-5">
        <router-link to="/knight/add" class="btn btn-success">
          Adicionar
        </router-link>
      </div>

      <div class="form-check d-flex align-items-center">
        <input class="form-check-input" type="checkbox" id="filterHeroes" @change="toggleFilter">
        <label class="form-check-label" for="filterHeroes">
          Apenas Heróis
        </label>
      </div>
    </div>

    <table class="table table-striped table-bordered">
      <thead class="thead-dark">
        <tr>
          <th>Nome</th>
          <th>Idade</th>
          <th>Armas</th>
          <th>Atributo Chave</th>
          <th>Ataque</th>
          <th>Experiência</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="knight in knights" :key="knight._id">
          <td>{{ knight.name }}</td>
          <td>{{ knight.birthday }}</td>
          <td>{{ knight.weapons.length }}</td>
          <td>{{ knight.keyAttribute }}</td>
          <td>{{ knight.attack }}</td>
          <td>{{ knight.experience }}</td>
          <td>
            <ul>
              <li v-for="weapon in knight.weapons" :key="weapon._id">
                {{ weapon.name }} ({{ weapon.mod }} mod em {{ weapon.attr }})
              </li>
            </ul>
          </td>
          <td>
            <router-link :to="{ name: 'KnightEdit', params: { id: knight._id }}" class="btn btn-warning">
              <i class="fas fa-edit"></i> Editar
            </router-link>
            <button class="btn btn-danger" @click="deleteKnight(knight._id)">
              <i class="fas fa-trash-alt"></i> Apagar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    mounted() {
      document.title = 'Lista de Knights'
    },
    computed: {
      knights() {
        return this.$store.state.knights
      }
    },
    created() {
      this.$store.dispatch('fetchKnights')
    },
    methods: {
      deleteKnight(id) {
        this.$store.dispatch('deleteKnight', id)
      },
      toggleFilter(event) {
        const filter = { heroes: event.target.checked }
        this.$store.dispatch('fetchKnights', filter)
      }
    }
  }
</script>

<style>
  .btn-warning {
    margin-right: 5px;
    color: #FFFFFF !important;
  }

  .form-check {
    margin-right: 30px;
  }

  .form-check > * {
    cursor: pointer !important;
  }

  .form-check-label {
    margin-left: 5px;
    margin-bottom: -1px;
  }
</style>
