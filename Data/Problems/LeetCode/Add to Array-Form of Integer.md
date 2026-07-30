# 989. Add to Array-Form of Integer

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/add-to-array-form-of-integer](https://leetcode.com/problems/add-to-array-form-of-integer)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
Given a non‑negative integer represented as an array of its digits `num` (most significant digit first) and an integer `k`, add `k` to the number and return the resulting sum as an array of digits.

## Examples
**Example 1**
Input: `num = [1,2,0,0], k = 34`
Output: `[1,2,3,4]`
Explanation: 1200 + 34 = 1234.

**Example 2**
Input: `num = [2,7,4], k = 181`
Output: `[4,5,5]`
Explanation: 274 + 181 = 455.

## Approach
**Algorithm:** Simulate addition from the least significant digit using carry, similar to elementary addition.
1. Initialise `carry = k`.
2. Iterate `i` from the last index of `num` down to 0:
   - Set `carry, num[i] = divmod(num[i] + carry, 10)`.
3. After processing all digits, while `carry > 0` prepend the remaining digits of `carry` to `num`.
4. Return `num`.

## Walkthrough
| Step | i | carry before | num[i] + carry | new digit | carry after |
|------|---|--------------|----------------|----------|------------|
| 1 | 3 | 34 | 0+34 = 34 | 4 | 3 |
| 2 | 2 | 3 | 0+3 = 3 | 3 | 0 |
| 3 | 1 | 0 | 2+0 = 2 | 2 | 0 |
| 4 | 0 | 0 | 1+0 = 1 | 1 | 0 |
| End | – | – | – | – | – |
Result: `[1,2,3,4]`

## Complexity Analysis
- **Time:** O(n) where n is the length of `num`.
- **Space:** O(1) extra space besides the output array (modifies in place, may prepend at most O(log k) digits).

## Follow‑Up Questions
1. How would you handle the case where `num` is extremely large and cannot fit in memory?
2. Can the algorithm be adapted to subtract `k` instead of adding?
3. What changes are needed if the digits are stored in reverse order (least‑significant first)?

## Key Takeaway
Adding an integer to an array‑form number is a straightforward digit‑wise addition with carry, processed from the least significant digit.

---

```text
FUNCTION addToArrayForm(num, k):
    carry ← k
    FOR i ← len(num) - 1 DOWNTO 0:
        carry, num[i] ← DIVMOD(num[i] + carry, 10)
    WHILE carry > 0:
        carry, digit ← DIVMOD(carry, 10)
        INSERT digit AT BEGINNING OF num
    RETURN num
```