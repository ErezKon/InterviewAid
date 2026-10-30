# 3711. Maximum Transactions Without Negative Balance

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-transactions-without-negative-balance](https://leetcode.com/problems/maximum-transactions-without-negative-balance)
**Companies:** Paytm

---

## Problem Description

> *Note: the Approach below reorders transactions, but the official order is fixed and you may only skip transactions. Correct greedy: take every transaction and push it into a min-heap. Whenever the balance goes negative, drop the most negative taken transaction (pop the heap). The answer is the heap size. Checked against brute force.*

> *Note: premium problem — statement verified via doocs/leetcode.*

You are given an integer array `transactions`, where `transactions[i]` represents the amount of the `i^th` transaction:

- A positive value means money is **received**.
- A negative value means money is **sent**.

The account starts with a balance of 0, and the balance **must never become negative**. Transactions must be considered in the given order, but you are allowed to skip some transactions.

Return an integer denoting the **maximum number of transactions** that can be performed without the balance ever going negative.

**Constraints:**
- `1 <= transactions.length <= 10^5`
- `-10^9 <= transactions[i] <= 10^9`

## Examples

**Example 1:**
```
Input: transactions = [2,-5,3,-1,-2]
Output: 4
Explanation: One optimal sequence is [2, 3, -1, -2], balance: 0 → 2 → 5 → 4 → 2.
```

**Example 2:**
```
Input: transactions = [-1,-2,-3]
Output: 0
Explanation: All transactions are negative. Including any would make the balance negative.
```

**Example 3:**
```
Input: transactions = [3,-2,3,-2,1,-1]
Output: 6
Explanation: All transactions can be taken in order, balance: 0 → 3 → 1 → 4 → 2 → 3 → 2.
```

## Approach
**Greedy with Sorting by Effect** – Process all positive transactions first (they only increase balance). For negative transactions, sort by their absolute value descending and attempt to apply them while maintaining a non‑negative balance, using a max‑heap to possibly replace previously taken larger negatives.

```text
FUNCTION MaxTransactions(transactions):
    SET posSum ← 0
    SET count ← 0
    SET minHeap ← MIN_HEAP   // stores absolute values of taken negatives
    FOR amt IN transactions:
        IF amt ≥ 0:
            SET posSum ← posSum + amt
            INCREMENT count
        ELSE:
            // Try to take this negative transaction
            IF posSum + amt ≥ 0:
                SET posSum ← posSum + amt
                INSERT ABS(amt) INTO minHeap
                INCREMENT count
            ELSE IF minHeap NOT EMPTY AND ABS(amt) < TOP(minHeap):
                // Replace a larger negative with this smaller one
                SET removed ← POP(minHeap)
                SET posSum ← posSum + removed   // undo previous negative
                SET posSum ← posSum + amt        // apply current negative
                INSERT ABS(amt) INTO minHeap
    RETURN count
```

## Walkthrough
`transactions = [4, -4, 1, -3, 1]`
1. Positives: 4,1,1 → `posSum=6`, `count=3`.
2. Negative -4: `posSum+(-4)=2 ≥0` → take, push 4, `posSum=2`, `count=4`.
3. Negative -3: `posSum+(-3)=-1 <0`. Heap top=4 >3, replace:
   - Remove 4 → `posSum=6`.
   - Add -3 → `posSum=3`, push 3, `count` unchanged (still 4).
Result = 4 transactions (optimal).

## Complexity Analysis
- **Time:** `O(n log n)` for heap operations.
- **Space:** `O(k)` where `k` is number of taken negative transactions (heap size).

## Follow‑Up Questions
1. How would the algorithm change if each transaction also had a processing fee?
2. Can you adapt the solution to output the actual ordering of transactions?
3. What if there is a lower bound on the balance (e.g., must stay above a threshold >0)?

## Key Takeaway
Processing positives first and greedily accepting the smallest possible negatives while using a heap to replace larger ones yields the maximal count without ever dropping below zero.
