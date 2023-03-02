<script setup>
import { computed, ref } from "vue";
import { mdiEye, mdiPen, mdiPencil, mdiTrashCan } from "@mdi/js";
import CardBoxModal from "@/components/CardBoxModal.vue";
import CardBoxOfferDetail from "@/components/CardBoxOfferDetail.vue";
import TableCheckboxCell from "@/components/TableCheckboxCell.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";
import UserAvatar from "@/components/UserAvatar.vue";
import BaseIcon from "@/components/BaseIcon.vue";

import { mdiMapMarker,mdiAccountMultipleOutline, mdiClock } from "@mdi/js";

defineProps({
  checkable: Boolean,
});

const perPage = ref(5);

const currentPage = ref(0);

const checkedRows = ref([]);

const offersPaginated = computed(() =>
  offersList.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
);

const numPages = computed(() => Math.ceil(offersList.length / perPage.value));

const currentPageHuman = computed(() => currentPage.value + 1);

const pagesList = computed(() => {
  const pagesList = [];
  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i);
  }
  return pagesList;
});

const remove = (arr, cb) => {
  const newArr = [];

  arr.forEach((item) => {
    if (!cb(item)) {
      newArr.push(item);
    }
  });

  return newArr;
};

const checked = (isChecked, client) => {
  if (isChecked) {
    checkedRows.value.push(client);
  } else {
    checkedRows.value = remove(
      checkedRows.value,
      (row) => row.id === client.id
    );
  }
};

