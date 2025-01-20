class MyClass {
  constructor() {
    this._loggedIn = false;

    this.addEventListener('loggedInChanged', (event) => {
      // Execute some code here when the variable is changed.
      console.log('loggedIn variable has been changed to', event.detail.value);
    });

    this.loggedIn = false;
  }

  set loggedIn(value) {
    this._loggedIn = value;

    // Dispatch a custom event when the variable is changed.
    const event = new CustomEvent('loggedInChanged', { detail: { value } });
    this.dispatchEvent(event);
  }
}
export { MyClass };