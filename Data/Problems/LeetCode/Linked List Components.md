# 817. Linked List Components

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/linked-list-components](https://leetcode.com/problems/linked-list-components)
**Companies:** Amazon, Bloomberg, Google, Uber

---

## Problem Description

You are given the `head` of a linked list containing unique integer values and an integer array `nums` that is a subset of the linked list values.

Return the number of **connected** **components** in `nums`. A connected component is a non-empty, maximal sequence of **consecutive** nodes in the linked list such that every node's value belongs to nums.

**Constraints:**
- The number of nodes in the linked list is `n`.
- `1 <= n <= 10^4`
- `0 <= Node.val < n`
- All the values `Node.val` are **unique**.
- `1 <= nums.length <= n`
- `0 <= nums[i] < n`
- All the values of `nums` are **unique**.

---

## Examples

**Example 1:**
```
Input: head = [0,1,2,3], nums = [0,1,3]
Output: 2
Explanation: 0 and 1 are connected, so [0, 1] and [3] are the two connected components.
```

**Example 2:**
```
Input: head = [0,1,2,3,4], nums = [0,3,1,4]
Output: 2
Explanation: 0 and 1 are connected, 3 and 4 are connected, so [0, 1] and [3, 4] are the two connected components.
```

---

## Approach: Set + Linear Scan — O(n) ✅

Store `nums` in a hash set for O(1) membership checks, then traverse the list counting transitions from non-component to component nodes.

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
