<script>
export default {
  NAME_MIN_LENGTH: 3,
  NAME_MAX_LENGTH: 255,
  HOUR_MIN: 0,
  HOUR_MAX: 24,
  MINUTE_MIN: 0,
  MINUTE_MAX: 60,
  DURATION_MIN: 0,
  DURATION_MAX: 999,
  DESCRIPTION_MIN_LENGTH: 10,
  DESCRIPTION_MAX_LENGTH: 1000000,
  name: 'hackathonCreator',
  methods: {
    validateName() {
      const notSet = this.name === '';
      const invalidLength = this.name.length < this.$options.NAME_MIN_LENGTH || this.name.length > this.$options.NAME_MAX_LENGTH;
      if (notSet) {
        this.addError('name', 'Name is required.');
      }
      if (invalidLength) {
        this.addError('name', `Name should have at least ${this.$options.NAME_MIN_LENGTH} characters and have maximum of ${this.$options.NAME_MAX_LENGTH} characters.`);
      }
      return !notSet && !invalidLength;
    },
    validateDate() {
      const invalidDate = Number.isNaN(new Date(this.date).getTime());
      if (invalidDate) {
        this.addError('date', 'Invalid date.')
      }
      return !invalidDate;
    },
    validateHour() {
      const hour = parseInt(this.hour);
      const invalidHour = Number.isNaN(hour) || hour >= this.$options.HOUR_MAX || hour < this.$options.HOUR_MIN;
      if (invalidHour) {
        this.addError('hour', `Invalid hour. Should be between ${this.$options.HOUR_MIN} and ${this.$options.HOUR_MAX}`);
      }
      return !invalidHour;
    },
    validateMinute() {
      const minute = parseInt(this.minute);
      const invalidMinute = Number.isNaN(minute) || minute >= this.$options.MINUTE_MAX || minute < this.$options.MINUTE_MIN;
      if (invalidMinute) {
        this.addError('minute', `Invalid minutes. Should be between ${this.$options.MINUTE_MIN} and ${this.$options.MINUTE_MAX}`);
      }
      return !invalidMinute;
    },
    validateDuration() {
      const duration = parseInt(this.duration);
      const invalidDuration = Number.isNaN(duration) || duration >= this.$options.DURATION_MAX || duration < this.$options.DURATION_MIN;
      if (invalidDuration) {
        this.addError('duration', `Invalid duration. Should be between ${this.$options.DURATION_MIN} and ${this.$options.DURATION_MAX}`);
      }
      return !invalidDuration;
    },
    validateDescription() {
      const invalidDescription = this.description.length < this.$options.DESCRIPTION_MIN_LENGTH || this.description.length > this.$options.DESCRIPTION_MAX_LENGTH;
      if (invalidDescription) {
        this.addError('description', `Invalid duration. Should be between ${this.$options.DURATION_MIN} and ${this.$options.DURATION_MAX}`);
      }
      return !invalidDescription;
    },
    validate() {
      const validName = this.validateName();
      const validDate = this.validateDate();
      const validHour = this.validateHour();
      const validMinute = this.validateMinute();
      const validDuration = this.validateDuration();
      const validDescription = this.validateDescription();

      return validName &&
             validDate &&
             validHour &&
             validMinute &&
             validDuration &&
             validDescription;
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
    showError(fieldName) {
      return this.errorMessage[fieldName].join('\n');
    },
    send(event) {
      this.clearAllErrors();
      if (!this.validate()) {
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
  <form @submit.prevent="send" test="create-hackathon">
    <p>
      <label>Hackathon name</label>
      <input test="hackathon-name" v-model="name" type="text"/>
      <div v-if="error.name" class="error">{{showError('name')}}</div>
    </p>
    <p>
      <label>Date</label>
      <input test="hackathon-date" v-model="date" type="date"/>
      <div v-if="error.date" class="error">{{showError('date')}}</div>
    </p>
    <p>
      <label>Time</label>
      <input test="hackathon-hour" v-model="hour" type="number" maxlength="2" placeholder="12"/> : <input test="hackathon-minute" v-model="minute" type="number" maxlength="2" placeholder="00"/>
      <div v-if="error.hour" class="error">{{showError('hour')}}</div>
      <div v-if="error.minute" class="error">{{showError('minute')}}</div>
    </p>
    <p>
      <label>Duration</label>
      <input test="hackathon-duration" v-model="duration" type="number" maxlength="3"/> <span>hours</span>
      <div v-if="error.duration" class="error">{{showError('duration')}}</div>
    </p>
    <p>
      <label>Description</label>
      <textarea test="hackathon-description" v-model="description"></textarea>
      <div v-if="error.description" class="error">{{showError('description')}}</div>
    </p>
    <p>
      <button type="submit">Create</button>
    </p>
  </form>
</template>

<style scoped>
  .error {
    color: red;
  }
</style>