const offersList = [
        {
            name: "",
            fname: "OPEN",
            biography:
        },
        {
            title: "Développeur Full Stack H/F",
            offerStatus: "OPEN",
            nbrPlaces: 3,
            
            context: "PERTIMM est éditeur de logiciel dans le domaine du e-commerce. La société connaît une forte croissance en France avec une clientèle constituée de grands groupes. PERTIMM fournit des solutions de moteurs de recherche et des plateformes e-commerce, notamment pour le Click & Collect. Notre objectif est d’assurer à nos clients la meilleure valorisation de leurs données en temps réel.",
            mission: "Vous aurez en charge de : Assurer le suivi et la satisfaction des clients, Être proactif dans de nombreux domaines (choix techniques, outils et organisationnels) et avoir un impact au sein de l'équipe. Comprendre et améliorer notre base de code existante de façon continue Construire des solutions innovantes pour répondre aux besoins de nos clients.",
            searchedProfile: ["Maîtrise de l’écosystème du développement web et de la programmation Javascript/Typescript",
                    "Maîtrise des environnements de développement tels que Gitlab/Github Confluence, Jira, Clickup, Backlog ou similaires",
                    "Bonne connaissance des méthodes Agiles",
                    "Capacité à travailler en autonomie",
                    "Être enclin à travailler sur le backend comme sur le frontend (FullStack)",
                    "Une expérience en développement FullStack dans le monde du e-commerce est un plus"],
            address: "4 rue des peupliers, Paris 75001",
            language: "French",
            candidates: [],
            salary: 1200,
            contract: "CDI",
            remoteWork: false,
            level: "bac+3",
            startDate: "01/01/2023",
            endDate: "",
            timeStamp: "indéterminé",
            company: "PERTIMM",
            sector: "Développement informatique",
        },
        {
            title: "Développeur Front-End React H/F",
            offerStatus: "OPEN",
            nbrPlaces: 3,
            
            context: "PERTIMM est éditeur de logiciel dans le domaine du e-commerce. La société connaît une forte croissance en France avec une clientèle constituée de grands groupes. PERTIMM fournit des solutions de moteurs de recherche et des plateformes e-commerce, notamment pour le Click & Collect. Notre objectif est d’assurer à nos clients la meilleure valorisation de leurs données en temps réel.",
            mission: "Vous aurez en charge de : Assurer le suivi et la satisfaction des clients, Être proactif dans de nombreux domaines (choix techniques, outils et organisationnels) et avoir un impact au sein de l'équipe. Comprendre et améliorer notre base de code existante de façon continue Construire des solutions innovantes pour répondre aux besoins de nos clients.",
            searchedProfile: ["Maîtrise de l’écosystème du développement web et de la programmation Javascript/Typescript",
                    "Maîtrise des environnements de développement tels que Gitlab/Github Confluence, Jira, Clickup, Backlog ou similaires",
                    "Bonne connaissance des méthodes Agiles",
                    "Capacité à travailler en autonomie",
                    "Être enclin à travailler sur le backend comme sur le frontend (FullStack)",
                    "Une expérience en développement FullStack dans le monde du e-commerce est un plus"],
            address: "4 rue des peupliers, Paris 75001",
            language: "French",
            candidates: [],
            salary: 1200,
            contract: "CDI",
            remoteWork: false,
            level: "bac+3",
            startDate: "01/01/2023",
            endDate: "",
            timeStamp: "indéterminé",
            company: "PERTIMM",
            sector: "Développement informatique",
        },
        {
            title: "Développeur Full Stack H/F",
            offerStatus: "OPEN",
            nbrPlaces: 3,
            
            context: "PERTIMM est éditeur de logiciel dans le domaine du e-commerce. La société connaît une forte croissance en France avec une clientèle constituée de grands groupes. PERTIMM fournit des solutions de moteurs de recherche et des plateformes e-commerce, notamment pour le Click & Collect. Notre objectif est d’assurer à nos clients la meilleure valorisation de leurs données en temps réel.",
            mission: "Vous aurez en charge de : Assurer le suivi et la satisfaction des clients, Être proactif dans de nombreux domaines (choix techniques, outils et organisationnels) et avoir un impact au sein de l'équipe. Comprendre et améliorer notre base de code existante de façon continue Construire des solutions innovantes pour répondre aux besoins de nos clients.",
            searchedProfile: ["Maîtrise de l’écosystème du développement web et de la programmation Javascript/Typescript",
                    "Maîtrise des environnements de développement tels que Gitlab/Github Confluence, Jira, Clickup, Backlog ou similaires",
                    "Bonne connaissance des méthodes Agiles",
                    "Capacité à travailler en autonomie",
                    "Être enclin à travailler sur le backend comme sur le frontend (FullStack)",
                    "Une expérience en développement FullStack dans le monde du e-commerce est un plus"],
            address: "4 rue des peupliers, Paris 75001",
            language: "French",
            candidates: [],
            salary: 1200,
            contract: "CDI",
            remoteWork: false,
            level: "bac+3",
            startDate: "01/01/2023",
            endDate: "",
            timeStamp: "indéterminé",
            company: "PERTIMM",
            sector: "Développement informatique",
        },
        {
            title: "Développeur Full Stack H/F",
            offerStatus: "OPEN",
            nbrPlaces: 3,
            
            context: "PERTIMM est éditeur de logiciel dans le domaine du e-commerce. La société connaît une forte croissance en France avec une clientèle constituée de grands groupes. PERTIMM fournit des solutions de moteurs de recherche et des plateformes e-commerce, notamment pour le Click & Collect. Notre objectif est d’assurer à nos clients la meilleure valorisation de leurs données en temps réel.",
            mission: "Vous aurez en charge de : Assurer le suivi et la satisfaction des clients, Être proactif dans de nombreux domaines (choix techniques, outils et organisationnels) et avoir un impact au sein de l'équipe. Comprendre et améliorer notre base de code existante de façon continue Construire des solutions innovantes pour répondre aux besoins de nos clients.",
            searchedProfile: ["Maîtrise de l’écosystème du développement web et de la programmation Javascript/Typescript",
                    "Maîtrise des environnements de développement tels que Gitlab/Github Confluence, Jira, Clickup, Backlog ou similaires",
                    "Bonne connaissance des méthodes Agiles",
                    "Capacité à travailler en autonomie",
                    "Être enclin à travailler sur le backend comme sur le frontend (FullStack)",
                    "Une expérience en développement FullStack dans le monde du e-commerce est un plus"],
            address: "4 rue des peupliers, Paris 75001",
            language: "French",
            candidates: [],
            salary: 1200,
            contract: "CDI",
            remoteWork: false,
            level: "bac+3",
            startDate: "01/01/2023",
            endDate: "",
            timeStamp: "indéterminé",
            company: "PERTIMM",
            sector: "Développement informatique",
        },
        {
            title: "Développeur Full Stack H/F",
            offerStatus: "OPEN",
            nbrPlaces: 3,
            
            context: "PERTIMM est éditeur de logiciel dans le domaine du e-commerce. La société connaît une forte croissance en France avec une clientèle constituée de grands groupes. PERTIMM fournit des solutions de moteurs de recherche et des plateformes e-commerce, notamment pour le Click & Collect. Notre objectif est d’assurer à nos clients la meilleure valorisation de leurs données en temps réel.",
            mission: "Vous aurez en charge de : Assurer le suivi et la satisfaction des clients, Être proactif dans de nombreux domaines (choix techniques, outils et organisationnels) et avoir un impact au sein de l'équipe. Comprendre et améliorer notre base de code existante de façon continue Construire des solutions innovantes pour répondre aux besoins de nos clients.",
            searchedProfile: ["Maîtrise de l’écosystème du développement web et de la programmation Javascript/Typescript",
                    "Maîtrise des environnements de développement tels que Gitlab/Github Confluence, Jira, Clickup, Backlog ou similaires",
                    "Bonne connaissance des méthodes Agiles",
                    "Capacité à travailler en autonomie",
                    "Être enclin à travailler sur le backend comme sur le frontend (FullStack)",
                    "Une expérience en développement FullStack dans le monde du e-commerce est un plus"],
            address: "4 rue des peupliers, Paris 75001",
            language: "French",
            candidates: [],
            salary: 1200,
            contract: "CDI",
            remoteWork: false,
            level: "bac+3",
            startDate: "01/01/2023",
            endDate: "",
            timeStamp: "indéterminé",
            company: "PERTIMM",
            sector: "Développement informatique",
        },
    ];

