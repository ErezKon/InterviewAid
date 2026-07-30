# 2980. Check if Bitwise OR Has Trailing Zeros

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/check-if-bitwise-or-has-trailing-zeros](https://leetcode.com/problems/check-if-bitwise-or-has-trailing-zeros)
**Companies:** Meituan

---

## 1. Problem Description

Given an array `nums`, return `true` if there exist two or more elements whose bitwise OR has trailing zeros (i.e., the OR result is even).

---

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `[2, 4, 7]` | `true` | `2 | 4 = 6` which is even, so trailing zero exists. |
| `[1, 3, 5]` | `false` | All numbers are odd; any OR will be odd, no trailing zero. |
| `[0, 1]` | `true` | `0 | 1 = 1` is odd, but `0` itself is even, and we have at least two numbers, the pair `(0,0)` (if duplicate) or any pair containing two evens would satisfy. For simplicity, presence of at least two evens yields `true`.

---

## 3. Approach: Count Even Numbers — O(n) ✅

```text
FUNCTION hasTrailingZeros(nums):
    // Count how many numbers are even
    evenCount ← 0
    FOR num IN nums:
        IF num % 2 == 0:
            evenCount ← evenCount + 1
    RETURN evenCount >= 2
```

---

## 4. Walkthrough

Consider the array `[2, 4, 7]`:
1. Initialize `evenCount = 0`.
2. First element `2` is even → `evenCount = 1`.
3. Second element `4` is even → `evenCount = 2`.
4. Since `evenCount >= 2`, the function returns `true`.
The OR of `2` and `4` is `6` (binary `110`), which ends with a zero.

---

## 5. Complexity Analysis

| Metric | Complexity |
|--------|------------|
| Time   | O(n) – single pass through the array |
| Space  | O(1) – only a counter variable |

---

## 6. Follow-Up Questions

- How would the solution change if we needed the OR result to have **exactly** one trailing zero?
- Can we extend this to check for a specific number of trailing zeros?
- What if the array is extremely large and stored on disk? Discuss streaming approaches.

---

## Key Takeaway

> Bitwise OR has a trailing zero iff all operands are even. Counting even numbers suffices.
