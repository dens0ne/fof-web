<template>
  <ion-item v-if="character" :routerLink="'/character/' + character.name" :detail="false" class="list-item">
    <ion-label class="ion-text-wrap">
      <ion-item>
        <ion-avatar class="char-avatar" slot="start">
          <img class ="char-avatar-img" :src="require('../../public/assets/avatars/' + character.name.replace(/\s/g,'').toLowerCase() + '.png')">
        </ion-avatar>
        <h2>
          <ion-label class="char-name">{{ character.name }}</ion-label>
          <ion-icon :icon="chevronForward" size="small" v-if="isIos()"></ion-icon>
        </h2>
      </ion-item>
    </ion-label>
  </ion-item>
</template>

<script lang="ts">
import { IonAvatar, IonIcon, IonItem, IonLabel, IonNote } from '@ionic/vue';
import { chevronForward } from 'ionicons/icons';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CharacterListItem',
  components: {
    IonAvatar,
    IonIcon,
    IonItem,
    IonLabel,
  },
  props: {
    character: Object,
  },
  methods: {
    isIos: () => {
      const win = window as any;
      return win && win.Ionic && win.Ionic.mode === 'ios';
    }
  },
  data() {
    return { chevronForward }
  }
});
</script>

<style scoped>
.list-item {
  --padding-start: 0;
  --inner-padding-end: 0;
}

.list-item ion-label {
  margin-top: 12px;
  margin-bottom: 12px;
}

.list-item  h2 {
  font-weight: 600;
  margin: 0;
}

.list-item p {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 95%;
}

.list-item .date {
  float: right;
  align-items: center;
  display: flex;
}

.list-item ion-icon {
  color: #c9c9ca;
}

.list-item ion-note {
  font-size: 15px;
  margin-right: 8px;
  font-weight: normal;
}

.list-item ion-note.md {
  margin-right: 14px;
}

.list-item .dot {
  display: block;
  height: 12px;
  width: 12px;
  border-radius: 50%;
  align-self: start;
  margin: 16px 10px 16px 16px;
}

.list-item .dot-unread {
  background: var(--ion-color-primary);
}

.char-avatar {
  width: 70px;
  height: 70px;
}

.char-avatar-img {
  --border-radius: 0;
}

.char-name {
  font-size: 2rem;
}
</style>
