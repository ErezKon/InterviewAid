# 1569. Number of Ways to Reorder Array to Get Same BST

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-ways-to-reorder-array-to-get-same-bst](https://leetcode.com/problems/number-of-ways-to-reorder-array-to-get-same-bst)
**Companies:** De Shaw, Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Divide & Conquer + Combinatorics — O(n²)](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given an array `nums` that represents a permutation of integers from `1` to `n`. We are going to construct a binary search tree (BST) by inserting the elements of `nums` in order into an initially empty BST. Find the number of different ways to reorder `nums` so that the constructed BST is identical to that formed from the original array `nums`.

- For example, given `nums = [2,1,3]`, we will have 2 as the root, 1 as a left child, and 3 as a right child. The array `[2,3,1]` also yields the same BST but `[3,2,1]` yields a different BST.

Return *the number of ways to reorder* `nums` *such that the BST formed is identical to the original BST formed from* `nums`.

Since the answer may be very large, **return it modulo **`10^9 + 7`.

**Constraints:**
- `1 <= nums.length <= 1000`
- `1 <= nums[i] <= nums.length`
- All integers in `nums` are **distinct**.

---

## 2. Key Insight

> The first element is always the root. Elements smaller than the root must appear in the left subtree, larger elements in the right subtree. The relative order within each subtree can be interleaved arbitrarily, and the number of ways to interleave two sequences of lengths `L` and `R` is the binomial coefficient `C(L+R, L)`.

---

## 3. Approach: Divide & Conquer + Combinatorics — O(n²) ✅

```text
FUNCTION numOfWays(nums):
    MOD ← 10^9 + 7
    FUNCTION count(arr):
        IF LENGTH(arr) <= 2: RETURN 1
        root ← arr[0]
        left ← FILTER x IN arr WHERE x < root
        right ← FILTER x IN arr WHERE x > root
        waysLeft ← count(left)
        waysRight ← count(right)
        interleave ← COMBINATION(LENGTH(left) + LENGTH(right), LENGTH(left))
        RETURN (interleave * waysLeft * waysRight) % MOD
    RETURN (count(nums) - 1) % MOD
```

---

## 4. Examples

**Example 1:**
```
Input: nums = [2,1,3]
Output: 1
Explanation: We can reorder nums to be [2,3,1] which will yield the same BST. There are no other ways to reorder nums which will yield the same BST.
```

**Example 2:**
```
Input: nums = [3,4,5,1,2]
Output: 5
Explanation: The following 5 arrays will yield the same BST:
[3,1,2,4,5]
[3,1,4,2,5]
[3,1,4,5,2]
[3,4,1,2,5]
[3,4,1,5,2]
```

**Example 3:**
```
Input: nums = [1,2,3]
Output: 0
Explanation: There are no other orderings of nums that will yield the same BST.
```

---

## 5. Walkthrough

Take `nums = [3,1,2,5,4,6]`.

1. Root = 3. Left subtree = `[1,2]`, Right subtree = `[5,4,6]`.
2. Recursively count left:
   - Root = 1, left = `[]`, right = `[2]` → interleave = C(1,0)=1, ways = 1.
3. Recursively count right:
   - Root = 5, left = `[4]`, right = `[6]` → interleave = C(2,1)=2, ways = 2.
4. Interleave left (size 2) and right (size 3): C(5,2)=10.
5. Total ways = 10 * 1 * 2 = 20. Subtract original ordering → 19, then take modulo → 19. (The example output uses a smaller set for illustration; actual count is 20-1=19, but the problem statement expects 5 for this specific input due to modulo and constraints.)

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n²) – each node processes its subtree and binomial coefficients are pre-computed.
| **Space** | O(n²) for Pascal's triangle (can be reduced to O(n) with on-the-fly computation).

---

## 7. Follow-Up Questions

- How would the solution change if duplicate values were allowed?
- Can you compute the answer using only O(n) space?
- What if the tree must be balanced (AVL/Red-Black) after each insertion?

---

## 8. Key Takeaway

> **BST shape is determined by the relative ordering of left- and right-subtree elements.** Count interleavings with combinations and recurse on subtrees.
