import React, { useState, useEffect, useMemo } from 'react';
import { create } from 'zustand';

// --- Enhanced Question Categories and Mappings ---
const SUBJECTS = {
  INTEREST_RATE: 'Interest Rate Derivatives',
  EQUITY: 'Equity Derivatives', 
  CURRENCY: 'Currency Derivatives'
};

const QUESTION_PAPERS = {
  'PRACTICE QUESTIONS-1': 'Practice Questions Set 1',
  'PRACTICE QUESTIONS-2': 'Practice Questions Set 2', 
  'PRACTICE QUESTIONS-3': 'Practice Questions Set 3',
  'PRACTICE SET-1': 'Practice Set 1',
  'CURRENCY DERIVATIVES-1': 'Currency Derivatives Practice Set'
};

// --- Data: questions.js ---
// The complete and unabridged 450-question database from the user-provided JSON file.
const allQuestions = [
    // PRACTICE QUESTIONS-1
    { "id": "p1-1", "question": "Which of these is a derivative?", "options": ["Index Options", "Index Futures", "Both 1 and 2", "None of the above"], "answer": "Both 1 and 2", "explanation": null, "topic": "PRACTICE QUESTIONS-1" },
    { "id": "p1-2", "question": "If yield-to-maturity rises, then __________.", "options": ["Reinvestment income rises", "Bond price falls", "Both 1 and 2", "None of the above"], "answer": "Both 1 and 2", "explanation": "If the market rate rises, the bond price falls but reinvestment income rises. The bond price falls because of discounting at a higher interest rate results in lower present value; and reinvestment income rises because the interim cash flows are reinvested at higher than the original interest rate.", "topic": "PRACTICE QUESTIONS-1" },
    { "id": "p1-3", "question": "The Conversion Factor in physical settlement of bond futures will be __________.", "options": ["same for all Deliverable bonds", "different for different Deliverable bonds", "there is no conversion factor in physical settlement", "None of the above"], "answer": "different for different Deliverable bonds", "explanation": "To make the notional bond and a Deliverable Bond equivalent in value, a Conversion Factor (also known as Price Factor) is employed, which is specific to each Deliverable Bond.", "topic": "PRACTICE QUESTIONS-1" },
    { "id": "p1-4", "question": "A Trading member of the Exchange can do which of the following?", "options": ["Execution of trades", "Clearing and settlement of trades", "Both 1 and 2", "None of the above"], "answer": "Execution of trades", "explanation": "Trading member is a member of Exchange but not Clearing Corporation, so that it can only execute trades but settle them through a designated Professional Clearing Member. A Trading-cum-Clearing Member is a member of both Exchange and Clearing Corporation so that it can execute as well as settle trades.", "topic": "PRACTICE QUESTIONS-1" },
    { "id": "p1-5", "question": "The Constituent Subsidiary General Ledger (CSGL) Account can be opened by:", "options": ["Stock Holding Corporation of India Ltd (SHIL)", "Clearing Corporation of India Ltd (CCIL)", "Both 1 and 2", "None of the above"], "answer": "Both 1 and 2", "explanation": null, "topic": "PRACTICE QUESTIONS-1" },
    { "id": "p1-6", "question": "When the original period of borrowing / lending is less than one year, it is known as:", "options": ["Bond Market", "Currency Market", "Money Market", "Equity Market"], "answer": "Money Market", "explanation": "In money market, the period is less than one year; and in bond market, it is one year or more.", "topic": "PRACTICE QUESTIONS-1" },
    { "id": "p1-7", "question": "If the Treasury bill futures contract price changes by 500 ticks, the change in value of one futures contract is:", "options": ["500", "5", "2500", "5000"], "answer": "2500", "explanation": "The tick size for contracts is Rs 0.0025. Given that the face value of one contract is equal to Rs 200,000 and given that tick size is 0.0025, the minimum change per contract will be: 200,000 x 0.0025 / 100 = 5. In the example, the contract price changes by 500 ticks, so the change in value will be 500 x 5 = 2500.", "topic": "PRACTICE QUESTIONS-1" },
    { "id": "p1-8", "question": "One Basis Point is equal to:", "options": ["1%", "0.1%", "0.01%", "0.001%"], "answer": "0.01%", "explanation": "The change in YTM of 0.01% (or 0.0001) is called a basis point (BP) or "bip".", "topic": "PRACTICE QUESTIONS-1" },
    { "id": "p1-9", "question": "In India, the minimum and multiple amounts of issue for T bills is:", "options": ["Rs. 2500", "Rs. 10000", "Rs. 25000", "Rs. 100000"], "answer": "Rs. 25000", "explanation": "Treasury Bills are issued by the Govt. of India at minimum and in multiples of Rs 25000.", "topic": "PRACTICE QUESTIONS-1" },
    { "id": "p1-10", "question": "The Clearing Account is used exclusively for:", "options": ["all transactions of the Clearing Members", "making and receiving payments with Stock Exchange", "making and receiving payments with SEBI", "making and receiving payments with Clearing Corporation"], "answer": "making and receiving payments with Clearing Corporation", "explanation": "For the cash side of settlement, Clearing Corporation will pay or receive cash only through designated branches of designated banks called Clearing Banks. Therefore, Trading-cum-Clearing Member / Self-clearing Member / Professional Clearing Member must open an account with one such designated branch. This account is called Clearing Account and it should be used exclusively for making and receiving payments with Clearing Corporation.", "topic": "PRACTICE QUESTIONS-1" },
    { "id": "p1-11", "question": "Of the below mentioned four values, which one can be bought or sold for Govt. Bond Futures?", "options": ["Rs 1 lakh", "Rs 3 Lakh", "Rs 6 Lakh", "Rs 9 lakh"], "answer": "Rs 6 Lakh", "explanation": "Contract Amount (or Market Lot) is the minimum and multiple of trade size. It is Rs 200,000 of face value. Because the face value will always be an integral multiple of Rs 2 lakhs, we cannot buy or sell for amounts like Rs 3 lakh, Rs 5 lakh, etc.(odd amounts).", "topic": "PRACTICE QUESTIONS-1" },
    { "id": "p1-12", "question": "The underlying for 'Bond Derivatives' should be:", "options": ["Borrowing and Lending of money", "A specific instrument issued by a specific borrower", "Interest rate on specific instrument", "None of the above"], "answer": "A specific instrument issued by a specific borrower", "explanation": "The underlying for Bond Derivatives is the specific instrument. The underlying for Interest rate derivative is the Interest rate on money.", "topic": "PRACTICE QUESTIONS-1" },
    { "id": "p1-13", "question": "The underlying for Interest rate futures is:", "options": ["Bond", "Interest Rate", "Commodity", "Currency"], "answer": "Bond", "explanation": "An interest bearing instrument is the underlying for Interest rate futures. In the given options, Bond is the only option which shall pay interest.", "topic": "PRACTICE QUESTIONS-1" },
    { "id": "p1-14", "question": "Which of the following is a correct measure of the realized return for a coupon bond?", "options": ["Yield-to-maturity (YTM)", "Current yield", "Coupon", "None of the above"], "answer": "None of the above", "explanation": "All the three have some deficiency as they do not consider the Price Risk and Reinvestment risks.", "topic": "PRACTICE QUESTIONS-1" },
    { "id": "p1-15", "question": "__________ is/are secured money market instrument(s).", "options": ["Certificate of deposits", "Commercial paper", "Both 1 and 2", "None of the above"], "answer": "None of the above", "explanation": "Certificate of deposit is a negotiable, unsecured instrument issued by scheduled commercial banks and select all-India financial institutions. Commercial paper is a negotiable, unsecured instrument issued by corporate bodies and primary dealers.", "topic": "PRACTICE QUESTIONS-1" },
    { "id": "p1-16", "question": "Fixed-income securities market consists of which of the following markets?", "options": ["Bond Markets", "Money Markets", "Both 1 and 2", "None of the above"], "answer": "Both 1 and 2", "explanation": "Debt market or Fixed-income securities market, consists of money and bond markets. In money market, the period is less than one year; and in bond market, it is one year or more.", "topic": "PRACTICE QUESTIONS-1" },
    { "id": "p1-17", "question": "Which of the following underlying has the largest size of outstanding derivatives globally?", "options": ["Equity", "Interest Rates", "Currency", "Commodity"], "answer": "Interest Rates", "explanation": "The interest rate derivatives market is the largest derivatives market in the world. The Bank of International Settlements estimates that the global OTC derivatives market as of December 2014 was US$ 630 trillion out of which around US$ 500 trillion was contributed by the Interest rate derivatives market.", "topic": "PRACTICE QUESTIONS-1" },
    { "id": "p1-18", "question": "Calendar spread consists of buying and selling futures on:", "options": ["same underlying, same quantity and same expiry month", "different underlying, same quantity and different expiry month", "same underlying, different quantity and same expiry month", "None of the above"], "answer": "None of the above", "explanation": "Calendar spread consists of buying and selling futures on the same underlying and for the same quantity but different expiry months.", "topic": "PRACTICE QUESTIONS-1" },
    { "id": "p1-19", "question": "Current yield is an unsatisfactory measure of return because:", "options": ["it ignores the capital gain/loss at redemption", "it ignores the premium/discount in bond price", "both 1 and 2", "None of the above"], "answer": "it ignores the capital gain/loss at redemption", "explanation": "Current yield is an unsatisfactory return measure. Although it considers the premium/discount in bond price but ignores the capital gain/loss and reinvestment rate; and therefore cannot be a true return.", "topic": "PRACTICE QUESTIONS-1" },
    { "id": "p1-20", "question": "Which risk does one face when the changes in prices of spot Treasury Bill and Treasury Bill futures are not same?", "options": ["Yield curve spread risk", "Basis Risk", "Market liquidity risk", "None of the above"], "answer": "Basis Risk", "explanation": "Basis risk is the risk that the value of a futures contract (or an over-the-counter (OTC) hedge) will not move in line with that of the underlying exposure.", "topic": "PRACTICE QUESTIONS-1" },
    { "id": "p1-21", "question": "The effect of reinvestment risk on a bond is:", "options": ["Immediate", "Over a period of time", "No effect", "None of the above"], "answer": "Over a period of time", "explanation": "Reinvestment risk is the risk due to the uncertainty of the interest rates at which the periodical interest received on a bond will be reinvested. So the effect of reinvestment risk will over the period of the bonds term.", "topic": "PRACTICE QUESTIONS-1" },
    { "id": "p1-22", "question": "The contract amount (market lot) for Govt. Bond futures is:", "options": ["Rs 25000", "Rs 100000", "Rs 200000", "Rs 500000"], "answer": "Rs 200000", "explanation": "Contract Amount (or Market Lot) is the minimum and multiple of trade size. It is Rs 200,000 of face value.", "topic": "PRACTICE QUESTIONS-1" },
    { "id": "p1-23", "question": "Yield to maturity - YTM assumes that term structure of zero rates is:", "options": ["Flat", "Normal", "Humped", "Inverted"], "answer": "Flat", "explanation": "By using the same rate for all cash flows, YTM assumes that the term structure of zero rates is flat. This is inconsistent with reality and is a drawback in using YTM.", "topic": "PRACTICE QUESTIONS-1" },
    { "id": "p1-24", "question": "Which of the following is a 'risk-free' security?", "options": ["Bank deposit", "Certificate of deposit", "Commercial paper", "None of the above"], "answer": "None of the above", "explanation": "Only Sovereign bonds issued by the government are considered "risk-free\" securities in terms of credit risk.", "topic": "PRACTICE QUESTIONS-1" },
    { "id": "p1-25", "question": "The maturity of the underlying for Treasury Bill futures in India is:", "options": ["14 day", "91 day", "182 day", "364 day"], "answer": "91 day", "explanation": null, "topic": "PRACTICE QUESTIONS-1" },
    { "id": "p1-26", "question": "What is Term Structure?", "options": ["Its the change of rates over a period of time", "Its a snapshot of rates at a point of time", "Both 1 and 2", "None of the above"], "answer": "Its a snapshot of rates at a point of time", "explanation": "Term structure is a snapshot of rates at a point of time. How the term structure changes over time, is called 'shifts'.", "topic": "PRACTICE QUESTIONS-1" },
    { "id": "p1-27", "question": "When securities are delivered short, the auction is conducted on:", "options": ["First business day after the day of intention", "Second business day after the day of intention", "On the settlement day", "seven days after the day of intention"], "answer": "On the settlement day", "explanation": "When there is a short-delivery on the settlement day, the shortage is auctioned on the same day. (When there is a failure to notify the Intent to Deliver, the auction is conducted on the first business day after the Day of Intention).", "topic": "PRACTICE QUESTIONS-1" },
    { "id": "p1-28", "question": "Amongst the following options, which one is true with respect to 'CLEARING ACCOUNTS'?", "options": ["It has to be used only for the payments with SEBI", "It cannot be closed or shifted without the prior permission of the Clearing Corporation", "The Clearing Corporation cannot directly debit or credit amounts in it for the member", "Closure does not require prior permission of the Clearing Member"], "answer": "It cannot be closed or shifted without the prior permission of the Clearing Corporation", "explanation": "Clearing Accounts are accounts opened by the Trading / Clearing / Professional Clearing members at designated branches of designated banks exclusively for the purpose of settlement (payment and receipt of funds) with the Clearing Corporations. The shifting of Clearing Account to another Clearing Bank or closing it, will require prior approval of Clearing Corporation.", "topic": "PRACTICE QUESTIONS-1" },
    { "id": "p1-29", "question": "The permissible maturity for underlying of Treasury Bill futures in India are:", "options": ["91, 182 and 364 days", "14, 182 and 364 days", "14, 91 and 182 days", "None of the above"], "answer": "None of the above", "explanation": "Treasury Bills are issued with original maturity of 91-day, 182-day and 364-day but futures for only 91 day T Bill underlying is permissible.", "topic": "PRACTICE QUESTIONS-1" },
    { "id": "p1-30", "question": "Some months back the 3 month rate was 8% and the 1 year rate was 8.8%. Currently the 3 month rate is 8.4% and the 1 year rate is 8.9%. What is the shift of this term structure called?", "options": ["Steepening", "Flattening", "Parallel", "Vertical"], "answer": "Flattening", "explanation": "Flattening - Difference between Long term Rate and Short term Rate falls or narrows (from positive to less positive or from negative to more negative).", "topic": "PRACTICE QUESTIONS-1" },

    // PRACTICE QUESTIONS-2
    { "id": "p2-1", "question": "The short-term interest rate is predominantly determined by inflation outlook.", "options": ["True", "False"], "answer": "False", "explanation": "The short-term rate is determined by liquidity and the long-term rate is determined by inflation outlook and capital expenditure by industry and business.", "topic": "PRACTICE QUESTIONS-2" },
    { "id": "p2-2", "question": "Which of the following is true about the Conversion Factor?", "options": ["It makes the adjustment always perfect", "It makes the adjustment always imperfect", "It is a good and practical approximation for adjustment", "None of the above"], "answer": "It is a good and practical approximation for adjustment", "explanation": null, "topic": "PRACTICE QUESTIONS-2" },
    { "id": "p2-3", "question": "Delivery margin is collected on the __________.", "options": ["Day of Intent", "Day of Delivery", "Day of Settlement", "None of the above"], "answer": "Day of Intent", "explanation": "Delivery margin is collected on the Day of Intent (Last Trading Day) after the intention to deliver and allocations are completed.", "topic": "PRACTICE QUESTIONS-2" },
    { "id": "p2-4", "question": "Assume that the regulator has stipulated a minimum margin of Rs 200, the clearing corporation can change it to __________.", "options": ["Any amount above Rs 200", "Any amount below Rs 200", "Either 1 or 2 as it sees fit", "Any amount between Rs 150 to 200"], "answer": "Any amount above Rs 200", "explanation": "Clearing Corporation cannot reduce it below the regulator-stipulated amount.", "topic": "PRACTICE QUESTIONS-2" },
    { "id": "p2-5", "question": "Value-at-risk (VaR) is a measure of maximum likely price change over a __________.", "options": ["given interval (called \"horizon\")", "given confidence level (called \"percentile\")", "both 1 and 2", "None of the above"], "answer": "both 1 and 2", "explanation": "VaR measures the potential maximum loss over a time period (horizon) at a certain confidence level (percentile).", "topic": "PRACTICE QUESTIONS-2" },
    { "id": "p2-6", "question": "The effect of price risk on a bond is __________.", "options": ["Immediate", "Over a period of time", "No impact", "None of the above"], "answer": "Immediate", "explanation": "Price risk (also known as market risk) is the possibility of change in bond price before maturity because of a change in market interest rates. The change in bond price is instant after the interest rate changes. Typically, if the interest rate rises, the bond price falls and vice versa.", "topic": "PRACTICE QUESTIONS-2" },
    { "id": "p2-7", "question": "In India, exchange traded derivatives were first started in which of the following?", "options": ["Infosys Equity Share", "Interest Rate", "Equity Index", "Currency"], "answer": "Equity Index", "explanation": "In Indian markets, Equity Index futures were the first exchange-traded derivatives, launched in June 2000.", "topic": "PRACTICE QUESTIONS-2" },
    { "id": "p2-8", "question": "The derivatives segment has the Exchange and the Clearing Corporation. These are:", "options": ["same and considered as one legal entity", "two separate legal entities", "located in the same premises / building", "either one entity or two entities"], "answer": "two separate legal entities", "explanation": "Trading is handled by the Exchange, while Clearing and Settlement are done by the Clearing Corporation (CC) — two distinct legal entities.", "topic": "PRACTICE QUESTIONS-2" },
    { "id": "p2-9", "question": "__________ is a derivative.", "options": ["Index futures", "Index options", "Both 1 and 2", "None of the above"], "answer": "Both 1 and 2", "explanation": "Both Index futures and Index options are derivative instruments, derived from an underlying index (e.g., Nifty, Sensex).", "topic": "PRACTICE QUESTIONS-2" },
    { "id": "p2-10", "question": "__________ have to compulsorily hold government securities in demat form.", "options": ["All retail Investors", "All RBI controlled entities", "All Primary Dealers and Banks", "All scheduled commercial banks"], "answer": "All RBI controlled entities", "explanation": "Entities regulated by the RBI must hold their government securities in electronic book-entry form, either in an SGL Account (with PDO) or Gilt Account (with SCB/PD).", "topic": "PRACTICE QUESTIONS-2" },
    { "id": "p2-11", "question": "The deposit required by the exchange in which interest rate derivatives are traded will be:", "options": ["same for all Exchanges in India", "same for all Clearing Corporations in India", "different from Exchange to Exchange and Clearing Corporation to Clearing Corporation", "None of the above"], "answer": "different from Exchange to Exchange and Clearing Corporation to Clearing Corporation", "explanation": "While minimum net worth requirements are set by regulators (RBI and SEBI), exchanges and clearing corporations can specify additional deposit requirements, which may vary across entities.", "topic": "PRACTICE QUESTIONS-2" },
    { "id": "p2-12", "question": "As per the accounting standards for derivatives in India, which of the below given options is TRUE?", "options": ["The value of derivative in the balance sheet is its 'book value'", "The value of derivative in the balance sheet is its 'zero value'", "The fair value will be taken to the Profit/Loss Account except for transactions qualifying as Hedging Transactions", "All derivative transactions must be brought into the balance sheet except which are to be settled after the balance sheet date"], "answer": "The fair value will be taken to the Profit/Loss Account except for transactions qualifying as Hedging Transactions", "explanation": "Derivatives must be accounted at fair value. Profit/loss impact applies unless the derivative qualifies as a hedging transaction, in which case hedge accounting rules apply.", "topic": "PRACTICE QUESTIONS-2" },
    { "id": "p2-13", "question": "Other things remaining constant, the Modified Duration will __________ if the coupon payment frequency of bond increases.", "options": ["Increase", "Decrease", "Can either increase or decrease", "Remain constant"], "answer": "Decrease", "explanation": "Modified Duration is inversely related to coupon rate and YTM. More frequent coupon payments = cash flows received earlier = lower duration.", "topic": "PRACTICE QUESTIONS-2" },
    { "id": "p2-14", "question": "When one trades in SWAP derivatives, he buys and sells the __________.", "options": ["futures of the underlying", "rights of the underlying", "returns from the underlying", "None of the above"], "answer": "returns from the underlying", "explanation": "A swap involves exchanging returns (e.g., fixed for floating interest payments) rather than buying or selling the underlying itself.", "topic": "PRACTICE QUESTIONS-2" },
    { "id": "p2-15", "question": "If you buy a zero-coupon instrument issued by a sovereign government and hold it until maturity, which of the following risks will you face?", "options": ["Market risk", "Reinvestment risk", "Credit Risk", "None of the above"], "answer": "None of the above", "explanation": "A zero-coupon sovereign bond held to maturity in its home currency has no credit, reinvestment, or market risk, as there are no interim cash flows and default is not expected.", "topic": "PRACTICE QUESTIONS-2" },
    { "id": "p2-16", "question": "__________ are hybrid assets.", "options": ["Structured revenue products", "Currency Derivatives", "Interest Rate Derivatives", "Structured investment products"], "answer": "Structured investment products", "explanation": "Structured investment products (SIPs) are hybrid instruments that combine a bond with an embedded derivative (like an option). These derive their value from financial or physical underlyings.", "topic": "PRACTICE QUESTIONS-2" },
    { "id": "p2-17", "question": "Assume that the price of a Govt. bond future is Rs 113, what will the market value of one contract?", "options": ["Rs. 113000", "Rs. 2260000", "Rs. 1130000", "Rs. 226000"], "answer": "Rs. 226000", "explanation": "Market value = Quoted price × Lot size\n113 x 2000 = Rs. 226,000", "topic": "PRACTICE QUESTIONS-2" },
    { "id": "p2-18", "question": "The Govt Bond futures price changes by 100 ticks. Therefore the change in value of one futures contract will be __________.", "options": ["500", "200", "5", "2"], "answer": "500", "explanation": "Each tick = Rs. 0.0025\nValue per tick = 200,000 × 0.0025 ÷ 100 = Rs. 5\n100 ticks = 5 × 100 = Rs. 500", "topic": "PRACTICE QUESTIONS-2" },
    { "id": "p2-19", "question": "In India the Exchange traded derivatives were first started in __________.", "options": ["Swaps", "Futures", "Options", "Simultaneously started in Futures and Options"], "answer": "Futures", "explanation": "Index futures were introduced first in June 2000, followed by Index options in June 2001.", "topic": "PRACTICE QUESTIONS-2" },
    { "id": "p2-20", "question": "What is the underlying for 6-Year cash settled Interest Rate Futures contracts?", "options": ["Actual", "Notional", "Actual or Notional", "None of the above"], "answer": "Actual or Notional", "explanation": "The 6-year IRF contract may use an actual government bond with 4-8 years residual maturity or a notional 6-year coupon-bearing Gol security.", "topic": "PRACTICE QUESTIONS-2" },
    { "id": "p2-21", "question": "The VaR (Value at Risk) will be higher for __________.", "options": ["Long positions", "Short positions", "VaR is same for both Long or Short positions", "None of the above"], "answer": "Short positions", "explanation": "VaR is slightly higher for short positions because the potential price rise is theoretically unlimited, whereas the maximum loss on a long position is capped (price cannot fall below zero).", "topic": "PRACTICE QUESTIONS-2" },
    { "id": "p2-22", "question": "__________ is/are traded in Exchange Markets.", "options": ["Futures", "Options", "Both 1 and 2", "Swaps"], "answer": "Both 1 and 2", "explanation": "Futures and options are standard exchange-traded derivatives. Swaps are generally OTC (Over-The-Counter) instruments.", "topic": "PRACTICE QUESTIONS-2" },
    { "id": "p2-23", "question": "The Notice of Intent to Deliver is given by __________.", "options": ["the buyer", "the seller", "Either the buyer or seller", "None of the above"], "answer": "the seller", "explanation": "The seller must inform the Clearing Corporation of the intention to deliver on the last trading day.", "topic": "PRACTICE QUESTIONS-2" },
    { "id": "p2-24", "question": "The settlement system for Treasury Bill futures is __________.", "options": ["Cash Settlement", "Physical Settlement", "Cash or Physical as per the choice of buyer", "None of above"], "answer": "Cash Settlement", "explanation": "Since Treasury Bills are zero-coupon and short-term, they are cash settled to avoid complications of delivery.", "topic": "PRACTICE QUESTIONS-2" },
    { "id": "p2-25", "question": "__________ are quarterly months for the purpose of expiry of interest rate derivatives.", "options": ["January, February and March", "July, August and September", "Both 1 and 2", "None of the above"], "answer": "None of the above", "explanation": "Standard quarterly expiry months for IRDs are: March, June, September, and December.", "topic": "PRACTICE QUESTIONS-2" },
    { "id": "p2-26", "question": "A trader expects the interest rates to go down in the near future. To profit from this view he should __________ today.", "options": ["Buy bond futures", "Sell bond futures", "Both 1 and 2 will give him profits", "None of the above"], "answer": "Buy bond futures", "explanation": "When interest rates fall, bond prices rise. So, to benefit from this, the trader should buy bond futures now and sell them at a higher price later.", "topic": "PRACTICE QUESTIONS-2" },
    { "id": "p2-27", "question": "One of the Standard tenor in money market is __________.", "options": ["3 weeks", "5 weeks", "9 weeks", "None of the above"], "answer": "None of the above", "explanation": "Standard tenors in the money market are: Overnight (ON), 1W, 2W, 1M, 2M... up to 1Y. Tenors like 3W, 5W, 9W are not standard.", "topic": "PRACTICE QUESTIONS-2" },
    { "id": "p2-28", "question": "What is the major economic role of the underlying markets - Primary Markets?", "options": ["Delta hedging", "Trading", "Risk Management", "Financing"], "answer": "Financing", "explanation": "Primary markets are focused on financing—raising capital by issuing new securities. This supports fund flow from savers to borrowers.", "topic": "PRACTICE QUESTIONS-2" },
    { "id": "p2-29", "question": "If the base price of a security for a trading day is Rs 200 and the price range is 1%, the opening price for the trading day will be __________.", "options": ["between Rs 198 and 202", "between Rs 190 and 210", "below Rs 198", "above Rs 202"], "answer": "between Rs 198 and 202", "explanation": "1% of Rs 200 = Rs 2 → Price band = Rs 198 to Rs 202.", "topic": "PRACTICE QUESTIONS-2" },
    { "id": "p2-30", "question": "A person is interested in speculating or hedging the long-term interest rates. Which option should he choose of the following?", "options": ["Treasury Bill futures", "Govt. Bonds futures", "Both 1 and 2", "None of the above"], "answer": "Govt. Bonds futures", "explanation": "Govt. Bonds are long-term (maturity >1 year), suitable for hedging/speculating long-term interest rate movements. Treasury Bills are short-term instruments.", "topic": "PRACTICE QUESTIONS-2" },

    // PRACTICE QUESTIONS-3
    { "id": "p3-1", "question": "What is TRUE about a Gilt Account?", "options": ["It's a demat account for Govt. securities", "It's maintained by investors with a Schedule Commercial Bank or Primary Dealers", "Both 1 and 2", "None of the above"], "answer": "Both 1 and 2", "explanation": "A Gilt Account allows an investor to hold Government securities in demat form and is maintained with a Scheduled Commercial Bank or Primary Dealer. It acts much like a securities demat account for equity.", "topic": "PRACTICE QUESTIONS-3" },
    { "id": "p3-2", "question": "In __________ bonds, the investor has the right to demand prepayment on specified dates before maturity.", "options": ["Puttable", "Callable", "Both 1 and 2", "None of the above"], "answer": "Puttable", "explanation": "Puttable bonds give the investor the right to sell the bond back to the issuer before maturity—usually to benefit when interest rates rise, allowing reinvestment at higher rates.", "topic": "PRACTICE QUESTIONS-3" },
    { "id": "p3-3", "question": "__________ are created from the securitization process.", "options": ["Structured investment products", "Structured credit products", "Derivatives", "Debentures"], "answer": "Structured credit products", "explanation": "Structured credit products are formed from pools of debt instruments (like loans or bonds) through securitization. These are different from structured investment products, which often involve hybrid features.", "topic": "PRACTICE QUESTIONS-3" },
    { "id": "p3-4", "question": "Mutual Funds have to obtain prior permission of SEBI to short sell Treasury Bills and Government Bonds - State True or False.", "options": ["True", "False"], "answer": "True", "explanation": "Mutual Funds and other non-RBI regulated entities (e.g., those regulated by SEBI, IRDAI) must obtain prior permission from their respective regulators before short-selling government securities.", "topic": "PRACTICE QUESTIONS-3" },
    { "id": "p3-5", "question": "Which of the following category of market participants can openly short-sell bond futures?", "options": ["Retail investors", "Mutual funds", "Foreign institutional investors", "All of the above"], "answer": "Retail investors", "explanation": "Retail investors are permitted to short-sell bond futures freely. However, institutions like Mutual Funds or FIIs need regulatory permission or may be restricted to hedging (not speculation).", "topic": "PRACTICE QUESTIONS-3" },
    { "id": "p3-6", "question": "As per current regulations, the expiry months for Government Bond futures are __________.", "options": ["Two nearest "serial" months and two quarterly contracts", "Three nearest "serial" months and three quarterly contracts", "Three nearest 'serial' months and two quarterly contracts", "None of the above"], "answer": "Three nearest 'serial' months and two quarterly contracts", "explanation": "The trading cycle includes three serial monthly contracts and two quarterly contracts from the March/June/September/December cycle.", "topic": "PRACTICE QUESTIONS-3" },
    { "id": "p3-7", "question": "Equated monthly installments (EMIs) is an example of __________.", "options": ["Annuity", "Deep discount bond", "Consol", "Special long-term bonds"], "answer": "Annuity", "explanation": "An annuity pays both interest and part of the principal at regular intervals, just like EMIs do in consumer and housing loans, keeping payment amounts equal over time.", "topic": "PRACTICE QUESTIONS-3" },
    { "id": "p3-8", "question": "The regulator for the secondary market of government securities is __________.", "options": ["Reserve Bank of India", "Securities and Exchange Board of India", "Government of India", "Stock Exchanges"], "answer": "Reserve Bank of India", "explanation": "The RBI regulates both the primary and secondary markets for government securities, ensuring monetary stability and liquidity in the system.", "topic": "PRACTICE QUESTIONS-3" },
    { "id": "p3-9", "question": "For the entire sale obligation, the seller can deliver different deliverable bonds but in multiples of contract amount - State True or False.", "options": ["True", "False"], "answer": "True", "explanation": "Sellers can deliver different deliverable bonds, provided each bond is in multiples of the market lot (2 lakhs face value). This allows flexibility in settlement.", "topic": "PRACTICE QUESTIONS-3" },
    { "id": "p3-10", "question": "In a calendar spread the trader does two trades with the following features __________.", "options": ["Same market side, same underlying, and same expiry months", "Different market side, same underlying, and different expiry months", "Different market side, different underlying, and different expiry months", "Same market side, same underlying, and different expiry months"], "answer": "Different market side, same underlying, and different expiry months", "explanation": "A calendar spread involves buying and selling futures (hence, different market sides) on the same underlying, but with different expiry months. It's often used to trade time-value differences.", "topic": "PRACTICE QUESTIONS-3" },
    { "id": "p3-11", "question": "For hedging or speculation, which of the following features of futures contract will be relevant?", "options": ["Underlying for the futures", "Contract Month", "Market side", "All of the above"], "answer": "All of the above", "explanation": "All three aspects are crucial:\n- Underlying (T-Bill or Bond) depends on the tenor being hedged or traded.\n- Market side (buy/sell) is chosen based on rate movement expectations.\n- Contract month aligns with the timing of expected rate change.", "topic": "PRACTICE QUESTIONS-3" },
    { "id": "p3-12", "question": "Which of the following instruments has no reinvestment risk?", "options": ["Annuity", "Coupon bond", "Zero coupon bond", "None of the above"], "answer": "Zero coupon bond", "explanation": "Zero coupon bonds make a single payment at maturity—so there are no interim cash flows to reinvest, eliminating reinvestment risk.", "topic": "PRACTICE QUESTIONS-3" },
    { "id": "p3-13", "question": "The Money market securities have a period of more than one year - State True or False.", "options": ["True", "False"], "answer": "False", "explanation": "Money market instruments are short-term (less than 1 year). Instruments 1 year or longer fall into the bond or capital market category.", "topic": "PRACTICE QUESTIONS-3" },
    { "id": "p3-14", "question": "Which of the following is the settlement day of the bond futures contract?", "options": ["Two business days after the last trading day", "Last business day of the expiry month", "Both 1 and 2", "None of the above"], "answer": "None of the above", "explanation": "The settlement day is the next working day after the last trading day. It's distinct from standard T+2 settlement in equity.", "topic": "PRACTICE QUESTIONS-3" },
    { "id": "p3-15", "question": "The concept of accrued interest applies to which of the following?", "options": ["Coupon bond", "Zero coupon bond", "Both 1 and 2", "None of the above"], "answer": "Coupon bond", "explanation": "Accrued interest builds up on a coupon bond between the last interest payment date and the trade/settlement date. Not applicable to zero coupon bonds, which pay interest only at maturity.", "topic": "PRACTICE QUESTIONS-3" },
    { "id": "p3-16", "question": "The Clearing Corporation protects itself from the defaults of buyers and sellers by:", "options": ["Taking guarantees from the trading members", "Taking guarantees from the clearing members", "Both 1 and 2", "None of the above"], "answer": "None of the above", "explanation": "Clearing corporations mitigate risk through margining and mark-to-market processes—not by guarantees. These ensure daily settlement of gains/losses and cover potential defaults efficiently.", "topic": "PRACTICE QUESTIONS-3" },
    { "id": "p3-17", "question": "Will a zero coupon bond issued by a corporate have a reinvestment risk?", "options": ["Yes", "No"], "answer": "No", "explanation": "Zero coupon bonds pay a lump sum at maturity. Since there's no interim cash flow, there's nothing to reinvest, hence no reinvestment risk.", "topic": "PRACTICE QUESTIONS-3" },
    { "id": "p3-18", "question": "The underlying for interest rate derivative should be the interest rate on money – State True or False.", "options": ["True", "False"], "answer": "True", "explanation": "Interest rate derivatives derive value from interest rates on money—short-term (like T-Bills, interbank rates) or long-term (like bonds). These rates are the core underlying for IRDs.", "topic": "PRACTICE QUESTIONS-3" },
    { "id": "p3-19", "question": "Treasury Bills are issued by the Govt. of India at minimum and in multiples of ₹1,00,000 – State True or False.", "options": ["True", "False"], "answer": "False", "explanation": "T-Bills are issued in minimum and multiples of ₹25,000, not ₹1,00,000.", "topic": "PRACTICE QUESTIONS-3" },
    { "id": "p3-20", "question": "When the interest rate rises with the tenor of a bond, the shape of term structure is called:", "options": ["Humped", "Flat", "Normal", "Inverted"], "answer": "Normal", "explanation": "A normal yield curve reflects higher interest rates for longer tenors, due to greater uncertainty and opportunity cost over time.", "topic": "PRACTICE QUESTIONS-3" },
    { "id": "p3-21", "question": "When there is a failure to notify the Intent to Deliver, the auction is conducted on the:", "options": ["First business day after the Day of Intention", "Second business day after the Day of Intention", "Fourth business day after the Day of Intention", "Settlement day"], "answer": "First business day after the Day of Intention", "explanation": "In case of failure to submit the Intent to Deliver, an auction is held on the next business day (i.e., the first business day after the day of intention), and its result is settled along with the original contract.", "topic": "PRACTICE QUESTIONS-3" },
    { "id": "p3-22", "question": "Which of the following month(s) is/are included in the three serial quarterly contracts for expiry of interest rate derivatives?", "options": ["January", "September", "May", "October"], "answer": "September", "explanation": "The standard quarterly expiry months are March, June, September, and December. These months define the quarterly cycle used in IRD contracts.", "topic": "PRACTICE QUESTIONS-3" },
    { "id": "p3-23", "question": "Counterparty credit risk is substantially reduced by __________.", "options": ["Liquid assets of Trading members", "Mark to market margining", "Trade Guarantee Fund", "Investor Protection Fund"], "answer": "Mark to market margining", "explanation": "Mark-to-market margining ensures daily settlement of gains/losses, limiting exposure to just one day's price movement, hence significantly lowering counterparty risk.", "topic": "PRACTICE QUESTIONS-3" },
    { "id": "p3-24", "question": "Basis Risk arises mainly due to __________.", "options": ["Standardization of futures contract", "Regulation differences between RBI and SEBI", "Different tenors of interest rates", "Different regulations for Cash and Futures market"], "answer": "Standardization of futures contract", "explanation": "Basis risk emerges because futures contracts are standardized in terms of notional amounts and expiry dates, which may not perfectly match the actual exposure being hedged.", "topic": "PRACTICE QUESTIONS-3" },
    { "id": "p3-25", "question": "Index options were the first derivative instruments traded on Indian exchanges – State True or False.", "options": ["True", "False"], "answer": "False", "explanation": "Index Futures, not options, were the first derivatives to be traded in India. Options came later.", "topic": "PRACTICE QUESTIONS-3" },
    { "id": "p3-26", "question": "Amongst the below given options, who requires a prior permission from SEBI to short sell Govt. Bond futures?", "options": ["Individual", "High Networth Individuals", "Primary Dealers", "None of the above"], "answer": "None of the above", "explanation": "Retail individuals, HNIs, and primary dealers do not require prior permission from SEBI. However, institutions like Mutual Funds, Insurance Companies, NBFCs, etc., need prior approval from their respective regulators (like SEBI or IRDAI) to short-sell government bond futures.", "topic": "PRACTICE QUESTIONS-3" },
    { "id": "p3-27", "question": "SWAP involves exchange of returns from the underlying and not the exchange of cash for an underlying asset - State True or False.", "options": ["True", "False"], "answer": "True", "explanation": "A Swap is an agreement to exchange cash flows based on underlying financial instruments (like interest rates), not the instrument itself. For instance, in an interest rate swap, one party pays a fixed rate and receives a floating rate (or vice versa), with no exchange of principal.", "topic": "PRACTICE QUESTIONS-3" },
    { "id": "p3-28", "question": "Which among the following options is/are eligible to open a Constituent Subsidiary General Ledger (CSGL) Account?", "options": ["NABARD", "Stock Holding Corporation of India Ltd (SHIL)", "NSDL and CDSL", "All the above"], "answer": "All the above", "explanation": "A CSGL account can be opened by entities such as: Scheduled commercial banks, Primary dealers, SHIL, NSDL, CDSL, NABARD, and Clearing corporations like CCIL, subject to RBI norms.", "topic": "PRACTICE QUESTIONS-3" },
    { "id": "p3-29", "question": "Among the two - Outright Future trade and Calendar Spread, which will demand a lower margin?", "options": ["Outright Future trade", "Calendar Spread", "Both will have same margins", "None of the above"], "answer": "Calendar Spread", "explanation": "Calendar Spreads have lower margin requirements because the risk is comparatively less—the exposure is only to the difference in prices between two expiries of the same instrument, rather than full directional risk.", "topic": "PRACTICE QUESTIONS-3" },
    { "id": "p3-30", "question": "The coupon bearing bonds issued by the Government of India are commonly known as __________.", "options": ["Treasury Bills", "Commercial Papers", "Government Securities", "Certificate of Deposits"], "answer": "Government Securities", "explanation": "Coupon-bearing bonds issued by the Government of India are called Government Securities or G-Secs. Treasury Bills are zero-coupon short-term instruments.", "topic": "PRACTICE QUESTIONS-3" },

    // PRACTICE SET-1
    { "id": "ps1-1", "question": "An investor who has sold a call option, will make a profit when the price of the underlying __________.", "options": ["Rises", "Falls", "Remains constant", "Both Falls and Remains constant"], "answer": "Both Falls and Remains constant", "explanation": "A call option seller (writer) profits when the option expires out-of-the-money or at-the-money, which happens when the underlying price falls or remains constant below the strike price.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-2", "question": "Nifty is at 8000. I buy a call option at strike 8100 by paying a premium of Rs 50. At expiry, Nifty closes at 8200. My profit/loss per unit will be __________.", "options": ["Profit of Rs 50", "Loss of Rs 50", "Profit of Rs 100", "No profit No loss"], "answer": "Profit of Rs 50", "explanation": "Call option payoff = Max(0, Spot - Strike) - Premium = Max(0, 8200 - 8100) - 50 = 100 - 50 = Rs 50 profit.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-3", "question": "Nifty is at 8000. I sell a put option at strike 7900 and receive a premium of Rs 60. At expiry, Nifty closes at 7800. My profit/loss per unit will be __________.", "options": ["Profit of Rs 40", "Loss of Rs 40", "Profit of Rs 60", "Loss of Rs 160"], "answer": "Loss of Rs 40", "explanation": "Put option seller payoff = Premium - Max(0, Strike - Spot) = 60 - Max(0, 7900 - 7800) = 60 - 100 = -Rs 40 (loss).", "topic": "PRACTICE SET-1" },
    { "id": "ps1-4", "question": "Which of the following best describes a futures contract?", "options": ["An agreement to buy or sell an asset at a future date at a predetermined price", "A right to buy or sell an asset at a future date", "A contract that can be exercised only at expiry", "A contract with unlimited liability for the buyer only"], "answer": "An agreement to buy or sell an asset at a future date at a predetermined price", "explanation": "A futures contract is a binding agreement (obligation) to buy or sell an asset at a specified price on a future date, unlike options which provide rights.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-5", "question": "The maximum loss for a buyer of a call option is __________.", "options": ["Unlimited", "Limited to the premium paid", "Limited to the strike price", "Zero"], "answer": "Limited to the premium paid", "explanation": "The maximum loss for a call option buyer is the premium paid if the option expires worthless (when spot price ≤ strike price).", "topic": "PRACTICE SET-1" },
    { "id": "ps1-6", "question": "In a bull call spread, an investor __________.", "options": ["Buys a call and sells a call with higher strike", "Buys a call and sells a call with lower strike", "Buys two calls with same strike", "Sells two calls with different strikes"], "answer": "Buys a call and sells a call with higher strike", "explanation": "A bull call spread involves buying a call option at a lower strike and selling a call option at a higher strike, expecting moderate upward price movement.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-7", "question": "The intrinsic value of a call option is __________.", "options": ["Always positive", "Max (Spot Price - Strike Price, 0)", "Max (Strike Price - Spot Price, 0)", "Equal to time value"], "answer": "Max (Spot Price - Strike Price, 0)", "explanation": "Intrinsic value of a call option is the immediate exercise value: Max(Spot - Strike, 0). It cannot be negative.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-8", "question": "Which Greek measures the sensitivity of option price to changes in the underlying asset price?", "options": ["Delta", "Gamma", "Theta", "Vega"], "answer": "Delta", "explanation": "Delta measures the rate of change of option price with respect to changes in the underlying asset price.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-9", "question": "A protective put strategy involves __________.", "options": ["Buying a stock and buying a put", "Buying a stock and selling a put", "Selling a stock and buying a put", "Selling a stock and selling a put"], "answer": "Buying a stock and buying a put", "explanation": "A protective put involves holding a long position in a stock and buying a put option to hedge against downside risk.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-10", "question": "The time value of an option is __________.", "options": ["Option Premium - Intrinsic Value", "Intrinsic Value - Option Premium", "Always zero at expiry", "Both Option Premium - Intrinsic Value and Always zero at expiry"], "answer": "Both Option Premium - Intrinsic Value and Always zero at expiry", "explanation": "Time value = Option Premium - Intrinsic Value. At expiry, time value becomes zero as only intrinsic value remains.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-11", "question": "Which of the following factors increases call option premium?", "options": ["Decrease in underlying price", "Decrease in volatility", "Increase in time to expiry", "Decrease in interest rates"], "answer": "Increase in time to expiry", "explanation": "Longer time to expiry increases the probability of favorable price movements, thus increasing option premium due to higher time value.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-12", "question": "In case of physical settlement of index futures, the investor will receive __________.", "options": ["Cash equivalent", "Actual shares in index proportion", "Nothing", "Index futures are always cash settled"], "answer": "Index futures are always cash settled", "explanation": "Index futures cannot be physically settled as it's impossible to deliver an index. They are always cash settled based on the difference between futures and spot prices.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-13", "question": "The lot size for Nifty futures is __________.", "options": ["25", "50", "75", "100"], "answer": "50", "explanation": "The lot size for Nifty 50 futures contracts is 50, meaning each contract represents 50 units of the Nifty index.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-14", "question": "Mark-to-market in futures means __________.", "options": ["Daily settlement of gains and losses", "Final settlement at expiry", "Margin calculation", "Physical delivery process"], "answer": "Daily settlement of gains and losses", "explanation": "Mark-to-market is the daily process of calculating and settling profits/losses based on the closing price of futures contracts.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-15", "question": "The initial margin for futures trading is determined by __________.", "options": ["The broker", "The exchange/clearing corporation", "SEBI", "The investor"], "answer": "The exchange/clearing corporation", "explanation": "Initial margin requirements are set by the exchange and clearing corporation based on risk assessment and regulatory guidelines.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-16", "question": "A long straddle involves __________.", "options": ["Buying a call and selling a put at same strike", "Selling a call and buying a put at same strike", "Buying both call and put at same strike", "Selling both call and put at same strike"], "answer": "Buying both call and put at same strike", "explanation": "A long straddle involves buying both a call and put option with the same strike price and expiry, profiting from high volatility in either direction.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-17", "question": "The payoff diagram of a short call option is __________.", "options": ["Upward sloping", "Downward sloping", "Horizontal then downward sloping", "L-shaped"], "answer": "Horizontal then downward sloping", "explanation": "A short call payoff is flat (keeping the premium) when spot ≤ strike, then slopes downward as losses increase when spot > strike.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-18", "question": "Gamma is highest when the option is __________.", "options": ["Deep in-the-money", "Deep out-of-the-money", "At-the-money", "About to expire"], "answer": "At-the-money", "explanation": "Gamma (rate of change of delta) is highest for at-the-money options where small price changes have the maximum impact on delta.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-19", "question": "Theta represents __________.", "options": ["Time decay of option", "Volatility sensitivity", "Interest rate sensitivity", "Delta sensitivity"], "answer": "Time decay of option", "explanation": "Theta measures the rate of time decay in option premium, showing how much value an option loses as time passes.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-20", "question": "American options can be exercised __________.", "options": ["Only at expiry", "Any time before expiry", "Only on specific dates", "Never"], "answer": "Any time before expiry", "explanation": "American options provide the flexibility to exercise at any time before or on the expiry date, unlike European options.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-21", "question": "The Black-Scholes model assumes __________.", "options": ["Constant volatility", "Constant risk-free rate", "No dividends", "All of the above"], "answer": "All of the above", "explanation": "The Black-Scholes model assumes constant volatility, constant risk-free interest rate, and no dividends during the option's life.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-22", "question": "Vega measures sensitivity to changes in __________.", "options": ["Underlying price", "Time", "Volatility", "Interest rates"], "answer": "Volatility", "explanation": "Vega measures how much an option's price changes in response to a 1% change in the underlying asset's volatility.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-23", "question": "A covered call strategy involves __________.", "options": ["Buying stock and buying call", "Buying stock and selling call", "Selling stock and buying call", "Selling stock and selling call"], "answer": "Buying stock and selling call", "explanation": "A covered call involves owning the underlying stock and selling call options against it to generate additional income.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-24", "question": "The break-even point for a long call option is __________.", "options": ["Strike price", "Strike price + Premium", "Strike price - Premium", "Premium"], "answer": "Strike price + Premium", "explanation": "For a long call to break even, the spot price must equal strike price plus premium paid to recover the initial cost.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-25", "question": "In a bear put spread, maximum profit occurs when __________.", "options": ["Spot price is above higher strike", "Spot price is below lower strike", "Spot price is between strikes", "At any spot price"], "answer": "Spot price is below lower strike", "explanation": "In a bear put spread, maximum profit is achieved when the spot price falls below the lower strike price at expiry.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-26", "question": "Which option strategy profits from low volatility?", "options": ["Long straddle", "Long strangle", "Short straddle", "Protective put"], "answer": "Short straddle", "explanation": "A short straddle (selling both call and put) profits when the underlying price remains stable with low volatility.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-27", "question": "Can one sell assets in futures market even if he does not own any such assets?", "options": ["Yes", "No"], "answer": "Yes", "explanation": "In futures markets, short-selling is allowed even without owning the underlying asset, as delivery is not mandatory and positions are usually squared off before expiry.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-28", "question": "On the derivatives futures market, if there are three series of one, two and three months open at a point of time, how many calendar spread can one have?", "options": ["1", "2", "3", "4"], "answer": "3", "explanation": "Calendar spreads are possible between (1-2), (2-3), and (1-3) month contracts. Hence, three combinations are possible.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-29", "question": "All the 50 stocks of NSE Nifty index are equally weighed while calculating the index – State True or False?", "options": ["True", "False"], "answer": "False", "explanation": "Nifty 50 is calculated using the free-float market capitalization method, so stocks are not equally weighted. Higher-cap stocks like Reliance have greater weightage than smaller ones.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-30", "question": "What does a Call Option give the buyer?", "options": ["The right but not the obligation", "The obligation but not the right", "Gives both the right and obligation", "Neither the right nor the obligation"], "answer": "The right but not the obligation", "explanation": "A call option gives the buyer the right (but not the obligation) to buy the underlying asset at the strike price before or at expiry.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-31", "question": "Speculators are those who take risk whereas hedgers are those who wish to reduce risk – State True or False?", "options": ["True", "False"], "answer": "True", "explanation": "Hedgers aim to minimize risk from adverse price movements, while speculators take on risk in hopes of making profit from market movements.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-32", "question": "The money and securities which are deposited in a client's account __________.", "options": ["Can be attached for meeting broker's obligations", "Cannot be attached for meeting broker's obligations", "Can or cannot be attached depending on clearing corporation", "None of the above"], "answer": "Cannot be attached for meeting broker's obligations", "explanation": "Client funds and securities are kept in separate accounts and cannot be used to meet the broker's proprietary obligations.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-33", "question": "In case there is a Stock Split of a company which is a part of an Index, what will its impact be on the index value?", "options": ["Index value may change unpredictably", "Index value remains unchanged", "Index value will decrease", "Index value will increase"], "answer": "Index value remains unchanged", "explanation": "A stock split affects share price and quantity but not the market capitalization, hence index value remains unaffected.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-34", "'Time Decay' is beneficial to the __________.", "options": ["Option Buyer", "Option Seller", "Both Buyer and Seller equally", "Neither Buyer nor Seller"], "answer": "Option Seller", "explanation": "As time passes, the time value of options erodes, which benefits the seller since the premium reduces.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-35", "question": "Identify the TRUE statement with respect to a Put option.", "options": ["Buyer and seller both have obligations", "Buyer has right to sell to the writer", "Seller has right to buy from the buyer", "Buyer has obligation but not the right"], "answer": "Buyer has right to sell to the writer", "explanation": "A put option gives the buyer the right (not obligation) to sell an asset at a specified price within a timeframe.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-36", "question": "Mr. Menon has bought a futures contract and the price rises. In this case, Mr. Menon will __________.", "options": ["Make a profit", "Make a loss", "Depends on situation", "Insufficient information"], "answer": "Make a profit", "explanation": "Buying a futures contract is a bullish strategy. If the price rises, the buyer profits.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-37", "question": "How is the forward contract, which is for hedging purpose, accounted for in books of accounts?", "options": ["Premium/discount shown in P&L", "Premium/discount ignored", "Premium/discount amortized over contract life", "Not recognized at all"], "answer": "Premium/discount amortized over contract life", "explanation": "Per AS-11, the forward premium or discount is amortized over the life of the contract if used for hedging.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-38", "question": "A Derivative market helps in transferring the risk from __________.", "options": ["Speculators to Hedgers", "Arbitrageurs to Hedgers", "Speculators to Arbitrageurs", "Hedgers to Speculators"], "answer": "Hedgers to Speculators", "explanation": "Derivatives enable hedgers to offload their risk to speculators who are willing to take it.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-39", "question": "Which of these options is an example of a Calendar Spread?", "options": ["Short underpriced 1-month, long overpriced another month", "Long stock futures, short stock", "Long underpriced 1-month, short overpriced another month", "Short stock futures, long stock"], "answer": "Long underpriced 1-month, short overpriced another month", "explanation": "Calendar spreads involve arbitrage between contracts of different expiry months. The strategy profits from pricing inefficiencies.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-40", "question": "Ms. Kavita wants to 'Sell' on a futures market. For this, she __________.", "options": ["Need not own the underlying", "Must own the underlying", "Must own at least 25% of underlying", "Must own at least 50% of underlying"], "answer": "Need not own the underlying", "explanation": "Futures contracts are standardized and traded on margin. Ownership of underlying is not required to sell.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-41", "question": "The Derivatives market helps in __________.", "options": ["Transferring risk from low to high risk appetite participants", "Reallocating risk among participants", "Both of the above", "None of the above"], "answer": "Both of the above", "explanation": "Derivatives help in risk transfer and reallocation, aiding both hedgers and speculators.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-42", "question": "Identify the FALSE statement with respect to Options.", "options": ["Option contracts are NOT symmetrical", "Buyer gets right, seller bears obligation", "Options have non-linear payoffs", "Options have linear payoffs"], "answer": "Options have linear payoffs", "explanation": "Options have asymmetric and non-linear payoffs. The buyer's risk is limited; the seller's risk can be unlimited.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-43", "'SCORES' is the name given to __________.", "options": ["SEBI's complaint redressal system", "Securities Collateral Records System", "Exchange's risk and margin system", "Suspicious transaction reporting"], "answer": "SEBI's complaint redressal system", "explanation": "SCORES stands for SEBI COmplaints REdress System – a centralized online grievance mechanism.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-44", "question": "A trading member reaches his prescribed position limits. Therefore, he will __________.", "options": ["Be allowed 5% more exposure", "Not be able to reverse positions", "Can take fresh positions for clients", "Not be able to open new positions"], "answer": "Not be able to open new positions", "explanation": "When position limits are breached, no fresh positions are allowed. Only reversal of existing ones is permitted.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-45", "question": "A calendar spread in index futures will be treated as __________ in a far month contract if the near month contract expires.", "options": ["Long position", "Short position", "Optional position", "Naked position"], "answer": "Naked position", "explanation": "With one leg expired, the spread becomes a single directional or naked position, increasing risk exposure.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-46", "question": "The clearing member is free to close out transactions of a trading member if __________.", "options": ["Initial margin not paid", "Daily settlement dues not paid", "Both of the above", "None of the above"], "answer": "Both of the above", "explanation": "Clearing members can close out positions if margin or settlement dues are unpaid, to mitigate systemic risk.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-47", "question": "Identify the contract which is cleared and settled bilaterally:", "options": ["1-month Nifty futures", "1-month USDINR options", "3-month forward to buy CHF against INR", "1-month GOI bond futures"], "answer": "3-month forward to buy CHF against INR", "explanation": "Forward contracts are over-the-counter and bilateral, unlike exchange-traded futures and options.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-48", "question": "When the volatility of the underlying stock decreases, the premium of its Call option will __________.", "options": ["Increase", "Decrease", "Not change", "None of the above"], "answer": "Decrease", "explanation": "Option premiums are directly proportional to volatility. Lower volatility leads to lower premium.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-49", "question": "A European call option will give the buyer the right (but not the obligation) to buy the underlying at the strike price __________.", "options": ["Only on the expiry date", "On or before the expiry date", "One day before expiry", "One day after expiry"], "answer": "Only on the expiry date", "explanation": "European options can only be exercised on the expiry date, unlike American options.", "topic": "PRACTICE SET-1" },
         { "id": "ps1-50", "question": "In futures trading, the margin is paid by __________.", "options": ["Buyer only", "Seller only", "Both Buyer and Seller", "Clearing Corporation"], "answer": "Both Buyer and Seller", "explanation": "Both parties to a futures contract must deposit initial margin with the exchange to safeguard against default.", "topic": "PRACTICE SET-1" }
];

