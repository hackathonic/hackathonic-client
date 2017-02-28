<script>
const NAME_MIN_LENGTH = 3;
const NAME_MAX_LENGTH = 255;
const HOUR_MIN = 0;
const HOUR_MAX = 24;
const MINUTE_MIN = 0;
const MINUTE_MAX = 60;
const DURATION_MIN = 0;
const DURATION_MAX = 999;
const DESCRIPTION_MIN_LENGTH = 10;
const DESCRIPTION_MAX_LENGTH = 1000000;

export default {
  name: 'hackathonCreator',
  methods: {
    validateName() {
      const notSet = this.name === '';
      const invalidLength = this.name.length < NAME_MIN_LENGTH || this.name.length > NAME_MAX_LENGTH;
      if (notSet) {
        this.addError('name', 'Name is required.');
      }
      if (invalidLength) {
        this.addError('name', `Name should have at least ${NAME_MIN_LENGTH} characters and have maximum of ${NAME_MAX_LENGTH} characters.`);
      }
      return notSet && invalidLength;
    },
    validateDate() {
      const invalidDate = !Number.isNaN(new Date(this.date).getTime());
      if (invalidDate) {
        this.addError('date', 'Invalid date.')
      }
      return invalidDate;
    },
    validateHour() {
      const invalidHour = !Number.isNaN(this.hour) || this.hour > HOUR_MAX || this.hour < HOUR_MIN;
      if (invalidHour) {
        this.addError('hour', `Invalid hour. Should be between ${HOUR_MIN} and ${HOUR_MAX}`);
      }
      return invalidHour;
    },
    validateMinute() {
      const invalidMinute = !Number.isNaN(this.minute) || this.minute > MINUTE_MAX || this.minute < MINUTE_MIN;
      if (invalidMinute) {
        this.addError('minute', `Invalid minutes. Should be between ${MINUTE_MIN} and ${MINUTE_MAX}`);
      }
      return invalidMinute;
    },
    validateDuration() {
      const invalidDuration = !Number.isNaN(this.duration) || this.duration > DURATION_MAX || this.duration < DURATION_MIN;
      if (invalidDuration) {
        this.addError('duration', `Invalid duration. Should be between ${DURATION_MIN} and ${DURATION_MAX}`);
      }
      return invalidDuration;
    },
    validateDescription() {
      const invalidDescription = this.description.length < DESCRIPTION_MIN_LENGTH || this.description.length > DESCRIPTION_MAX_LENGTH;
      if (invalidDescription) {
        this.addError('description', `Invalid duration. Should be between ${DURATION_MIN} and ${DURATION_MAX}`);
      }
      return invalidDescription;
    },
    validate() {
      return this.validateName() && this.validateDate() && this.validateHour() && this.validateMinute();
    },
    addError(fieldName, errorMessage) {
      this.error[fieldName] = true;
      this.errorMessage[fieldName].push(errorMessage);
    },
    clearError(fieldName) {
      this.error[fieldName] = false;
      this.errorMessage[fieldName] = [];
    },
    clearAllErrors() {
      Object.keys(this.error).forEach(fieldName => this.clearError(fieldName));
    },
    send(event) {
      this.clearAllErrors();
      if (!this.validate()) {
        console.log('Does not validate!')
        return;
      }
      const {
        name,
        date,
        hour,
        minute,
        duration,
        description
      } = this;
      this.$store.dispatch('createHackathon', {
        name,
        date,
        hour,
        minute,
        duration,
        description
      });
    }
  },
  data() {
    return {
      name: '',
      date: '',
      hour: '',
      minute: '',
      duration: '',
      description: '',
      error: {
        name: false,
        date: false,
        hour: false,
        minute: false,
        duration: false,
        description: false
      },
      errorMessage: {
        name: [],
        date: [],
        hour: [],
        minute: [],
        duration: [],
        description: []
      }
    }
  }
};
</script>

<template>
  <form @submit.prevent="send">
    <p>
      <label>Hackathon name</label>
      <input v-model="name" type="text"/>
    </p>
    <p>
      <label>Date</label>
      <input v-model="date" type="date"/>
    </p>
    <p>
      <label>Time</label>
      <input v-model="hour" type="number" maxlength="2" placeholder="12"/> : <input v-model="minute" type="number" maxlength="2" placeholder="00"/>
    </p>
    <p>
      <label>Duration</label>
      <input v-model="duration" type="number" maxlength="3"/> <span>hours</span>
    </p>
    <p>
      <label>Description</label>
      <textarea v-model="description"></textarea>
    </p>
    <p>
      <button type="submit">Create</button>
    </p>
  </form>
</template>
