<script setup>
import { computed, onBeforeMount, ref } from "vue";
import { mdiEye, mdiPen, mdiPencil, mdiTrashCan } from "@mdi/js";
import { useRouter } from "vue-router";
import CardBoxModal from "@/components/CardBoxModal.vue";
import OfferDetailComponent from "@/components/OfferDetailComponent.vue";
import TableCheckboxCell from "@/components/TableCheckboxCell.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";
import UserAvatar from "@/components/UserAvatar.vue";
import BaseIcon from "@/components/BaseIcon.vue";

import EditOfferForm from "@/components/EditOfferForm.vue";
import moment from "moment";

import { accountService } from "@/_services";

import {
  mdiMapMarker,
  mdiAccountMultipleOutline,
  mdiClock,
  mdiBlockHelper,
  mdiLock,
  mdiLockOpenVariant,
  mdiBriefcaseSearch,
} from "@mdi/js";
import { adminService } from "../_services/admin.service";

const router = useRouter();

const perPage = ref(5);

const currentPage = ref(0);

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  checkable: Boolean,
});

const offersPaginated = computed(() =>
  props.item.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
);

const numPages = computed(() => Math.ceil(props.item.length / perPage.value));

const currentPageHuman = computed(() => currentPage.value + 1);

const pagesList = computed(() => {
  const pagesList = [];
  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i);
  }
  return pagesList;
});

const formatter = (date) => {
  return moment(String(date)).format("DD/MM/YYYY");
};

const companyName = ref();

const getCompanyName = (id) => {
  let comp = "";
  accountService.getCompany(id).then((res) => {
    console.log(res.data);
    comp = res.data.name;
  });
  return comp;
};

const CompaniesName = ref([]);

onBeforeMount(() => {
  props.item.forEach((offer) => {
    accountService.getCompany(offer.companyId).then((res) => {
      CompaniesName.value.push(res.data.name);
    });
  });
});

const offerClicked = ref(props.item[0]);

const updateOfferStatus = (id) => {
  adminService.updateOfferStatus(id);
};

const detailModalActive = ref(false);
const deleteModalActive = ref(false);
</script>

<template>
  <div v-if="item.length > 0">
    <CardBoxModal
      hasClose
      v-model="detailModalActive"
      :title="offerClicked.title"
    >
      <OfferDetailComponent :item="offerClicked" />
    </CardBoxModal>

    <CardBoxModal
      v-model="deleteModalActive"
      title="Êtes-vous sûr de vouloir supprimer cette offre ?"
      button="danger"
      buttonLabel="Confirmer"
      hasDone
      hasCancel
      small
    />

    <table>
      <thead>
        <tr>
          <th>Intitulé du poste</th>
          <th>Entreprise</th>
          <th><BaseIcon :path="mdiAccountMultipleOutline" /></th>
          <th>Statut</th>
          <th>Date</th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr v-for="(offer, index) in offersPaginated" :key="index">
          <td data-label="name">
            {{ offer.title }}
          </td>
          <td>{{ CompaniesName[index] }}</td>
          <td data-label="candidates">
            {{ offer.offerCandidacies.length }}
          </td>
          <td data-label="statut">{{ offer.status }}</td>
          <td data-label="date">
            {{ formatter(offer.timeStamp) }}
          </td>
          <td class="before:hidden lg:w-1 whitespace-nowrap">
            <BaseButtons type="justify-start lg:justify-end" no-wrap>
              <BaseButton
                color="info"
                :icon="mdiBriefcaseSearch"
                iconColor="white"
                small
                @click="
                  detailModalActive = true;
                  offerClicked = offer;
                "
                title="Afficher le détail de l'offre"
              />
              <BaseButton
                v-if="offer.status == 'OPEN'"
                color="success"
                :icon="mdiLockOpenVariant"
                small
                iconColor="white"
                title="Ouvrir l'offre"
                @click="updateOfferStatus(offer.id)"
              />
              <BaseButton
                v-if="offer.status == 'BANNED'"
                color="danger"
                :icon="mdiLock"
                small
                iconColor="white"
                title="Fermer l'offre"
                @click="updateOfferStatus(offer.id)"
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
  </div>
  <div class="flex items-center justify-center" v-else>
    <p>Aucune offre n'a été créée...</p>
  </div>
</template>
