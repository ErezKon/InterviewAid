# 2897. Apply Operations on Array to Maximize Sum of Squares

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/apply-operations-on-array-to-maximize-sum-of-squares](https://leetcode.com/problems/apply-operations-on-array-to-maximize-sum-of-squares)
**Companies:** Sprinklr

---

## 1. Problem Description

Given an integer array `nums`, you may repeatedly pick any two indices `i` and `j` and perform the operations:
```
nums[i] = nums[i] AND nums[j]
nums[j] = nums[i] OR nums[j]
```
After performing any number of such operations, select exactly `k` elements from the array. Return the maximum possible sum of the squares of the selected `k` elements, modulo `10^9 + 7`.

---

## 2. Examples

**Example 1:**
```
Input: nums = [1,2,3,4], k = 2
Output: 25
Explanation: Bit counts are: bit0→2, bit1→2, bit2→1.
Construct the two largest numbers: 5 (101) and 4 (100). 5^2 + 4^2 = 25.
```
**Example 2:**
```
Input: nums = [7,7,7], k = 3
Output: 147
Explanation: All numbers are 111. No redistribution changes bits. Sum = 3 * 7^2 = 147.
```

---

## 3. Approach: Bit Count Greedy — O(n × 30) ✅

```text
FUNCTION maxSum(nums, k):
    SET MOD ← 1_000_000_007
    SET bitCount[0..29] ← 0
    FOR each num IN nums:
        FOR b ← 0 TO 29:
            IF (num >> b) AND 1 = 1:
                SET bitCount[b] ← bitCount[b] + 1
    SET result ← 0
    FOR i ← 0 TO k-1:
        SET val ← 0
        FOR b ← 0 TO 29:
            IF bitCount[b] > 0:
                SET val ← val OR (1 << b)
                SET bitCount[b] ← bitCount[b] - 1
        SET result ← (result + val * val) MOD MOD
    RETURN result
```

---

## 4. Walkthrough

| Step | Action | Bit Counts After Step | Constructed Value |
|------|--------|-----------------------|-------------------|
| 1    | Count bits in original array `[1,2,3,4]` | bit0:2, bit1:2, bit2:1 | — |
| 2    | Build first number (i=0) by taking one from each non‑zero count | bit0:1, bit1:1, bit2:0 | `101`₂ = 5 |
| 3    | Build second number (i=1) | bit0:0, bit1:0, bit2:0 | `100`₂ = 4 |
| 4    | Sum of squares: 5² + 4² = 25 |

---

## 5. Complexity Analysis

- **Time:** O(n × B) where B = 30 (number of bit positions) → effectively O(n).
- **Space:** O(B) = O(1) for the bit count array.

---

## Follow-Up Questions

- How would the solution change if the operations were limited to a fixed number of times?
- Can you extend the approach to work with 64‑bit integers efficiently?
- What if the goal is to maximize the sum of the selected elements (not squares)?

---

## Key Takeaway

> AND/OR operations on pairs can freely redistribute bits. The total count of 1s at each bit position is invariant. Greedily assign bits to maximize the sum of squares by concentrating bits into fewer elements.
