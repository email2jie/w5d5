function Clock () {
  // 1. Create a Date object.
  // 2. Store the hours, minutes, and seconds.
  // 3. Call printTime.
  // 4. Schedule the tick at 1 second intervals.
  let date = new Date;
  this.hours =  date.getHours();
  this.minutes = date.getMinutes();
  this.seconds = date.getSeconds();
  this.printTime();
  setInterval(() => {this._tick();}, 1000);
}

Clock.prototype.printTime = function () {
  // Format the time in HH:MM:SS
  let options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  };
  let time = new Date();
  time.setHours(this.hours);
  time.setMinutes(this.minutes);
  time.setSeconds(this.seconds);
  console.log(new Intl.DateTimeFormat('en-US', options).format(time));

  // let time = `${this.hours}:${this.minutes}:${this.seconds}`;
  // Use console.log to print it.
  // console.log(formatedTime);
};

Clock.prototype._tick = function () {
  // 1. Increment the time by one second.
  if (this.seconds === 59) {
    if (this.minutes === 59) {
      this.hours++;
      this.minutes = 0;
      this.seconds = 0;
    } else {
      this.minutes++;
      this.seconds = 0;
    }
  } else {
    this.seconds++;
  }
  // 2. Call printTime.'
  this.printTime();
};

// const clock = new Clock();

const readline = require('readline');

const reader = readline.createInterface({
  // it's okay if this part is magic; it just says that we want to
  // 1. output the prompt to the standard output (console)
  // 2. read input from the standard input (again, console)

  input: process.stdin,
  output: process.stdout
});


function addNumbers(sum, numsLeft, completionCallback) {
  if (numsLeft > 0) {
    reader.question("Please enter a number:", function (answer) {
      let ans = parseInt(answer);
      addToSum(ans);
      console.log("Your sum is " + sum +"!");
      numsLeft--;
      addNumbers(sum, numsLeft, completionCallback);
    });

  } else if (numsLeft === 0) {
    completionCallback(sum);
    return;
  }
  function addToSum (number) {
    sum += number;
  }

}
//
// addNumbers(0, 3, function (sum) {
//   console.log("Total Sum: " + sum);
//   reader.close();
// });

function askIfGreaterThan(el1, el2, callback){
  reader.question(`Is ${el1} greater than ${el2}?` , function (answer) {
    if (answer === 'yes') {
      callback(true);
    }else if (answer === 'no') {
      callback(false);
    }else {
      askIfGreaterThan(el1, el2, callback);
    }
  });
}

function innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop) {

    if (i === arr.length-1) {
      outerBubbleSortLoop(madeAnySwaps);
    }else{
        askIfGreaterThan(arr[i], arr[i+1], (isGreaterThan) => {
        if(isGreaterThan){
          let temp = arr[i+1];
          arr[i+1] = arr[i];
          arr[i] = temp;
          madeAnySwaps = true;
        }
        innerBubbleSortLoop(arr, i+1, madeAnySwaps, outerBubbleSortLoop);
      });
    }

}

function absurdBubbleSort(arr, sortCompletionCallback){
  function outerBubbleSortLoop(madeAnySwaps){
    if (madeAnySwaps) {
      madeAnySwaps = false;
      innerBubbleSortLoop(arr, 0, madeAnySwaps, outerBubbleSortLoop);
    }else {
      sortCompletionCallback(arr);
      return;
    }
  }
  outerBubbleSortLoop(true);
}

// absurdBubbleSort([2,4,7,8,1,9], function (arr) {
//   console.log("Sorted array: " + JSON.stringify(arr));
//   reader.close();
// });

reader.close();

Function.prototype.myBind = function (context) {

  return () => {
    this.apply(context);
  };

};

function Lamp() {
   this.name = "a lamp";
}

const turnOn = function() {
   console.log("Turning on " + this.name);
};

const lamp = new Lamp();

turnOn(); // should not work the way we want it to

const boundTurnOn = turnOn.bind(lamp);
const myBoundTurnOn = turnOn.myBind(lamp);

boundTurnOn(); // should say "Turning on a lamp"
myBoundTurnOn(); // should say "Turning on a lamp"
