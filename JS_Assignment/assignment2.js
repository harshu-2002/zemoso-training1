/*function getData(uId) {
    setTimeout(() => {
    console.log("Fetched the data!");
    return "skc@gmail.com";
    }, 4000);
    }
    
console.log("start");
var email = getData("skc");
console.log("Email id of the user id is: " + email);
console.log("end");*/

/*The issue with the code is that getData function is asynchronous and it does not return any value.
 The setTimeout function does not wait for the API call to complete before moving on to the next line of code. 
 This means that the email variable is being logged before the getData function is done executing and before the email value is returned.

To solve this problem, one approach is to use a callback function that is called when the email value is available.
 Here is an updated version of the code that uses a callback:*/
function getData(uId, callback) {
    setTimeout(() => {
      console.log("Fetched the data!");
      callback("skc@gmail.com");
    }, 4000);
  }
  
  console.log("start");
  getData("skc", function(email) {
    console.log("Email id of the user id is: " + email);
  });
  console.log("end");
  