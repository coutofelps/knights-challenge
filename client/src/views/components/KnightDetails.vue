<template>
  <div class="container mt-5">
    <h3 class="text-center mb-4">Adicionar Cavaleiro</h3>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">Nome:</label>
            <input type="text" class="form-control" id="name" v-model="newKnight.name" required>
          </div>
          <div class="form-group">
            <label for="nickname">Apelido:</label>
            <input type="text" class="form-control" id="nickname" v-model="newKnight.nickname">
          </div>
          <div class="form-group">
            <label for="birthday">Data de Nascimento:</label>
            <input type="date" class="form-control" id="birthday" v-model="newKnight.birthday">
          </div>
          <div class="form-group">
            <label for="strength">Força:</label>
            <input type="number" class="form-control" id="strength" v-model="newKnight.attributes.strength" min="1" max="20" required>
          </div>
          <div class="form-group">
            <label for="dexterity">Destreza:</label>
            <input type="number" class="form-control" id="dexterity" v-model="newKnight.attributes.dexterity" min="1" max="20" required>
          </div>
          <div class="form-group">
            <label for="constitution">Constituição:</label>
            <input type="number" class="form-control" id="constitution" v-model="newKnight.attributes.constitution" min="1" max="20" required>
          </div>
          <div class="form-group">
            <label for="intelligence">Inteligência:</label>
            <input type="number" class="form-control" id="intelligence" v-model="newKnight.attributes.intelligence" min="1" max="20" required>
          </div>
          <div class="form-group">
            <label for="wisdom">Sabedoria:</label>
            <input type="number" class="form-control" id="wisdom" v-model="newKnight.attributes.wisdom" min="1" max="20" required>
          </div>
          <div class="form-group">
            <label for="charisma">Carisma:</label>
            <input type="number" class="form-control" id="charisma" v-model="newKnight.attributes.charisma" min="1" max="20" required>
          </div>
          <div class="form-group">
            <label for="weapons">Armas:</label>
            <select v-model="selectedWeapon" class="form-select">
              <option disabled value="">Selecione uma arma</option>
              <option v-for="option in weaponOptions" :key="option.name" :value="option">{{ option.name }}</option>
            </select>
          </div>
          <div class="d-flex justify-content-between mt-4">
            <button type="submit" class="btn btn-primary">Criar Cavaleiro</button>
            <button class="btn btn-danger" @click="goBackToList">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    mounted() {
      document.title = 'Adicionar Knight'
    },
    data() {
      return {
        selectedWeapon: null,
        weaponOptions: [
          { name: 'sword', mod: 3, attr: 'strength', equipped: false },
          { name: 'axe', mod: 2, attr: 'dexterity', equipped: false },
          { name: 'club', mod: 1, attr: 'constitution', equipped: false }
        ],
        newKnight: {
          name: '',
          nickname: '',
          birthday: null,
          weapons: [],
          attributes: {
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0
          },
          keyAttribute: ''
        },
      }
    },
    watch: {
      selectedWeapon(newValue) {
        if (newValue) {
          this.newKnight.keyAttribute = newValue.attr

          this.newKnight.weapons = this.weaponOptions.map(weapon => {
            if (weapon === newValue) {
              weapon.equipped = true
            } else {
              weapon.equipped = false
            }
            return weapon
          })
        }
      }
    },
    methods: {
      submitForm() {
        try {
          this.$store.dispatch('createKnight', this.newKnight)
          this.$router.push('/')
        } catch (error) {
          console.error('Erro ao criar cavaleiro:', error)
        }
      },
      goBackToList() {
        this.$router.push('/')
      }
    }
  }
</script>
