# 860. Lemonade Change

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/lemonade-change](https://leetcode.com/problems/lemonade-change)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Zalando, Zoho

---

## 1. Problem Description

At a lemonade stand, each lemonade costs `$5`. Customers are standing in a queue to buy from you and order one at a time (in the order specified by bills). Each customer will only buy one lemonade and pay with either a `$5`, `$10`, or `$20` bill. You must provide the correct change to each customer so that the net transaction is that the customer pays `$5`.

Note that you do not have any change in hand at first.

Given an integer array `bills` where `bills[i]` is the bill the `i`-th customer pays, return `true` *if you can provide every customer with the correct change, or* `false` *otherwise*.

**Constraints:**
- `1 <= bills.length <= 10^5`
- `bills[i]` is either `5`, `10`, or `20`.

---

## 2. Examples

```
Example 1:
  Input: bills = [5,5,5,10,20]
  Output: true
  Explanation:
  From the first 3 customers, we collect three $5 bills in order.
  From the fourth customer, we collect a $10 bill and give back a $5.
  From the fifth customer, we give a $10 bill and a $5 bill.
  Since all customers got correct change, we output true.
```

```
Example 2:
  Input: bills = [5,5,10,10,20]
  Output: false
  Explanation:
  From the first two customers in order, we collect two $5 bills.
  For the next two customers in order, we collect a $10 bill and give back a $5 bill.
  For the last customer, we can not give the change of $15 back because we only have two $10 bills.
  Since not every customer received the correct change, the answer is false.
```

---

## 3. Approach: Greedy — O(n) ✅

```text
FUNCTION lemonadeChange(bills):
    // Track count of $5 and $10 bills
    SET fives ← 0
    SET tens ← 0
    FOR bill IN bills:
        IF bill == 5:
            SET fives ← fives + 1
        ELSE IF bill == 10:
            SET fives ← fives - 1
            SET tens ← tens + 1
        ELSE IF bill == 20:
            IF tens > 0:
                SET tens ← tens - 1
                SET fives ← fives - 1
            ELSE:
                SET fives ← fives - 3
        IF fives < 0:
            RETURN false
    RETURN true
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 4. Walkthrough

| Step | bill | fives | tens | Action |
|------|------|-------|------|--------|
| 1 | 5 | 1 | 0 | Accept $5, no change needed |
| 2 | 5 | 2 | 0 | Accept $5 |
| 3 | 5 | 3 | 0 | Accept $5 |
| 4 | 10 | 2 | 1 | Give one $5 as change |
| 5 | 20 | 1 | 0 | Give one $10 and one $5 as change |

All customers received correct change, so the function returns **true**.

---

## 5. Complexity Analysis

- **Time:** O(n) – one pass through the bills array.
- **Space:** O(1) – only two counters are used.

---

## 6. Follow-Up Questions

- How would the solution change if the lemonade price were not fixed at $5?
- Could you extend the algorithm to handle arbitrary bill denominations?
- What if you needed to minimize the total number of bills given as change?

---

## 7. Key Takeaway

> Greedy: for $20, prefer giving a $10+$5 over three $5s (preserve flexibility). Track only $5 and $10 counts.