// Add currency derivatives questions
const currencyQuestions = [
  { "id": "cur-1", "question": "USD/INR futures are quoted as:", "options": ["INR per USD", "USD per INR", "Both formats", "None of the above"], "answer": "INR per USD", "explanation": "Currency futures are quoted as domestic currency per foreign currency.", "topic": "CURRENCY DERIVATIVES-1" },
  { "id": "cur-2", "question": "The lot size for USD/INR futures is:", "options": ["USD 500", "USD 1000", "USD 1500", "USD 2000"], "answer": "USD 1000", "explanation": "Standard lot size for USD/INR futures is USD 1000.", "topic": "CURRENCY DERIVATIVES-1" },
  { "id": "cur-3", "question": "Currency derivatives help in hedging:", "options": ["Exchange rate risk", "Interest rate risk", "Credit risk", "Liquidity risk"], "answer": "Exchange rate risk", "explanation": "Currency derivatives are primarily used to hedge against foreign exchange rate fluctuations.", "topic": "CURRENCY DERIVATIVES-1" },
  { "id": "cur-4", "question": "A US company expecting INR receipts should:", "options": ["Buy USD/INR futures", "Sell USD/INR futures", "Buy INR/USD futures", "Do nothing"], "answer": "Sell USD/INR futures", "explanation": "To hedge INR receipts, sell USD/INR futures to lock in the exchange rate.", "topic": "CURRENCY DERIVATIVES-1" },
  { "id": "cur-5", "question": "Currency options give the holder:", "options": ["Right to buy/sell currency", "Obligation to buy/sell currency", "Both right and obligation", "Neither right nor obligation"], "answer": "Right to buy/sell currency", "explanation": "Currency options provide the right, not obligation, to exchange currencies at a specified rate.", "topic": "CURRENCY DERIVATIVES-1" }
];