const candidateClicked = ref(candidatesList[0]);

const detailModalActive = ref(false);
</script>

<template>
  <CardBoxModal hasCancel v-model="detailModalActive" :title="offerClicked.title">
    <CardBoxOfferDetail :item="offerClicked"/>
  </CardBoxModal>

  <div v-if="checkedRows.length" class="p-3 bg-gray-100/50 dark:bg-slate-800">
    <span
      v-for="checkedRow in checkedRows"
      :key="checkedRow.id"
      class="inline-block px-2 py-1 rounded-sm mr-2 text-sm bg-gray-100 dark:bg-slate-700"
    >
      {{ checkedRow.name }}
    </span>
  </div>

  <table>
    <thead>
      <tr>
        <th v-if="checkable" />
        <th>Identité</th>
        <th><BaseIcon :path="mdiMapMarker"/></th>
        <th><BaseIcon :path="mdiAccountMultipleOutline"/></th>
        <th><BaseIcon :path="mdiClock"/></th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr v-for="(offer, index) in offersPaginated" :key="index">
        <TableCheckboxCell
          v-if="checkable"
          @checked="checked($event, offer)"
        />
        <td data-label="name">
          {{ offer.title }}
        </td>
        <td data-label="location">
          Paris
        </td>
        <td data-label="candidates">
          <div class="flex items-center w-28">
            3
            <BaseButton class="ml-4" small color="info" label="voir candidats" @click="candidatesModalActive = true"/>
          </div>
        </td>
        <td data-label="date">
          {{offer.startDate }}
        </td>
        <td class="before:hidden lg:w-1 whitespace-nowrap">
          <BaseButtons type="justify-start lg:justify-end" no-wrap>
            <BaseButton
              color="info"
              :icon="mdiEye"
              small
              @click="detailModalActive = true; candidateClicked = candidate"
            />
          </BaseButtons>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
    <BaseLevel>
      <BaseButtons>
        <BaseButton
          v-for="page in pagesList"
          :key="page"
          :active="page === currentPage"
          :label="page + 1"
          :color="page === currentPage ? 'lightDark' : 'whiteDark'"
          small
          @click="currentPage = page"
        />
      </BaseButtons>
      <small>Page {{ currentPageHuman }} sur {{ numPages }}</small>
    </BaseLevel>
  </div>
</template>
