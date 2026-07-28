# 817. Linked List Components

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/linked-list-components](https://leetcode.com/problems/linked-list-components)
**Companies:** Amazon, Bloomberg, Google, Uber

---

## Problem Description

Given a singly linked list and an integer array `nums` representing a subset of node values, return the number of connected components formed by nodes whose values appear in `nums`. A component is a maximal sequence of adjacent nodes in the list all belonging to `nums`.

---

## Examples

| Input List | `nums` | Output | Explanation |
|------------|--------|--------|-------------|
| `0→1→2→3` | `[0,1,3]` | `2` | Components are `[0→1]` and `[3]`. |
| `0→1→2→3→4` | `[0,3,1,4]` | `2` | Components are `[0→1]` and `[3→4]`. |
| `1→2→3` | `[4,5]` | `0` | No nodes match, so zero components. |

---

## Approach: Set + Linear Scan — O(n) ✅

Store `nums` in a hash set for O(1) membership checks, then traverse the list counting transitions from non‑component to component nodes.

```text
FUNCTION numComponents(head, nums):
    // Convert nums to a set for fast lookup
    numSet ← SET(nums)
    count ← 0
    inComponent ← false
    WHILE head IS NOT NULL:
        IF head.val IN numSet:
            IF NOT inComponent:
                count ← count + 1
                inComponent ← true
        ELSE:
            inComponent ← false
        head ← head.next
    RETURN count
```

---

## Walkthrough

Consider list `0→1→2→3` and `nums = [0,1,3]`.

| Step | Node Value | In `numSet`? | `inComponent` before | Action | `count` after |
|------|------------|--------------|----------------------|--------|--------------|
| 1 | 0 | yes | false | start new component → `count=1`, `inComponent=true` |
| 2 | 1 | yes | true | continue component |
| 3 | 2 | no | true | end component → `inComponent=false` |
| 4 | 3 | yes | false | start new component → `count=2`, `inComponent=true` |

Result: `2` components.

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n) where n is number of nodes | O(k) where k = |nums| (size of the hash set) |

---

## Follow-Up Questions

1. How would you modify the algorithm if the list were doubly linked?
2. Can you solve the problem without extra space by modifying the list temporarily?
3. What if `nums` is extremely large compared to the list size?

---

## Key Takeaway

> Use a hash set to identify subset nodes and count transitions from outside to inside the set while scanning the list once.
