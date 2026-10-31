# 1819. Number of Different Subsequences GCDs

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-different-subsequences-gcds](https://leetcode.com/problems/number-of-different-subsequences-gcds)
**Companies:** Akuna Capital, Infosys

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Enumerate GCD Candidates — O(max · log max)](#4-approach)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

You are given an array `nums` that consists of positive integers.

The **GCD** of a sequence of numbers is defined as the greatest integer that divides **all** the numbers in the sequence evenly.

- For example, the GCD of the sequence `[4,6,16]` is `2`.

A **subsequence** of an array is a sequence that can be formed by removing some elements (possibly none) of the array.

- For example, `[2,5,10]` is a subsequence of `[1,2,1,2,4,1,5,10]`.

Return *the **number** of **different** GCDs among all **non-empty** subsequences of* `nums`.

**Constraints:**

- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 2 * 10^5`

---

## 2. Examples

```
Example 1:
  Input: nums = [6,10,3]
  Output: 5
  Explanation: Considering all the non-empty subsequences and their GCDs,
  the different GCDs are 6, 10, 3, 2, and 1.
```

```
Example 2:
  Input: nums = [5,15,40,5,6]
  Output: 7
```

---

## 3. Key Insight

> Instead of enumerating subsequences, iterate over every possible GCD `g` from `1` to `max(nums)`. `g` is achievable iff the GCD of all numbers in `nums` that are multiples of `g` equals `g`.

---

## 4. Approach: Enumerate GCD Candidates — O(max · log max) ✅

```text
FUNCTION countDifferentSubsequenceGCDs(nums):
    maxVal ← MAX(nums)
    present ← SET(nums)
    count ← 0

    FOR g ← 1 TO maxVal:
        currentGCD ← 0
        FOR multiple ← g TO maxVal STEP g:
            IF multiple IN present:
                currentGCD ← GCD(currentGCD, multiple)
                IF currentGCD == g: BREAK
        IF currentGCD == g:
            count ← count + 1

    RETURN count
```

---

## 5. Walkthrough

**Example:** `nums = [6,10,15]`

1. `maxVal = 15`, `present = {6,10,15}`.
2. Iterate `g = 1`:
   - Multiples in set: 6,10,15 → GCD(0,6)=6 → GCD(6,10)=2 → GCD(2,15)=1 → equals `g` → count=1.
3. `g = 2`:
   - Multiples: 6,10 → GCD(0,6)=6 → GCD(6,10)=2 → equals `g` → count=2.
4. `g = 3`:
   - Multiples: 6,15 → GCD(0,6)=6 → GCD(6,15)=3 → equals `g` → count=3.
5. `g = 4,5,6,...` none satisfy condition.
6. Final count = 3 (GCDs 1,2,3).

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(max · log max) — harmonic series of multiples |
| **Space** | O(max) for the presence set |

---

## 7. Follow-Up Questions

- How would the solution change if `nums` could contain zeros?
- Can you adapt the algorithm to also return the list of achievable GCDs?
- What is the time complexity if the input size is very large but the maximum value is small?

---

## 8. Key Takeaway

> **Enumerate candidate GCDs, verify via multiples.** For each `g`, the GCD of all its multiples present in the array equals `g` iff `g` can be formed as a subsequence GCD. The harmonic series gives an efficient O(max · log max) solution.
