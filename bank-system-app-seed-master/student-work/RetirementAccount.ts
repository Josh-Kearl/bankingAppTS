import {Account} from "../common/interfaces/Account";
import {Transaction} from "../common/interfaces/Transaction";
import {TransactionOrigin} from "../common/enums/TransactionOrigin";
import {BankingAccount} from "./BankingAccount";

export class RetirementAccount extends BankingAccount {
    constructor(public balance: number, public currentDate: Date, public accountHolderBirthDate: Date, public accountType: string){
        super(balance, currentDate, accountType);
        this.balance = balance;
        this.currentDate = currentDate;
        this.accountHolderBirthDate = accountHolderBirthDate;
        this.accountType = accountType;
    }
    withdrawMoney(amount: number, description: string, transactionOrigin: TransactionOrigin): Transaction{
        let withdrawal: Transaction =
            {
                success: true,
                amount: amount,
                resultBalance: this.balance,
                description: description,
                transactionDate: this.currentDate,
                errorMessage: "Sorry there is not enough in balance for this transaction"
            };

        if (this.accountType === "retirement" && this.balance >= amount && this.calculateAge(this.accountHolderBirthDate) <= 60) {
            this.balance -= (amount + (this.balance * .1));
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

        } else if (this.balance < amount && this.accountType === "retirement") {
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

       if(this.balance >= amount){
            this.balance -= amount;
            withdrawal.resultBalance = this.balance;
            withdrawal.success = true;
        } else if (this.balance < amount){
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



    advanceDate(numberOfDays: number){
        super.calculateInt(numberOfDays, .03);

    }

    calculateAge (birthDate){
        let ageDifference = this.currentDate.getTime() - birthDate.getTime();

        return ageDifference;

    }

}