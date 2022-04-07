<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button :text="getBackButtonText()" default-href="/"></ion-back-button>
        </ion-buttons>
        <div class="header-wrapper">
          <img class ="header-child char-avatar-img" :src="'../../public/assets/avatars/' + framedata.character.name.replace(/\s/g,'').toLowerCase() + '.png'">
          <h1 class="header-child title">{{ framedata.character.name }}</h1>
        </div>
      </ion-toolbar>
      <ion-toolbar>
        <ion-searchbar
          @ionInput="searchInput = searchFunction($event.target.value)"
          placeholder="Search moves">
        </ion-searchbar>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" v-if="framedata.character">
        <ion-list>
          <ion-accordion-group :multiple="true" :value="framedata.types" style="min-width:600px">
            <ion-accordion toggleIconSlot="start" :value="type" v-for="type in framedata.types" :key="type">
              <ion-item slot="header" class="accordion-colors" :class="framedata.colors[type]">
                <ion-label class="move-type">{{ type }}</ion-label>
              </ion-item>
              <ion-list slot="content">
                <ion-item>
                  <table class="moves-table" style="width:100%">
                    <thead>
                      <tr class="table-headers">
                        <th v-for="header in sortedHeaders" :key="header">{{header}}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="table-content"  v-bind:class="(index %2 == 0) ? 'even-row' : ''" v-for="(item, index) in filterByMoveType(framedata, type)" :key="item.input">
                        <td class="input-field">{{item.input}}</td>
                        <td>{{item.startup}}</td>
                        <td :class="getNumberColor(item.block)">{{item.block}}</td>
                        <td :class="getNumberColor(item.hit)">{{item.hit}}</td>
                        <td>{{item.damage}}</td>
                        <td>{{item.stun}}</td>
                        <td>{{item.guardDmg}}</td>
                        <td>{{item.hits}}</td>
                        <td>{{item.notes}}</td>
                      </tr>
                    </tbody>
                  </table>
                </ion-item>
              </ion-list>
            </ion-accordion>
          </ion-accordion-group>
        </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { useRoute } from 'vue-router';
import { IonSearchbar, IonLabel, IonList, IonAccordion, IonAccordionGroup, IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonPage, IonToolbar } from '@ionic/vue';
import { getCharacter } from '../data/characters';
import { getMoves } from '../data/characters';
import { defineComponent } from 'vue';
import uniq from 'lodash/uniq'

export default defineComponent({
  name: 'ViewCharacterPage',
  data() {
    return {
      getBackButtonText: () => {
        const win = window as any;
        const mode = win && win.Ionic && win.Ionic.mode;
        return mode === 'ios' ? 'FOF' : '';
      }
    }
  },
  setup() {
    const route = useRoute();
    const character = getCharacter(route.params.id as string);
    const moves = getMoves(route.params.id as string);
    const types = uniq(moves.map(({ type }) => type))
    const colors = {
      'Normal move': 'normal-move-accordion',
      'Target combo': 'target-combo-accordion',
      'Blowback': 'blowback-accordion',
      'Air normal': 'air-normal-accordion',
      'Throw': 'throw-accordion',
      'Unique': 'unique-accordion',
      'Special move': 'special-accordion',
      'Super move': 'super-accordion',
      'Climax super': 'climax-accordion',
      'Unchain start': 'unchain-start-accordion',
      'Unchain circle': 'unchain-circle-accordion',
      'Special unchain circle': 'special-unchain-circle-accordion',
      'Unchain finish': 'unchain-finish-accordion',
      'Sans special move': 'sans-special-move-accordion',
    }
    const framedata = {
      character: character,
      moves: moves,
      types: types,
      colors: colors
    }
    let headers = []
    for(var i in framedata.moves[0]){
      if (i === 'guardDmg') i = 'guard damage'
      if (i === 'startup') i = 'start up'
      if (i === 'block') i = 'on block'
      if (i === 'hit') i = 'on hit'
      if (i === 'startup') i = 'start up'
      if (i === 'type') continue
      headers.push(i.toUpperCase())
    }
    let sortedHeaders = []
    headers.forEach(header => {
      if (header === 'INPUT') sortedHeaders[0] = header
      if (header === 'START UP') sortedHeaders[1] = header
      if (header === 'ON BLOCK') sortedHeaders[2] = header
      if (header === 'ON HIT') sortedHeaders[3] = header
       if (header === 'HITS') sortedHeaders[7] = header
      if (header === 'NOTES') sortedHeaders[8] = header
      if (header === 'DAMAGE') sortedHeaders[4] = header
      if (header === 'STUN') sortedHeaders[5] = header
      if (header === 'GUARD DAMAGE') sortedHeaders[6] = header
    });

    return {
      framedata,
      sortedHeaders,
      loader: false,
      error: false,
      firstTime: false
    }
  },
  methods: {
    filterByMoveType: function (framedata, type) {
      const result = framedata.moves.filter(moves => moves.type === type);
      return result;
    },
    getNumberColor: function (number) {
      let color = ''
      if (number > 0) color = 'green'
      if (number < 0) color = 'red'
      return color;
    },
    searchFunction: function (target) {
      const query = target.toLowerCase();
      const inputCells = Array.from(document.querySelectorAll('.input-field'));
      requestAnimationFrame(() => {
        inputCells.forEach((item) => {
          // Check if each item is missing input from search bar.
          if (!item.textContent.toLowerCase().trim().includes(query)) {
            item.parentElement.classList.add('hide')
            const siblings = getSiblings(item.parentElement)
            let siblingsHidden = 0
            siblings.forEach(element => {
              if (element.classList.contains('table-content') && element.classList.contains('hide')) {
                siblingsHidden++
              }
            });
            if (siblings.length-1 === siblingsHidden) item.parentElement.parentElement.parentElement.parentElement.parentElement.className = 'md accordion-collapsed accordion-animated no-results';
          }
          else {
            item.parentElement.classList.remove('hide');
            if (item.parentElement.parentElement.parentElement.parentElement.parentElement.classList.contains('accordion-collapsed')) item.parentElement.parentElement.parentElement.parentElement.parentElement.className = 'md accordion-expanded accordion-animated no-results'
          }
        });
      });
    }
  },
  components: {
    IonSearchbar,
    IonLabel,
    IonList,
    IonAccordion,
    IonAccordionGroup,
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonPage,
    IonToolbar,
  },
});
let getSiblings = function (e) {
    let siblings = [];
    if(!e.parentNode) {
        return siblings;
    }
    let sibling  = e.parentNode.firstChild;
    while (sibling) {
        if (sibling.nodeType === 1 && sibling !== e) {
            siblings.push(sibling);
        }
        sibling = sibling.nextSibling;
    }
    return siblings;
};
</script>

