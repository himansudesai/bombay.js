#bombay.js
![bombay.js logo](/bombay.png?raw=true "Bombay.js")

Easy node.js based end-to-end UI exercising/testing framework with in-line mocking of external systems.  bombay.js allows full UI to be tested and exercised in full end-to-end fashion but where Jasmine tests (running on Node/Express) allow in-line mocking of external systems.
This gives two benefits viz.
- For daily regression tests, developers don't need a complex multi-system setup, saving time and effort.
- With traditional e2e frameworks, we typically only test the happy paths because external systems behave only one way.  With the in-line mocking Jasmine tests, multiple paths can be simulated on the backend, which allows the UI to be more vigorously exercised.

<table style="width: 400px; border: 1px solid grey;">
  <tr>
    <th>&nbsp;&nbsp;&nbsp;&nbsp;</th>
 	<th>Unit</th>
    <th>End-to-End</th> 
    <th>Local E2E</th>
  </tr>
  <tr>
    <td>Fast</td>
    <td>&nbsp;&nbsp;&nbsp;&nbsp;<img src="happy.png" /></td> 
    <td>&nbsp;&nbsp;<img src="sad.png" /></td>
    <td>&nbsp;&nbsp;<img src="happy.png" /></td>
  </tr>
    <td>Reliable</td>
    <td>&nbsp;&nbsp;&nbsp;&nbsp;<img src="happy.png" /></td> 
    <td>&nbsp;&nbsp;<img src="sad.png" /></td>
    <td>&nbsp;&nbsp;<img src="happy.png" /></td>
  </tr>
    <td>Isolates Failures</td>
    <td>&nbsp;&nbsp;&nbsp;&nbsp;<img src="happy.png" /></td> 
    <td>&nbsp;&nbsp;<img src="sad.png" /></td>
    <td>&nbsp;&nbsp;<img src="happy.png" /></td>
  </tr>
    <td>Simulates a real user</td>
    <td>&nbsp;&nbsp;&nbsp;&nbsp;<img src="happy.png" /></td> 
    <td>&nbsp;&nbsp;<img src="sad.png" /></td>
    <td>&nbsp;&nbsp;<img src="happy.png" /></td>
  </tr>
</table>