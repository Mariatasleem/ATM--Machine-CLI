#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
let myBalance = 10000; //Dollar
let myPin = 5678;

console.log(chalk.bgCyan("\nwelcome to Maria tasleem's ATM-Machine\n"));

let pinAnswer = await inquirer.prompt(
  [
    {
      name: "pin",
      message: chalk.yellowBright("enter your pin"),
      type: "number"
    }
  ]
);
 
if (pinAnswer.pin === myPin) {
    console.log(chalk.greenBright("\nCorrect pin code login successfully!!!\n"));

    let operationAns = await inquirer.prompt(
    [
        {
          name: "operation",
          message: "please select one option",
          type: "list",
          choices: ["Withdraw Amount", "Check Balance"]
        }
    ]
    )
    if (operationAns.operation === "Withdraw Amount"){
      let withdrawAns = await inquirer.prompt([
        {
          name : "withdrawMethod",
          type : "list",
          message: "Select a withdrawl Method:",
          choices: ["Fast Cash", "Enter Amount"]
        }
      ])
      if(withdrawAns.withdrawMethod === "Fast Cash"){
        let fastCashAns = await inquirer.prompt([
          {
            name : "fastCash",
            type : "list",
            message: "Select Amount:",
            choices: [1000, 2000, 5000,10000, 20000, 50000]
          }
        ])
        if(fastCashAns.fastCash > myBalance){
          console.log(chalk.redBright("you have insufficient Balance"));
        }
        else {
          myBalance -= fastCashAns.fastCash
          console.log(`${fastCashAns.fastCash} Withdraw Successfully`);
          console.log(`Your Remaining Balance is ${myBalance}`);
        }
      }
      else if(withdrawAns.withdrawMethod === "Enter Amount"){ 
        let amountAns = await inquirer.prompt(
        [
            {
                name: "amount",
                message:"Enter your amount to withdraw",
                type: "number"
            }
        ]
    )
    if(amountAns.amount > myBalance){
      console.log(chalk.redBright("You have insufficient Balance"));
    }

    else {
     myBalance -= amountAns.amount;
    console.log(`${amountAns.amount} Withdraw Successfully`);
    console.log(`your Remaining Balance is ${myBalance}`);
  }
    }     
      }
else if (operationAns.operation === "Check Balance"){
  console.log(`Your Amount Balance is : ${myBalance}`);
}
}
else {
  console.log(chalk.redBright("Invalid pin,TRY AGAIN !!"));
}