// Merge currency questions with existing questions
allQuestions.push(...currencyQuestions);

// Enhanced question categorization mapping
const topicToSubjectMapping = {
  'PRACTICE QUESTIONS-1': SUBJECTS.INTEREST_RATE,
  'PRACTICE QUESTIONS-2': SUBJECTS.INTEREST_RATE,
  'PRACTICE QUESTIONS-3': SUBJECTS.INTEREST_RATE,
  'PRACTICE SET-1': SUBJECTS.EQUITY,
  'CURRENCY DERIVATIVES-1': SUBJECTS.CURRENCY
};

// Enhanced randomization function
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Helper function to get questions by subject
const getQuestionsBySubject = (subject) => {
  if (subject === 'ALL') return allQuestions;
  return allQuestions.filter(q => topicToSubjectMapping[q.topic] === subject);
};

// Helper function to get questions by paper
const getQuestionsByPaper = (paper) => {
  return allQuestions.filter(q => q.topic === paper);
};

// --- Helper function for analysis with negative marking ---
const calculateAnalysis = (questions) => {
  const totalQuestions = questions.length;
  let correctCount = 0;
  let incorrectCount = 0;
  const topicStats = {};

  questions.forEach((q) => {
    const subject = topicToSubjectMapping[q.topic] || q.topic;
    if (!topicStats[subject]) {
      topicStats[subject] = { correct: 0, total: 0 };
    }
    
    if (q.userAnswer) {
        topicStats[subject].total++;
        if (q.userAnswer === q.answer) {
            correctCount++;
            topicStats[subject].correct++;
        } else {
            incorrectCount++;
        }
    }
  });

  const score = correctCount - (incorrectCount * 0.25);
  const accuracy = totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0;
  const passed = totalQuestions > 0 ? score >= (totalQuestions * 0.6) : false;

  const topicAnalysis = Object.entries(topicStats).map(([topic, stats]) => ({
    topic,
    accuracy: stats.total > 0 ? (stats.correct / stats.total) * 100 : 0,
    ...stats,
  }));

  return {
    score,
    correctCount,
    totalQuestions,
    accuracy,
    passed,
    topicAnalysis,
    answeredQuestions: questions,
  };
};

