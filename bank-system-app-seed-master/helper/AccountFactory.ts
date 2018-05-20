import {Account} from "../common/interfaces/Account";
import {CheckingAccount} from "../student-work/CheckingAccount";
import {SavingsAccount} from "../student-work/SavingsAccount";
import {RetirementAccount} from "../student-work/RetirementAccount";

export class AccountFactory {

    static getCheckingAccountObject(currentDate: Date): Account {
        let checkingAccount = new CheckingAccount(1000, currentDate, "checking");
        return checkingAccount;
    }

    static getSavingsAccountObject(currentDate: Date): Account {
        let savingsAccount = new SavingsAccount(10000, currentDate, "savings");
        
        return savingsAccount;
    }

    static getRetirementAccountObject(currentDate: Date, accountHolderBirthDate: Date): Account {
        let retirementAccount = new RetirementAccount(100000, currentDate, accountHolderBirthDate, "retirement");

        return retirementAccount;
    }

}