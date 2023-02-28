const appObj = {
  data() {
    return {
      showForm: false,
      couriers: [],
      destinations: [],

      courier: 1,
      destination: 1,
      startTime: datetimeLocal(new Date()),
      endTime: datetimeLocal(tomorrow(new Date())),

      timeTableEntries: [],
      displayedEntries: [],
      toDisplay: 0,
    };
  },
  methods: {
    toggleForm() {
      this.showForm = !this.showForm;
      this.reset();
    },
    async getCouriers() {
      const res = await fetch(
        "https://timetable-production-eff2.up.railway.app/couriers"
      );
      const data = await res.json();

      this.couriers = data;
    },
    async getDestinations() {
      const res = await fetch(
        "https://timetable-production-eff2.up.railway.app/destinations"
      );
      const data = await res.json();

      this.destinations = data;
    },
    async getTimeTableEntries() {
      const res = await fetch(
        "https://timetable-production-eff2.up.railway.app/timetable"
      );
      const data = await res.json();

      this.timeTableEntries = data;
      this.filterDisplay();
    },
    filterDisplay() {
      this.displayedEntries = filterTimetableEntries(
        this.timeTableEntries,
        this.toDisplay
      );
    },
    async addEntry(e) {
      e.preventDefault();

      const newEntry = {
        courier: this.courier,
        destination: this.destination,
        startTime: this.startTime,
        endTime: this.endTime,
      };

      if (courierIsTaken(this.timeTableEntries, this.couriers, newEntry)) {
        alert("The courier you wish to use is Taken at this time");
        return;
      }

      await fetch("http://localhost:5000/timetable", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newEntry),
      });

      const data = {
        ...newEntry,
        courier: this.couriers
          .filter((curCourier) => curCourier.id === this.courier)
          .pop().name,
        destination: this.destinations
          .filter((curDest) => curDest.id === this.destination)
          .pop().name,
      };
      this.timeTableEntries = [...this.timeTableEntries, data];

      this.filterDisplay();
      this.toggleForm();
      this.reset();
    },
    reset() {
      this.courier = 1;
      this.destination = 1;
      this.startTime = datetimeLocal(new Date());
      this.endTime = datetimeLocal(tomorrow(new Date()));
    },
  },
  mounted() {
    this.getCouriers();
    this.getDestinations();
    this.getTimeTableEntries();
  },
};

const app = Vue.createApp(appObj);
app.mount("#app");
