# 775. Global and Local Inversions

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/global-and-local-inversions](https://leetcode.com/problems/global-and-local-inversions)
**Companies:** Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Position Check — O(n) ✅](#3-approach-position-check--on-)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

You are given an integer array `nums` of length `n` which represents a permutation of all the integers in the range `[0, n - 1]`.

The number of **global inversions** is the number of the different pairs `(i, j)` where:

- `0 <= i < j < n`
- `nums[i] > nums[j]`

The number of **local inversions** is the number of indices `i` where:

- `0 <= i < n - 1`
- `nums[i] > nums[i + 1]`

Return `true` *if the number of **global inversions** is equal to the number of **local inversions***.

**Constraints:**
- `n == nums.length`
- `1 <= n <= 10^5`
- `0 <= nums[i] < n`
- All the integers of `nums` are **unique**.
- `nums` is a permutation of all the numbers in the range `[0, n - 1]`.

---

## 2. Key Insight

> Every local inversion is a global inversion. So `global == local` iff there are no "non-local" inversions. This holds iff no element is more than 1 position away from its sorted index.

---

## 3. Approach: Position Check — O(n) ✅

```text
FUNCTION isIdealPermutation(nums):
    // Every local inversion is global. So global == local iff no non-local inversions exist.
    // Non-local: nums[i] > nums[j] where j > i + 1
    // Equivalent: no element is > 1 position away from its sorted position
    FOR i, num IN enumerate(nums):
        IF ABS(num - i) > 1:
            RETURN false
    RETURN true
```

---

## 4. Examples

```
Example 1:
  Input: nums = [1,0,2]
  Output: true
  Explanation: There is 1 global inversion and 1 local inversion.
```
```
Example 2:
  Input: nums = [1,2,0]
  Output: false
  Explanation: There are 2 global inversions and 1 local inversion.
```

---

## 5. Walkthrough

Consider the array `[1,0,2]`:
1. Index 0: `num = 1`, `|1-0| = 1` → OK.
2. Index 1: `num = 0`, `|0-1| = 1` → OK.
3. Index 2: `num = 2`, `|2-2| = 0` → OK.
All differences ≤ 1, so return `true`.

For `[1,2,0]`:
1. Index 0: `|1-0| = 1` → OK.
2. Index 1: `|2-1| = 1` → OK.
3. Index 2: `|0-2| = 2` → exceeds 1 → return `false`.

---

## 6. Complexity Analysis

- **Time:** O(n) – single pass through the array.
- **Space:** O(1) – only constant extra variables.

---

## 7. Follow-Up Questions

- How would you modify the algorithm to count the number of non-local inversions?
- Can this technique be extended to detect if the permutation is "almost sorted" within a given distance `k`?
- What changes are needed if the input is not a permutation but an arbitrary array?

---

## 8. Key Takeaway

> `|nums[i] - i| ≤ 1` for all `i` ⇔ no non-local inversions ⇔ global inversions equal local inversions. A single linear scan suffices.
