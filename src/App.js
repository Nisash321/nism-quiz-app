import React, { useState, useEffect, useMemo } from 'react';
import { create } from 'zustand';

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
    { "id": "p1-8", "question": "One Basis Point is equal to:", "options": ["1%", "0.1%", "0.01%", "0.001%"], "answer": "0.01%", "explanation": "The change in YTM of 0.01% (or 0.0001) is called a basis point (BP) or “bip”.", "topic": "PRACTICE QUESTIONS-1" },
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
    { "id": "p1-24", "question": "Which of the following is a 'risk-free' security?", "options": ["Bank deposit", "Certificate of deposit", "Commercial paper", "None of the above"], "answer": "None of the above", "explanation": "Only Sovereign bonds issued by the government are considered “risk-free\" securities in terms of credit risk.", "topic": "PRACTICE QUESTIONS-1" },
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
    { "id": "p3-6", "question": "As per current regulations, the expiry months for Government Bond futures are __________.", "options": ["Two nearest “serial” months and two quarterly contracts", "Three nearest “serial” months and three quarterly contracts", "Three nearest 'serial' months and two quarterly contracts", "None of the above"], "answer": "Three nearest 'serial' months and two quarterly contracts", "explanation": "The trading cycle includes three serial monthly contracts and two quarterly contracts from the March/June/September/December cycle.", "topic": "PRACTICE QUESTIONS-3" },
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
    { "id": "p3-30", "question": "What will be the shape of the term structure if the long-term rate is 10% and the short-term rate is also 10%?", "options": ["Inverted", "Circular", "Flat", "Normal"], "answer": "Flat", "explanation": "When short-term and long-term interest rates are equal, the yield curve is flat, indicating no term premium for holding longer-term securities.", "topic": "PRACTICE QUESTIONS-3" },

    // PRACTICE QUESTIONS-4
    { "id": "p4-1", "question": "Which of the following statements is true about Limit Order?", "options": ["Guaranteed execution at the desired price", "Uncertain execution at the desired price", "Guaranteed execution at an uncertain price", "None of the above"], "answer": "Uncertain execution at the desired price", "explanation": "A limit order executes only if the market hits the limit price. If not, it remains unexecuted.", "topic": "PRACTICE QUESTIONS-4" },
    { "id": "p4-2", "question": "If you expect the interest rate will go up in future, today you should __________.", "options": ["Buy futures", "Sell futures", "Either 1 or 2", "None of the above"], "answer": "Sell futures", "explanation": "Interest rate increases cause bond prices (and futures) to fall, so selling now allows profit later.", "topic": "PRACTICE QUESTIONS-4" },
    { "id": "p4-3", "question": "What is the settlement method for 91-day bill futures?", "options": ["Cash", "Physical", "Can be cash or physical", "None of the above"], "answer": "Cash", "explanation": null, "topic": "PRACTICE QUESTIONS-4" },
    { "id": "p4-4", "question": "The short-term interest rate is determined by __________.", "options": ["Liquidity", "Inflation", "Capital expenditure by industry", "All of the above"], "answer": "Liquidity", "explanation": "Short-term rates are mainly impacted by liquidity conditions in the economy.", "topic": "PRACTICE QUESTIONS-4" },
    { "id": "p4-5", "question": "If both the long-term rate and short-term rate are 10%, the shape of term structure is __________.", "options": ["Flat", "Normal/positive", "Inverted/negative", "None of the above"], "answer": "Flat", "explanation": "Identical long- and short-term rates create a flat yield curve.", "topic": "PRACTICE QUESTIONS-4" },
    { "id": "p4-6", "question": "Conversion Factor will remain constant for a Delivery Month regardless of changes in yields over time - State True or False?", "options": ["True", "False"], "answer": "True", "explanation": "The conversion factor is fixed for each bond and does not change with market yields.", "topic": "PRACTICE QUESTIONS-4" },
    { "id": "p4-7", "question": "Which of the following statements is true for Netting?", "options": ["Proprietary trades are offset", "Buy and sell trades of the same client are offset", "Both (a) and (b)", "None of the above"], "answer": "Both (a) and (b)", "explanation": "Netting is allowed for both proprietary and individual client positions, separately.", "topic": "PRACTICE QUESTIONS-4" },
    { "id": "p4-8", "question": "For a 13-Year cash-settled Interest Rate Futures contract, the underlying is __________.", "options": ["Actual", "Notional", "Either Actual or Notional", "None of the above"], "answer": "Either Actual or Notional", "explanation": "The underlying can be either a real or notional 13-year Gol security.", "topic": "PRACTICE QUESTIONS-4" },
    { "id": "p4-9", "question": "Debt market forms a part of Equity Markets - State True or False?", "options": ["True", "False"], "answer": "False", "explanation": "Debt and equity markets are distinct segments of the capital market.", "topic": "PRACTICE QUESTIONS-4" },
    { "id": "p4-10", "question": "Which of the following has higher credit risk?", "options": ["Bond rated AAA", "Bond rated A", "Bond rated BBB", "All of them have same credit risk"], "answer": "Bond rated BBB", "explanation": "Lower ratings like BBB carry higher default risk than AAA or A.", "topic": "PRACTICE QUESTIONS-4" },
    { "id": "p4-11", "question": "Which of the following is a true measure of the realized return for a coupon bond?", "options": ["Yield-to-maturity", "Current yield", "Coupon", "None of the above"], "answer": "None of the above", "explanation": "Realized return depends on reinvestment rates and actual holding period, unlike approximations like YTM.", "topic": "PRACTICE QUESTIONS-4" },
    { "id": "p4-12", "question": "The underlying for 10-year bond futures under the current regulations can be theoretically:", "options": ["Actual bond", "Notional bond", "Both 1 and 2", "None of the above"], "answer": "Both 1 and 2", "explanation": "Regulations permit both actual and notional bonds within specified maturity bands.", "topic": "PRACTICE QUESTIONS-4" },
    { "id": "p4-13", "question": "If the spread between long-term rate and short-term rate has changed from +0.75% to +1.25%, the shift in term structure is __________.", "options": ["Flattening", "Steepening", "Parallel", "None of the above"], "answer": "Steepening", "explanation": "Increase in the LR-SR spread indicates steepening.", "topic": "PRACTICE QUESTIONS-4" },
    { "id": "p4-14", "question": "Which of the following risks can be hedged with T-Bill and T-Bond futures?", "options": ["Reinvestment risk", "Credit risk", "Both 1 and 2", "None of the above"], "answer": "Reinvestment risk", "explanation": "Futures hedge reinvestment risk, not credit risk, as T-bills/bonds are government-backed.", "topic": "PRACTICE QUESTIONS-4" },
    { "id": "p4-15", "question": "The futures hedge is exposed to __________.", "options": ["Basis risk", "Yield curve spread risk", "Both 1 and 2", "None of the above"], "answer": "Both 1 and 2", "explanation": "Futures face both price mismatch (basis) and curve spread changes over different tenors.", "topic": "PRACTICE QUESTIONS-4" },
    { "id": "p4-16", "question": "Exchange can further 'tighten' but cannot dilute the scope of SEBI Regulations - State True or False?", "options": ["True", "False"], "answer": "True", "explanation": "Exchanges can impose stricter rules, but not looser than SEBI norms.", "topic": "PRACTICE QUESTIONS-4" },
    { "id": "p4-17", "question": "Basis risk arises from __________.", "options": ["Differential price changes in the exposure and futures contract", "Mismatch between the amount of exposure and futures notional", "Mismatch between the maturity/expiry of exposure and futures contract", "All of the above"], "answer": "All of the above", "explanation": "All mentioned factors contribute to basis risk in futures contracts.", "topic": "PRACTICE QUESTIONS-4" },
    { "id": "p4-18", "question": "Which of the following correctly describes 'hedging'?", "options": ["Risk minimization", "Risk insurance", "Risk reduction", "Risk elimination"], "answer": "Risk elimination", "explanation": "Hedging ideally eliminates specific financial risks, not just reduces them.", "topic": "PRACTICE QUESTIONS-4" },
    { "id": "p4-19", "question": "If the base price of a security is Rs 100 and the price range is 1%, the opening price can be:", "options": ["Cannot be higher than 101", "Cannot be lower than 99", "Both 1 and 2 together", "None of the above"], "answer": "Both 1 and 2 together", "explanation": "The permitted range is Rs 99 to Rs 101 (i.e., ±1%).", "topic": "PRACTICE QUESTIONS-4" },
    { "id": "p4-20", "question": "Yield curve spread risk arises when the term structure shifts are not parallel but either steepening or flattening - State True or False?", "options": ["True", "False"], "answer": "True", "explanation": null, "topic": "PRACTICE QUESTIONS-4" },
    { "id": "p4-21", "question": "In India the last trading day and expiry day are one and the same for interest rate futures contract - State True or False?", "options": ["True", "False"], "answer": "True", "explanation": null, "topic": "PRACTICE QUESTIONS-4" },
    { "id": "p4-22", "question": "A bond is priced at Rs 300, YTM is 6.8%, and Modified Duration is 3. If YTM changes by 1%, price will change by __________.", "options": ["Rs 9", "Rs 3", "5.8%", "7.8%"], "answer": "Rs 9", "explanation": "Change = 300 × 3 × 1% = Rs 9.", "topic": "PRACTICE QUESTIONS-4" },
    { "id": "p4-23", "question": "Who sets the Extreme Loss Margin at Clearing Member level?", "options": ["The Stock Exchange", "SEBI", "Clearing Corporation", "Mark to Market Margining system"], "answer": "Clearing Corporation", "explanation": "The Clearing Corporation imposes ELM to safeguard against large adverse moves.", "topic": "PRACTICE QUESTIONS-4" },
    { "id": "p4-24", "question": "Position Limit is the limit on an investor's maximum daily volume - State True or False?", "options": ["True", "False"], "answer": "False", "explanation": "It applies to open interest, not trading volume.", "topic": "PRACTICE QUESTIONS-4" },
    { "id": "p4-25", "question": "A __________ trade will not lead to any profit or loss in future.", "options": ["Speculative", "Arbitrage", "Call option", "Hedge"], "answer": "Hedge", "explanation": null, "topic": "PRACTICE QUESTIONS-4" },
    { "id": "p4-26", "question": "What is the option on Interest Rate called?", "options": ["FRA", "FX option", "Equity option", "Interest rate option"], "answer": "Interest rate option", "explanation": null, "topic": "PRACTICE QUESTIONS-4" },
    { "id": "p4-27", "question": "The Stop Loss order requires a __________ price to be specified.", "options": ["Market", "Arbitrage", "Trigger", "Order cancel"], "answer": "Trigger", "explanation": "Trigger price activates the stop-loss order once hit.", "topic": "PRACTICE QUESTIONS-4" },
    { "id": "p4-28", "question": "Mr. Kiran is a Non-Resident and sees a drop in Indian rates. Can he short interest rate derivatives for speculation?", "options": ["Yes", "No"], "answer": "No", "explanation": "Non-residents can only short for hedging, not speculation.", "topic": "PRACTICE QUESTIONS-4" },
    { "id": "p4-29", "question": "As per Indian accounting standards, fair value gains/losses for hedging transactions go to P&L - True or False?", "options": ["True", "False"], "answer": "False", "explanation": "Hedging gains/losses are not taken to P&L under Indian GAAP.", "topic": "PRACTICE QUESTIONS-4" },
    { "id": "p4-30", "question": "A Normal shape of term structure means that rate is the same for all terms - True or False?", "options": ["True", "False"], "answer": "False", "explanation": "A normal yield curve shows higher rates for longer maturities.", "topic": "PRACTICE QUESTIONS-4" },

    // PRACTICE QUESTIONS-5
    { "id": "p5-1", "question": "Which of the following category of market participants can use interest rate derivatives?", "options": ["Retail investors", "Mutual funds", "Foreign institutional investors", "All of the above"], "answer": "All of the above", "explanation": "Residents can buy/sell for hedging and speculation. FIIs can use them within limits; regulated entities need permission.", "topic": "PRACTICE QUESTIONS-5" },
    { "id": "p5-2", "question": "Which of the following makes debt an essential component of capital?", "options": ["Tax-deductibility of interest expense", "Lower cost", "Both 1 and 2", "None of the above"], "answer": "Tax-deductibility of interest expense", "explanation": "Interest is tax-deductible, enhancing Return on Equity.", "topic": "PRACTICE QUESTIONS-5" },
    { "id": "p5-3", "question": "The 'fixed' in fixed-income securities implies that __________.", "options": ["Risk is fixed", "Cash flows timing is fixed", "Return is fixed", "All of the above"], "answer": "Cash flows timing is fixed", "explanation": "Timing is known; returns can vary due to market risks.", "topic": "PRACTICE QUESTIONS-5" },
    { "id": "p5-4", "question": "Custodian's role is to settle __________.", "options": ["Cash leg of the trade", "Securities leg of the trade", "Both 1 and 2", "None of the above"], "answer": "Both 1 and 2", "explanation": null, "topic": "PRACTICE QUESTIONS-5" },
    { "id": "p5-5", "question": "A Professional Clearing Member can __________.", "options": ["Execute trades", "Clear and Settle trade", "Both 1 and 2", "None of the above"], "answer": "Clear and Settle trade", "explanation": "They settle trades executed by others; cannot trade themselves.", "topic": "PRACTICE QUESTIONS-5" },
    { "id": "p5-6", "question": "Which of the following is the last trading day for Govt. bond futures?", "options": ["Two business days before the last business day of the Expiry Month", "Two business days after the first business day of the Expiry Month", "Seven business days before the last business day of the Expiry Month", "Last Thursday of Contract / Expiry Month"], "answer": "Last Thursday of Contract / Expiry Month", "explanation": null, "topic": "PRACTICE QUESTIONS-5" },
    { "id": "p5-7", "question": "Which of the following is the settlement day for 10-year bond futures?", "options": ["Last business day of the Expiry Month", "Two business days after the last trading day", "Both (a) and (b) above", "None of the above"], "answer": "None of the above", "explanation": "Settlement occurs on the next working day after the last trading day.", "topic": "PRACTICE QUESTIONS-5" },
    { "id": "p5-8", "question": "Yield-to-maturity (YTM) assumes which of the following?", "options": ["Term structure is flat", "Shift in the term structure is parallel", "Reinvestment rate is the same as YTM", "All of the above"], "answer": "Reinvestment rate is the same as YTM", "explanation": null, "topic": "PRACTICE QUESTIONS-5" },
    { "id": "p5-9", "question": "The regulator for the primary market of government securities is __________.", "options": ["RBI", "SEBI", "Stock Exchanges", "None of the above"], "answer": "RBI", "explanation": null, "topic": "PRACTICE QUESTIONS-5" },
    { "id": "p5-10", "question": "Which of the following is correct about the Conversion Factor?", "options": ["It adjusts the quantity of Deliverable Bond", "It adjusts the price of Deliverable Bond", "Both 1 and 2", "None of the above"], "answer": "It adjusts the price of Deliverable Bond", "explanation": null, "topic": "PRACTICE QUESTIONS-5" },
    { "id": "p5-11", "question": "Which of the following statements is true?", "options": ["Clearing precedes settlement", "Settlement precedes clearing", "Settlement precedes trade", "None of the above"], "answer": "Clearing precedes settlement", "explanation": null, "topic": "PRACTICE QUESTIONS-5" },
    { "id": "p5-12", "question": "Credit spread is the price of __________.", "options": ["Price risk", "Credit risk", "Reinvestment risk", "All of the above"], "answer": "Credit risk", "explanation": null, "topic": "PRACTICE QUESTIONS-5" },
    { "id": "p5-13", "question": "Which of the following bond pays interest in proportion to the prevailing market rate?", "options": ["Floater Bonds", "Zero-coupon bond", "Fixed-rate bond", "Inverse floater"], "answer": "Floater Bonds", "explanation": null, "topic": "PRACTICE QUESTIONS-5" },
    { "id": "p5-14", "question": "Which of the following entities is the registry for government securities?", "options": ["Public Debt Office (PDO), RBI", "National Securities Depository Ltd (NSDL)", "Central Depository Services (India) Ltd (CDSL)", "Both 2 and 3"], "answer": "Public Debt Office (PDO), RBI", "explanation": null, "topic": "PRACTICE QUESTIONS-5" },
    { "id": "p5-15", "question": "Inter-commodity spread consists of buying futures on one underlying and selling futures on another for different expiry month and for the same quantity – True or False?", "options": ["True", "False"], "answer": "False", "explanation": "It's for the same expiry month, not different.", "topic": "PRACTICE QUESTIONS-5" },
    { "id": "p5-16", "question": "The last trading day for Treasury Bill future contract is the Last Wednesday of Contract Month or the __________ day if it is a holiday.", "options": ["previous", "next", "either 1 or 2 as per Exchange decision", "Last trading cannot be changed"], "answer": "previous", "explanation": null, "topic": "PRACTICE QUESTIONS-5" },
    { "id": "p5-17", "question": "As per Macaulay Duration, for a 1% rise in interest rate, the price of 4 Year zero-coupon bond will fall by roughly __________.", "options": ["1%", "3%", "4%", "No change in price"], "answer": "4%", "explanation": null, "topic": "PRACTICE QUESTIONS-5" },
    { "id": "p5-18", "question": "Bond X and Bond Y are issued by the same issuer and have the same maturity. Bond X is priced at 98 and Bond Y at 101.50. Which of the two bonds is a better investment?", "options": ["Bond X", "Bond Y", "The one with the higher coupon", "Bonds cannot be judged based on their prices"], "answer": "Bonds cannot be judged based on their prices", "explanation": null, "topic": "PRACTICE QUESTIONS-5" },
    { "id": "p5-19", "question": "Amongst the below given options, which is TRUE for Subsidiary General Ledger (SGL) Account?", "options": ["Its a demat account for debt securities which is maintained with depositories", "It's a demat account for Govt. securities which is maintained with Public Debt Office (PDO), RBI.", "Its a demat account for Govt. securities which is maintained with SEBI", "None of the above"], "answer": "It's a demat account for Govt. securities which is maintained with Public Debt Office (PDO), RBI.", "explanation": null, "topic": "PRACTICE QUESTIONS-5" },
    { "id": "p5-20", "question": "Bond futures usually are settled as follows:", "options": ["Cash settlement", "Physical settlement", "Both 1 and 2", "None of the above"], "answer": "Both 1 and 2", "explanation": null, "topic": "PRACTICE QUESTIONS-5" },
    { "id": "p5-21", "question": "Mark-to-market margin is paid by __________.", "options": ["Buyer", "Seller", "Whichever party that have negative value on Open Position", "None of the above"], "answer": "Whichever party that have negative value on Open Position", "explanation": null, "topic": "PRACTICE QUESTIONS-5" },
    { "id": "p5-22", "question": "Which was the first exchange traded derivative to be introduced in the Indian markets?", "options": ["Equity Index options", "Single stock futures", "Currency futures", "Equity Index futures"], "answer": "Equity Index futures", "explanation": null, "topic": "PRACTICE QUESTIONS-5" },
    { "id": "p5-23", "question": "The stop-loss requires a trigger price to be specified, which should be lower than current market offer price for stop-loss buy order – True or False?", "options": ["True", "False"], "answer": "False", "explanation": null, "topic": "PRACTICE QUESTIONS-5" },
    { "id": "p5-24", "question": "Which of the following is the role of derivatives?", "options": ["Cash or liquidity management", "Financing", "Risk management", "All of the above"], "answer": "Risk management", "explanation": null, "topic": "PRACTICE QUESTIONS-5" },
    { "id": "p5-25", "question": "What is FRA?", "options": ["Its the futures on Interest Rate", "Its the forward on Interest Rate", "Its the Option on Interest Rate", "Its the Swap on Interest Rate"], "answer": "Its the forward on Interest Rate", "explanation": null, "topic": "PRACTICE QUESTIONS-5" },
    { "id": "p5-26", "question": "Futures contracts can be used to modify the exposure portfolio's Modified Duration in the following way/s:", "options": ["To increase portfolio's Modified Duration", "To decrease portfolio's Modified Duration", "Either (a) or (b)", "None of the above"], "answer": "Either (a) or (b)", "explanation": null, "topic": "PRACTICE QUESTIONS-5" },
    { "id": "p5-27", "question": "Which of the following markets are borrow-lend type of transactions?", "options": ["Money market", "Bond market", "Both 1 and 2", "None of the above"], "answer": "Both 1 and 2", "explanation": null, "topic": "PRACTICE QUESTIONS-5" },
    { "id": "p5-28", "question": "__________ require prior permission of RBI to short sell Treasury bill futures.", "options": ["Retail participants", "High Net worth persons", "RBI supervised entities", "All of the above"], "answer": "RBI supervised entities", "explanation": null, "topic": "PRACTICE QUESTIONS-5" },
    { "id": "p5-29", "question": "Initial margin is paid by __________.", "options": ["Only Buyer", "Only Seller", "Both Buyer and Seller", "None of the above"], "answer": "Both Buyer and Seller", "explanation": null, "topic": "PRACTICE QUESTIONS-5" },
    { "id": "p5-30", "question": "Which of the following derivatives have the largest market size in India?", "options": ["Interest rate derivatives", "Equity derivatives", "Commodity derivatives", "Currency derivatives"], "answer": "Equity derivatives", "explanation": null, "topic": "PRACTICE QUESTIONS-5" },

    // LAST DAY REVISION TEST-1
    { "id": "l1-1", "question": "Yield curve spread risk arises when the term structure shift is __________.", "options": ["Steepening", "Flattening", "Both 1 and 2", "None of the above"], "answer": "Both 1 and 2", "explanation": "Yield curve spread risk arises from non-parallel shifts in the yield curve—either steepening or flattening.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-2", "question": "The role of an Exchange is to __________.", "options": ["Settle the trades between buyers and sellers", "Facilitate the trades between buyers and sellers", "Both 1 and 2", "None of the above"], "answer": "Facilitate the trades between buyers and sellers", "explanation": "Exchanges facilitate trading, while settlement is handled by clearing corporations.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-3", "question": "What is the meaning of Market Risk?", "options": ["Risk if the market/exchange defaults", "Risk due to uncertainty of future profit/loss due to price changes", "Risk of loss", "None of the above"], "answer": "Risk due to uncertainty of future profit/loss due to price changes", "explanation": "Market risk arises from price volatility that affects investment returns.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-4", "question": "Which date is the 'Expiry Date' in Interest Rate futures contract?", "options": ["Settlement Date of the Interest Rate futures contract", "Last Trading Date of Interest Rate futures contract", "Both 1 and 2 are the same", "None of the above"], "answer": "Last Trading Date of Interest Rate futures contract", "explanation": "In India, the expiry date is synonymous with the Last Trading Day, not the settlement date.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-5", "question": "The Contract Amount (market lot) for Treasury Bills and Government Bond futures is __________ and __________ respectively.", "options": ["₹10,000 and ₹1,00,000 of face value", "₹20,000 and ₹2,00,000 of face value", "₹25,000 and ₹1,00,000 of face value", "₹2,00,000 of face value for both"], "answer": "₹2,00,000 of face value for both", "explanation": "Market lot is ₹2,00,000 of face value for both T-Bills and government bond futures.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-6", "question": "Forward on Interest Rate is called __________.", "options": ["Interest rate futures", "Interest rate swap", "Bond futures", "None of the above"], "answer": "None of the above", "explanation": "It's called a Forward Rate Agreement (FRA).", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-7", "question": "Who issues the 'Certificates of Deposit'?", "options": ["Local Municipality", "Banks", "RBI", "Corporates"], "answer": "Banks", "explanation": "CDs are negotiable, unsecured instruments issued by scheduled commercial banks.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-8", "question": "Two bonds are issued with same maturity but different coupons. Which should an investor buy?", "options": ["Bond with higher market price", "Bond with lower market price", "Bonds can't be judged based on their prices", "None of the above"], "answer": "Bonds can't be judged based on their prices", "explanation": "Price alone doesn't determine value—coupon, YTM, and risk also matter.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-9", "question": "The Public Debt Office of RBI maintains demat accounts of Govt. Securities for __________.", "options": ["All investors of Govt. securities", "All investors of private, public, and govt. debt securities", "All securities of State Govt", "Banks, Primary Dealers and select Financial Institutions"], "answer": "Banks, Primary Dealers and select Financial Institutions", "explanation": "Only these entities have accounts at the Public Debt Office.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-10", "question": "Why does a futures seller prefer to deliver “cheapest-to-deliver” bond?", "options": ["Conversion factor doesn't change during Delivery Month", "Conversion factor varies during Delivery Month", "Price of deliverable bond doesn't change during Delivery Month", "None of the above"], "answer": "Conversion factor doesn't change during Delivery Month", "explanation": "Price fluctuates, but the conversion factor remains fixed, favoring the cheapest bond.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-11", "question": "Which is true about Position Limits?", "options": ["Maximum daily volume at client level", "Maximum daily volume at trading member level", "Maximum daily volume at clearing member level", "None of the above"], "answer": "None of the above", "explanation": "It's a limit on open interest, not daily volume.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-12", "question": "A trader expects the 3-month interest rate to fall in one month. What should he do today?", "options": ["Buy contract expiring in 3 months on 1-month sensitive underlying", "Buy contract expiring in 1 month on 3-month sensitive underlying", "Sell contract expiring in 1 month on 3-month sensitive underlying", "None of the above"], "answer": "Buy contract expiring in 1 month on 3-month sensitive underlying", "explanation": "Match contract month with the timing of expected rate movement.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-13", "question": "The situation of BUY IN arises due to failure in settlement by __________.", "options": ["Buyer", "Seller", "Both 1 and 2", "None of the above"], "answer": "Seller", "explanation": "Seller defaults → auctioned → 'buy-in' process.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-14", "question": "What is the use of 'Quantity Freeze'?", "options": ["Check against erroneous order entry", "A circuit filter for the day", "Both 1 and 2", "None of the above"], "answer": "Check against erroneous order entry", "explanation": "Prevents accidental large trades beyond threshold quantity.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-15", "question": "__________ are traded only in the OTC market.", "options": ["Forwards", "SWAPs", "Both 1 and 2", "None of the above"], "answer": "Both 1 and 2", "explanation": "OTC = privately negotiated; applies to both Forwards and Swaps.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-16", "question": "The derivative(s) traded in the exchange market is/are __________.", "options": ["Options", "Futures", "Both 1 and 2", "None of the above"], "answer": "Both 1 and 2", "explanation": null, "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-17", "question": "The contract months for Treasury Bills futures in India are __________.", "options": ["Three nearest 'serial' months", "Three nearest 'quarterly' months", "Both 'Serial' and 'Quarterly' months", "None of the above"], "answer": "Both 'Serial' and 'Quarterly' months", "explanation": "For 91-day bills, both serial and quarterly months are included.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-18", "question": "__________ is traded both in OTC and Exchange markets.", "options": ["Swap", "Futures", "Forwards", "None of the above"], "answer": "None of the above", "explanation": "Futures = Exchange; Swaps/Forwards = OTC only.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-19", "question": "__________ is a debt security with no cash flow until maturity.", "options": ["Consol", "Zero Coupon Bond", "Annuity", "All of the above"], "answer": "Zero Coupon Bond", "explanation": "Pays nothing until maturity; interest is built into the final payment.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-20", "question": "A narrowing spread between long and short-term rates is called __________.", "options": ["Steepening", "Flattening", "Parallel", "Perpendicular"], "answer": "Flattening", "explanation": null, "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-21", "question": "In India, Interest Rate Derivatives are regulated by __________.", "options": ["RBI", "SEBI", "Finance Ministry", "Jointly by RBI and SEBI"], "answer": "Jointly by RBI and SEBI", "explanation": "RBI regulates IRDs; SEBI handles exchange-related aspects.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-22", "question": "The members of Exchange are called __________.", "options": ["Trading Members", "Clearing Members", "Both 1 and 2", "None of the above"], "answer": "Trading Members", "explanation": "Clearing members belong to the clearing corporation, not the exchange.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-23", "question": "If seller fails to serve Notice of Intent to Deliver in time, the failed quantity will be __________.", "options": ["Settled in cash", "Taken into Auction Settlement", "Decided by Buyer", "Decided by Seller"], "answer": "Taken into Auction Settlement", "explanation": null, "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-24", "question": "For Open Position on Last Trading Day, seller must notify Clearing Corporation by close of __________.", "options": ["Last Trading Day", "Two business days prior to expiry", "Both 1 and 2 are same", "None of the above"], "answer": "Both 1 and 2 are same", "explanation": null, "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-25", "question": "A coupon-paying bond issued by government carries which risk(s)?", "options": ["Repayment Risk", "Reinvestment Risk", "Both 1 and 2", "No risk"], "answer": "Reinvestment Risk", "explanation": "Sovereign debt has no default risk but has reinvestment risk.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-26", "question": "Last trading day for a 10-year bond futures contract is __________.", "options": ["Last Thursday of expiry month (or previous trading day if holiday)", "Last Wednesday of expiry month (or previous trading day if holiday)", "Last Thursday (or next trading day if holiday)", "Last Wednesday (or next trading day if holiday)"], "answer": "Last Thursday of expiry month (or previous trading day if holiday)", "explanation": null, "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-27", "question": "An action that may result in future profit or loss is known as __________.", "options": ["Hedging", "Diversification", "Risk Insurance", "Speculation"], "answer": "Speculation", "explanation": "Speculation = profit/loss depending on market movements.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-28", "question": "The settlement date for interest rate derivatives is __________.", "options": ["Next business day after trade date", "Two days after trade date", "Three days after trade date", "None of the above"], "answer": "Next business day after trade date", "explanation": "IRDs in India follow a T+1 settlement cycle.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-29", "question": "'Day Order' is also known as __________.", "options": ["Stop-Loss Order", "Good Till Day order", "Immediate or Cancel order", "Limit Order"], "answer": "Good Till Day order", "explanation": "It remains valid for the trading day and is cancelled if unexecuted.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-30", "question": "The accrued interest in secondary market trades of coupon bonds is paid by __________.", "options": ["Buyer to Seller", "Seller to Buyer", "Issuer to Buyer", "Issuer to Seller"], "answer": "Buyer to Seller", "explanation": "Buyer reimburses seller for interest accrued until settlement.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-31", "question": "__________ is a measure of 'Price Risk' in a bond.", "options": ["Macaulay Duration", "Modified Duration", "Both 1 and 2", "None of the above"], "answer": "Both 1 and 2", "explanation": "Price risk is the possibility of bond price fluctuations due to interest rate changes. Macaulay Duration was the initial measure of this risk, and Modified Duration refines it by considering bond price sensitivity to yield changes.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-32", "question": "The position limits are defined __________.", "options": ["only at Trading Member level", "only at Clearing Member level", "only at Client level", "None of the above"], "answer": "None of the above", "explanation": "Position limits exist at multiple levels including Client, Trading Member, and Exchange levels—not just a single entity.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-33", "question": "Who frames the operational procedures for trading and settlement of interest rate derivatives?", "options": ["RBI", "SEBI", "Jointly by RBI and SEBI", "Exchanges and Clearing Corporations"], "answer": "Exchanges and Clearing Corporations", "explanation": "Exchanges and Clearing Corporations create operational frameworks within the regulations set by RBI and SEBI.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-34", "question": "Among the below given options, interest rates will be highest for __________ credit ratings.", "options": ["AAA", "AA", "AA+", "BB"], "answer": "BB", "explanation": "Lower credit ratings mean higher risk for lenders, so issuers must offer higher interest rates to attract buyers.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-35", "question": "Which order has a better chance of execution - Stop Loss order or Stop Loss Limit order?", "options": ["Stop Loss Order", "Stop Loss Limit Order", "Both have equal chance of execution", "None of the above"], "answer": "Stop Loss Order", "explanation": "Stop Loss orders convert to market orders once triggered, ensuring execution, whereas Stop Loss Limit orders risk non-execution if price moves quickly.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-36", "question": "Which of the following is true with respect to the regulations on buying and selling of T Bill and T Bond futures for Non-residents and Foreign Institutional Investors?", "options": ["They can short sell freely", "They can short sell only with prior permission of SEBI", "They cannot short sell", "None of the above"], "answer": "They cannot short sell", "explanation": "Short positions by non-residents and FIIs are allowed only for hedging purposes—not for speculation.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-37", "question": "A trader expects the interest rate change to happen in the short term, so he should use __________.", "options": ["Govt. bond futures with short expiry date", "Govt. bond futures with long expiry date", "Treasury Bill futures with short expiry date", "Treasury Bill futures with long expiry date"], "answer": "Treasury Bill futures with short expiry date", "explanation": "T-Bill futures are suited for short-term interest rate views due to their short maturities and sensitivity to rate changes.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-38", "question": "For the same deliverable bond, the conversion factor will be __________.", "options": ["same for different Delivery Months", "different for different Delivery Months", "same for serial months and different for quarterly months", "different for serial months and same for quarterly months"], "answer": "different for different Delivery Months", "explanation": "The conversion factor depends on the bond's remaining maturity, which varies with different delivery months.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-39", "question": "When a Stop Loss buy order is entered, the trigger price has to be __________.", "options": ["higher than current market offer price", "higher than current market bid price", "lower than current market offer price", "lower than current market bid price"], "answer": "higher than current market offer price", "explanation": "A stop-loss buy order is activated when the market rises to the trigger price, which must be above the current offer.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-40", "question": "True return can be calculated in advance for __________.", "options": ["Annuity", "Zero coupon bond", "Consols", "Coupon Bond"], "answer": "Zero coupon bond", "explanation": "Zero coupon bonds have no intermediate payments, eliminating reinvestment risk and allowing accurate return calculations.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-41", "question": "The __________ order requires a trigger price to be specified.", "options": ["Immediate or Cancel", "Stop Loss", "Special Limit", "Market"], "answer": "Stop Loss", "explanation": "A stop-loss order becomes active only upon hitting the trigger price.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-42", "question": "__________ measures the PRICE RISK in a bond.", "options": ["Price value of basis point (PVBP)", "Macaulay Duration", "Both 1 and 2", "None of the above"], "answer": "Both 1 and 2", "explanation": "Both PVBP and Macaulay Duration assess how bond prices change with interest rates, thus measuring price risk.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-43", "question": "If the SEBI regulations mention a farthest expiry date for futures contract of one year, then the Exchange can list the future trade contracts with the farthest expiry date of __________.", "options": ["More than one year", "Less than one year", "More or less than one year", "Less than one year or more than three years"], "answer": "Less than one year", "explanation": "Exchanges can restrict expiry further than SEBI regulations but cannot extend beyond them.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-44", "question": "A 'Gilt Account' is __________.", "options": ["an account between Public Debt Office and Central governments", "an account between Public Debt Office and investors in government securities", "an account between Public Debt Office and Primary Dealers", "None of the above"], "answer": "None of the above", "explanation": "Gilt accounts are maintained between SCBs/PDs and investors, not directly with the Public Debt Office.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-45", "question": "'Buy In' applies for __________.", "options": ["failure to notify the Intent to Deliver", "short-delivery of securities on the settlement day", "Both 1 and 2", "None of the above"], "answer": "short-delivery of securities on the settlement day", "explanation": "In case of short delivery, the shortage is auctioned via 'Buy-In' to settle the obligation.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-46", "question": "From the given options, which is the most liquid tenor in Money Markets?", "options": ["10 month", "6 month", "2 month", "1 month"], "answer": "1 month", "explanation": "Tenors like Overnight, 1 Month, and 3 Month are the most liquid in money markets.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-47", "question": "The maturity of the underlying bond on which the futures contract is currently listed is __________.", "options": ["1 Year", "5 Year", "10 Year", "20 Year"], "answer": "10 Year", "explanation": "10-Year bonds are the standard underlying instruments for bond futures.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-48", "question": "Among the following options, which quantity of face value can be bought or sold for Govt. bond futures?", "options": ["Rs 1 lakh", "Rs 5 lakh", "Rs 7 lakh", "Rs 8 lakh"], "answer": "Rs 8 lakh", "explanation": "Futures contracts are in multiples of Rs 2 lakh. Rs 8 lakh is a valid multiple.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-49", "question": "In Exchange traded derivatives, the 'trade guarantee' is given by __________.", "options": ["SEBI", "RBI", "The concerned Exchange", "Clearing Corporation"], "answer": "Clearing Corporation", "explanation": "Clearing Corporation provides trade guarantees through novation, acting as central counterparty.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-50", "question": "When we trade, we __________.", "options": ["minimise risk", "assume risk", "hedge the risk", "eliminate the risk"], "answer": "assume risk", "explanation": "Trading inherently involves taking on risk.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-51", "question": "__________ is a part of Debt Market.", "options": ["Equity Market", "Forex Market", "Both 1 and 2", "None of the above"], "answer": "None of the above", "explanation": "Debt Market includes money and bond markets, not equity or forex.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-52", "question": "Prices of __________ are determined by the long term interest rates.", "options": ["Treasury Bills", "Government Bonds with coupon", "Both 1 and 2", "None of the above"], "answer": "Government Bonds with coupon", "explanation": "Long-term bonds are sensitive to long-term interest rates, unlike short-term T-bills.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-53", "question": "In a zero coupon bond the Macaulay Duration will be __________.", "options": ["Equal / Proportionate to maturity", "Less than maturity", "More than maturity", "Zero"], "answer": "Equal / Proportionate to maturity", "explanation": "Zero-coupon bonds pay at maturity only, so duration equals time to maturity.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-54", "question": "The 'Quarterly' month for the purpose of expiry of interest rate derivative is __________.", "options": ["June", "September", "March", "All of the above"], "answer": "All of the above", "explanation": "Quarterly expiry months are March, June, September, and December.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-55", "question": "You have bought a car by taking a vehicle loan at fixed interest rate. Which of the following is true in this case?", "options": ["You are exposed to Credit Risk", "You are exposed to Market Risk", "You are not exposed to Interest Rate Risk", "You are exposed to Bank Risk"], "answer": "You are not exposed to Interest Rate Risk", "explanation": "A fixed rate means your payments won't vary with interest rate changes.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-56", "question": "If the shape of term structure is INVERTED, this means that __________.", "options": ["Rate rises first and then falls with the term", "Rate rises with the term", "Rate is same through out the term", "None of the above"], "answer": "Rate rises first and then falls with the term", "explanation": "An inverted yield curve indicates short-term rates are higher than long-term rates—a sign of possible recession.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-57", "question": "Most consumer loans and housing loans are structured as __________.", "options": ["Zero-coupon instrument", "Coupon instrument", "Consolidated Annuity (Consol)", "Annuity"], "answer": "Annuity", "explanation": "Consumer and housing loans are repaid in equal installments (EMIs), a typical annuity structure.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-58", "question": "If the difference between Long term Rates and Short term Rates rises or widens (from positive to more positive or from negative to less negative), then the term structure of rates (shifts) is called __________.", "options": ["Steepening", "Flattening", "Parallel", "Humped"], "answer": "Steepening", "explanation": "A steeper curve reflects widening rate differentials between short- and long-term.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-59", "question": "The price of derivatives is determined by the demand and supply factors - State True or False?", "options": ["True", "False"], "answer": "False", "explanation": "Derivative prices are based on their underlying assets, not direct demand-supply of the derivatives themselves.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-60", "question": "The margins for outright future trades will be __________ when compared to special trades like Calendar spreads.", "options": ["Higher", "Lower", "Same for both type of trades", "None of the above"], "answer": "Higher", "explanation": "Calendar spreads involve buying and selling two related futures, reducing risk and therefore margin requirements.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-61", "question": "A trading member has two clients - Client A and Client B. Client A has a net long position of 12 and Client B has a net short position of 10. What is the net position for the trading member?", "options": ["Long 2", "Long 12", "Short 10", "Long 12 and short 10"], "answer": "Long 12 and short 10", "explanation": "Client positions must be maintained separately; the long position of one cannot offset the short position of another.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-62", "question": "When the term structure curve shifts in anti-clockwise direction, the shift is __________.", "options": ["Parallel", "Steepening", "Flattening", "Vertical"], "answer": "Steepening", "explanation": "Steepening occurs when long-term rates rise faster than short-term rates, widening the spread.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-63", "question": "There is a trade guarantee in which of the following trades?", "options": ["OTC trades", "Exchange trades", "Both 1 and 2", "None of the above"], "answer": "Exchange trades", "explanation": "Exchange trades are guaranteed by a clearing corporation, unlike OTC trades which carry counterparty risk.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-64", "question": "The seller can deliver __________ for the entire obligation.", "options": ["not more than 3 different deliverable bond", "different deliverable bonds but in multiples of contract amount", "any bond of his preference", "same deliverable bond of equal proportion"], "answer": "different deliverable bonds but in multiples of contract amount", "explanation": "Delivery must be in multiples of the contract size (e.g., ₹2 lakhs), even if multiple bonds are delivered.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-65", "question": "The Public Debt Office is the depository for __________.", "options": ["State Government Bonds only", "Government Securities only", "Bank Bonds only", "All Debt securities with face value above ₹10,000 only"], "answer": "Government Securities only", "explanation": "The PDO of RBI handles the depository functions exclusively for government securities.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-66", "question": "Interest rate risk is also known as __________.", "options": ["Reinvestment risk", "Credit risk", "Price risk", "None of the above"], "answer": "Price risk", "explanation": "Interest rate risk impacts the price of bonds, hence it is also called price risk.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-67", "question": "__________ is a demat account for Govt. securities which is maintained with Public Debt Office of RBI by the Primary dealers for its own holdings.", "options": ["Subsidiary General Ledger (SGL) Account", "Constituent Subsidiary General Ledger (SGL) Account", "Both 1 and 2", "None of the above"], "answer": "Subsidiary General Ledger (SGL) Account", "explanation": "SGL Accounts are maintained directly with the RBI for primary dealers' proprietary holdings.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-68", "question": "Which is the risk you face if the prices of cash treasury bills and treasury bills futures are not the same?", "options": ["Basis Risk", "Yield curve spread risk", "Market Liquidity risk", "None of the above"], "answer": "Basis Risk", "explanation": "Basis risk arises due to a mismatch in movements between the cash and futures prices.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-69", "question": "The maximum contract months available for Treasury Bill futures is __________.", "options": ["2", "4", "6", "9"], "answer": "6", "explanation": "Three serial and three quarterly contracts are available, totaling six contract months.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-70", "question": "To convert interest rate into interest amount, we need to know the __________.", "options": ["compounding frequency", "day count fraction", "Both 1 and 2", "None of the above"], "answer": "Both 1 and 2", "explanation": "Both compounding frequency and day count convention are required to compute actual interest amount.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-71", "question": "In an 'Immediate or Cancel' order __________.", "options": ["Partial execution of the order is possible", "The non-executed portion of the order is cancelled", "Both 1 and 2", "None of the above"], "answer": "Both 1 and 2", "explanation": "IOC orders are executed immediately if possible; partial fills are allowed, and the rest is canceled.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-72", "question": "What is the settlement method for bond derivatives?", "options": ["Cash", "Physical", "May be physical or cash"], "answer": "May be physical or cash", "explanation": null, "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-73", "question": "__________ are members of Clearing Corporation.", "options": ["Clearing Members", "Trading Members", "Both 1 and 2", "None of the above"], "answer": "Clearing Members", "explanation": "Only Clearing Members are directly associated with the Clearing Corporation, not Trading Members.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-74", "question": "Which of these risks is most severe for Banks and Financial institutions?", "options": ["Interest Rate Risk", "Equity Risk", "Currency Risk", "All of the above are equally severe"], "answer": "Interest Rate Risk", "explanation": "Interest rate fluctuations significantly impact bank balance sheets and asset-liability management.", "topic": "LAST DAY REVISION TEST-1" },
    { "id": "l1-75", "question": "An action which does not result in any profit or loss in future is known as __________.", "options": ["Risk Insurance", "Hedging", "Trading", "Arbitrage"], "answer": "Hedging", "explanation": "Hedging is done to eliminate risk and does not seek to make a profit.", "topic": "LAST DAY REVISION TEST-1" },

    // LAST DAY REVISION TEST-2
    { "id": "l2-1", "question": "Which risk is mitigated by the Delivery versus Payment (DvP) mode of settlement?", "options": ["Settlement Risk", "Counterparty Risk", "Credit Risk", "All of the above"], "answer": "Settlement Risk", "explanation": "Settlement risk is the risk that one party defaults after the other has fulfilled its obligation. DvP ensures simultaneous exchange of securities and funds, thus eliminating this risk.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-2", "question": "A bond portfolio's current market value is Rs 100 cr and the portfolio modified duration (MD) is 6. If the YTM falls by one basis point (0.01%), calculate the new market value.", "options": ["Rs 99.94 cr", "Rs 100.06 cr", "Rs 99.40 cr", "Rs 100.60 cr"], "answer": "Rs 100.06 cr", "explanation": "Change = 100 cr × 6 × 0.01% = 0.06 cr increase. New value = Rs 100.06 cr.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-3", "question": "The initial margin/contract level minimum margin will be __________.", "options": ["Same for treasury bills and Govt. bonds", "Different for treasury bills and Govt. bonds", "Different for treasury bills and Govt. bonds but same for all Govt. bonds", "No margins are payable"], "answer": "Different for treasury bills and Govt. bonds but same for all Govt. bonds", "explanation": "Margins differ: Treasury Bills have lower margins than all Govt. Bonds, but Govt. Bonds share the same structure.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-4", "question": "The legal form of Professional Clearing Member can be __________.", "options": ["Partnership firm", "Corporate bodies or banks", "Both 1 and 2", "None of the above"], "answer": "Corporate bodies or banks", "explanation": "Only corporate bodies or banks are eligible as Professional Clearing Members.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-5", "question": "SPAN margining is applied between __________.", "options": ["The trading members and their clients", "Clearing Corporation and Clearing Members", "Both 1 and 2", "None of the above"], "answer": "The trading members and their clients", "explanation": "SPAN margins are calculated at client level and passed from clients to trading members to the clearing corporation.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-6", "question": "An investor can open __________ Gilt Account(s).", "options": ["Only one", "One per primary dealer", "Maximum two", "Maximum five"], "answer": "Only one", "explanation": "Each investor can open only one Gilt Account and must declare this.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-7", "question": "The seller must deliver __________ in the physical settlement of Government bond futures.", "options": ["Any bond which the seller has", "The bond which is exactly matching the coupon", "Any specified deliverable bond", "Any bond of Govt. of India"], "answer": "Any specified deliverable bond", "explanation": "The seller can deliver any of the predefined deliverable bonds.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-8", "question": "When the long-term rate rises more than the short-term rate, the shift in structure is __________.", "options": ["Steepening", "Flattening", "Parallel", "None of the above"], "answer": "Steepening", "explanation": "Steepening occurs when the yield curve becomes steeper due to long-term rates rising more.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-9", "question": "Considering global derivative markets, which of the following is bigger in size?", "options": ["Over the Counter (OTC)", "Exchange Traded Markets", "Both 1 and 2 are almost same in size", "None of the above"], "answer": "Over the Counter (OTC)", "explanation": "OTC markets are significantly larger than exchange-traded markets.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-10", "question": "Investors can hold Govt. securities in demat form in which of the following?", "options": ["Gilt account with Depositories", "Demat account with Primary Dealers and Banks", "Both 1 and 2", "None of the above"], "answer": "Both 1 and 2", "explanation": null, "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-11", "question": "A Professional Clearing Member can settle trades __________.", "options": ["Which have been executed by other trading members", "Which have been executed by him", "Both 1 and 2", "None of the above"], "answer": "Which have been executed by other trading members", "explanation": "They are not allowed to execute trades, only settle those executed by others.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-12", "question": "If the 6-month rate is 6%, 1-year rate is 7% and 10-year rate is 8.5%, the shape of the term structure is __________.", "options": ["Normal", "Inverted", "Flat", "Humped"], "answer": "Normal", "explanation": "In a normal term structure, longer durations have higher rates.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-13", "question": "A zero-coupon bond issued by a corporate will have which of the following risks?", "options": ["Credit Risk", "Market Risk", "Both 1 and 2", "None of the above"], "answer": "Both 1 and 2", "explanation": "Zero-coupon bonds carry market risk due to rate sensitivity and credit risk from the issuer.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-14", "question": "The price of a bond is Rs 100. YTM is 8%, Modified Duration is 4. If YTM changes by 2%, price change is __________.", "options": ["10%", "Rs 8", "2%", "Rs 4"], "answer": "Rs 8", "explanation": "Price change = 100 × 4 × 2% = Rs 8", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-15", "question": "If the shape of term structure is 'Normal', it implies that __________.", "options": ["Rate is the same for all terms", "Rate is high for medium term and falls off on either side", "Rate falls with the term", "None of the above"], "answer": "None of the above", "explanation": "In a normal term structure, rates increase with term.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-16", "question": "When is the auction conducted for short delivery of securities?", "options": ["First business day after Day of Intention", "Second business day after Day of Intention", "Third business day after Day of Intention", "Settlement day"], "answer": "Settlement day", "explanation": "Shortages are auctioned immediately on the settlement day.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-17", "question": "What are the number of maximum contracts available for trading in Govt. Bond futures?", "options": ["2", "3", "5", "6"], "answer": "6", "explanation": "Three near-month and three quarterly contracts are listed.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-18", "question": "Bond price is 120, MD = 6.0, YTM changes by 1%. Price change is __________.", "options": ["Rs 6", "6%", "Both 1 and 2 are same", "None of the above"], "answer": "6%", "explanation": "MD gives percentage change = 6%", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-19", "question": "When speculating the timing of interest rate change, you should match the __________.", "options": ["Expiry date of futures", "Tenor of the underlying", "Both 1 and 2", "None of the above"], "answer": "Expiry date of futures", "explanation": "The futures expiry should align with the expected timing of rate change.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-20", "question": "In a Gilt Account __________.", "options": ["Every debit requires authorization", "Right to set off cannot be applied", "Both 1 and 2", "None of the above"], "answer": "Both 1 and 2", "explanation": "Gilt Accounts are strictly regulated with no set-offs and require authorization.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-21", "question": "Bond price = Rs 97, Coupon = 8.5%. What is current yield?", "options": ["8%", "8.53%", "8.76%", "9.70%"], "answer": "8.76%", "explanation": "= (8.5 / 97) × 100 = 8.76%", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-22", "question": "If all rates move in the same direction by the same extent, the shift is called __________.", "options": ["Steepening", "Flattening", "Parallel", "None of the above"], "answer": "Parallel", "explanation": null, "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-23", "question": "The trade guarantee for exchange traded derivatives is provided by __________.", "options": ["SEBI", "Clearing Corporation", "Exchange", "RBI"], "answer": "Clearing Corporation", "explanation": null, "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-24", "question": "The value of derivative in the balance sheet is its 'fair value', which is its __________.", "options": ["Current spot value", "Current book value", "Current mark-to-market value", "Zero"], "answer": "Current mark-to-market value", "explanation": null, "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-25", "question": "Who maintains Constituent SGL account with the PDO of RBI?", "options": ["Scheduled Commercial Banks", "Primary Dealers", "Both 1 and 2", "None of the above"], "answer": "Both 1 and 2", "explanation": null, "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-26", "question": "If VaR (1 Day – 99%) = Rs 17, it means __________.", "options": ["Loss over Rs 17 in 99% cases", "Loss under Rs 17 in 99% cases", "Profit under Rs 17 in 99% cases", "None of the above"], "answer": "Loss under Rs 17 in 99% cases", "explanation": "VaR indicates the maximum likely loss with 99% confidence.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-27", "question": "In a Callable bond, the __________ can prepay the bond before maturity.", "options": ["Issuer", "Investor", "Both must agree", "None of the above"], "answer": "Issuer", "explanation": null, "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-28", "question": "Coupon is not a true return measure because __________.", "options": ["It ignores price premium/discount", "It ignores capital gains/losses", "Both A and B", "None of the above"], "answer": "Both A and B", "explanation": null, "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-29", "question": "Between Modified Duration (MD) and PVBP, which is a better risk measure?", "options": ["MD", "PVBP", "Both are similar in different contexts", "None of the above"], "answer": "Both are similar in different contexts", "explanation": null, "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-30", "question": "Which interest rate affects Treasury Bill prices?", "options": ["Short Term rate", "Long Term rate", "Both", "None"], "answer": "Short Term rate", "explanation": "T-bills are short-term instruments, sensitive to short-term rates only.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-31", "question": "Which among the following options is a derivative?", "options": ["Interest Rate Futures", "Interest Rate Swap", "Forward Rate Agreement", "All of the above"], "answer": "All of the above", "explanation": "All listed instruments—futures, swaps, and FRAs—are derivatives since they derive their value from underlying interest rates.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-32", "question": "Long and short positions can be offsetted at __________ for proprietary trades.", "options": ["Across all trading member of a clearing member", "Across all trading members", "Trading member level", "None of the above"], "answer": "Trading member level", "explanation": "Proprietary long and short positions can only be offset at the trading member level.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-33", "question": "Converting a floating-rate loan into a fixed-rate loan is __________.", "options": ["Speculation", "Hedging", "Risk Insurance", "Delta Arbitrage"], "answer": "Hedging", "explanation": "A floating-rate loan carries interest rate risk. Converting it into a fixed-rate loan eliminates this risk, which is the essence of hedging.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-34", "question": "A company issues two bonds having the same maturity but different coupon. An investor will choose one bond over the other for investment because of __________.", "options": ["Yield to Maturity difference", "Coupon difference", "Both 1 and 2", "None of the above"], "answer": "Yield to Maturity difference", "explanation": "YTM accounts for premium/discount, capital gain/loss at redemption, and reinvestment rate, making it a better investment measure than coupon alone.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-35", "question": "Clearing Corporation protects itself from the counterparty credit risk and settlement risk from both buyer and seller by __________.", "options": ["Mark to Market margins", "Taking guarantees from trading members", "Both 1 and 2", "None of the above"], "answer": "Mark to Market margins", "explanation": "Mark-to-market margins protect the clearing corporation by covering potential losses due to market price fluctuations.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-36", "question": "__________ orders will be executed at a favourable price.", "options": ["Immediate or Cancel orders", "Limit Orders", "Market Orders", "Stop Loss orders"], "answer": "Limit Orders", "explanation": "Limit orders allow traders to set a preferred price, ensuring execution only at that price or better.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-37", "question": "A Professional Clearing member can execute trades for __________.", "options": ["Own account", "Other trading members", "Both 1 and 2", "None of the above"], "answer": "None of the above", "explanation": "Professional Clearing Members only clear and settle trades; they don't execute trades.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-38", "question": "What is Market liquidity risk?", "options": ["The seller is unable to give the deliveries of the securities", "The buyer is unable to make payments", "Both 1 and 2", "There is not sufficient volumes in the market to enable the required trades"], "answer": "There is not sufficient volumes in the market to enable the required trades", "explanation": "Market liquidity risk refers to the risk of not being able to trade in desired quantities without affecting prices.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-39", "question": "On which day does the Government of India conduct the auction for Treasury Bills?", "options": ["Monday", "Wednesday", "Friday", "Sunday"], "answer": "Wednesday", "explanation": "T-bills are generally auctioned on Wednesdays, with 91-day bills weekly and others biweekly.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-40", "question": "The last trading day for Treasury Bill future contract is __________.", "options": ["Last Wednesday of Contract Month", "Last Thursday of Contract Month", "Last Friday of Contract Month", "None of the above"], "answer": "Last Wednesday of Contract Month", "explanation": "T-bill futures expire on the last Wednesday of the contract month.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-41", "question": "What shift in the term structure is called if the long term minus short term rate moves from -2% to -1.5%?", "options": ["Steepening", "Flattening", "Parallel", "Vertical"], "answer": "Steepening", "explanation": "A shift from a more negative to a less negative spread is steepening, as the yield curve becomes less inverted.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-42", "question": "There is no possibility of yield curve spread risk when the term structure shift is __________.", "options": ["Steepening", "Parallel", "Flattening", "None of the above"], "answer": "Parallel", "explanation": "In a parallel shift, all interest rates move by the same amount, eliminating yield curve spread risk.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-43", "question": "A client of a trading member has a long position of 14 contracts and short position of 3 contracts in the same underlying. What is the net position for the client?", "options": ["14 long and 3 short contracts", "14 long contracts", "11 long contracts", "3 short contracts"], "answer": "11 long contracts", "explanation": "Net position is calculated as 14 long - 3 short = 11 long contracts.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-44", "question": "The contract-level minimum margin is __________.", "options": ["Same for all the days of a contract", "Different for all days of a contract", "One amount for the first day and different amount for other days", "None of the above"], "answer": "Same for all the days of a contract", "explanation": "The regulator mandates a consistent minimum margin level throughout the contract's life.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-45", "question": "The maximum contract months available for 10-year, 6-year, and 13-year bond futures is __________.", "options": ["3", "6", "9", "12"], "answer": "6", "explanation": "These futures are available for 3 serial months and 3 quarterly months—total 6 months.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-46", "question": "When there is a failure to notify the Intent to Deliver, the auction is conducted on __________.", "options": ["The Day of Intention", "The first business day after the Day of Intention", "The second business day after the Day of Intention", "One week after the Day of Intention"], "answer": "The first business day after the Day of Intention", "explanation": "The auction is held the next business day after the Day of Intention, with settlement on the due date.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-47", "question": "The underlying for short term interest rate derivatives is __________.", "options": ["Short tenor rate in the long run", "Short tenor rate in the short run", "Long tenor rate in the long run", "Long tenor rate in the short run"], "answer": "Short tenor rate in the short run", "explanation": null, "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-48", "question": "Currently the underlying for Interest Rate Derivatives in India is / are __________.", "options": ["Treasury Bills", "Govt. of India bonds", "Both 1 and 2", "None of the above"], "answer": "Both 1 and 2", "explanation": "Permitted underlyings include T-bills and 2-year, 5-year, and 10-year Gol bonds.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-49", "question": "Which is the correct sequence of products launched in the Indian Exchange traded derivatives market?", "options": ["Equity Index options, Equity Index futures, Single stock options", "Equity Index futures, Equity Index options, Single stock options", "Single stock futures, Equity Index futures, Equity Index options", "Single stock futures, Single stock options, Equity Index futures"], "answer": "Equity Index futures, Equity Index options, Single stock options", "explanation": "This was the correct chronological order of product launches.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-50", "question": "The size of counterparty credit risk is equal to the __________.", "options": ["Credit risk", "Replacement cost", "Market risk", "Trade value"], "answer": "Replacement cost", "explanation": "If a counterparty defaults, the non-defaulting party faces the cost of replacing the trade at current market prices.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-51", "question": "Considering 30/360 day count basis, how many days are counted for interest accrual from Feb 28, 2015 to March 1, 2015?", "options": ["1", "2", "3", "4"], "answer": "2", "explanation": null, "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-52", "question": "A Trading-cum-Clearing Member is a member of __________.", "options": ["Exchange", "Clearing Corporation", "Both 1 and 2", "None of the above"], "answer": "Both 1 and 2", "explanation": "They execute trades and also settle them through the Clearing Corporation.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-53", "question": "The Yield curve spread risk deals with the differential price changes in __________.", "options": ["Cash and future prices", "Different tenors of interest rate", "Both 1 and 2", "None of the above"], "answer": "Different tenors of interest rate", "explanation": "Yield curve spread risk arises from uneven movement in interest rates across tenors.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-54", "question": "What will be the shape of term structure if the difference between Long term rate and short term rate is zero?", "options": ["Normal", "Flat", "Inverted", "Abnormal"], "answer": "Flat", "explanation": "Equal rates across all maturities indicate a flat yield curve.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-55", "question": "The current position limit at Clearing Member level is __________.", "options": ["3% of total open interest or Rs 200 Cr, whichever is higher", "10% of total open interest or Rs 600 Cr, whichever is higher", "25% of the outstanding of underlying bond", "No separate position limit is prescribed"], "answer": "No separate position limit is prescribed", "explanation": "Clearing Members do not have a distinct position limit imposed on them.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-56", "question": "Holdings of Govt. securities of investors are held in __________ with the Public Debt Office of RBI.", "options": ["Subsidiary General Ledger (SGL) Account", "Constituent Subsidiary General Ledger (CSGL) Account", "Both 1 and 2", "None of the above"], "answer": "Constituent Subsidiary General Ledger (CSGL) Account", "explanation": "Investors' holdings are maintained in CSGL accounts, while banks and PDs hold SGL accounts.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-57", "question": "When the original period of borrowing or lending is more than a year, it is __________.", "options": ["Money Market", "Currency Market", "Forex Market", "Bond Market"], "answer": "Bond Market", "explanation": "The bond market deals with borrowings/lendings of longer than one year.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-58", "question": "Suppose the 3-month rate is 5.5%, the 1-year rate is 7.5% and the 10-year rate is 6%. What is the shape of the term structure?", "options": ["Normal", "Inverted", "Flat", "Humped"], "answer": "Humped", "explanation": "A humped curve occurs when medium-term rates are higher than both short- and long-term rates.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-59", "question": "Calculate the change in the value of one futures contract if the Government Bond futures contract price changes by 100 ticks.", "options": ["5", "10", "100", "500"], "answer": "500", "explanation": "Tick value = ₹5; 100 ticks x ₹5 = ₹500.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-60", "question": "The risk which is faced by the highest number of market participants is __________.", "options": ["Equity Risk", "Commodity Risk", "Forex Risk", "Interest Rate Risk"], "answer": "Interest Rate Risk", "explanation": "Interest rate risk affects more participants due to the size and exposure in global bond markets.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-61", "question": "The extreme loss margin is implemented by the __________.", "options": ["Stock Exchange", "Clearing Corporation", "SPAN Margining system", "SEBI"], "answer": "Clearing Corporation", "explanation": "The extreme loss margin and delivery margin are implemented by the Clearing Corporation. It applies to the Clearing Member and is deducted from liquid assets in real-time.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-62", "question": "A fixed rate housing loan is not exposed to any interest rate risk – State True or False?", "options": ["True", "False"], "answer": "True", "explanation": "For a borrower with a fixed rate housing loan, market interest rate changes do not affect their EMIs. Hence, they are not exposed to interest rate risk.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-63", "question": "'Basis Risk' refers to the differential price changes in __________.", "options": ["Cash prices and future prices", "Different tenors of interest rates", "Both 1 and 2", "None of the above"], "answer": "Both 1 and 2", "explanation": "Basis risk arises due to mismatches in contract sizes or maturity dates between the hedge and the exposure, involving both cash vs. futures prices and different interest rate tenors.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-64", "question": "Interest rate derivatives is best described as __________.", "options": ["Borrowing money at an agreed rate", "Lending money at an agreed rate", "One party to borrow and one to lend at an agreed rate", "None of the above"], "answer": "One party to borrow and one to lend at an agreed rate", "explanation": "Interest rate derivatives involve a notional agreement between parties to exchange interest payments, mimicking borrowing and lending transactions.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-65", "question": "Exchange traded Interest Rate Derivatives are always settled in __________.", "options": ["Cash", "Physical Delivery", "May be physical or cash", "None of the above"], "answer": "Cash", "explanation": "Interest rate derivatives are compulsorily settled in cash. This differs from bond derivatives, which may allow physical settlement.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-66", "question": "If the interest rate falls within the period, the shape of the term structure will be __________.", "options": ["Normal", "Inverted", "Flat", "Humped"], "answer": "Normal", "explanation": "A normal yield curve reflects falling interest rates, with longer-term securities offering higher returns than short-term ones.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-67", "question": "__________ have to obtain prior permission of RBI to short sell Govt. Bond futures.", "options": ["Primary Dealers", "Mutual Funds", "Individual Investors", "None of the above"], "answer": "Primary Dealers", "explanation": "Banks and primary dealers are allowed to engage in naked short selling of government bond futures only with prior RBI approval.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-68", "question": "Inter-commodity spread consists of two trades with __________.", "options": ["Different market side and same underlying", "Same market side and different expiry", "Different market side and different expiry", "None of the above"], "answer": "None of the above", "explanation": "An inter-commodity spread involves futures on different underlyings but with the same expiry and quantity - e.g., buying March T-Bill futures and selling March bond futures.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-69", "question": "When is the Delivery Margin payable?", "options": ["One business day after expiry day", "One business day after last trading day", "On Expiry day", "On the Last Trading Day"], "answer": "On the Last Trading Day", "explanation": "Delivery margin is collected on the Day of Intent, which is the last trading day, after intention and allocation processes are completed.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-70", "question": "Which of the following is the settlement day of the 91 day bill futures contract?", "options": ["Next working day following Last Trading Day", "Two days after the last business day of the Contract Month", "Last business day of Contract Month", "None of the above"], "answer": "Last business day of Contract Month", "explanation": null, "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-71", "question": "Yield to Maturity (YTM) is not a completely satisfactory measure of return because __________.", "options": ["It assumes a flat term structure", "It assumes reinvestment at YTM itself", "Both 1 and 2", "None of the above"], "answer": "Both 1 and 2", "explanation": "YTM assumes a flat term structure and that all cash flows are reinvested at the YTM, which may not be realistic.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-72", "question": "Who conducts the settlement of trades of Exchange Traded Derivatives?", "options": ["The Brokers", "The Clearing Corporation", "SEBI", "The Exchange"], "answer": "The Clearing Corporation", "explanation": null, "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-73", "question": "Investors can hold Government Securities __________.", "options": ["Only in electronic book entry form", "Only in physical form", "Both 1 and 2", "None of the above"], "answer": "Both 1 and 2", "explanation": "G-Secs can be held in both physical and electronic form, but regulated entities must hold them in demat form post-May 20, 2002.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-74", "question": "__________ is the true return on investment.", "options": ["Yield-to-maturity", "Coupon", "Current yield", "None of the above"], "answer": "None of the above", "explanation": "Spot rate, not listed among the options, is the true return as it factors in price, capital gains/losses, and reinvestment.", "topic": "LAST DAY REVISION TEST-2" },
    { "id": "l2-75", "question": "The price quotation for Government Bond futures is __________.", "options": ["Price per 100 face value", "100 minus the discount rate", "100 plus the discount rate", "Price per 1000 face value"], "answer": "Price per 100 face value", "explanation": "Govt Bond futures are quoted per ₹100 face value. T-Bills are quoted as 100 minus the discount rate.", "topic": "LAST DAY REVISION TEST-2" },

    // REAL FEEL EXAM
    { "id": "rf-1", "question": "Which of the following statements is correct for Netting?", "options": ["Buy and sell trades of the different clients are offset", "Client trades are offset with proprietary trades", "Both 1 and 2", "None of the above"], "answer": "None of the above", "explanation": "Buy and sell trades can be netted only for the same client. Cross-client or client-proprietary netting is not permitted.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-2", "question": "__________ is a 'Standard Tenor' in money market.", "options": ["Over Night", "One week", "Two weeks", "All of the above"], "answer": "All of the above", "explanation": "Standard tenors include overnight (ON), one week (1W), two weeks (2W), and one month to one year at monthly intervals.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-3", "question": "The 'Clearing Account' is used exclusively for making and receiving payments with Clearing Corporation - State True or False?", "options": ["True", "False"], "answer": "True", "explanation": "Clearing members must open a clearing account with designated banks to settle transactions through the Clearing Corporation.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-4", "question": "The settlement for exchange traded derivatives is done by __________.", "options": ["its registered members", "SEBI", "Clearing Corporation", "the Exchange itself"], "answer": "Clearing Corporation", "explanation": null, "topic": "REAL FEEL EXAM" },
    { "id": "rf-5", "question": "A person wishes to hedge the long-term interest rate as he expects the rate change to happen in the long term. Which of the following options should he choose?", "options": ["Treasury Bill futures with long expiry date", "Treasury Bill futures with short expiry date", "Govt. Bond futures with long expiry date", "Govt. Bond futures with short expiry date"], "answer": "Govt. Bond futures with long expiry date", "explanation": null, "topic": "REAL FEEL EXAM" },
    { "id": "rf-6", "question": "Depository for government securities is the __________.", "options": ["Public Debt Office (PDO)", "National Securities Depository Ltd (NSDL)", "Central Depository Services (India) Ltd (CDSL)", "Reserve Bank of India (RBI)"], "answer": "Public Debt Office (PDO)", "explanation": null, "topic": "REAL FEEL EXAM" },
    { "id": "rf-7", "question": "When the interest rate is same for all terms, the shape of term structure is called __________.", "options": ["Normal", "Inverted", "Flat", "Humped"], "answer": "Flat", "explanation": null, "topic": "REAL FEEL EXAM" },
    { "id": "rf-8", "question": "The FAIR VALUE for derivatives in accounting standards is its Book Value – State True or False?", "options": ["True", "False"], "answer": "False", "explanation": "Fair value refers to the current mark-to-market or liquidation value, not book value.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-9", "question": "Which of the following is a correct measure of the realized return for a zero-coupon bond?", "options": ["Yield-to-maturity (YTM)", "Coupon", "Current yield", "None of the above"], "answer": "Yield-to-maturity (YTM)", "explanation": "Since there are no periodic cash flows, the YTM fully captures the return of a zero-coupon bond.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-10", "question": "Every debit in Gilt Account would require authorization from Gilt Account Holder, and the right to set off cannot be applied in the Gilt Account – State True or False?", "options": ["True", "False"], "answer": "True", "explanation": null, "topic": "REAL FEEL EXAM" },
    { "id": "rf-11", "question": "To convert interest rate into interest amount, which of the following parameter(s) need to be specified?", "options": ["payment timing", "day count fraction", "compounding frequency", "All of the above"], "answer": "All of the above", "explanation": "Conversion requires specification of all interest calculation parameters including payment timing, compounding, and day count basis.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-12", "question": "Quantity Freeze is a limit set by the Exchange on the trade size - State True or False?", "options": ["True", "False"], "answer": "True", "explanation": "It ensures that large erroneous orders are flagged and confirmed separately before execution.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-13", "question": "Delivery Margin is payable on the Day of Intent - State True or False?", "options": ["True", "False"], "answer": "True", "explanation": "The Delivery Margin is collected once intention to deliver is communicated on the Last Trading Day (Day of Intent).", "topic": "REAL FEEL EXAM" },
    { "id": "rf-14", "question": "Which of the following constitute the 'capital' market?", "options": ["Equity and forex markets", "Money and bond markets", "Debt and equity markets", "Bond and equity markets"], "answer": "Bond and equity markets", "explanation": null, "topic": "REAL FEEL EXAM" },
    { "id": "rf-15", "question": "Some months back the 3-month rate was 10.2% and the 3-year rate was 10.8%. Currently, the 3-month rate is 10.5% and the 3-year rate is 10.9%. What is the shift of this term structure called?", "options": ["Steepening", "Flattening", "Parallel", "Perpendicular"], "answer": "Flattening", "explanation": "The difference narrowed from 0.6% to 0.4%, hence the yield curve is flattening.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-16", "question": "A trading member has two clients - Client X and Client Y. Client X has a net long position of 5 and Client Y has a net short position of 8. What is the net position for the trading member?", "options": ["Long 5 and short 8", "Short 3", "Long 5", "None of the above"], "answer": "Long 5 and short 8", "explanation": "Client trades cannot be netted against each other. Positions are shown separately for each client.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-17", "question": "One of the reasons that 'Coupon' is not a true measure of return is that it ignores the premium or discount in bond price - State True or False?", "options": ["True", "False"], "answer": "True", "explanation": null, "topic": "REAL FEEL EXAM" },
    { "id": "rf-18", "question": "If the shape of term structure is 'Flat', it implies that __________.", "options": ["Longer the term, the lower is the rate", "Longer the term, the higher is the rate", "Rate is the same for all terms", "Rate is high for medium term and falls off on either side"], "answer": "Rate is the same for all terms", "explanation": null, "topic": "REAL FEEL EXAM" },
    { "id": "rf-19", "question": "A Good Till Day order will get executed as soon the trigger price is hit in the market – State True or False?", "options": ["True", "False"], "answer": "False", "explanation": "This applies to Stop-Loss orders. GTT is a limit order valid for the trading day.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-20", "question": "When there is a failure to notify the Intent to Deliver, the auction is conducted on the second business day after the Day of Intention - State True or False?", "options": ["True", "False"], "answer": "False", "explanation": "Auction is conducted on the first business day after the Day of Intention in case of delivery failure.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-21", "question": "The settlement for the currently traded bond futures is __________.", "options": ["cash", "physical", "cash or physical as decided by the buyer", "cash or physical as decided by the seller"], "answer": "cash", "explanation": "Currently, bond futures traded on Indian exchanges are settled in cash, not by physical delivery.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-22", "question": "Some months back the 3-month rate was 9% and the 2-year rate was 10%. Currently, the 3-month rate is 9.2% and the 2-year rate is 10.8%. What is the shift of this term structure called?", "options": ["Steepening", "Flattening", "Parallel", "None of the above"], "answer": "Steepening", "explanation": "The difference between long-term and short-term rates increased from 1% to 1.6%. This widening indicates a steepening of the yield curve.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-23", "question": "What is the maturity of the underlying for Treasury Bill futures in India?", "options": ["14 Day", "182 Day", "364 Day", "None of the above"], "answer": "None of the above", "explanation": "The underlying for Treasury Bill futures in India is a 91-day Treasury Bill.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-24", "question": "What is the implication of 'Inverted' shape of term structure?", "options": ["Rate is high for medium term and falls off on either side", "Rate is the same for all terms", "Longer the term, the higher is the rate", "Rate rises first and then falls with the term"], "answer": "Rate rises first and then falls with the term", "explanation": "An inverted yield curve suggests short-term interest rates are higher than long-term rates, possibly signaling economic slowdown.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-25", "question": "Modified Duration and Macaulay Duration both measure the reinvestment risks – State True or False?", "options": ["True", "False"], "answer": "False", "explanation": "Both Modified and Macaulay Duration are measures of price risk, not reinvestment risk.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-26", "question": "The Settlement Risk is overcome by the __________ mode of settlement.", "options": ["Cash", "Delivery versus Payment", "Both 1 and 2", "None of the above"], "answer": "Delivery versus Payment", "explanation": "DVP ensures that delivery of securities occurs simultaneously with payment, reducing counterparty risk.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-27", "question": "Repo transaction means __________.", "options": ["Borrowing security and lending money", "Borrowing money and lending security", "Both 1 and 2", "None of the above"], "answer": "Borrowing money and lending security", "explanation": "A repo is a repurchase agreement where a party borrows money and provides securities as collateral.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-28", "question": "Among the following options, which quantity of face value can be bought or sold for Govt. bond futures?", "options": ["Rs 200000", "Rs 1000000", "Rs 1400000", "All of the above"], "answer": "All of the above", "explanation": "Government bond futures are traded in multiples of Rs 200,000 face value, so all listed options are valid.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-29", "question": "The underlying for 'Interest rate derivative' should be __________.", "options": ["Borrowing / Lending of money", "A specific instrument issued by a specific borrower", "Both 1 and 2", "None of the above"], "answer": "None of the above", "explanation": "Interest rate derivatives are based on an interest rate (not a specific instrument). Bond derivatives are based on specific instruments.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-30", "question": "The Contract Amount (or Market Lot) for Government Bond futures is Rs 100000 of face value - State True or False?", "options": ["True", "False"], "answer": "False", "explanation": "The standard contract size for government bond futures is Rs 200,000 face value.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-31", "question": "The major economic role of derivatives is risk management - State True or False?", "options": ["True", "False"], "answer": "True", "explanation": null, "topic": "REAL FEEL EXAM" },
    { "id": "rf-32", "question": "The regulator for the Exchange-traded interest rate derivatives is __________.", "options": ["Reserve Bank of India", "Securities and Exchange Board of India", "Clearing Corporation", "Stock Exchanges"], "answer": "Securities and Exchange Board of India", "explanation": null, "topic": "REAL FEEL EXAM" },
    { "id": "rf-33", "question": "Every futures seller will prefer to deliver '__________' bond as the Conversion Factor remains constant during the Delivery Month.", "options": ["best-to-deliver", "cheapest-to-deliver", "expensive-to-deliver", "optimum-to-deliver"], "answer": "cheapest-to-deliver", "explanation": null, "topic": "REAL FEEL EXAM" },
    { "id": "rf-34", "question": "When the interest rate falls with the tenor of a bond, the shape of term structure is called __________.", "options": ["Humped", "Flat", "Normal", "Inverted"], "answer": "Inverted", "explanation": null, "topic": "REAL FEEL EXAM" },
    { "id": "rf-35", "question": "The __________ will frame the operational rules and procedures for interest rate derivatives trading in India.", "options": ["Exchanges", "RBI", "SEBI", "Jointly by RBI and SEBI"], "answer": "Exchanges", "explanation": "While regulations are framed by SEBI and RBI, the Exchanges set the operational procedures within those regulations.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-36", "question": "The Economic Role of derivatives is __________.", "options": ["Delta hedging", "Financing", "Consumption", "Risk Management"], "answer": "Risk Management", "explanation": null, "topic": "REAL FEEL EXAM" },
    { "id": "rf-37", "question": "When the term structure curve shifts in clockwise direction, the shift is __________.", "options": ["Flattening", "Steepening", "Parallel", "Vertical"], "answer": "Flattening", "explanation": null, "topic": "REAL FEEL EXAM" },
    { "id": "rf-38", "question": "When there is a short-delivery on the settlement day, the shortage is auctioned on the same day and this is called 'Auction-in' - State True or False?", "options": ["False", "True"], "answer": "False", "explanation": "The correct term is 'Buy-in', not 'Auction-in'.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-39", "question": "Other things remaining constant, the Modified Duration will __________ if the coupon payment frequency of bond decreases.", "options": ["Increase", "Decrease", "Can either increase or decrease", "Remain constant"], "answer": "Increase", "explanation": "Less frequent coupon payments result in longer average duration of cash flows, hence higher modified duration.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-40", "question": "__________ pays the principal amount periodically till maturity.", "options": ["Coupon bond", "Annuity", "Consol", "Zero Coupon bond"], "answer": "Annuity", "explanation": "An annuity provides a series of equal payments over time, each including principal and interest.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-41", "question": "__________ is the account between investors and primary dealers for holding Govt. Securities.", "options": ["PDO Account", "Constituent Subsidiary General Ledger Account", "Subsidiary General Ledger Account", "Gilt Account"], "answer": "Gilt Account", "explanation": "Entities other than Schedule Commercial Banks and Primary Dealers use Gilt Accounts to hold government securities. These accounts are opened with a designated SCB or PD.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-42", "question": "When there is physical settlement of Govt. Bond futures, the seller has to deliver __________.", "options": ["any specified deliverable bond", "any bond which the seller has", "the bond which is exactly matching the coupon", "any bond of Govt. of India"], "answer": "any specified deliverable bond", "explanation": "The seller must deliver from a basket of specified deliverable bonds. Conversion factors are applied to make delivery neutral.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-43", "question": "Can Government Bond futures of Rs 15 lakhs be bought by an investor?", "options": ["Yes", "No"], "answer": "No", "explanation": "Bond futures are traded in multiples of Rs 2 lakhs face value. Rs 15 lakhs is not a valid multiple.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-44", "question": "The size of settlement risk is equal to the __________.", "options": ["trade value", "replacement cost", "replacement gain", "credit risk"], "answer": "trade value", "explanation": "Settlement risk is the full exposure of the trade value if one party defaults after the other has performed.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-45", "question": "Government Bond derivatives are settled by __________.", "options": ["cash", "physical delivery", "may be physical or cash settled", "None of the above"], "answer": "may be physical or cash settled", "explanation": "Bond futures contracts in India may be settled via physical delivery or cash settlement depending on the contract design.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-46", "question": "When there is a failure to notify the Intent to Deliver, the shortage is auctioned on the same day and this is called 'buy-in' - State True or False?", "options": ["True", "False"], "answer": "False", "explanation": "'Buy-in' refers to auctioning a short delivery on the settlement day. Failure to notify intent results in an auction on the next business day.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-47", "question": "Market liquidity risk is the inability to quickly buy or sell futures contracts without disturbing the futures price - State True or False?", "options": ["True", "False"], "answer": "True", "explanation": "Market liquidity risk arises when executing trades moves the price significantly due to insufficient depth in the market.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-48", "question": "Assume that the 6-month rate is 5.5%, the 1-year rate is 7%, and the 10-year rate is 6.2%. The shape of the term structure would be __________.", "options": ["Humped", "Inverted", "Flat", "Normal"], "answer": "Humped", "explanation": "The medium-term (1 year) rate is higher than both the short and long term, indicating a humped yield curve.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-49", "question": "To make the notional bond and a Deliverable Bond equivalent in value, a Conversion Factor is employed, which is same to each Deliverable Bond - State True or False?", "options": ["True", "False"], "answer": "False", "explanation": "Conversion factors vary by deliverable bond depending on their coupon and maturity characteristics.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-50", "question": "Which of the following is interest rate risk?", "options": ["Price Risk", "Reinvestment Risk", "Both 1 and 2", "None of the above"], "answer": "Price Risk", "explanation": "Interest rate risk primarily refers to the price risk due to bond price fluctuations from changes in market interest rates.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-51", "question": "Position limits are defined only at the Trading member level – State True or False?", "options": ["True", "False"], "answer": "False", "explanation": "Position limits are applied at multiple levels – Client, Trading Member, and Exchange – to manage systemic risk.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-52", "question": "The price of a derivative is basically determined by __________.", "options": ["Demand and supply of the derivative", "Exchange in which it is traded", "Underlying", "None of the above"], "answer": "Underlying", "explanation": "A derivative derives its value from the price of the underlying asset, not from its own demand-supply dynamics.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-53", "question": "Mr. A has purchased a par bond for Rs 10 lakhs. Later, the YTM falls by one basis point (0.01%). The Modified Duration is 5.80. What is the market value of the investment after the change in YTM?", "options": ["Rs. 999420", "Rs. 1000580", "Rs. 1005800", "Rs. 994200"], "answer": "Rs. 1000580", "explanation": "Change = 10,00,000 × 5.8 × 0.0001 = 580. New Value = 10,00,000 + 580 = Rs. 10,00,580.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-54", "question": "If the bond is a zero-coupon bond, there will be no reinvestment risk – State True or False?", "options": ["True", "False"], "answer": "True", "explanation": "Zero-coupon bonds pay no interim cash flows, hence no reinvestment risk.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-55", "question": "The Govt Bond futures price changes by 300 ticks. The change in value of one futures contract will be __________.", "options": ["300", "1500", "3", "30"], "answer": "1500", "explanation": "Tick value = Rs. 5. So 300 ticks x Rs. 5 = Rs. 1500.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-56", "question": "The Treasury Bills auction is conducted by the Govt. of India on __________.", "options": ["Monday", "Wednesday", "Friday", "Saturday"], "answer": "Wednesday", "explanation": "T-bills (91-day, 182-day, and 364-day) are auctioned weekly/bi-weekly on Wednesdays.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-57", "question": "For a 6-Year cash settled Interest Rate Futures contract, the underlying shall be a coupon-bearing Government of India security of face value Rs. 100 and residual maturity between 4 and 8 years on the expiry of futures contract ONLY – State True or False?", "options": ["True", "False"], "answer": "False", "explanation": "It can be an actual or notional Gol security. Notional bonds are often used for convenience.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-58", "question": "The legal form of Exchange members can be individuals, partnerships, corporate bodies or banks, except for Professional Clearing Member, who can be only corporate bodies or banks – State True or False?", "options": ["True", "False"], "answer": "True", "explanation": "Professional Clearing Members must be corporate bodies or banks due to clearing and settlement responsibilities.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-59", "question": "If the base price of a security is Rs 500 and the price range is 2%, the opening price will be __________.", "options": ["cannot be lower than 490", "cannot be higher than 510", "both 1 and 2", "None of the above"], "answer": "both 1 and 2", "explanation": "Price band = ±2% of Rs 500 = Rs 10 → Opening price must lie between Rs 490 and Rs 510.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-60", "question": "In __________ bonds, the issuer can prematurely redeem the bonds.", "options": ["Puttable", "Callable", "Zero coupon", "Deep discount"], "answer": "Callable", "explanation": "Callable bonds allow issuers to redeem before maturity, usually when interest rates fall.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-61", "question": "Mr. X has done the following trades in a day: 6 Long positions and 9 short positions in the same underlying. What is his net position at the end of the day?", "options": ["6 long and 9 short", "15 net position", "9 short", "3 short"], "answer": "3 short", "explanation": "Net position = Long – Short = 6 – 9 = -3 → Net 3 short contracts.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-62", "question": "__________ has the highest Notional Amount Outstanding in world derivative markets.", "options": ["Currency Markets", "OTC", "Equity Markets", "Commodity Markets"], "answer": "OTC", "explanation": "OTC derivatives dominate global markets, with notional values nearly 9 times that of exchange-traded derivatives.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-63", "question": "The change in bond price is __________ after the change in interest rate but the effect of reinvestment income is __________.", "options": ["slow over a period of time, instant", "instant, slow over a period of time", "negative, positive", "negligible, huge"], "answer": "instant, slow over a period of time", "explanation": "Bond prices react immediately to interest rate changes. Reinvestment income accrues over time.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-64", "question": "Calendar spread consists of buying and selling futures on the same underlying, for the same quantity and same expiry months. – State True or False?", "options": ["True", "False"], "answer": "False", "explanation": "Calendar spread involves same underlying and quantity, but different expiry months.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-65", "question": "The shifting of 'Clearing Account' to another Clearing Bank will require prior approval of Clearing Corporation - State True or False?", "options": ["True", "False"], "answer": "True", "explanation": "Clearing Corporation must approve such changes to maintain settlement integrity.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-66", "question": "The price of a bond (of Rs 100 face value) is Rs 105. It has a coupon rate of 9%. What is the current yield?", "options": ["9%", "8.57%", "9.33%", "5%"], "answer": "8.57%", "explanation": "Current Yield = (Coupon / Price) × 100 = (9 / 105) × 100 = 8.57%", "topic": "REAL FEEL EXAM" },
    { "id": "rf-67", "question": "'Current yield' return calculation is better than 'coupon' but is still not a true return because it does not consider the premium/discount in bond price - State True or False?", "options": ["True", "False"], "answer": "False", "explanation": "Current yield does consider price premium/discount but ignores capital gains and reinvestment returns.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-68", "question": "Swaps are Exchange traded instruments – State True or False?", "options": ["True", "False"], "answer": "False", "explanation": "Swaps are OTC instruments and are not traded on exchanges.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-69", "question": "A Trading cum clearing member can settle trades but cannot execute them on the Exchange - State True or False?", "options": ["True", "False"], "answer": "False", "explanation": "They can both execute and settle trades on the Exchange and Clearing Corporation.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-70", "question": "The right sequence of products launched in the Indian Exchange traded derivatives market is: First - Equity Index futures, then - Equity Index options, Single stock options, and Single stock futures - State True or False?", "options": ["True", "False"], "answer": "True", "explanation": null, "topic": "REAL FEEL EXAM" },
    { "id": "rf-71", "question": "In __________ the period is less than one year; and in __________ it is one year or more.", "options": ["bond market, money market", "money market, equity market", "bond market, commodity market", "money market, bond market"], "answer": "money market, bond market", "explanation": null, "topic": "REAL FEEL EXAM" },
    { "id": "rf-72", "question": "The __________ is predominantly determined by inflation outlook and the capital expenditure by industry and business.", "options": ["long-term rate", "short-term rate", "Both 1 and 2", "None of the above"], "answer": "long-term rate", "explanation": "Long-term rates reflect expectations of inflation and growth; short-term rates reflect liquidity conditions.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-73", "question": "VaR will be slightly higher for short positions than for long positions - State True or False?", "options": ["True", "False"], "answer": "True", "explanation": "Short positions have theoretically unlimited loss potential, unlike long positions (limited to zero).", "topic": "REAL FEEL EXAM" },
    { "id": "rf-74", "question": "The expiry date for Treasury Bill futures contract is __________.", "options": ["Last Thursday of Expiry Month", "Last Wednesday of Expiry Month", "Last Friday of Expiry Month", "None of the above"], "answer": "Last Wednesday of Expiry Month", "explanation": null, "topic": "REAL FEEL EXAM" },
    { "id": "rf-75", "question": "Among the following options, which is the most liquid tenor in Bond markets?", "options": ["10 Year", "15 Year", "25 Year", "30 Year"], "answer": "10 Year", "explanation": "2Y and 10Y bonds are the most actively traded tenors in bond markets.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-76", "question": "A zero-coupon bond issued by a corporate held till maturity will have which of the following risks?", "options": ["Price risk", "Reinvestment risk", "Both 1 and 2", "None of the above"], "answer": "None of the above", "explanation": "No coupon payments → No reinvestment risk. Held till maturity → No price risk.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-77", "question": "No separate position limit is prescribed at clearing member level for 10-year bond futures - State True or False?", "options": ["True", "False"], "answer": "True", "explanation": "Position limits are set at client and member levels, not specifically at the clearing member level for bond futures.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-78", "question": "The underlying for Bond Derivatives is the Interest rate of that bond - State True or False?", "options": ["True", "False"], "answer": "False", "explanation": "The underlying is the specific bond/security itself, not its interest rate.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-79", "question": "Yield to Maturity (YTM) can be considered as the TRUE measure of return – State True or False?", "options": ["True", "False"], "answer": "False", "explanation": "YTM ignores reinvestment rate assumptions. Spot rate is a more accurate return measure.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-80", "question": "Equity derivative markets have penetrated remarkably in world economies and are considered to be the biggest in size in terms of turnover - State True or False?", "options": ["True", "False"], "answer": "False", "explanation": "Interest rate derivatives dominate in terms of global notional and turnover.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-81", "question": "Amongst the following, who can maintain Constituent Subsidiary General Ledger (CSGL) account with the Public Debt Office (PDO) of RBI?", "options": ["CDSL", "NSDL", "Both CDSL and NSDL", "None of the above"], "answer": "Both CDSL and NSDL", "explanation": "PDO has allowed NSDL and CDSL to maintain CSGL Accounts with it so that retail investors can hold government securities in their demat accounts through DPs.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-82", "question": "The Notice of Intent to deliver has to be served by the close of one business day prior to the last business day (expiry day) of Contract Month – State True or False?", "options": ["True", "False"], "answer": "False", "explanation": "The Notice of Intent must be served two business days prior to the last business day (expiry day) of the contract month.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-83", "question": "When a Stop Loss sell order is entered, the trigger price has to be __________.", "options": ["higher than current offer price", "higher than current bid price", "lower than current offer price", "lower than current bid price"], "answer": "lower than current bid price", "explanation": "For a stop-loss sell order, the trigger price should be lower than the current bid price to ensure execution once the price drops.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-84", "question": "To protect itself from default of buyer and seller, the Clearing Corporation uses the process of __________.", "options": ["mark-to-mark", "margining", "both 1 and 2", "None of the above"], "answer": "both 1 and 2", "explanation": "Clearing Corporations use both margining and mark-to-market settlement to mitigate counterparty and settlement risk.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-85", "question": "Value-at-risk (VaR) is a measure of maximum likely price change over a given interval / horizon and at a given confidence level / percentile – State True or False?", "options": ["True", "False"], "answer": "True", "explanation": null, "topic": "REAL FEEL EXAM" },
    { "id": "rf-86", "question": "Assume that the 6-month rate is 5.5% and the 1-year rate is 7%. What should be the 5-year rate so that the shape of term structure would be Normal?", "options": ["6.5%", "7%", "8.5%", "4%"], "answer": "8.5%", "explanation": "In a normal yield curve, interest rates increase with term. So the 5-year rate must be higher than 1-year; 8.5% fits.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-87", "question": "The last trading day for Treasury Bill future contract is Last Thursday of Contract Month (or the previous trading day if it falls on a holiday) – State True or False?", "options": ["True", "False"], "answer": "False", "explanation": "For T-Bill futures, the last trading day is the Last Wednesday of the contract month (or previous day if holiday).", "topic": "REAL FEEL EXAM" },
    { "id": "rf-88", "question": "For the Open Position on the Last Trading Day, the __________ must notify the Clearing Corporation the notice of intent to deliver.", "options": ["Futures seller", "Futures buyer", "Both 1 and 2", "None of the above"], "answer": "Futures seller", "explanation": "The futures seller must serve the Notice of Intent to Deliver to the Clearing Corporation.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-89", "question": "The price quotation for T-bill is __________.", "options": ["100 plus the discount rate", "100 minus the investment yield", "100 minus the discount rate", "price per 100 face value"], "answer": "100 minus the discount rate", "explanation": "T-bills are quoted as 100 minus discount rate, unlike bonds which are quoted in price per ₹100 face value.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-90", "question": "A Professional Clearing Member is a member of __________.", "options": ["The Exchange", "The Clearing Corporation", "Both 1 and 2", "None of the above"], "answer": "The Clearing Corporation", "explanation": "A Professional Clearing Member (PCM) is a member of Clearing Corporation only, not of the exchange.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-91", "question": "A Professional Clearing Member is a member of the Clearing Corporation only and not of the Exchange - State True or False?", "options": ["True", "False"], "answer": "True", "explanation": null, "topic": "REAL FEEL EXAM" },
    { "id": "rf-92", "question": "In terms of face value, the contract amount for government bond futures is ₹25,000. – State True or False?", "options": ["True", "False"], "answer": "False", "explanation": "The face value for Govt. Bond futures contract is ₹200,000, not ₹25,000.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-93", "question": "The highest risk a bank or financial institution faces is that of Currency Risk – State True or False?", "options": ["True", "False"], "answer": "False", "explanation": "Interest rate risk is typically the most significant risk faced by banks and financial institutions.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-94", "question": "In the secondary market, the accrued interest is paid by the buyers to sellers of the coupon bearing bonds - State True or False?", "options": ["True", "False"], "answer": "True", "explanation": "To fairly compensate sellers (who hold the bond till settlement), buyers pay accrued interest.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-95", "question": "The Derivatives Exchange and the Clearing Corporation for this derivative exchange are one single entity - State True or False?", "options": ["True", "False"], "answer": "False", "explanation": "They are distinct legal entities: the Exchange handles trading, while Clearing Corporation handles clearing and settlement.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-96", "question": "Retail investors can open demat account for government securities with __________.", "options": ["Public Debt Office, RBI", "National Securities Depository Ltd (NSDL)", "Central Depository Services (India) Ltd (CDSL)", "Either 2 or 3"], "answer": "Either 2 or 3", "explanation": "Retail investors can open demat accounts with NSDL or CDSL to hold G-Secs.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-97", "question": "If the price of a Govt. bond future is ₹111.75, what will the market value of one contract?", "options": ["₹111,750", "₹223,500", "₹142,300", "₹411,000"], "answer": "₹223,500", "explanation": "Market value = Price x Lot size = 111.75 × 2000 = ₹223,500.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-98", "question": "When there is a short-delivery on the settlement day, the shortage is auctioned on the next business day – State True or False?", "options": ["True", "False"], "answer": "False", "explanation": "Shortage is auctioned on the same day of settlement to avoid delay in deliveries.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-99", "question": "If the difference between Long term Rates and Short term Rates falls or narrows, then the term structure of rates is called __________.", "options": ["Steepening", "Flattening", "Parallel", "Perpendicular"], "answer": "Flattening", "explanation": "Flattening occurs when the yield curve becomes less steep due to narrowing rate differences between short and long terms.", "topic": "REAL FEEL EXAM" },
    { "id": "rf-100", "question": "Mr. Sharma wishes to invest in Government Bonds and wishes to open a Gilt account. As per rules he can open only one Gilt account – State True or False?", "options": ["True", "False"], "answer": "True", "explanation": "Investors are permitted to open only one Gilt account for holding government securities.", "topic": "REAL FEEL EXAM" },

    // PRACTICE SET-1
    { "id": "ps1-1", "question": "To whom is a high impact cost beneficial?", "options": ["Only buyers", "Only sellers", "Neither buyers nor sellers", "Only arbitrageurs"], "answer": "Neither buyers nor sellers", "explanation": "A high impact cost increases the buying price and reduces the selling price, making it disadvantageous to both buyers and sellers.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-2", "question": "Initial margin to be paid in derivatives is set up taking into account the volatility of the underlying market. Generally __________.", "options": ["Lower the volatility, higher the initial margin", "Higher the volatility, lower the initial margin", "Higher the volatility, higher the initial margin", "None of the above"], "answer": "Higher the volatility, higher the initial margin", "explanation": "Higher volatility implies greater risk; hence, higher margins are imposed to safeguard traders and members.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-3", "question": "__________ is the ratio of change in option premium for a unit change in volatility.", "options": ["Rho", "Theta", "Delta", "Vega"], "answer": "Vega", "explanation": "Vega measures the sensitivity of the option premium to changes in market volatility.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-4", "question": "In a derivatives exchange, the networth requirement for a clearing member is higher than that of a non-clearing member – State whether True or False?", "options": ["True", "False"], "answer": "True", "explanation": "Clearing members bear more responsibility and must maintain a higher net worth.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-5", "question": "The risk that cannot be controlled by diversification of portfolio is __________.", "options": ["Systematic Risk", "Unsystematic Risk", "Credit Risk", "Operational Risk"], "answer": "Systematic Risk", "explanation": "Systematic risk affects the entire market and cannot be eliminated through diversification.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-6", "question": "Can a long position in a Put option be closed out by taking a short position in a call option with identical exercise date and exercise price?", "options": ["Yes", "No"], "answer": "No", "explanation": "A long Put position must be closed by selling the same Put, not by taking a Call position.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-7", "question": "After the initiation of the futures contract, the price of the underlying asset has risen. In this situation, __________.", "options": ["Price change in underlying has no effect on positions", "A long position becomes unprofitable", "A short position becomes profitable", "A long position becomes profitable"], "answer": "A long position becomes profitable", "explanation": "A rise in the underlying price benefits the buyer (long position) of the futures.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-8", "question": "There are many products in the market which give high returns in a risk-free manner – True or False?", "options": ["True", "False"], "answer": "False", "explanation": "Higher returns are generally associated with higher risks. No product gives high returns risk-free.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-9", "question": "What will be the Delta for a Far Out-of-the-money option?", "options": ["Near 0", "Near 1", "Near -1", "Near 2"], "answer": "Near 0", "explanation": "Far OTM options have very low probability of ending in-the-money, thus Delta nears zero.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-10", "question": "The term mark-to-market means __________.", "options": ["Process of checking portfolio profits/losses", "The current / spot index price", "Broker's intimation for additional funds", "Daily revaluation of open positions by the exchange"], "answer": "Daily revaluation of open positions by the exchange", "explanation": "MTM adjusts positions to reflect daily gains/losses based on market prices.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-11", "question": "The margining system for index futures is based on __________.", "options": ["Margin at risk", "Price at risk", "Volume at risk", "Value at risk"], "answer": "Value at risk", "explanation": "Index futures margins are calculated using VAR methodology at 99% confidence level.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-12", "question": "Mr. Ashu has bought 100 shares of ABC at Rs 980 per share and doesn’t want to lose more than Rs 1000. What should he do?", "options": ["Stop loss at Rs 990", "Stop loss at Rs 970", "Limit buy at Rs 990", "Limit sell at Rs 970"], "answer": "Stop loss at Rs 970", "explanation": "A Rs 10 drop would result in Rs 1000 loss on 100 shares. Hence, stop loss at Rs 970.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-13", "question": "A call option gives the buyer the right to buy the underlying at market price – True or False?", "options": ["True", "False"], "answer": "False", "explanation": "A call option gives the right to buy at the strike price, not the market price.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-14", "question": "A trader buys a Jan ABC futures contract at Rs 768 (lot size 1200) and squares off at Rs 778. What is the profit/loss?", "options": ["Rs 12000", "Rs 1200000", "-Rs 12000", "-Rs 10000"], "answer": "Rs 12000", "explanation": "Profit per share = Rs 10 × 1200 = Rs 12000.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-15", "question": "A Professional Clearing Member of the derivatives segment __________.", "options": ["Must be a cash segment member", "Must become one within 2 years", "Provides trading facilities to clients", "Does not have trading rights"], "answer": "Does not have trading rights", "explanation": "PCMs provide clearing services but cannot trade on the exchange.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-16", "question": "Theta is a measure of the sensitivity of an option price to changes in market volatility – True or False?", "options": ["True", "False"], "answer": "False", "explanation": "Theta measures sensitivity to time decay; Vega measures sensitivity to volatility.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-17", "question": "Which of these complaints against a trading member can an Exchange redress?", "options": ["Land dealings", "Arbitrated transaction issues", "Notional loss claims", "Unauthorized transaction in client account"], "answer": "Unauthorized transaction in client account", "explanation": "Exchanges can address unauthorized trading, margin shortfalls, delay in settlement, etc.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-18", "question": "In India, the clearing and settlement of derivatives trades is done through:", "options": ["State Bank of India", "Euroclear", "SEBI approved Clearing Corporation / Clearing House", "The Interbank Clearing House"], "answer": "SEBI approved Clearing Corporation / Clearing House", "explanation": "Clearing of F&O trades is handled by SEBI-approved clearing corporations.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-19", "question": "Delta is the change in option price given a one percentage point change in the risk-free interest rate – True or False?", "options": ["False", "True"], "answer": "False", "explanation": "Rho measures sensitivity to interest rates. Delta is sensitivity to the underlying price.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-20", "question": "Can a Clearing Member give 'Fixed Deposits' as part of liquid assets to the Clearing Corporation?", "options": ["Yes", "No"], "answer": "Yes", "explanation": "Fixed Deposits are acceptable as part of liquid assets along with cash and approved securities.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-21", "question": "Vega measures change in delta with respect to change in price of the underlying asset – True or False?", "options": ["True", "False"], "answer": "False", "explanation": "Vega measures sensitivity to volatility. Gamma measures change in Delta.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-22", "question": "A short position in a PUT option can be closed out by taking a long position in the same PUT option – True or False?", "options": ["False", "True"], "answer": "True", "explanation": "Opposite positions in the same contract (same strike/date) offset each other.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-23", "question": "On final settlement, the buyer/holder of the option will recognize the favorable difference received from the seller/writer as __________ in the profit and loss account.", "options": ["Income", "Expense", "Loan", "Amortization"], "answer": "Income", "explanation": "Any favorable payoff is treated as income in the books of the option holder.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-24", "question": "Higher the strike price, the premium on call option will decrease – True or False?", "options": ["True", "False"], "answer": "True", "explanation": "Higher strike prices make options less valuable (lower intrinsic value), reducing premiums.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-25", "question": "Trading is allowed in Indian equity markets in which of the following?", "options": ["Index Options", "Individual Stock Options", "Individual Stock Futures Options", "All of the above"], "answer": "All of the above", "explanation": "All three instruments are actively traded in Indian derivatives markets.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-26", "question": "Can the exercise price be more than or equal to or less than the cash spot price?", "options": ["Yes", "No"], "answer": "Yes", "explanation": "The strike (exercise) price is fixed for an options contract, while the spot price can fluctuate. Therefore, the exercise price can be greater than, equal to, or less than the cash spot price.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-27", "question": "Can one sell assets in futures market even if he does not own any such assets?", "options": ["Yes", "No"], "answer": "Yes", "explanation": "In futures markets, short-selling is allowed even without owning the underlying asset, as delivery is not mandatory and positions are usually squared off before expiry.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-28", "question": "On the derivatives futures market, if there are three series of one, two and three months open at a point of time, how many calendar spread can one have?", "options": ["1", "2", "3", "4"], "answer": "3", "explanation": "Calendar spreads are possible between (1-2), (2-3), and (1-3) month contracts. Hence, three combinations are possible.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-29", "question": "All the 50 stocks of NSE Nifty index are equally weighed while calculating the index – State True or False?", "options": ["True", "False"], "answer": "False", "explanation": "Nifty 50 is calculated using the free-float market capitalization method, so stocks are not equally weighted. Higher-cap stocks like Reliance have greater weightage than smaller ones.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-30", "question": "What does a Call Option give the buyer?", "options": ["The right but not the obligation", "The obligation but not the right", "Gives both the right and obligation", "Neither the right nor the obligation"], "answer": "The right but not the obligation", "explanation": "A call option gives the buyer the right (but not the obligation) to buy the underlying asset at the strike price before or at expiry.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-31", "question": "Speculators are those who take risk whereas hedgers are those who wish to reduce risk – State True or False?", "options": ["True", "False"], "answer": "True", "explanation": "Hedgers aim to minimize risk from adverse price movements, while speculators take on risk in hopes of making profit from market movements.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-32", "question": "The money and securities which are deposited in a client’s account __________.", "options": ["Can be attached for meeting broker’s obligations", "Cannot be attached for meeting broker’s obligations", "Can or cannot be attached depending on clearing corporation", "None of the above"], "answer": "Cannot be attached for meeting broker’s obligations", "explanation": "Client funds and securities are kept in separate accounts and cannot be used to meet the broker’s proprietary obligations.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-33", "question": "In case there is a Stock Split of a company which is a part of an Index, what will its impact be on the index value?", "options": ["Index value may change unpredictably", "Index value remains unchanged", "Index value will decrease", "Index value will increase"], "answer": "Index value remains unchanged", "explanation": "A stock split affects share price and quantity but not the market capitalization, hence index value remains unaffected.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-34", "question": "'Time Decay' is beneficial to the __________.", "options": ["Option Buyer", "Option Seller", "Both Buyer and Seller equally", "Neither Buyer nor Seller"], "answer": "Option Seller", "explanation": "As time passes, the time value of options erodes, which benefits the seller since the premium reduces.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-35", "question": "Identify the TRUE statement with respect to a Put option.", "options": ["Buyer and seller both have obligations", "Buyer has right to sell to the writer", "Seller has right to buy from the buyer", "Buyer has obligation but not the right"], "answer": "Buyer has right to sell to the writer", "explanation": "A put option gives the buyer the right (not obligation) to sell an asset at a specified price within a timeframe.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-36", "question": "Mr. Menon has bought a futures contract and the price rises. In this case, Mr. Menon will __________.", "options": ["Make a profit", "Make a loss", "Depends on situation", "Insufficient information"], "answer": "Make a profit", "explanation": "Buying a futures contract is a bullish strategy. If the price rises, the buyer profits.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-37", "question": "How is the forward contract, which is for hedging purpose, accounted for in books of accounts?", "options": ["Premium/discount shown in P&L", "Premium/discount ignored", "Premium/discount amortized over contract life", "Not recognized at all"], "answer": "Premium/discount amortized over contract life", "explanation": "Per AS-11, the forward premium or discount is amortized over the life of the contract if used for hedging.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-38", "question": "A Derivative market helps in transferring the risk from __________.", "options": ["Speculators to Hedgers", "Arbitrageurs to Hedgers", "Speculators to Arbitrageurs", "Hedgers to Speculators"], "answer": "Hedgers to Speculators", "explanation": "Derivatives enable hedgers to offload their risk to speculators who are willing to take it.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-39", "question": "Which of these options is an example of a Calendar Spread?", "options": ["Short underpriced 1-month, long overpriced another month", "Long stock futures, short stock", "Long underpriced 1-month, short overpriced another month", "Short stock futures, long stock"], "answer": "Long underpriced 1-month, short overpriced another month", "explanation": "Calendar spreads involve arbitrage between contracts of different expiry months. The strategy profits from pricing inefficiencies.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-40", "question": "Ms. Kavita wants to 'Sell' on a futures market. For this, she __________.", "options": ["Need not own the underlying", "Must own the underlying", "Must own at least 25% of underlying", "Must own at least 50% of underlying"], "answer": "Need not own the underlying", "explanation": "Futures contracts are standardized and traded on margin. Ownership of underlying is not required to sell.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-41", "question": "The Derivatives market helps in __________.", "options": ["Transferring risk from low to high risk appetite participants", "Reallocating risk among participants", "Both of the above", "None of the above"], "answer": "Both of the above", "explanation": "Derivatives help in risk transfer and reallocation, aiding both hedgers and speculators.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-42", "question": "Identify the FALSE statement with respect to Options.", "options": ["Option contracts are NOT symmetrical", "Buyer gets right, seller bears obligation", "Options have non-linear payoffs", "Options have linear payoffs"], "answer": "Options have linear payoffs", "explanation": "Options have asymmetric and non-linear payoffs. The buyer’s risk is limited; the seller’s risk can be unlimited.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-43", "question": "'SCORES' is the name given to __________.", "options": ["SEBI’s complaint redressal system", "Securities Collateral Records System", "Exchange’s risk and margin system", "Suspicious transaction reporting"], "answer": "SEBI’s complaint redressal system", "explanation": "SCORES stands for SEBI COmplaints REdress System – a centralized online grievance mechanism.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-44", "question": "A trading member reaches his prescribed position limits. Therefore, he will __________.", "options": ["Be allowed 5% more exposure", "Not be able to reverse positions", "Can take fresh positions for clients", "Not be able to open new positions"], "answer": "Not be able to open new positions", "explanation": "When position limits are breached, no fresh positions are allowed. Only reversal of existing ones is permitted.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-45", "question": "A calendar spread in index futures will be treated as __________ in a far month contract if the near month contract expires.", "options": ["Long position", "Short position", "Optional position", "Naked position"], "answer": "Naked position", "explanation": "With one leg expired, the spread becomes a single directional or naked position, increasing risk exposure.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-46", "question": "The clearing member is free to close out transactions of a trading member if __________.", "options": ["Initial margin not paid", "Daily settlement dues not paid", "Both of the above", "None of the above"], "answer": "Both of the above", "explanation": "Clearing members can close out positions if margin or settlement dues are unpaid, to mitigate systemic risk.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-47", "question": "Identify the contract which is cleared and settled bilaterally:", "options": ["1-month Nifty futures", "1-month USDINR options", "3-month forward to buy CHF against INR", "1-month GOI bond futures"], "answer": "3-month forward to buy CHF against INR", "explanation": "Forward contracts are over-the-counter and bilateral, unlike exchange-traded futures and options.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-48", "question": "When the volatility of the underlying stock decreases, the premium of its Call option will __________.", "options": ["Increase", "Decrease", "Not change", "None of the above"], "answer": "Decrease", "explanation": "Option premiums are directly proportional to volatility. Lower volatility leads to lower premium.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-49", "question": "A European call option will give the buyer the right (but not the obligation) to buy the underlying at the strike price __________.", "options": ["Only on the expiry date", "On or before the expiry date", "One day before expiry", "One day after expiry"], "answer": "Only on the expiry date", "explanation": "European options can only be exercised on the expiry date, unlike American options.", "topic": "PRACTICE SET-1" },
    { "id": "ps1-50", "question": "In futures trading, the margin is paid by __________.", "options": ["Buyer only", "Seller only", "Both Buyer and Seller", "Clearing Corporation"], "answer": "Both Buyer and Seller", "explanation": "Both parties to a futures contract must deposit initial margin with the exchange to safeguard against default.", "topic": "PRACTICE SET-1" }
];


// --- Helper function for analysis with negative marking ---
const calculateAnalysis = (questions) => {
  const totalQuestions = questions.length;
  let correctCount = 0;
  let incorrectCount = 0;
  const topicStats = {};

  questions.forEach((q) => {
    if (!topicStats[q.topic]) {
      topicStats[q.topic] = { correct: 0, total: 0 };
    }
    
    if (q.userAnswer) {
        topicStats[q.topic].total++;
        if (q.userAnswer === q.answer) {
            correctCount++;
            topicStats[q.topic].correct++;
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

// --- The Zustand Store: store/quizStore.js ---
export const useQuizStore = create((set, get) => ({
  questions: [],
  currentQuestionIndex: 0,
  isTestRunning: false,
  startTime: 0,
  finalResults: null,
  testDurationMinutes: 0,

  startQuiz: (numberOfQuestions) => {
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, numberOfQuestions);
    const duration = Math.ceil(numberOfQuestions * 1.2); 
    
    set({
      questions: selectedQuestions.map(q => ({ ...q, userAnswer: null })),
      currentQuestionIndex: 0,
      isTestRunning: true,
      startTime: Date.now(),
      finalResults: null,
      testDurationMinutes: duration,
    });
  },

  selectAnswer: (questionId, answer) => {
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === questionId ? { ...q, userAnswer: answer } : q
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
      })
  }
}));


// --- Components ---

function QuestionCard({ question, questionNumber }) {
  const { selectAnswer, navigateToQuestion, currentQuestionIndex, questions } = useQuizStore();
  const userAnswer = question.userAnswer;

  const handleSelectAndAdvance = (option) => {
    if (userAnswer) return; 

    selectAnswer(question.id, option);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        navigateToQuestion(currentQuestionIndex + 1);
      }
    }, 500); 
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Question {questionNumber}
      </h2>
      <p className="text-lg text-gray-700 mb-6">{question.question}</p>

      <div className="space-y-4">
        {question.options.map((option, index) => (
          <div
            key={index}
            onClick={() => handleSelectAndAdvance(option)}
            className={`p-4 border-2 rounded-lg transition-all ${userAnswer ? 'cursor-default' : 'cursor-pointer'}
              ${userAnswer === option 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
              }`}
          >
            <span className="font-medium text-gray-800">{option}</span>
          </div>
        ))}
      </div>
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
  const [numQuestions, setNumQuestions] = useState(Math.min(10, maxQuestions));

  useEffect(() => {
      if (numQuestions > maxQuestions) {
          setNumQuestions(maxQuestions);
      }
  }, [maxQuestions, numQuestions]);

  const handleStartQuiz = () => {
    if (numQuestions > 0) {
      startQuiz(numQuestions);
      navigate('quiz');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">NISM Derivatives Practice Exam</h1>
        <p className="text-lg text-gray-600 mb-12">Simulate the official exam. Negative marking is applied.</p>
        
        <div className="p-8 bg-white rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-semibold text-blue-600 mb-6">Customize Your Quiz</h2>
          
          <div className="mb-6">
            <label htmlFor="numQuestions" className="block text-lg font-medium text-gray-700 mb-2">
              Number of Questions: <span className="font-bold text-blue-600">{numQuestions}</span>
            </label>
            <input
              type="range"
              id="numQuestions"
              min="1"
              max={maxQuestions}
              value={numQuestions}
              onChange={(e) => setNumQuestions(Number(e.target.value))}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg"
            />
             <p className="text-xs text-gray-500 mt-2">Our question bank currently has {maxQuestions} sample questions.</p>
          </div>

          <button
            onClick={handleStartQuiz}
            disabled={numQuestions === 0}
            className="w-full px-6 py-4 bg-blue-600 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:scale-100"
          >
            Start Quiz
          </button>
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
      const apiKey = ""; 
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
