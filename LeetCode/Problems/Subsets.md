
# 78. Subsets

**Difficulty:** 🟡 Medium
**Acceptance:** 79.1%
**LeetCode:** [https://leetcode.com/problems/subsets](https://leetcode.com/problems/subsets)
**Companies:** Amazon, Bloomberg, Bytedance, Coupang, Fiverr, Flipkart, Goldman Sachs, Google, Ibm, Infosys, Meta, Microsoft, Oracle, Paypal, Tcs, Tiktok, Uber, Walmart Labs, Wix, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach 1: Backtracking — O(n · 2^n) ✅](#3-approach-1-backtracking--on--2n-)
4. [Approach 2: Iterative (Cascading) — O(n · 2^n)](#4-approach-2-iterative-cascading--on--2n)
5. [Approach 3: Bitmask — O(n · 2^n)](#5-approach-3-bitmask--on--2n)
6. [Walkthrough (Backtracking)](#6-walkthrough-backtracking)
7. [Complexity Analysis](#7-complexity-analysis)
8. [Follow-Up Questions](#8-follow-up-questions)

---

## 1. Problem Description

Given an integer array `nums` of **unique** elements, return all possible subsets (the **power set**).

The solution set must not contain duplicate subsets.

---

## 2. Examples

```
Example 1:
  Input:  [1, 2, 3]
  Output: [[], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]]

Example 2:
  Input:  [0]
  Output: [[], [0]]
```

---

## 3. Approach 1: Backtracking — O(n · 2^n) ✅

At each element, make a binary choice: **include** it or **skip** it.

```
FUNCTION subsets(nums):
    result = []

    FUNCTION backtrack(start, current):
        result.ADD(COPY(current))

        FOR i ← start TO LENGTH(nums) - 1:
            current.ADD(nums[i])
            backtrack(i + 1, current)
            current.REMOVE_LAST()         // backtrack

    backtrack(0, [])
    RETURN result
```

---

## 4. Approach 2: Iterative (Cascading) — O(n · 2^n)

Start with `[[]]`. For each element, copy all existing subsets and add the element to each copy.

```
FUNCTION subsets(nums):
    result = [[]]

    FOR each num IN nums:
        newSubsets = []
        FOR each subset IN result:
            newSubsets.ADD(subset + [num])
        result.EXTEND(newSubsets)

    RETURN result
```

```
nums = [1, 2, 3]

Start:  [[]]
Add 1:  [[], [1]]
Add 2:  [[], [1], [2], [1,2]]
Add 3:  [[], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3]]
```

---

## 5. Approach 3: Bitmask — O(n · 2^n)

Each subset maps to an n-bit number. Bit `j` is 1 if `nums[j]` is included.

```
FUNCTION subsets(nums):
    n = LENGTH(nums)
    result = []

    FOR mask ← 0 TO 2^n - 1:
        subset = []
        FOR j ← 0 TO n - 1:
            IF mask HAS BIT j SET:
                subset.ADD(nums[j])
        result.ADD(subset)

    RETURN result
```

---

## 6. Walkthrough (Backtracking)

```
nums = [1, 2, 3]

backtrack(0, [])
  add [] to result
  i=0: add 1 → backtrack(1, [1])
    add [1] to result
    i=1: add 2 → backtrack(2, [1,2])
      add [1,2] to result
      i=2: add 3 → backtrack(3, [1,2,3])
        add [1,2,3] to result
        return
      remove 3
      return
    remove 2
    i=2: add 3 → backtrack(3, [1,3])
      add [1,3] to result
      return
    remove 3
    return
  remove 1
  i=1: add 2 → backtrack(2, [2])
    add [2] to result
    i=2: add 3 → backtrack(3, [2,3])
      add [2,3] to result
      return
    remove 3
    return
  remove 2
  i=2: add 3 → backtrack(3, [3])
    add [3] to result
    return
  remove 3

Result: [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]] ✅
```

---

## 7. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n · 2^n) — 2^n subsets, each takes O(n) to copy |
| **Space** | O(n) recursion depth (excluding output) |

---

## 8. Follow-Up Questions

### 8.1 Subsets II — With Duplicates (LeetCode #90)

Sort first, then skip duplicates in backtracking:

```
FUNCTION subsetsWithDup(nums):
    SORT nums
    result = []

    FUNCTION backtrack(start, current):
        result.ADD(COPY(current))

        FOR i ← start TO LENGTH(nums) - 1:
            IF i > start AND nums[i] == nums[i-1]:
                CONTINUE                              // skip duplicate

            current.ADD(nums[i])
            backtrack(i + 1, current)
            current.REMOVE_LAST()

    backtrack(0, [])
    RETURN result
```

### 8.2 Combinations (LeetCode #77)

All subsets of exactly size k:

```
FUNCTION combine(n, k):
    result = []

    FUNCTION backtrack(start, current):
        IF LENGTH(current) == k:
            result.ADD(COPY(current))
            RETURN

        FOR i ← start TO n:
            current.ADD(i)
            backtrack(i + 1, current)
            current.REMOVE_LAST()

    backtrack(1, [])
    RETURN result
```

### 8.3 Combination Sum (LeetCode #39)

Subsets that sum to a target, with reuse allowed:

```
FUNCTION combinationSum(candidates, target):
    result = []

    FUNCTION backtrack(start, current, remaining):
        IF remaining == 0:
            result.ADD(COPY(current))
            RETURN
        IF remaining < 0:
            RETURN

        FOR i ← start TO LENGTH(candidates) - 1:
            current.ADD(candidates[i])
            backtrack(i, current, remaining - candidates[i])    // i, not i+1
            current.REMOVE_LAST()

    backtrack(0, [], target)
    RETURN result
```

### 8.4 Permutations (LeetCode #46)

All orderings, not just selections:

```
FUNCTION permute(nums):
    result = []

    FUNCTION backtrack(current):
        IF LENGTH(current) == LENGTH(nums):
            result.ADD(COPY(current))
            RETURN

        FOR each num IN nums:
            IF num NOT IN current:
                current.ADD(num)
                backtrack(current)
                current.REMOVE_LAST()

    backtrack([])
    RETURN result
```

---

## Backtracking Problem Family

| Problem | Decision | Reuse? | Skip Duplicates? |
|---------|----------|--------|-------------------|
| **Subsets** (#78) | Include/skip | No | N/A (unique) |
| **Subsets II** (#90) | Include/skip | No | Yes (sort + skip) |
| **Combinations** (#77) | Include/skip, size k | No | N/A |
| **Combination Sum** (#39) | Include/skip | Yes | N/A |
| **Combination Sum II** (#40) | Include/skip | No | Yes |
| **Permutations** (#46) | Choose order | No | N/A |
| **Permutations II** (#47) | Choose order | No | Yes |

---

## Key Takeaway

> Subsets is the **gateway backtracking problem**. The template is: at each step, make a choice (include or skip), recurse, then undo (backtrack). All combinatorial generation problems — subsets, combinations, permutations — share this template with small variations. Master the template and you can solve the entire family.
