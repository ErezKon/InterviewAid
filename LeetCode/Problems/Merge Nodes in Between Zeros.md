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

Given a linked list that begins and ends with `0`, with `0`s interspersed throughout, merge all nodes between consecutive `0`s into a single node whose value is the **sum** of the merged nodes. Remove all `0`s. Return the modified list.

**Constraints:**
- `3 ≤ number of nodes ≤ 2 × 10⁵`
- `0 ≤ Node.val ≤ 1000`
- The list begins and ends with 0
- No two consecutive zeros (except at boundaries)

---

## Examples

**Example 1:**
```
Input:  0 → 3 → 1 → 0 → 4 → 5 → 2 → 0
Output: 4 → 11
Explanation: Between first two 0s: 3+1=4. Between last two 0s: 4+5+2=11.
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
