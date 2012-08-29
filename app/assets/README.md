# StackMob Javascript Examples

Welcome!  You're here because you downloaded the JS SDK Starter zip or you've forked/cloned the <a href="https://github.com/stackmob/stackmob-javascript-examples" target="_blank">JS Examples GitHub repo</a>.

Here are several examples utilizing the JS SDK.  Feel free to use the code as you wish - copy, reuse.. recycle?  

There are demos and examples for your reference.

Do you need a GitHub project to try <a href="http://www.stackmob.com/devcenter/docs/StackMob-Hosted-HTML5:-GitHub" target="_blank">StackMob hosting</a>?  Feel free to use this one by forking it to your GitHub account!

You can find the `stackmob-javascript-examples` repo at <a target="_blank" href="https://github.com/stackmob/stackmob-javascript-examples">https://github.com/stackmob/stackmob-javascript-examples</a>   

# Contents

The root folder has `index.html` which will get you started right away!

Included are examples housed in each respective folder.   

There is also the StackMob Web Server (stackmobserver.py) included for testing your application locally.

# Running the Examples 

You'll need to initialize `StackMob.init({ ... })` with your application's information.  Some of these examples also need specific schemas and relationships set up.  These will be described in the example pages and respective READMEs.

First, <a href="https://stackmob.com/platform/help/tutorials/html5_js_sdk" target="_blank">initialize Stackmob</a> within each example file (index.html, api/examples.html, etc. in the below).

Then run the StackMob Web Server below.

### Python
The Python Web Server is often a faster way to get running than the old Ruby version below.  In your terminal/command prompt, run:

		>  cd /mycomputer/path/to/stackmob-javascript-examples/
		>  python stackmobserver.py

### Ruby
Note: You must have already installed the stackmob server before by running:

		>  sudo gem install stackmob
	
Once installed, start the Ruby Local Runner by opening your terminal/command prompt, and type:

		>  stackmob server	
		
## Explore

Once the web server is running, feel free to start exploring by visiting these pages:

* <a href="http://127.0.0.1:4567/api/examples.html" target="_blank">http://127.0.0.1:4567/index.html</a>
* <a href="http://127.0.0.1:4567/api/examples.html" target="_blank">http://127.0.0.1:4567/api/examples.html</a>

...and more!

# Contributing to the Examples

Have some examples on how to use the StackMob JS SDK in NodeJS?  How about CoffeeScript?  Email us at support@stackmob.com or simply fork this repo and submit a pull request!  

If you'd like to share your repo, contact us at support@stackmob.com and we can also link to it.
