import {Account} from "../common/interfaces/Account";
import {Transaction} from "../common/interfaces/Transaction";
import {TransactionOrigin} from "../common/enums/TransactionOrigin";


export class BankingAccount implements Account{
    accountHistory: Transaction[];


    constructor(public balance: number, public currentDate: Date, public accountType: string){
        this.balance = balance;
        this.currentDate = currentDate;
        this.accountType = accountType;
        this.accountHistory = [];
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



        if (this.balance >= amount && this.accountType ==="checking") {
            this.balance -= amount;
            withdrawal.resultBalance = this.balance;
            withdrawal.success = true;
            this.accountHistory.push({
                success: true,
                amount: amount,
                resultBalance: this.balance,
                description: description,
                transactionDate: this.currentDate,
                errorMessage: ""
            })

        } else if(this.balance < amount && this.accountType ==="checking") {
            withdrawal.success = false;

            this.accountHistory.push({
                success: withdrawal.success,
                amount: amount,
                resultBalance: this.balance,
                description: description,
                transactionDate: this.currentDate,
                errorMessage: "Sorry there is not enough in balance for this transaction"

            })
        }

        return withdrawal;

    }

    depositMoney(amount: number, description: string): Transaction {
        let deposit: Transaction = {
            success: true,
            amount: amount,
            resultBalance: this.balance += amount,
            description: description,
            transactionDate: this.currentDate,
            errorMessage: ""
        };

        this.accountHistory.push(deposit);


        return deposit;
    }

    advanceDate(numberOfDays: number) {
    }

    calculateInt (numberOfDays:number, rate: number) {
        for (let i = 1; i <= numberOfDays; i++) {

            this.currentDate.setDate(this.currentDate.getDate() + 1);

            if (this.currentDate.getDate() === 1) {
                let interestDeposit = this.balance * rate / 12;
                let roundedDeposit = Math.round(interestDeposit * 100) / 100;
                this.depositMoney(roundedDeposit, "Monthly Interest");
            }
        }
    }

}