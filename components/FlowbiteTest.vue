<!--
  FlowbiteTest.vue: Test component for Flowbite integration
  Purpose: Verifies that Flowbite is correctly loaded and functioning
  Props: None
  Uses Flowbite's dropdown component as a test
-->
<template>
  <div class="p-4 bg-white rounded-lg shadow-md mb-6">
    <h3 class="font-heading text-xl font-bold text-primary mb-4">Flowbite Test Component</h3>

    <!-- Flowbite Dropdown Button -->
    <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="text-white bg-primary hover:bg-primary/90 focus:ring-4 focus:outline-none focus:ring-primary/20 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" type="button">
      Dropdown button
      <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
      </svg>
    </button>

    <!-- Dropdown menu -->
    <div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
      <ul class="py-2 text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
        <li>
          <a href="#" class="block px-4 py-2 hover:bg-gray-100">Dashboard</a>
        </li>
        <li>
          <a href="#" class="block px-4 py-2 hover:bg-gray-100">Settings</a>
        </li>
        <li>
          <a href="#" class="block px-4 py-2 hover:bg-gray-100">Earnings</a>
        </li>
        <li>
          <a href="#" class="block px-4 py-2 hover:bg-gray-100">Sign out</a>
        </li>
      </ul>
    </div>

    <p class="mt-4 text-sm text-dark/80">
      Si ce dropdown fonctionne correctement, cela confirme que Flowbite est bien chargé.
    </p>
  </div>
</template>