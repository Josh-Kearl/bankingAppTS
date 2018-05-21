import {Account} from "../common/interfaces/Account";
import {Transaction} from "../common/interfaces/Transaction";
import {TransactionOrigin} from "../common/enums/TransactionOrigin";
import {BankingAccount} from "./BankingAccount";

export class SavingsAccount extends BankingAccount {
    withdrawals: number = 0;
    constructor(public balance: number, public currentDate: Date, public accountType: string){
        super(balance, currentDate, accountType);
        this.balance = balance;
        this.currentDate = currentDate;
        this.accountType = accountType;
    }

    withdrawMoney (amount: number, description: string, transactionOrigin: TransactionOrigin): Transaction {
        let withdrawal: Transaction =
            {
                success: true,
                amount: amount,
                resultBalance: this.balance,
                description: description,
                transactionDate: this.currentDate,
                errorMessage: "Sorry there is not enough in balance for this transaction"
            };


        if (this.accountType === "savings" && this.balance >= amount && transactionOrigin !== TransactionOrigin.BRANCH) {
                this.withdrawals++;
            if (this.withdrawals <= 6) {
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
                });

            } else {
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
        }

        if (this.accountType === "savings" && transactionOrigin === TransactionOrigin.BRANCH && this.balance >= amount){
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

        } else if (this.balance < amount && this.accountType === "savings"){
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


    advanceDate(days: number) {
        //storing current month to watch for change
        let currMonth = this.currentDate.getMonth();
        super.calculateInt(days, .02);

        //checking if the month has changed
        if (this.currentDate.getMonth() !== currMonth) {
            this.withdrawals = 0;
        }


    }

}