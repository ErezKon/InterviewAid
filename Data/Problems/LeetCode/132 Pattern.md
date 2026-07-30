# 456. 132 Pattern

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/132-pattern](https://leetcode.com/problems/132-pattern)
**Companies:** Amazon, Bloomberg, Doordash, Goldman Sachs, Google, Meta, Microsoft, Sprinklr, Tiktok

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Monotonic Stack (right to left) — O(n) ✅](#4-approach-monotonic-stack-right-to-left--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given an array of `n` integers `nums`, a **132 pattern** is a subsequence of three integers `nums[i]`, `nums[j]`, `nums[k]` such that `i < j < k` and `nums[i] < nums[k] < nums[j]`.

Return `true` if there is a 132 pattern in `nums`, otherwise return `false`.

**Constraints:**
- `n == nums.length`
- `1 ≤ n ≤ 2 × 10⁵`
- `-10⁹ ≤ nums[i] ≤ 10⁹`

---

## 2. Examples

```
Example 1:
  Input:  [1, 2, 3, 4]
  Output: false
  Explanation: No 132 pattern exists (array is strictly increasing).

Example 2:
  Input:  [3, 1, 4, 2]
  Output: true
  Explanation: [1, 4, 2] is a 132 pattern: 1 < 2 < 4.

Example 3:
  Input:  [-1, 3, 2, 0]
  Output: true
  Explanation: [-1, 3, 2] is a 132 pattern: -1 < 2 < 3.
```

Visual — the "132" naming refers to relative ordering:
```
Position:   i ......... j ... k
Value:      1 (small)   3 (big)   2 (medium)

nums[i] < nums[k] < nums[j]
  "1"  <    "2"    <   "3"
```

---

## 3. Key Insight

> Scan **right to left** with a monotonic decreasing stack. The stack tracks candidates for the "3" (the largest value). When we pop a value off the stack, it becomes the best candidate for "2" (the middle value). If any remaining element to the left is less than "2", we found our "1".

The variable `third` (the "2" in the pattern) only increases over time, maximizing our chance of finding a valid "1".

---

## 4. Approach: Monotonic Stack (right to left) — O(n) ✅

```
FUNCTION find132pattern(nums):
    stack = []
    third = -infinity    // the "2" in 1-3-2 (max popped value)

    FOR i ← n - 1 DOWN TO 0:
        IF nums[i] < third:
            RETURN true    // found "1" < "2" (third)

        WHILE stack AND stack.TOP() < nums[i]:
            third = stack.POP()    // update "2" candidate

        stack.PUSH(nums[i])

    RETURN false
```

**Why it works:** The stack maintains a decreasing sequence of "3" candidates. When `nums[i]` is larger than stack top, popped values become "2" candidates (they were smaller than some "3" to their right). If any future `nums[i]` is less than `third`, we have `nums[i] < third < some_3_on_stack`.

---

## 5. Walkthrough

```
nums = [3, 1, 4, 2]
Scan right to left:

i=3: nums[3]=2
  2 > third(-∞)? No
  stack empty → push 2
  stack=[2], third=-∞

i=2: nums[2]=4
  4 > third(-∞)? No
  stack.top()=2 < 4 → pop 2, third=2
  stack empty → push 4
  stack=[4], third=2

i=1: nums[1]=1
  1 < third(2)? YES → RETURN true ✅
  
  Found: nums[1]=1 < third=2 < nums[2]=4
  Pattern: [1, 4, 2] at indices [1, 2, 3]
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — each element pushed/popped at most once |
| **Space** | O(n) — for the stack |

---

## 7. Follow-Up Questions

### 7.1 Why scan right to left?

Scanning right to left lets us build the "3-2" pair first (the harder part), then just look for any "1" that's smaller. Scanning left to right would require tracking the minimum so far as "1" and then finding a valid "3-2" pair, which is less elegant.

### 7.2 Can this be done in O(n) space with O(1) extra?

Not straightforwardly. The stack is essential for tracking the decreasing sequence of "3" candidates. You can use the input array itself as the stack in some implementations, but that modifies input.

### 7.3 What if we need to find the actual indices?

Track indices on the stack instead of values. When `nums[i] < third`, `i` is the "1" index, and you'd need to store the "2" and "3" indices alongside `third`.

### 7.4 Related problems?

| Problem | Pattern |
|---------|---------|
| **Next Greater Element** (#496) | Monotonic stack, right to left |
| **Daily Temperatures** (#739) | Monotonic stack |
| **Stock Span** (#901) | Monotonic stack |

---

## 8. Key Takeaway

> The 132 pattern is elegantly solved by scanning right to left with a monotonic stack: the stack holds "3" candidates, popped values become the "2" candidate (`third`), and any smaller element to the left is "1". This showcases how **monotonic stacks** can track complex subsequence relationships in O(n).
