# 1295. Find Numbers with Even Number of Digits

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-numbers-with-even-number-of-digits](https://leetcode.com/problems/find-numbers-with-even-number-of-digits)
**Companies:** Amazon, Bloomberg, Cognizant, Google, Meta, Microsoft, Quora

---

## Problem Description
Given an array of non‑negative integers `nums`, count how many of them contain an even number of digits. The number of digits of an integer is the length of its decimal representation without leading zeros.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `[12,345,2,6,7896]` | `2` | `12` and `7896` have 2 and 4 digits respectively. |
| `[555,901,482,1771]` | `1` | Only `1771` has 4 digits. |

## Approach
Iterate through the array and compute the digit count of each number using division or logarithm. Increment a counter when the digit count is even.

```text
FUNCTION countEvenDigitNumbers(nums):
    SET count ← 0
    FOR num IN nums:
        // Compute number of digits
        SET digits ← 0
        SET temp ← num
        WHILE temp > 0:
            SET temp ← temp DIV 10
            SET digits ← digits + 1
        // Handle zero as a single‑digit number
        IF num == 0: SET digits ← 1
        IF digits MOD 2 == 0:
            SET count ← count + 1
    RETURN count
```

## Walkthrough
For the array `[12,345,2,6,7896]`:
- `12` → digits=2 (even) → count=1
- `345` → digits=3 (odd) → count stays 1
- `2` → digits=1 (odd) → count stays 1
- `6` → digits=1 (odd) → count stays 1
- `7896` → digits=4 (even) → count=2
Result is `2`.

## Complexity Analysis
- **Time:** O(n · log M) where `n` is array length and `M` is the maximum number (digit extraction). In practice O(n).
- **Space:** O(1) – only a few integer variables.

## Follow‑Up Questions
1. How would you solve it if the array is extremely large and stored on disk?
2. Can you compute the result without explicit digit extraction, e.g., using pre‑computed ranges?
3. How would the solution change for negative numbers?

## Key Takeaway
Counting even‑digit numbers reduces to a simple per‑element digit length check, achievable in linear time with constant extra space.
