# 31. Next Permutation

**Difficulty:** 🟡 Medium
**Acceptance:** 40.0%
**LeetCode:** [https://leetcode.com/problems/next-permutation](https://leetcode.com/problems/next-permutation)
**Companies:** Accenture, Adobe, Airtel, Amazon, Atlassian, Bloomberg, Citadel, Cognizant, De Shaw, Deloitte, Doordash, Flipkart, Goldman Sachs, Google, Hashedin, Ibm, Infosys, Intuit, Meesho, Meta, Microsoft, Mitsogo, Nike, Oracle, Rubrik, Samsung, Servicenow, Tcs, Tiktok, Uber, Walmart Labs, Zepto

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Three-Step Algorithm — O(n) ✅](#3-approach-three-step-algorithm--on-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)

---

## 1. Problem Description

A **permutation** of an array of integers is an arrangement of its members into a sequence or linear order.

The **next permutation** of an array is the next lexicographically greater permutation. If no such permutation exists (the array is in descending order), rearrange it as the lowest possible order (ascending).

The replacement must be **in place** and use only constant extra memory.

**Constraints:**
- `1 <= nums.length <= 100`
- `0 <= nums[i] <= 100`

---

## 2. Examples

```
Example 1:
  Input:  nums = [1,2,3]
  Output: [1,3,2]

Example 2:
  Input:  nums = [3,2,1]
  Output: [1,2,3]   (wrap around to smallest)

Example 3:
  Input:  nums = [1,1,5]
  Output: [1,5,1]
```

---

## 3. Approach: Three-Step Algorithm — O(n) ✅

### Steps

1. **Find the pivot:** Scan right to left, find the first index `i` where `nums[i] < nums[i+1]`. Everything to the right of `i` is in descending order.
2. **Find the successor:** Scan right to left, find the first index `j` where `nums[j] > nums[i]`. Swap `nums[i]` and `nums[j]`.
3. **Reverse the suffix:** Reverse `nums[i+1..end]` to get the smallest possible arrangement for the suffix.

If no pivot exists (entire array is descending), just reverse the whole array.

### Pseudocode

```
FUNCTION nextPermutation(nums):
    n = len(nums)

    // Step 1: Find pivot
    i = n - 2
    WHILE i >= 0 AND nums[i] >= nums[i + 1]:
        i -= 1

    IF i >= 0:
        // Step 2: Find successor and swap
        j = n - 1
        WHILE nums[j] <= nums[i]:
            j -= 1
        SWAP(nums[i], nums[j])

    // Step 3: Reverse suffix
    REVERSE(nums[i + 1 .. n - 1])
```

---

## 4. Walkthrough

```
nums = [1, 3, 5, 4, 2]

Step 1: Find pivot
  i=3: nums[3]=4 ≥ nums[4]=2 → continue
  i=2: nums[2]=5 ≥ nums[3]=4 → continue
  i=1: nums[1]=3 < nums[2]=5 → pivot at i=1

Step 2: Find successor
  j=4: nums[4]=2 ≤ nums[1]=3 → continue
  j=3: nums[3]=4 > nums[1]=3 → swap nums[1] and nums[3]
  nums = [1, 4, 5, 3, 2]

Step 3: Reverse suffix [i+1..end] = [2..4]
  nums = [1, 4, 2, 3, 5]

Result: [1, 4, 2, 3, 5] ✅
```

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 6. Follow-Up Questions

### 6.1 Previous Permutation?

Same algorithm but mirrored:
1. Find first `i` from right where `nums[i] > nums[i+1]`.
2. Find first `j` from right where `nums[j] < nums[i]`, swap.
3. Reverse the suffix.

### 6.2 Permutations (LeetCode #46)?

Generate all permutations via backtracking. Swap each element to the current position and recurse.

### 6.3 Permutation Sequence (LeetCode #60)?

Find the k-th permutation directly using factorial number system — no need to generate all permutations.

### 6.4 What about permutations with duplicates?

Next Permutation handles duplicates correctly (the `>=` and `<=` comparisons skip equal elements). For generating all unique permutations, sort first and skip duplicates during backtracking.

---

## Key Takeaway

> The **three-step algorithm** (find pivot, find successor, reverse suffix) is a textbook algorithm worth memorizing. It produces the next permutation in O(n) time and O(1) space. Understanding why it works: the suffix to the right of the pivot is maximized (descending), so we make the smallest possible increase at the pivot, then minimize the suffix by reversing it.
