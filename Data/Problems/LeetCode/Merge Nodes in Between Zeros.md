# 2181. Merge Nodes in Between Zeros

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/merge-nodes-in-between-zeros](https://leetcode.com/problems/merge-nodes-in-between-zeros)
**Companies:** Amazon, Google, Josh Technology, Microsoft, Oracle

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given the `head` of a linked list, which contains a series of integers **separated** by `0`'s. The **beginning** and **end** of the linked list will have `Node.val == 0`.

For **every** two consecutive `0`'s, **merge** all the nodes lying in between them into a single node whose value is the **sum** of all the merged nodes. The modified list should not contain any `0`'s.

Return *the* `head` *of the modified linked list*.

**Constraints:**
- The number of nodes in the list is in the range `[3, 2 × 10⁵]`.
- `0 ≤ Node.val ≤ 1000`
- There are **no** two consecutive nodes with `Node.val == 0`.
- The **beginning** and **end** of the linked list have `Node.val == 0`.

---

## Examples

```
Example 1:
  Input: head = [0,3,1,0,4,5,2,0]
  Output: [4,11]
  Explanation:
  The modified list contains
  - The sum of the nodes between the 1st and 2nd zero: 3 + 1 = 4.
  - The sum of the nodes between the 2nd and 3rd zero: 4 + 5 + 2 = 11.
```

```
Example 2:
  Input: head = [0,1,0,3,0,2,2,0]
  Output: [1,3,4]
  Explanation:
  The modified list contains
  - The sum of the nodes between the 1st and 2nd zero: 1 = 1.
  - The sum of the nodes between the 2nd and 3rd zero: 3 = 3.
  - The sum of the nodes between the 3rd and 4th zero: 2 + 2 = 4.
```

---

## Key Insight

> Traverse the list, accumulating sums between `0` nodes. When a `0` is encountered, emit the accumulated sum as a new node and reset the accumulator.

---

## Approach

```
FUNCTION mergeNodes(head):
    dummy ← ListNode(0)
    curr ← dummy
    node ← head.next      // skip leading 0
    s ← 0

    WHILE node DO
        IF node.val = 0 THEN
            curr.next ← ListNode(s)
            curr ← curr.next
            s ← 0
        ELSE
            s ← s + node.val
        node ← node.next

    RETURN dummy.next
```

---

## Walkthrough

```
Input: 0 → 3 → 1 → 0 → 4 → 5 → 2 → 0

Start at node=3 (skip leading 0), s=0

node=3: s=3
node=1: s=4
node=0: emit 4, reset s=0.  Output: 4
node=4: s=4
node=5: s=9
node=2: s=11
node=0: emit 11, reset s=0. Output: 4 → 11

Return 4 → 11 ✅
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Single pass | **O(n)** | **O(1)** extra (reusing nodes possible) |

---

## Follow-Up Questions

1. **Can we do it in-place?** Yes — reuse the `0` nodes to store sums and skip the intermediate nodes by adjusting pointers.
2. **What if we wanted the product instead of sum?** Same structure, replace `+=` with `*=` and initialize to 1.
3. **What if there are consecutive zeros?** The problem guarantees no consecutive zeros between boundaries, but we'd emit 0 for empty segments.

---

## Key Takeaway

> **Accumulate between sentinels** — when a list has delimiter nodes (zeros), traverse and sum between delimiters, emitting one node per segment.

---
