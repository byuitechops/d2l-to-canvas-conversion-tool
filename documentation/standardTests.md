# Standard Tests

## Child Module Tests

Some basic tests will be provided in our standard testing script, but nearly every module will require tests be written specific to their functionality. A "Verifier" module will be present to run tests on the object being passed in. This will be present during testing and in production.

### Verifier Module

This module runs in tests and during production. It will verify the object passed into a module is the one we need before allowing the module to perform it's function.

It will verify:
3. It is an object
1. It is not null
2. It is not empty
4. Any properties given in the function parameter exist on the object, and that they currently have a value (not null or empty)

### Standard Child Module Tests

If a module passes the basic verifier module, it will also need to pass these generic tests:

1. A callback is present and formatted correctly
3. The element being passed into the callback must pass these tests:
  * Is not null
  * Is not empty
  * Is an object
  * Contains the following properties:
    * report
    * content
    * settings
4. Error handling is done using the `course.report.throwErr()` format
5. Success messages are present in the module

In addition, the following tests need to be written to test the module, but are unique to the module:

1. The correct changes have been included in the object put into the callback
2. Settings were used correctly:
  * Throws error when invalid setting provided
3. JunkDrawer used correctly
  * Additions to JunkDrawer actually implemented
