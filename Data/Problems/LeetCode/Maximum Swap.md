# 670. Maximum Swap

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-swap](https://leetcode.com/problems/maximum-swap)
**Companies:** Accenture, Amazon, Bloomberg, Google, Meta, Microsoft, Tcs, Tiktok

---

## Problem Description
Given a non‑negative integer `num`, you may swap two digits at most once to obtain the maximum possible value. Return the largest number you can get after at most one swap.

## Examples
**Example 1**
```
Input: num = 2736
Output: 7236
Explanation: Swap the first digit (2) with the third digit (7).
```
**Example 2**
```
Input: num = 9973
Output: 9973
Explanation: No swap can improve the number.
```

## Approach
The greedy strategy scans the digits from left to right while remembering the last (rightmost) occurrence of each digit (0‑9). For each position, we look for a larger digit that appears later; swapping with the largest such digit yields the optimal result.

## Pseudocode
```text
FUNCTION maximumSwap(num):
    // Convert number to list of digits for easy indexing
    SET digits ← LIST_OF_CHARACTERS(STRING(num))
    // Record the last index of each digit 0‑9
    SET lastIdx[0..9] ← ARRAY_FILLED_WITH(-1)
    FOR i ← 0 TO LENGTH(digits)-1:
        SET d ← INTEGER_VALUE(digits[i])
        SET lastIdx[d] ← i
    // Try to find a beneficial swap
    FOR i ← 0 TO LENGTH(digits)-1:
        SET current ← INTEGER_VALUE(digits[i])
        // Look for a larger digit from 9 down to current+1
        FOR d ← 9 DOWN TO current+1:
            IF lastIdx[d] > i:
                // Perform swap with the rightmost occurrence of d
                SET temp ← digits[i]
                SET digits[i] ← digits[lastIdx[d]]
                SET digits[lastIdx[d]] ← temp
                RETURN INTEGER_VALUE(JOIN(digits))
    // No swap improves the number
    RETURN num
```

## Walkthrough
For `num = 2736`, digits = [2,7,3,6]. `lastIdx` becomes {2:0,7:1,3:2,6:3}. At i=0, current=2; we check digits 9→3 and find 7 at index 1 (>0). Swapping yields [7,2,3,6] → 7236, which is returned.

## Complexity Analysis
- **Time:** O(d) where d is the number of digits (≤10 for 32‑bit integers).
- **Space:** O(1) extra space for the `lastIdx` array.

## Follow‑Up Questions
1. How would you extend the algorithm to allow at most `k` swaps?
2. Can you solve the problem without converting the number to a string?
3. What if the input is a very large integer represented as a string?

## Key Takeaway
A single greedy pass using the last occurrence of each digit identifies the optimal swap, achieving linear time with constant extra space.
