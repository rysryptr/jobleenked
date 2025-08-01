<script setup>
import { reactive, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import axios from "axios";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

const form = reactive({
  type: "Full-Time",
  title: "",
  description: "",
  salary: "",
  location: "",
  company: {
    name: "",
    description: "",
    contactEmail: "",
    contactPhone: "",
  },
});

const router = useRouter();
const route = useRoute();
const toast = useToast();

const jobId = route.params.id;

const state = reactive({
  job: {},
  isLoading: true,
});

const inputs = ref([{ value: "" }]);

const addNewBenefit = () => {
  inputs.value.push({ value: "" });
};

const removeBenefit = (index) => {
  if (inputs.value.length > 1) {
    inputs.value.splice(index, 1);
  }
};

const handleSubmit = async () => {
  form.company.benefits = inputs.value.map((input) => input.value);

  const newJob = {
    type: form.type,
    title: form.title,
    description: form.description,
    salary: form.salary,
    location: form.location,
    company: {
      name: form.company.name,
      description: form.company.description,
      benefits: form.company.benefits,
      contactEmail: form.company.contactEmail,
      contactPhone: form.company.contactPhone,
    },
  };

  try {
    await axios.put("http://localhost:3000/jobs/" + jobId, newJob);
    router.push("/jobs/" + jobId);
    toast.success("Edit Job successfully");
  } catch (error) {
    console.error("Edit Job Failed", error);
    toast.error("Edit Job Failed");
  }
};

onMounted(async () => {
  try {
    const response = await axios.get(`http://localhost:3000/jobs/${jobId}`);
    state.job = response.data;

    form.type = state.job.type;
    form.title = state.job.title;
    form.description = state.job.description;
    form.salary = state.job.salary;
    form.location = state.job.location;
    form.company.name = state.job.company.name;
    form.company.description = state.job.company.description;
    form.company.benefits = state.job.company.benefits;
    form.company.contactEmail = state.job.company.contactEmail;
    form.company.contactPhone = state.job.company.contactPhone;

    inputs.value = form.company.benefits.map((benefit) => ({ value: benefit }));
  } catch (error) {
    console.error("Error fetching data...", error);
    toast.error("Error fetching data...");
  } finally {
    state.isLoading = false;
  }
});
</script>

<template>
  <section v-if="!state.isLoading" class="bg-white">
    <div class="container m-auto max-w-2xl py-24">
      <div
        class="bg-white px-6 py-8 mb-4 border border-slate-200 rounded-md m-4 md:m-0"
      >
        <form @submit.prevent="handleSubmit">
          <h2 class="text-3xl text-center font-semibold mb-6">Add Job</h2>

          <div class="mb-4">
            <label for="type" class="block text-gray-700 font-bold mb-2"
              >Job Type</label
            >
            <select
              v-model="form.type"
              id="type"
              name="type"
              class="border rounded w-full py-2 px-3"
              required
            >
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Remote">Remote</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2"
              >Job Listing Name</label
            >
            <input
              v-model="form.title"
              type="text"
              id="name"
              name="name"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="eg. Beautiful Apartment In Miami"
              required
            />
          </div>
          <div class="mb-4">
            <label for="description" class="block text-gray-700 font-bold mb-2"
              >Description</label
            >
            <textarea
              v-model="form.description"
              id="description"
              name="description"
              class="border rounded w-full py-2 px-3"
              rows="4"
              placeholder="Add any job duties, expectations, requirements, etc"
            ></textarea>
          </div>

          <div class="mb-4">
            <label for="type" class="block text-gray-700 font-bold mb-2"
              >Salary</label
            >
            <select
              v-model="form.salary"
              id="salary"
              name="salary"
              class="border rounded w-full py-2 px-3"
              required
            >
              <option value="Under $50K">under $50K</option>
              <option value="$50K - $60K">$50 - $60K</option>
              <option value="$60K - $70K">$60 - $70K</option>
              <option value="$70K - $80K">$70 - $80K</option>
              <option value="$80K - $90K">$80 - $90K</option>
              <option value="$90K - $100K">$90 - $100K</option>
              <option value="$100K - $125K">$100 - $125K</option>
              <option value="$125K - $150K">$125 - $150K</option>
              <option value="$150K - $175K">$150 - $175K</option>
              <option value="$175K - $200K">$175 - $200K</option>
              <option value="Over $200K">Over $200K</option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2"> Location </label>
            <input
              v-model="form.location"
              type="text"
              id="location"
              name="location"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="Company Location"
              required
            />
          </div>

          <h3 class="text-2xl mb-5">Company Info</h3>

          <div class="mb-4">
            <label for="company" class="block text-gray-700 font-bold mb-2"
              >Company Name</label
            >
            <input
              v-model="form.company.name"
              type="text"
              id="company"
              name="company"
              class="border rounded w-full py-2 px-3"
              placeholder="Company Name"
            />
          </div>

          <div class="mb-4">
            <label
              for="company_description"
              class="block text-gray-700 font-bold mb-2"
              >Company Description</label
            >
            <textarea
              v-model="form.company.description"
              id="company_description"
              name="company_description"
              class="border rounded w-full py-2 px-3"
              rows="4"
              placeholder="What does your company do?"
            ></textarea>
          </div>

          <div class="mb-4">
            <label for="benefits" class="block text-gray-700 font-bold mb-2"
              >benefits</label
            >
            <div
              v-for="(input, index) in inputs"
              :key="index"
              class="flex mt-2 mb-2"
            >
              <input
                v-model="input.value"
                type="text"
                id="benefits"
                name="benefits"
                class="border rounded w-full py-2 px-3"
                placeholder="Benefits for employee"
                required
              />
              <div class="flex">
                <div
                  @click="addNewBenefit"
                  class="bg-blue-500 hover:bg-blue-600 hover:cursor-pointer text-white font-bold py-2 px-4 mx-2 rounded-md focus:outline-none focus:shadow-outline"
                >
                  +
                </div>
                <div
                  v-if="inputs.length > 1"
                  @click="removeBenefit(index)"
                  class="bg-red-500 hover:bg-red-600 hover:cursor-pointer text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                >
                  -
                </div>
              </div>
            </div>
          </div>

          <div class="mb-4">
            <label
              for="contact_email"
              class="block text-gray-700 font-bold mb-2"
              >Contact Email</label
            >
            <input
              v-model="form.company.contactEmail"
              type="email"
              id="contact_email"
              name="contact_email"
              class="border rounded w-full py-2 px-3"
              placeholder="Email address for applicants"
              required
            />
          </div>
          <div class="mb-4">
            <label
              for="contact_phone"
              class="block text-gray-700 font-bold mb-2"
              >Contact Phone</label
            >
            <input
              v-model="form.company.contactPhone"
              type="tel"
              id="contact_phone"
              name="contact_phone"
              class="border rounded w-full py-2 px-3"
              placeholder="Optional phone for applicants"
            />
          </div>

          <div>
            <button
              class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Edit Job
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>

  <div v-else class="text-center text-blue-500 py-6">
    <PulseLoader />
  </div>
</template>