<style scoped>
ion-item {
  --inner-padding-end: 0;
  --background: transparent;
}

ion-label {
  margin-top: 12px;
  margin-bottom: 12px;
}

ion-item h2 {
  font-weight: 600;
}

ion-item .date {
  float: right;
  align-items: center;
  display: flex;
}

ion-item ion-icon {
  font-size: 42px;
  margin-right: 8px;
}

ion-item ion-note {
  font-size: 15px;
  margin-right: 12px;
  font-weight: normal;
}

h1 {
  margin: 0;
  font-weight: bold;
  font-size: 22px;
}

p {
  line-height: 22px;
}
/* Table */
body {
  cursor: url('https://ionicframework.com/img/finger.png'), auto;
}

.header .col {
  border-top: solid 1px grey;
  background-color:lightgrey;
}

.col:first-child {
  border-left: solid 1px grey;
}

.col:last-child {
  border-right: solid 1px grey;
}

.row:last-child .col {
  border-bottom: solid 1px grey;
}

table {
  border-collapse: collapse;
  font-weight: bold;
  position: relative;
}

table th {
  font-weight: bold;
  position: sticky;
  top: 0; /* Don't forget this, required for the stickiness */
  box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.4);
}

td, th {
  border: 1px solid #757575;
  padding: 0.5rem;
  text-align: center;
}

h1 {
  text-align: center;
}

.hide {
  display: none;
}

.green {
  color: green;
}

.red {
  color: #D10000;
}
.even-row{
  background-color: #E3E3E3;
}

.item .sc-ion-label-md-h {
  font-weight: bold;
}

.accordion-colors {
  color: white;
}

.accordion-colors .move-type {
  color: white;
}

.blowback-accordion {
    background: rgb(93,0,177);
    background: linear-gradient(90deg, rgba(93,0,177,1) 0%, rgba(190,0,255,1) 100%);
  }

  .target-combo-accordion {
    background: rgb(50,179,0);
    background: linear-gradient(90deg, rgba(50,179,0,1) 0%, rgba(86,179,0,1) 100%);
  }

  .special-accordion {
    background: rgb(0,207,158);
    background: linear-gradient(90deg, rgba(0,207,158,1) 0%, rgba(0,197,207,1) 100%);
  }

  .air-normal-accordion {
    background: rgb(0,96,207);
    background: linear-gradient(90deg, rgba(0,96,207,1) 0%, rgba(0,135,207,1) 100%);
  }

  .throw-accordion {
    background: rgb(171,0,97);
    background: linear-gradient(90deg, rgba(171,0,97,1) 0%, rgba(171,0,82,1) 100%);
  }

  .unique-accordion {
    background: rgb(207,85,0);
    background: linear-gradient(90deg, rgba(207,85,0,1) 0%, rgba(207,112,0,1) 100%);
  }

  .normal-move-accordion {
    background: rgb(47,47,47);
    background: linear-gradient(90deg, rgba(47,47,47,1) 0%, rgba(89,89,89,1) 100%);
  }

  .super-accordion {
    background: rgb(0,37,255);
    background: linear-gradient(90deg, rgba(0,37,255,1) 0%, rgba(255,0,0,1) 60%);
  }

  .climax-accordion {
    background: rgb(177,132,0);
    background: linear-gradient(90deg, rgba(177,132,0,1) 0%, rgb(251 187 0) 100%);
  }

  .unchain-start-accordion {
    background: rgb(0,66,102);
    background: linear-gradient(90deg, rgba(0,66,102,1) 0%, rgba(0,77,102,1) 100%);
  }

  .unchain-circle-accordion {
    background: rgb(0,77,102);
    background: linear-gradient(90deg, rgba(0,77,102,1) 0%, rgba(0,87,102,1) 100%);
  }

  .special-unchain-circle-accordion {
   background: rgb(0,87,102);
    background: linear-gradient(90deg, rgba(0,87,102,1) 0%, rgba(0,102,102,1) 100%);
  }

  .unchain-finish-accordion {
    background: rgb(0,102,102);
    background: linear-gradient(90deg, rgba(0,102,102,1) 0%, rgba(0,102,83,1) 100%);
  }

  .sans-special-move-accordion {
    background: rgb(16,109,0);
    background: linear-gradient(90deg, rgba(16,109,0,1) 0%, rgba(73,109,0,1) 50%);
  }

  .header-wrapper {
    text-align: center;
  }

  .header-child {
    vertical-align: middle;
    padding: 5px;
  }

  .char-avatar-img {
    max-width: 50px;
  }

  .title {
    display: inline;
  }

@media (prefers-color-scheme: dark) {
  .even-row{
    background-color: #383838;
  }
}
</style>
