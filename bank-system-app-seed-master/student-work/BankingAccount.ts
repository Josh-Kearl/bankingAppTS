import {Account} from "../common/interfaces/Account";
import {Transaction} from "../common/interfaces/Transaction";
import {TransactionOrigin} from "../common/enums/TransactionOrigin";


export class BankingAccount implements Account{
    accountHistory: Transaction[];
    transactionNumber: number;


    constructor(public balance: number, public currentDate: Date, public accountType: string){
        this.balance = balance;
        this.currentDate = currentDate;
        this.accountType = accountType;
    }
    withdrawMoney(amount: number, description: string, transactionOrigin: TransactionOrigin): Transaction {

        let withdrawal: Transaction =
            {
                success: true,
                amount: amount,
                resultBalance: this.balance,
                description: description,
                transactionDate: this.currentDate,
                errorMessage: "Sorry there is not enough in balance for this transaction"
            };



        if (this.balance >= amount && withdrawal.success === true) {
            this.balance -= amount;
            withdrawal.resultBalance = this.balance;
            withdrawal.success = true;

        } else {
            withdrawal.success = false;
        }


         if (this.accountType === "savings" && this.balance >= amount && transactionOrigin !== TransactionOrigin.BRANCH) {
             let futureStamp: number = new Date().getTime() + (30 * 24 * 60 * 60 * 1000);
             let currentStamp: number = this.currentDate.setMonth(this.currentDate.getMonth(), this.currentDate.getDate());
             if (futureStamp < currentStamp && this.transactionNumber < 6) {
                 this.transactionNumber += 1;
                 this.balance -= amount;
                 withdrawal.resultBalance = this.balance;
                 withdrawal.success = true;
                 this.accountHistory.push(withdrawal);
             }
         } else if (this.transactionNumber === 7) {
            withdrawal.success = false;
            this.transactionNumber = 0;
         }


        return withdrawal;

    }

    depositMoney(amount: number, description: string): Transaction {
        let deposit: Transaction = {
            success: true,
            amount: amount,
            resultBalance: this.balance,
            description: description,
            transactionDate: this.currentDate,
            errorMessage: "Sorry there is not enough in balance for this transaction"
        };

        this.balance += deposit.amount;
        return deposit;
    }

    advanceDate(numberOfDays: number) {
        let futureDate = this.currentDate.setDate(this.currentDate.getDate() + numberOfDays);
        return futureDate;
    }

}