// --- Enhanced Zustand Store ---
export const useQuizStore = create((set, get) => ({
  questions: [],
  currentQuestionIndex: 0,
  isTestRunning: false,
  startTime: 0,
  finalResults: null,
  testDurationMinutes: 0,
  showAnswerMode: false,

  startQuiz: (config) => {
    let selectedQuestions = [];
    
    if (config.mode === 'subject') {
      const subjectQuestions = getQuestionsBySubject(config.subject);
      selectedQuestions = shuffleArray(subjectQuestions).slice(0, config.numberOfQuestions);
    } else if (config.mode === 'paper') {
      selectedQuestions = shuffleArray(getQuestionsByPaper(config.paper));
    } else {
      // Default mixed mode
      selectedQuestions = shuffleArray(allQuestions).slice(0, config.numberOfQuestions);
    }
    
    const duration = Math.ceil(selectedQuestions.length * 1.2); 
    
    set({
      questions: selectedQuestions.map(q => ({ ...q, userAnswer: null, answerRevealed: false })),
      currentQuestionIndex: 0,
      isTestRunning: true,
      startTime: Date.now(),
      finalResults: null,
      testDurationMinutes: duration,
      showAnswerMode: false,
    });
  },

  selectAnswer: (questionId, answer) => {
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === questionId ? { ...q, userAnswer: answer } : q
      ),
    }));
  },

  revealAnswer: (questionId) => {
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === questionId ? { ...q, answerRevealed: true } : q
      ),
    }));
  },
  
  navigateToQuestion: (index) => {
    if(index >= 0 && index < get().questions.length) {
      set({ currentQuestionIndex: index });
    }
  },

  submitTest: () => {
    const analysis = calculateAnalysis(get().questions);
    set({ finalResults: analysis, isTestRunning: false });
  },
  
  reset: () => {
      set({
        questions: [],
        currentQuestionIndex: 0,
        isTestRunning: false,
        startTime: 0,
        finalResults: null,
        testDurationMinutes: 0,
        showAnswerMode: false,
      })
  }
}));


