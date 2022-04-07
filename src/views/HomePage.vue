<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <div class="header-wrapper">
          <img class ="header-child logo" src='../../public/assets/icon/foflogo.png'>
          <ion-title class="header-child title">Frame of fighters</ion-title>
          <div class=header-child>
            <ion-button color="dark" class="credits-button" size="small" @click="setOpen(true)">
              <ion-icon :icon="informationCircleOutline"></ion-icon>
            </ion-button>
          </div>
          <ion-modal
            :is-open="isOpenRef"
            :swipe-to-close="true"
            :presenting-element="$parent.$refs.ionRouterOutlet"
            css-class="my-custom-class"
            @didDismiss="setOpen(false)"
          >
            <Modal :data="data">
              <ion-button color="medium" class="credits-close" size="small" @click="setOpen(false)">
                <ion-icon :icon="closeOutline"></ion-icon>
              </ion-button>
              <div class="info-modal">
                <p>This app is made for the community, by the community. It is in our best interest that players from all levels get to enjoy the full potential of the game by having access to detailed information. Credits go <b>equally</b> to all members involved:</p>
                <ul>
                  <li>Lantors/dens0ne (developer)</li>
                  <li>Karla Rey (designer)</li>
                  <li>The Dream Cancel Wiki team (data source)</li>
                  <li>Shingo2K1 (data manager/tester)</li>
                  <li>thefakesoji (data manager/tester)</li>
                  <li>LionHeartP (data provider/tester)</li>
                  <li>karn (tester)</li>
                </ul>
                <p>There is also a <a href="https://top.gg/bot/946480362245206028">Discord bot</a> that you may invite to your server.</p>
                <p> These tools will not have ads that may slow you down. Profit is not the developers goal. If you are interested in
                  supporting the work done, you are welcome to join <a href="https://discord.gg/fPyTMgpR4X">our official Discord server</a> to get involved. Otherwise, <a href="https://www.buymeacoffee.com/lantors">a coffee</a> is more than enough. Thank you for using the app!</p>
              </div>
            </Modal>
          </ion-modal>
        </div>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="refresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Frame of fighters</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list>
        <CharacterListItem v-for="character in characters" :key="character.name" :character="character" />
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonList, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar, IonModal, IonIcon, IonButton } from '@ionic/vue';
import CharacterListItem from '@/components/CharacterListItem.vue';
import { defineComponent, ref } from 'vue';
import { getCharacters } from '@/data/characters';
import { informationCircleOutline, closeOutline } from 'ionicons/icons';

export default defineComponent({
  name: 'HomePage',
  setup() {
    const isOpenRef = ref(false);
    const setOpen = (state: boolean) => isOpenRef.value = state;
    const data = { content: 'New Content' };
    return { isOpenRef, setOpen, data, informationCircleOutline, closeOutline }
  },
  data() {
    return {
      characters: getCharacters()
    }
  },
  methods: {
    refresh: (ev: CustomEvent) => {
      setTimeout(() => {
        ev.detail.complete();
      }, 3000);
    }
  },
  components: {
    IonContent,
    IonHeader,
    IonList,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    IonTitle,
    IonToolbar,
    CharacterListItem,
    IonModal,
    IonIcon,
    IonButton,
  },
});
</script>
<style scoped>
  .credits-close {
    float: right;
  }

  .header-wrapper {
    display: grid;
    grid-template-columns: auto auto auto;
  }

  .credits-button {
    max-width: 50px;
  }

  .header-child {
    /* text-align: center; */
    padding: 20px 0;
    margin: auto;
  }

  .logo {
    max-width: 50px;

  }
  .info-modal {
    padding: 20px;
  }
  .info-modal {
    color: white;
  }
</style>
