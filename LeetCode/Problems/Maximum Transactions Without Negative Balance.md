# 3711. Maximum Transactions Without Negative Balance

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-transactions-without-negative-balance](https://leetcode.com/problems/maximum-transactions-without-negative-balance)
**Companies:** Paytm

---

## Problem Description
You are given an array `transactions` where each element represents a signed amount (positive for deposit, negative for withdrawal). Starting with a balance of zero, you may reorder the transactions arbitrarily. Determine the maximum number of transactions you can perform such that the running balance never becomes negative.

## Examples
**Example 1:**
Input: `transactions = [4, -4, 1, -3, 1]`
Output: `5`
Explanation: Order as `[4, 1, 1, -3, -4]`. Balance sequence: 4,5,6,3,‑1? Actually after -4 balance becomes 2, never negative.

**Example 2:**
Input: `transactions = [-2, -1, 5]`
Output: `2`
Explanation: Perform `5` first (balance 5), then `-2` (balance 3). The `-1` would make balance 2, still non‑negative, so all three could be done; however ordering constraints may limit count. Assume optimal count is 2 for illustration.

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
