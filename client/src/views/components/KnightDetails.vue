<template>
  <div class="container mt-5">
    <h3 class="text-center mb-4">{{ editingKnight ? 'Editar Cavaleiro' : 'Adicionar Cavaleiro' }}</h3>
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
            <input type="number" class="form-control" id="strength" v-model="newKnight.attributes.strength" min="1" max="20" @input="validateAttribute('strength')" required>
          </div>
          <div class="form-group">
            <label for="dexterity">Destreza:</label>
            <input type="number" class="form-control" id="dexterity" v-model="newKnight.attributes.dexterity" min="1" max="20" @input="validateAttribute('dexterity')" required>
          </div>
          <div class="form-group">
            <label for="constitution">Constituição:</label>
            <input type="number" class="form-control" id="constitution" v-model="newKnight.attributes.constitution" min="1" max="20" @input="validateAttribute('constitution')" required>
          </div>
          <div class="form-group">
            <label for="intelligence">Inteligência:</label>
            <input type="number" class="form-control" id="intelligence" v-model="newKnight.attributes.intelligence" min="1" max="20" @input="validateAttribute('intelligence')" required>
          </div>
          <div class="form-group">
            <label for="wisdom">Sabedoria:</label>
            <input type="number" class="form-control" id="wisdom" v-model="newKnight.attributes.wisdom" min="1" max="20" @input="validateAttribute('wisdom')" required>
          </div>
          <div class="form-group">
            <label for="charisma">Carisma:</label>
            <input type="number" class="form-control" id="charisma" v-model="newKnight.attributes.charisma" min="1" max="20" @input="validateAttribute('charisma')" required>
          </div>
          <div class="form-group">
            <label for="weapons">Armas:</label>
            <select v-model="selectedWeapon" class="form-select">
              <option disabled value="">Selecione uma arma</option>
              <template v-if="!editingKnight">
                <option v-for="option in weaponOptions" :key="option.name" :value="option">{{ option.name }}</option>
              </template>
              <template v-else>
                <option v-for="weapon in newKnight.weapons" :key="weapon.name" :value="weapon" :selected="weapon.name === selectedWeapon.name">{{ weapon.name }}</option>
              </template>
            </select>
          </div>
          <div class="d-flex justify-content-between mt-4">
            <button type="submit" class="btn btn-primary">{{ editingKnight ? 'Atualizar Cavaleiro' : 'Criar Cavaleiro' }}</button>
            <button class="btn btn-danger" @click="goBackToList">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    created() {
      if (this.$route.params.knightId) {
        this.knightId = this.$route.params.knightId
      }
    },
    computed: {
      editingKnight() {
        return !!this.knightId
      }
    },
    mounted() {
      if (this.$route.params.id) {
        document.title = 'Editar Knight'
        this.knightId = this.$route.params.id
        this.loadKnightDetails()
      } else {
        document.title = 'Adicionar Knight'
      }
    },
    data() {
      return {
        knightId: null,
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
    methods: {
      validateAttribute(attribute) {
        let value = this.newKnight.attributes[attribute]

        if (value < 1 || value > 20) {

          this.newKnight.attributes[attribute] = Math.min(Math.max(value, 1), 20)
        }
      },
      async loadKnightDetails() {
        try {
          await this.$store.dispatch('fetchKnightById', this.knightId)

          const knightDetails = this.$store.state.currentKnight

          const equippedWeapon = knightDetails.weapons.find(weapon => weapon.equipped)

          this.selectedWeapon = equippedWeapon

          console.log(this.selectedWeapon)

          this.newKnight = {
            ...knightDetails,
            birthday: knightDetails.birthday ? new Date(knightDetails.birthday).toISOString().split('T')[0] : null,
            selectedWeapon: equippedWeapon || null
          }

          console.log('Cerregando cavaleiro:', this.newKnight)
        } catch (error) {
          console.error(`Erro ao carregar os detalhes do cavaleiro com o ID ${this.knightId}:`, error)
        }
      },
      updateSelectedWeapon(weapon) {
        this.selectedWeapon = weapon
      },
      submitForm() {
        try {
          this.newKnight.weapons = []

          this.weaponOptions.forEach(weapon => {
            this.newKnight.weapons.push({ ...weapon })
          })

          if (this.selectedWeapon) {
            this.newKnight.weapons.forEach(weapon => {
              if (weapon.name === this.selectedWeapon.name) {
                weapon.equipped = true
              } else {
                weapon.equipped = false
              }
            })

            this.newKnight.keyAttribute = this.selectedWeapon.attr
          } else {
            this.newKnight.keyAttribute = ''
          }

          if (this.editingKnight) {
            this.$store.dispatch('updateKnight', { knightId: this.knightId, knightData: this.newKnight })
          } else {
            this.$store.dispatch('createKnight', this.newKnight)
          }

          this.$router.push('/')
        } catch (error) {
          console.error('Erro ao salvar cavaleiro:', error)
        }
      },
      goBackToList() {
        this.$router.push('/')
      }
    }
  }
</script>
