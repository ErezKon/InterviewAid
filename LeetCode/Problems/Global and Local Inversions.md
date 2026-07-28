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

Given a permutation of `[0, n-1]`, return true if global inversions == local inversions. A local inversion is `nums[i] > nums[i+1]`. A global inversion is any `nums[i] > nums[j]` where `i < j`.

---

## 2. Key Insight

> Every local inversion is a global inversion. So `global == local` iff there are no "non-local" inversions. This holds iff no element is more than 1 position away from its sorted index.

---

## 3. Approach: Position Check — O(n) ✅

```text
FUNCTION isIdealPermutation(nums):
    // Every local inversion is global. So global == local iff no non‑local inversions exist.
    // Non‑local: nums[i] > nums[j] where j > i + 1
    // Equivalent: no element is > 1 position away from its sorted position
    FOR i, num IN enumerate(nums):
        IF ABS(num - i) > 1:
            RETURN false
    RETURN true
```

---

## 4. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `[1,0,2]` | `true` | Only one local inversion (1,0) and no non‑local inversions. |
| `[1,2,0]` | `false` | Inversion (2,0) is global but not local, violating the condition. |

---

## 5. Walkthrough

Consider the array `[1,0,2]`:
1. Index 0: `num = 1`, `|1‑0| = 1` → OK.
2. Index 1: `num = 0`, `|0‑1| = 1` → OK.
3. Index 2: `num = 2`, `|2‑2| = 0` → OK.
All differences ≤ 1, so return `true`.

For `[1,2,0]`:
1. Index 0: `|1‑0| = 1` → OK.
2. Index 1: `|2‑1| = 1` → OK.
3. Index 2: `|0‑2| = 2` → exceeds 1 → return `false`.

---

## 6. Complexity Analysis

- **Time:** O(n) – single pass through the array.
- **Space:** O(1) – only constant extra variables.

---

## 7. Follow-Up Questions

- How would you modify the algorithm to count the number of non‑local inversions?
- Can this technique be extended to detect if the permutation is "almost sorted" within a given distance `k`?
- What changes are needed if the input is not a permutation but an arbitrary array?

---

## 8. Key Takeaway

> `|nums[i] - i| ≤ 1` for all `i` ⇔ no non‑local inversions ⇔ global inversions equal local inversions. A single linear scan suffices.