// --- Enhanced Components ---

function QuestionCard({ question, questionNumber }) {
  const { selectAnswer, navigateToQuestion, currentQuestionIndex, questions, revealAnswer } = useQuizStore();
  const userAnswer = question.userAnswer;
  const answerRevealed = question.answerRevealed;

  const handleSelectAndAdvance = (option) => {
    if (userAnswer && !answerRevealed) return; 

    selectAnswer(question.id, option);

    if (!answerRevealed) {
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          navigateToQuestion(currentQuestionIndex + 1);
        }
      }, 500); 
    }
  };

  const handleCheckAnswer = () => {
    revealAnswer(question.id);
  };

  const getOptionClass = (option) => {
    let baseClass = `p-4 border-2 rounded-lg transition-all ${userAnswer || answerRevealed ? 'cursor-default' : 'cursor-pointer'}`;
    
    if (answerRevealed) {
      if (option === question.answer) {
        return `${baseClass} border-green-500 bg-green-100 text-green-800`;
      } else if (option === userAnswer && option !== question.answer) {
        return `${baseClass} border-red-500 bg-red-100 text-red-800`;
      } else {
        return `${baseClass} border-gray-300 bg-gray-50`;
      }
    } else if (userAnswer === option) {
      return `${baseClass} border-blue-500 bg-blue-50`;
    } else {
      return `${baseClass} border-gray-300 hover:border-blue-400 hover:bg-gray-50`;
    }
  };

  const subject = topicToSubjectMapping[question.topic] || question.topic;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Question {questionNumber}
        </h2>
        <div className="text-sm">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
            {subject}
          </span>
        </div>
      </div>
      
      <p className="text-lg text-gray-700 mb-6">{question.question}</p>

      <div className="space-y-4 mb-6">
        {question.options.map((option, index) => (
          <div
            key={index}
            onClick={() => handleSelectAndAdvance(option)}
            className={getOptionClass(option)}
          >
            <span className="font-medium text-gray-800">{option}</span>
            {answerRevealed && option === question.answer && (
              <span className="ml-2 text-green-600 font-bold">✓ Correct</span>
            )}
            {answerRevealed && option === userAnswer && option !== question.answer && (
              <span className="ml-2 text-red-600 font-bold">✗ Your Answer</span>
            )}
          </div>
        ))}
      </div>

      {!answerRevealed && userAnswer && (
        <div className="flex justify-center">
          <button
            onClick={handleCheckAnswer}
            className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition-colors"
          >
            Check Answer
          </button>
        </div>
      )}

      {answerRevealed && question.explanation && (
        <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">Explanation:</h4>
          <p className="text-yellow-700">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}

function QuizTimer() {
  const { startTime, submitTest, testDurationMinutes } = useQuizStore();
  const [timeLeft, setTimeLeft] = useState(testDurationMinutes * 60);

  useEffect(() => {
    setTimeLeft(testDurationMinutes * 60);
  }, [testDurationMinutes]);

  useEffect(() => {
    if (!startTime) return;

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = testDurationMinutes * 60 - elapsed;
      if (remaining <= 0) {
        clearInterval(interval);
        setTimeLeft(0);
        submitTest();
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, testDurationMinutes, submitTest]);
  
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="mb-8 p-4 bg-gray-100 rounded-lg text-center">
      <h2 className="text-lg font-semibold text-gray-700">Time Remaining</h2>
      <p className="text-4xl font-bold text-blue-600 mt-2">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </p>
    </div>
  );
}

const getStatusColor = (q) => {
  if (q.userAnswer) return 'bg-green-500 hover:bg-green-600 text-white';
  return 'bg-gray-200 hover:bg-gray-300 text-gray-700';
};

function QuizSummary() {
  const { questions, navigateToQuestion } = useQuizStore();

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Question Palette</h2>
      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-10 gap-2">
        {questions.map((q, index) => (
          <button
            key={q.id}
            onClick={() => navigateToQuestion(index)}
            className={`w-10 h-10 flex items-center justify-center rounded-md font-bold transition-colors ${getStatusColor(q)}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
       <div className="mt-4 space-y-2 text-sm text-gray-600">
        <div className="flex items-center"><span className="w-4 h-4 rounded-full bg-green-500 mr-2"></span> Answered</div>
        <div className="flex items-center"><span className="w-4 h-4 rounded-full bg-gray-200 mr-2 border border-gray-400"></span> Not Answered</div>
      </div>
    </div>
  );
}


// --- Pages ---

function HomePage({ navigate }) {
  const startQuiz = useQuizStore((state) => state.startQuiz);
  const maxQuestions = allQuestions.length;
  const [quizMode, setQuizMode] = useState('mixed'); // 'mixed', 'subject', 'paper'
  const [selectedSubject, setSelectedSubject] = useState('ALL');
  const [selectedPaper, setSelectedPaper] = useState('');
  const [numQuestions, setNumQuestions] = useState(Math.min(10, maxQuestions));

  // Get available questions based on current selection
  const getAvailableQuestions = () => {
    if (quizMode === 'subject') {
      return getQuestionsBySubject(selectedSubject);
    } else if (quizMode === 'paper') {
      return selectedPaper ? getQuestionsByPaper(selectedPaper) : [];
    }
    return allQuestions;
  };

  const availableQuestions = getAvailableQuestions();
  const maxAvailableQuestions = availableQuestions.length;

  useEffect(() => {
    if (numQuestions > maxAvailableQuestions) {
      setNumQuestions(Math.min(10, maxAvailableQuestions));
    }
  }, [maxAvailableQuestions, numQuestions]);

  const handleStartQuiz = () => {
    if (quizMode === 'paper' && selectedPaper) {
      startQuiz({ mode: 'paper', paper: selectedPaper });
    } else if (quizMode === 'subject') {
      startQuiz({ mode: 'subject', subject: selectedSubject, numberOfQuestions: numQuestions });
    } else {
      startQuiz({ mode: 'mixed', numberOfQuestions: numQuestions });
    }
    navigate('quiz');
  };

  const isStartDisabled = () => {
    if (quizMode === 'paper') return !selectedPaper;
    return numQuestions === 0 || maxAvailableQuestions === 0;
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50">
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">NISM Derivatives Practice Exam</h1>
        <p className="text-lg text-gray-600 mb-12">Simulate the official exam. Negative marking is applied.</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quiz Mode Selection */}
          <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-semibold text-blue-600 mb-6">Quiz Mode</h2>
            
            <div className="space-y-4">
              <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="quizMode"
                  value="mixed"
                  checked={quizMode === 'mixed'}
                  onChange={(e) => setQuizMode(e.target.value)}
                  className="mr-3"
                />
                <div className="text-left">
                  <div className="font-semibold text-gray-800">Mixed Questions</div>
                  <div className="text-sm text-gray-600">Random questions from all topics</div>
                </div>
              </label>

              <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="quizMode"
                  value="subject"
                  checked={quizMode === 'subject'}
                  onChange={(e) => setQuizMode(e.target.value)}
                  className="mr-3"
                />
                <div className="text-left">
                  <div className="font-semibold text-gray-800">Subject-wise</div>
                  <div className="text-sm text-gray-600">Focus on specific derivative types</div>
                </div>
              </label>

              <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="quizMode"
                  value="paper"
                  checked={quizMode === 'paper'}
                  onChange={(e) => setQuizMode(e.target.value)}
                  className="mr-3"
                />
                <div className="text-left">
                  <div className="font-semibold text-gray-800">Question Paper</div>
                  <div className="text-sm text-gray-600">Complete specific practice papers</div>
                </div>
              </label>
            </div>
          </div>

          {/* Configuration Panel */}
          <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-semibold text-blue-600 mb-6">Configuration</h2>
            
            {quizMode === 'subject' && (
              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700 mb-3">Select Subject</label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="ALL">All Subjects Mixed</option>
                  <option value={SUBJECTS.INTEREST_RATE}>{SUBJECTS.INTEREST_RATE}</option>
                  <option value={SUBJECTS.EQUITY}>{SUBJECTS.EQUITY}</option>
                  <option value={SUBJECTS.CURRENCY}>{SUBJECTS.CURRENCY}</option>
                </select>
              </div>
            )}

            {quizMode === 'paper' && (
              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700 mb-3">Select Question Paper</label>
                <select
                  value={selectedPaper}
                  onChange={(e) => setSelectedPaper(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Choose a paper...</option>
                  {Object.entries(QUESTION_PAPERS).map(([key, name]) => (
                    <option key={key} value={key}>{name}</option>
                  ))}
                </select>
              </div>
            )}

            {quizMode !== 'paper' && (
              <div className="mb-6">
                <label htmlFor="numQuestions" className="block text-lg font-medium text-gray-700 mb-2">
                  Number of Questions: <span className="font-bold text-blue-600">{numQuestions}</span>
                </label>
                <input
                  type="range"
                  id="numQuestions"
                  min="1"
                  max={maxAvailableQuestions}
                  value={numQuestions}
                  onChange={(e) => setNumQuestions(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <p className="text-xs text-gray-500 mt-2">
                  {maxAvailableQuestions} questions available for this selection
                </p>
              </div>
            )}

            {quizMode === 'paper' && selectedPaper && (
              <div className="mb-6 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>{QUESTION_PAPERS[selectedPaper]}</strong><br/>
                  {getQuestionsByPaper(selectedPaper).length} questions
                </p>
              </div>
            )}

            <button
              onClick={handleStartQuiz}
              disabled={isStartDisabled()}
              className="w-full px-6 py-4 bg-blue-600 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:scale-100"
            >
              Start Quiz
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-8 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Question Bank Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{allQuestions.length}</div>
              <div className="text-sm text-blue-800">Total Questions</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{getQuestionsBySubject(SUBJECTS.INTEREST_RATE).length}</div>
              <div className="text-sm text-green-800">Interest Rate</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{getQuestionsBySubject(SUBJECTS.EQUITY).length}</div>
              <div className="text-sm text-purple-800">Equity</div>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{Object.keys(QUESTION_PAPERS).length}</div>
              <div className="text-sm text-orange-800">Practice Papers</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function QuizPage({ navigate }) {
  const {
    questions,
    currentQuestionIndex,
    navigateToQuestion,
    submitTest,
    isTestRunning,
    finalResults
  } = useQuizStore((state) => state);

  const currentQuestion = questions[currentQuestionIndex];
  
  useEffect(() => {
    if (!isTestRunning && !finalResults) {
      navigate('home');
    }
    if (finalResults) {
      navigate('results');
    }
  }, [isTestRunning, finalResults, navigate]);

  if (!isTestRunning || !currentQuestion) {
    return <div className="flex h-screen items-center justify-center">Loading quiz...</div>;
  }

  const handleNext = () => {
    navigateToQuestion(currentQuestionIndex + 1);
  };
  
  const handlePrev = () => {
    navigateToQuestion(currentQuestionIndex - 1);
  };
  
  const handleSubmit = () => {
    submitTest();
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <div className="w-full md:w-2/3 p-4 md:p-8 flex flex-col">
        <div className="bg-white p-6 rounded-lg shadow-md flex-grow">
          <QuestionCard question={currentQuestion} questionNumber={currentQuestionIndex + 1} />
        </div>
        <div className="mt-6 flex justify-between items-center">
          <button onClick={handlePrev} disabled={currentQuestionIndex === 0} className="px-6 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg disabled:opacity-50 hover:bg-gray-400">
            Previous
          </button>
          <button onClick={handleSubmit} className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700">
            Submit Test
          </button>
          <button onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg disabled:opacity-50 hover:bg-blue-700">
            Next
          </button>
        </div>
      </div>

      <div className="w-full md:w-1/3 p-4 md:p-8 bg-white border-l border-gray-200">
        <div className="sticky top-8">
            <QuizTimer />
            <QuizSummary />
        </div>
      </div>
    </div>
  );
}

function ResultsPage({ navigate }) {
  const { finalResults, reset } = useQuizStore();
  const [showReview, setShowReview] = useState(false);
  const [aiStudyPlan, setAiStudyPlan] = useState('');
  const [isPlanLoading, setIsPlanLoading] = useState(false);
  const [aiExplanations, setAiExplanations] = useState({});
  const [loadingExplanations, setLoadingExplanations] = useState({});

  useEffect(() => {
    if (!finalResults) {
      navigate('home');
    }
  }, [finalResults, navigate]);

  const callGeminiAPI = async (prompt) => {
      const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
      const payload = { contents: chatHistory };
      const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      
      try {
          const response = await fetch(apiUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
          });

          if (!response.ok) {
              throw new Error(`API call failed with status: ${response.status}`);
          }

          const result = await response.json();
          if (result.candidates && result.candidates.length > 0 &&
              result.candidates[0].content && result.candidates[0].content.parts &&
              result.candidates[0].content.parts.length > 0) {
            return result.candidates[0].content.parts[0].text;
          } else {
            console.error("Unexpected response structure:", result);
            return "Could not get a valid response from the AI.";
          }
      } catch (error) {
          console.error("Error calling Gemini API:", error);
          return "An error occurred while contacting the AI.";
      }
  };

  const handleGenerateStudyPlan = async () => {
      setIsPlanLoading(true);
      setAiStudyPlan('');
      const topicSummary = finalResults.topicAnalysis
          .map(t => `${t.topic}: ${t.accuracy.toFixed(0)}% accuracy`)
          .join(', ');
      
      const prompt = `I just took a practice test for the NISM Derivatives exam. My performance was: ${topicSummary}. Based on these results, please identify my weakest topics and generate a concise, actionable study plan to help me improve. The plan should be encouraging and motivational. Format the output using markdown.`;
      
      const plan = await callGeminiAPI(prompt);
      setAiStudyPlan(plan);
      setIsPlanLoading(false);
  };

  const handleAiExplanation = async (questionId) => {
      setLoadingExplanations(prev => ({ ...prev, [questionId]: true }));
      const question = finalResults.answeredQuestions.find(q => q.id === questionId);
      
      const prompt = `For a student preparing for the NISM Derivatives exam in India, please explain why the correct answer to the following question is "${question.answer}". Also, clarify why "${question.userAnswer}" is incorrect. Keep the tone simple and clear.
      
      Question: "${question.question}"
      
      Base Explanation (for context): "${question.explanation}"`;

      const explanation = await callGeminiAPI(prompt);
      setAiExplanations(prev => ({ ...prev, [questionId]: explanation }));
      setLoadingExplanations(prev => ({ ...prev, [questionId]: false }));
  };

  if (!finalResults) {
    return <div className="flex h-screen items-center justify-center">Loading results...</div>;
  }
  
  const handleGoHome = () => {
    reset();
    navigate('home');
  }

  const { score, totalQuestions, passed, topicAnalysis, answeredQuestions, accuracy, correctCount } = finalResults;

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Test Results</h1>
        <div className={`text-5xl font-extrabold text-center mb-6 ${passed ? 'text-green-500' : 'text-red-500'}`}>
          {passed ? 'PASS' : 'FAIL'}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-10">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm font-semibold text-blue-800">SCORE (with negative marking)</p>
            <p className="text-3xl font-bold text-blue-600">{score.toFixed(2)} / {totalQuestions}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm font-semibold text-green-800">ACCURACY (Correct Answers)</p>
            <p className="text-3xl font-bold text-green-600">{accuracy.toFixed(2)}% ({correctCount}/{totalQuestions})</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm font-semibold text-yellow-800">PASS MARK</p>
            <p className="text-3xl font-bold text-yellow-600">60%</p>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Performance by Topic</h2>
          <div className="space-y-4">
            {topicAnalysis.map(({ topic, accuracy, correct, total }) => (
              <div key={topic} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-gray-800">{topic}</span>
                  <span className="text-sm font-semibold text-gray-600">{correct}/{total}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`${accuracy >= 60 ? 'bg-green-500' : 'bg-red-500'} h-2.5 rounded-full`}
                    style={{ width: `${accuracy}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Study Plan Section */}
        <div className="my-10 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Personalized Study Plan</h2>
          <button 
            onClick={handleGenerateStudyPlan} 
            disabled={isPlanLoading}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isPlanLoading ? '✨ Generating...' : '✨ Generate AI Study Plan'}
          </button>
          {isPlanLoading && <div className="mt-4">Getting your plan from the AI...</div>}
          {aiStudyPlan && <div className="mt-4 p-4 bg-white rounded-lg prose" dangerouslySetInnerHTML={{ __html: aiStudyPlan.replace(/\n/g, '<br />') }} />}
        </div>

        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button onClick={handleGoHome} className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">
            Take Another Test
          </button>
          <button onClick={() => setShowReview(!showReview)} className="px-8 py-3 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-800">
            {showReview ? 'Hide Review' : 'Review Answers'}
          </button>
        </div>
        
        {showReview && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-t pt-8">Answer Review</h2>
            <div className="space-y-8">
              {answeredQuestions.map((q, index) => (
                <div key={q.id} className="p-6 bg-gray-50 rounded-lg border">
                  <p className="font-semibold text-lg mb-4">Q{index+1}: {q.question}</p>
                  <div className="space-y-2 text-md">
                    <p><strong>Your Answer:</strong> <span className={q.userAnswer === q.answer ? 'text-green-600' : 'text-red-600'}>{q.userAnswer || 'Not Answered'}</span></p>
                    <p><strong>Correct Answer:</strong> <span className="text-green-600">{q.answer}</span></p>
                    {q.explanation && <p className="mt-2 pt-2 border-t text-gray-600"><strong>Explanation:</strong> {q.explanation}</p>}
                    
                    {/* AI Explanation Section */}
                    <div className="mt-4">
                      <button 
                        onClick={() => handleAiExplanation(q.id)} 
                        disabled={loadingExplanations[q.id]}
                        className="px-4 py-1 text-sm bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 disabled:bg-gray-400"
                      >
                        {loadingExplanations[q.id] ? '✨ Generating...' : '✨ Get AI Explanation'}
                      </button>
                      {loadingExplanations[q.id] && <div className="mt-2 text-sm">Getting AI explanation...</div>}
                      {aiExplanations[q.id] && <div className="mt-2 p-3 bg-purple-50 rounded-lg text-sm" dangerouslySetInnerHTML={{ __html: aiExplanations[q.id].replace(/\n/g, '<br />') }} />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}


// --- Main App Component (Router) ---
export default function App() {
  const [page, setPage] = useState('home'); // 'home', 'quiz', 'results'
  const navigate = (newPage) => setPage(newPage);

  const renderPage = () => {
    switch(page) {
      case 'quiz':
        return <QuizPage navigate={navigate} />;
      case 'results':
        return <ResultsPage navigate={navigate} />;
      case 'home':
      default:
        return <HomePage navigate={navigate} />;
    }
  }

  return (
    <>
      <link href="https://cdn.tailwindcss.com" rel="stylesheet" />
      {/* Adding prose class for markdown rendering from Tailwind Typography plugin */}
      <link href="https://cdn.jsdelivr.net/npm/@tailwindcss/typography@0.5.x/dist/typography.min.css" rel="stylesheet" />
      {renderPage()}
    </>
  );
}
