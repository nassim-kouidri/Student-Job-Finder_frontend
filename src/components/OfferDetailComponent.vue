<script setup>
import { reactive, ref, watch } from "vue";
import CardBox from "@/components/CardBox.vue";
import CardBoxComponentTitle from "@/components/CardBoxComponentTitle.vue";
import PillTag from "@/components/PillTag.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import Cookies from "js-cookie";
import NotificationBarInCard from "@/components/NotificationBarInCard.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseDivider from "@/components/BaseDivider.vue";
import { offerService, studentService, companyService } from "@/_services";

import {
  mdiBriefcase,
  mdiAccountSchool,
  mdiRemoteDesktop,
  mdiCashMultiple,
  mdiMapMarker,
  mdiCalendarRange,
  mdiBookmarkOutline,
  mdiBookmark,
  mdiSend,
  mdiPencil,
  mdiDelete,
  mdiAccountGroup,
} from "@mdi/js";
import { propsToAttrMap } from "@vue/shared";

const validApply = ref(false);
const invalidApply = ref(false);

const validFav = ref(false);
const invalidFav = ref(false);

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  withAction: {
    type: Boolean,
    default: false,
  },
});

const company = ref({});

const questionsForm = reactive([]);

const answers = ref([]);

const offer = ref({});

const answersForm = reactive({
  answers: "",
});

const questionForm = reactive([]);

const applyfor = (id) => {
  questionsForm.forEach((answer) => {
    answers.value.push(answer.answer);
  });
  answersForm.answers = answers.value;
  console.log(answersForm);
  offerService
    .applyOffer(id, answersForm)
    .then((res) => {
      if (
        res.data == "You have already submitted your application to this offer"
      )
        invalidApply.value = true;
      else validApply.value = true;
    })
    .catch((err) => {
      invalidApply.value = true;
    });

  setTimeout(function () {
    validApply.value = false;
    invalidApply.value = false;
  }, 8000);
};

const logged = () => {
  if (Cookies.get("userIsLogged") != null) return Cookies.get("userIsLogged");
  else return false;
};

const getRole = () => {
  if (Cookies.get("role") != null) {
    return JSON.parse(Cookies.get("role"));
  }
};

const user = () => {
  if (Cookies.get("user") != null) return JSON.parse(Cookies.get("user"));
  else return null;
};

const addFavOffer = (id) => {
  if (Cookies.get("userIsLogged")) {
    studentService
      .addFavOffer(id)
      .then((res) => {
        if (favOffer.value == mdiBookmark) {
          favOffer.value = mdiBookmarkOutline;
        } else {
          favOffer.value = mdiBookmark;
        }

        validFav.value = true;
      })
      .catch((err) => {
        invalidFav.value = true;
      });

    setTimeout(function () {
      validFav.value = false;
      invalidFav.value = false;
    }, 5000);
  }
};

const favOffer = ref(mdiBookmarkOutline);

watch(
  () => props.item,
  (first, second) => {
    favOffer.value = mdiBookmarkOutline;
    questionsForm.length = 0;
    answers.value = [];

    companyService.getCompanyById(props.item.companyId).then((res) => {
      company.value = res.data;
    });

    studentService.getFavOffer().then((res) => {
      res.data.forEach((fav) => {
        if (fav.id == props.item.id) favOffer.value = mdiBookmark;
      });
    });

    if (props.item.questions) {
      props.item.questions.forEach((question) => {
        questionsForm.push({
          question: question,
          answer: "",
        });
      });
    }
  }
);
</script>

<template>
  <NotificationBarInCard v-show="validApply" color="success">
    Candidature envoyée avec succès !
  </NotificationBarInCard>
  <NotificationBarInCard v-show="invalidApply" color="danger">
    Erreur durant l'envois de la candidature !
  </NotificationBarInCard>
  <NotificationBarInCard v-show="invalidFav" color="danger">
    Erreur durant l'enregistrement
  </NotificationBarInCard>
  <CardBoxComponentTitle title="Présentation" underlined class="w-6/12" />
  <div class="flex flex-col">
    <div class="flex flex-wrap mb-4">
      <PillTag color="info" :label="item?.contract" :icon="mdiBriefcase" />
      <PillTag color="info" :label="item?.level" :icon="mdiAccountSchool" />
      <PillTag
        v-if="item?.remoteWork"
        color="info"
        label="Télétravail"
        :icon="mdiRemoteDesktop"
      />
      <PillTag
        color="info"
        :label="`${item.salary} € / mois`"
        :icon="mdiCashMultiple"
      />
      <PillTag color="info" label="Paris, 75" :icon="mdiMapMarker" />
      <PillTag color="info" label="Janvier 2022" :icon="mdiCalendarRange" />
      <PillTag
        color="info"
        :label="`places : ${item.nbrPlaces}`"
        :icon="mdiAccountGroup"
      />
    </div>
    <div class="flex items-center flex-wrap">
      <div>
        <img v-if="company.logo" class="h-20" :src="company.logo.image" />
        <img
          v-else
          class="w-64 h-56 border-8 border-white drop-shadow-md mr-4"
          src="https://imgs.search.brave.com/3XK6-MlkH7b9uIHVr1ErqAq_CR-2ggGOjceCYlr5gfs/rs:fit:800:800:1/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9kZWZh/dWx0LWF2YXRhci1w/cm9maWxlLWljb24t/dmVjdG9yLXNvY2lh/bC1tZWRpYS11c2Vy/LXBvcnRyYWl0LTE3/NjI1NjkzNS5qcGc"
        />
      </div>
      <div class="h-20 flex flex-col justify-end px-4">
        <div class="text-2xl font-semibold">{{ company.name }}</div>
        <div>{{ company.description }}</div>
      </div>
    </div>
    <div class="flex flex-col">
      <div class="w-full text-lg mt-4 font-medium">Contexte de l'offre</div>
      <div>
        {{ item.context }}
      </div>
      <div class="text-lg mt-4 font-medium">La mission</div>
      <div>
        <p>{{ item.mission }}</p>
      </div>
      <div class="text-lg mt-4 font-medium">Profil recherché</div>
      <div>
        <p>{{ item.searchedProfile }}</p>
      </div>
    </div>
    <div v-if="item.questions != null && logged()" class="mt-4">
      <CardBoxComponentTitle title="Questions" underlined class="w-6/12" />
      <div v-for="(question, index) in questionsForm" :key="index">
        <FormField :label="question.question">
          <FormControl
            v-if="withAction"
            v-model="question.answer"
            type="text"
          />
        </FormField>
      </div>
    </div>
    <BaseButtons
      v-if="withAction && logged() && getRole() != 'COMPANY'"
      class="mt-8"
    >
      <BaseButton
        color="lightDark"
        label="Enregistrer"
        type="button"
        :icon="favOffer"
        iconSize="25"
        @click="addFavOffer(item.id)"
      />
      <BaseButton
        type="submit"
        color="info"
        iconColor="white"
        label="Postuler"
        :icon="mdiSend"
        @click="applyfor(item.id)"
      />
    </BaseButtons>
  </div>
</template>
