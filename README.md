#bombay.js
![bombay.js logo](/bombay.png?raw=true "Bombay.js")

Node.js based 'local end-to-end' UI testing framework with in-line mocking of external systems.  Bombay.js allows developers to write **regression** tests for daily use with the benefits, but not the drawbacks, of end-user like end-to-end testing.

Tests are written with Jasmine and run on Node.  During a test run, endpoints that simulate real external systems come to life and field calls made by the UI. With this in-line mocking capability, we can simulate both expected and unexpected external systems behavior and verify that the UI behaves as coded.

To illustrate the characteristics of local E2E style tests, consider the following comparison table re-created from Google testing blog <https://testing.googleblog.com/2015/04/just-say-no-to-more-end-to-end-tests.html>

<table style="width: 400px; border: 1px solid grey;">
  <tr>
    <th>&nbsp;&nbsp;&nbsp;&nbsp;</th>
 	<th>Unit</th>
    <th>End-to-End</th> 
  </tr>
  <tr>
    <td>Fast</td>
    <td>&nbsp;&nbsp;<img src="happy.png" /></td> 
    <td>&nbsp;&nbsp;&nbsp;&nbsp;<img src="sad.png" /></td>
  </tr>
    <td>Reliable</td>
    <td>&nbsp;&nbsp;&nbsp;&nbsp;<img src="happy.png" /></td> 
    <td>&nbsp;&nbsp;&nbsp;&nbsp;<img src="sad.png" /></td>
  </tr>
    <td>Isolates Failures</td>
    <td>&nbsp;&nbsp;&nbsp;&nbsp;<img src="happy.png" /></td> 
    <td>&nbsp;&nbsp;&nbsp;&nbsp;<img src="sad.png" /></td>
  </tr>
    <td>Simulates a real user</td>
    <td>&nbsp;&nbsp;&nbsp;&nbsp;<img src="happy.png" /></td> 
    <td>&nbsp;&nbsp;&nbsp;&nbsp;<img src="sad.png" /></td>
  </tr>
</table>

To that list, we can add a few more categories where unit tests have an advantage over end-to-end test.  We also add another column for Bombay.js's local e2e style tests.

Bombay.js is functional but currently a work in progress.  Features like https endpoints and easy ways to handle http response headers are missing.

<table style="width: 400px; border: 1px solid grey;">
  <tr>
    <th>&nbsp;&nbsp;&nbsp;&nbsp;</th>
 	<th>Unit</th>
    <th>End-to-End</th> 
    <th>Local E2E</th> 
  </tr>
  <tr>
    <td>Fast</td>
    <td>&nbsp;&nbsp;<img src="happy.png" /></td> 
    <td>&nbsp;&nbsp;&nbsp;&nbsp;<img src="sad.png" /></td>
    <td>&nbsp;&nbsp;<img src="happy.png" /></td> 
  </tr>
    <td>Reliable</td>
    <td>&nbsp;&nbsp;<img src="happy.png" /></td> 
    <td>&nbsp;&nbsp;&nbsp;&nbsp;<img src="sad.png" /></td>
    <td>&nbsp;&nbsp;<img src="happy.png" /></td> 
  </tr>
    <td>Isolates Failures</td>
    <td>&nbsp;&nbsp;<img src="happy.png" /></td> 
    <td>&nbsp;&nbsp;&nbsp;&nbsp;<img src="sad.png" /></td>
    <td>&nbsp;&nbsp;<img src="happy.png" /></td> 
  </tr>
    <td>Simulates a real user</td>
    <td>&nbsp;&nbsp;<img src="sad.png" /></td>
    <td>&nbsp;&nbsp;&nbsp;&nbsp;<img src="happy.png" /></td>
    <td>&nbsp;&nbsp;<img src="happy.png" /></td> 
  </tr>
  </tr>
    <td>Devs agree to write/maintain</td>
    <td>&nbsp;&nbsp;<img src="happy.png" /></td>
    <td>&nbsp;&nbsp;&nbsp;&nbsp;<img src="sad.png" /></td>
    <td>&nbsp;&nbsp;<img src="happy.png" /></td> 
  </tr>
  </tr>
    <td>Easy local setup</td>
    <td>&nbsp;&nbsp;<img src="happy.png" /></td>
    <td>&nbsp;&nbsp;&nbsp;&nbsp;<img src="sad.png" /></td>
    <td>&nbsp;&nbsp;<img src="happy.png" /></td> 
  </tr>
  </tr>
    <td>Unhappy path testing</td>
    <td>&nbsp;&nbsp;<img src="happy.png" /></td>
    <td>&nbsp;&nbsp;&nbsp;&nbsp;<img src="sad.png" /></td>
    <td>&nbsp;&nbsp;<img src="happy.png" /></td> 
  </tr>
</table>