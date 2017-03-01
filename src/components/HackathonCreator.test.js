const Vue = require('vue');
const HackathonCreator = require('./HackathonCreator.vue');

const {
  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
  HOUR_MIN,
  HOUR_MAX,
  MINUTE_MIN,
  MINUTE_MAX,
  DURATION_MIN,
  DURATION_MAX,
  DESCRIPTION_MIN_LENGTH,
  DESCRIPTION_MAX_LENGTH
} = HackathonCreator;

const TEST_DATE = "2017-03-01T19:20:27.998Z";

let vm;
beforeEach(() => {
  vm = new Vue(HackathonCreator);
});

describe('Name validation', () => {
  it('returns true for valid values', () => {
    vm.name = 'Valid name';
    expect(vm.validateName()).toBe(true);
  });
  it('returns false when no valud is set', () => {
    vm.name = '';
    expect(vm.validateName()).toBe(false);
  });
  it('returns false when value is to short', () => {
    vm.name = 'ab';
    expect(vm.validateName()).toBe(false);
  });
  it('returns false when value is to long', () => {
    vm.name = new Array(NAME_MAX_LENGTH + 2).join('x');
    expect(vm.validateName()).toBe(false);
  });
});

describe('Description validation', () => {
  it('returns true for valid values', () => {
    vm.description = 'Valid description';
    expect(vm.validateDescription()).toBe(true);
  });
  it('returns false when no valud is set', () => {
    vm.description = '';
    expect(vm.validateDescription()).toBe(false);
  });
  it('returns false when value is to short', () => {
    vm.description = 'ab';
    expect(vm.validateDescription()).toBe(false);
  });
  it('returns false when value is to long', () => {
    vm.description = new Array(DESCRIPTION_MAX_LENGTH + 2).join('x');
    expect(vm.validateDescription()).toBe(false);
  });
});

describe('Date validation', () => {
  it('returns true for valid values', () => {
    vm.date = TEST_DATE;
    expect(vm.validateDate()).toBe(true);
  });
  it('returns false when date is not set', () => {
    vm.date = '';
    expect(vm.validateDate()).toBe(false);
  });
  it('returns false when date is invalid', () => {
    vm.date = 'not a date';
    expect(vm.validateDate()).toBe(false);
  });
});

describe('Hour validation', () => {
  it('returns true for valid values', () => {
    vm.hour = '1';
    expect(vm.validateHour()).toBe(true);
  });
  it('returns false when hour is not set', () => {
    vm.hour = '';
    expect(vm.validateHour()).toBe(false);
  });
  it('returns false when hour is invalid', () => {
    vm.hour = 'not a hour';
    expect(vm.validateHour()).toBe(false);
  });
  it('returns false when hour is less than zero', () => {
    vm.hour = '-1';
    expect(vm.validateHour()).toBe(false);
  });
  it('returns false when hour is to large', () => {
    vm.hour = HOUR_MAX;
    expect(vm.validateHour()).toBe(false);
  });
});

describe('Minute validation', () => {
  it('returns true for valid values', () => {
    vm.minute = '1';
    expect(vm.validateMinute()).toBe(true);
  });
  it('returns false when minute is not set', () => {
    vm.minute = '';
    expect(vm.validateMinute()).toBe(false);
  });
  it('returns false when minute is invalid', () => {
    vm.minute = 'not a minute';
    expect(vm.validateMinute()).toBe(false);
  });
  it('returns false when minute is less than zero', () => {
    vm.minute = '-1';
    expect(vm.validateMinute()).toBe(false);
  });
  it('returns false when minute is to large', () => {
    vm.minute = MINUTE_MAX;
    expect(vm.validateMinute()).toBe(false);
  });
});

describe('Duration validation', () => {
  it('returns true for valid values', () => {
    vm.duration = '1';
    expect(vm.validateDuration()).toBe(true);
  });
  it('returns false when duration is not set', () => {
    vm.duration = '';
    expect(vm.validateDuration()).toBe(false);
  });
  it('returns false when duration is invalid', () => {
    vm.duration = 'not a duration';
    expect(vm.validateDuration()).toBe(false);
  });
  it('returns false when duration is less than zero', () => {
    vm.duration = '-1';
    expect(vm.validateDuration()).toBe(false);
  });
  it('returns false when duration is to large', () => {
    vm.duration = DURATION_MAX;
    expect(vm.validateDuration()).toBe(false);
  });
});

describe('Validates all fields', () => {
  it('as positive when they all are valid', () => {
    vm.name = 'valid name';
    vm.date = TEST_DATE;
    vm.hour = 12;
    vm.minute = 0;
    vm.duration = 1;
    vm.description = 'valid description';
    expect(vm.validate()).toBe(true);
  });
  it('as negative when not all are valid', () => {
    vm.name = '';
    vm.date = '';
    vm.hour = -1;
    vm.minute = -1;
    vm.duration = -1;
    vm.description = '';
    expect(vm.validate()).toBe(false);
  });
});

it('Sets error message after validation', () => {
  vm.addError('name', 'error message');
  expect(vm.errorMessage['name']).not.toHaveLength(0);
});

it('Clears error message', () => {
  vm.addError('name', 'error message');
  vm.clearError('name');
  expect(vm.errorMessage['name']).toHaveLength(0);
});
