# 287. Find the Duplicate Number

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-duplicate-number](https://leetcode.com/problems/find-the-duplicate-number)
**Companies:** Amazon, Anduril, Blackrock, Bloomberg, Cisco, Citadel, Dp World, Flipkart, Goldman Sachs, Google, Meta, Microsoft, Niantic, Nike, Nvidia, Oracle, Paytm, Salesforce, Tcs, Tiktok, Walmart Labs, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Floyd's Cycle Detection — O(n), O(1) ✅](#4-approach-floyds-cycle-detection--on-o1-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given an array of `n + 1` integers where each integer is in `[1, n]`, there is exactly **one duplicate** (may appear more than twice). Find it **without modifying** the array, using O(1) extra space.

**Constraints:**
- `1 <= n <= 10⁵`
- `nums.length == n + 1`
- `1 <= nums[i] <= n`

---

## 2. Examples

```
Example 1:
  Input:  nums = [1, 3, 4, 2, 2]
  Output: 2

Example 2:
  Input:  nums = [3, 1, 3, 4, 2]
  Output: 3
```

---

## 3. Key Insight

> Treat the array as a linked list: `index → nums[index]`. Since values are in `[1, n]` and there are `n+1` entries, the duplicate creates a **cycle**. The cycle entrance is the duplicate number — find it with Floyd's tortoise and hare algorithm.

---

## 4. Approach: Floyd's Cycle Detection — O(n), O(1) ✅

```
FUNCTION findDuplicate(nums):
    slow = fast = nums[0]
    // Phase 1: Find meeting point
    DO:
        slow = nums[slow]
        fast = nums[nums[fast]]
    WHILE slow != fast

    // Phase 2: Find cycle start
    slow = nums[0]
    WHILE slow != fast:
        slow = nums[slow]
        fast = nums[fast]

    RETURN slow
```

---

## 5. Walkthrough

```
nums = [1, 3, 4, 2, 2]

Implicit linked list: 0→1→3→2→4→2→4→2→... (cycle at node 2)

Phase 1 (find meeting point):
  slow: 1 → 3 → 2 → 4 → 2
  fast: 3 → 2 → 2 → 2
  Meet at: 2

Phase 2 (find cycle entrance):
  slow starts at nums[0]=1: 1 → 3 → 2
  fast stays at 2:          2 → 4 → 2
  Meet at: 2 ✅

Result: 2 (the duplicate)
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — both phases visit O(n) nodes |
| **Space** | O(1) — only two pointers |

---

## 7. Follow-Up Questions

### 7.1 Can you use binary search instead?

Yes — binary search on the value range [1, n]. Count how many numbers ≤ mid. If count > mid, the duplicate is in [1, mid]. O(n log n) time, O(1) space.

### 7.2 What if you can modify the array?

Mark visited indices by negating values. When you encounter an already-negative entry, that's the duplicate. O(n) time, O(1) space but modifies input.

### 7.3 Why does Floyd's algorithm find the cycle entrance?

Mathematical proof: if the cycle starts at distance `μ` from the head and has length `λ`, the meeting point is at distance `μ` from the entrance. Resetting one pointer to the head and moving both at speed 1 makes them meet at the entrance.

---

## 8. Key Takeaway

> **Array-as-linked-list** is a powerful reduction: when values are indices, a duplicate creates a cycle. Floyd's algorithm finds the cycle entrance (= duplicate) in O(n) time and O(1) space — the same technique used in Linked List Cycle II (LC 142).
