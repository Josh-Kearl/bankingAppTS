import {Account} from "../common/interfaces/Account";
import {Transaction} from "../common/interfaces/Transaction";
import {TransactionOrigin} from "../common/enums/TransactionOrigin";


export class BankingAccount implements Account{
    accountHistory: Transaction[];


    constructor(public balance: number, public currentDate: Date, public accountType: string){
        this.balance = balance;
        this.currentDate = currentDate;
        this.accountType = accountType;
    }
    withdrawMoney(amount: number, description: string, transactionOrigin: TransactionOrigin): Transaction {
        ;
        let withdrawl: Transaction =
            {
                success: true,
                amount: amount,
                resultBalance: this.balance,
                description: description,
                transactionDate: this.currentDate,
                errorMessage: "Sorry there is not enough in balance for this transaction"
            };



        if (this.balance >= amount && transactionOrigin === TransactionOrigin.BRANCH && withdrawl.success === true) {
            this.balance -= amount;
            withdrawl.resultBalance = this.balance;
            withdrawl.success = true;

        } else {
            withdrawl.success = false;
        }


         if (this.accountType === "savings" && this.balance >= amount && transactionOrigin !== TransactionOrigin.BRANCH) {
             if () {
                 this.balance -= amount;
                 withdrawl.resultBalance = this.balance;
                 withdrawl.success = true;
                 this.accountHistory.push(withdrawl);
             }
         } else if (this.accountType ==="savings") {
            withdrawl.success = false;
         }


        return withdrawl;

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
        this.currentDate.setDate(this.currentDate.getDate() + numberOfDays);
    }

}