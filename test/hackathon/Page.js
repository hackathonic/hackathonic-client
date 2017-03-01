import { Selector } from 'testcafe';

export default class Page {
  constructor() {
    this.name = Selector('input[test="hackathon-name"]');
    this.date = Selector('input[test="hackathon-date"]');
    this.hour = Selector('input[test="hackathon-hour"]');
    this.minute = Selector('input[test="hackathon-minute"]');
    this.duration = Selector('input[test="hackathon-duration"]');
    this.description = Selector('input[test="hackathon-description"]');
    this.linkToCreationForm = Selector('li[test="link-hackathon-create"] a');
    this.creationForm = Selector('form[test="create-hackathon"]');
  }

  fillForm(t, {
    name = '',
    date = '',
    hour = '',
    minute = '',
    duration = '',
    description = ''
  }) {
    return t.typeText(this.name, name)
     .typeText(this.date, date)
     .typeText(this.hour, hour)
     .typeText(this.minute, minute)
     .typeText(this.duration, duration)
     .typeText(this.description, description);
  }
}
