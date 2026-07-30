# 3012. Minimize Length of Array Using Operations

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimize-length-of-array-using-operations](https://leetcode.com/problems/minimize-length-of-array-using-operations)
**Companies:** Bny Mellon, Dtcc, Hashedin, Oracle

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array `nums` of positive integers, you can pick two elements `nums[i]` and `nums[j]` where `i ≠ j`, and if `nums[i] % nums[j] > 0`, replace one with `nums[i] % nums[j]` and remove the other. Minimize the array length.

**Constraints:**
- `1 ≤ nums.length ≤ 10⁵`
- `1 ≤ nums[i] ≤ 10⁹`

---

## Examples

**Example 1:**
```
Input:  nums = [1, 4, 3, 1]
Output: 1
Explanation: minVal=1. 4%1=0, 3%1=0 → all divisible. Count of 1 = 2. ⌈2/2⌉ = 1.
```

**Example 2:**
```
Input:  nums = [5, 5, 5, 10, 5]
Output: 2
Explanation: minVal=5. All divisible by 5. Count of 5 = 4. ⌈4/2⌉ = 2.
```

---

## Key Insight

> The minimum element `m` is key. If any element is NOT divisible by `m`, then `num % m` produces a value smaller than `m` — we can reduce to a single element (answer = 1). If ALL elements are divisible by `m`, then no operation can produce anything smaller. The minimum copies of `m` pair up and eliminate each other, leaving `⌈count(m) / 2⌉`.

---

## Approach

```
FUNCTION minimumArrayLength(nums):
    minVal ← MIN(nums)
    // If any element is not divisible by minVal, answer is 1
    IF ANY(num % minVal ≠ 0 FOR num IN nums) THEN
        RETURN 1
    // Count occurrences of minVal
    cnt ← COUNT(minVal IN nums)
    RETURN (cnt + 1) / 2    // ceiling division
```

---

## Walkthrough

```
nums = [5, 5, 5, 10, 5]

minVal = 5
Check: 5%5=0, 5%5=0, 5%5=0, 10%5=0, 5%5=0 → all divisible
cnt = 4 (four 5s)
Return ⌈4/2⌉ = 2 ✅

nums = [2, 3, 4]
minVal = 2
Check: 3%2=1 ≠ 0 → not all divisible
Return 1 ✅
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Single pass | **O(n)** | **O(1)** |

---

## Follow-Up Questions

1. **Why does having a non-divisible element guarantee answer = 1?** Because `num % minVal` creates a value strictly less than `minVal`, which can then reduce everything else.
2. **Why do pairs of minVal cancel?** Two copies of `m`: `m % m = 0`, so they can't produce a remainder, but the operation removes one element. Two copies eliminate down to one.
3. **What if all elements are the same?** Then minVal = that element, all divisible, answer = ⌈n/2⌉.

---

## Key Takeaway

> **Minimum element analysis** — the smallest value determines reachability. If it divides everything, count its occurrences and pair them up. If not, a smaller value can be produced, collapsing the array to size 1.

---
