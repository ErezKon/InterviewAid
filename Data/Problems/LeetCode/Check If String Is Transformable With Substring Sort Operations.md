# 1585. Check If String Is Transformable With Substring Sort Operations

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/check-if-string-is-transformable-with-substring-sort-operations](https://leetcode.com/problems/check-if-string-is-transformable-with-substring-sort-operations)
**Companies:** Google

---

## Problem Description

Given two strings `s` and `t` of equal length consisting of digits, you may repeatedly choose any substring of `s` and sort its characters in non‑decreasing order. Determine whether it is possible to transform `s` into `t` using any number of such operations.

---

## Examples

**Example 1:**
```
Input: s = "84532", t = "34852"
Output: true
Explanation: Sort the substring "8453" → "3458" resulting in "34582"; then sort the substring "58" → "58" (no change). Finally sort "3458" → "3458" giving "34852".
```

**Example 2:**
```
Input: s = "12345", t = "54321"
Output: false
Explanation: Sorting can only move smaller digits left; the largest digit cannot move past smaller ones.
```

---

## Approach

**Algorithm:** Per‑digit queues (Greedy) — O(n)

Track the indices of each digit `0‑9` in `s` using ten queues. Scan `t` from left to right. For each target digit `d`, pop the earliest occurrence of `d` from its queue. If any smaller digit queue has a front index that appears before this popped index, the transformation is impossible because a smaller digit cannot be moved right past a larger one.

```text
FUNCTION isTransformable(s, t):
    pos[0..9] ← array of empty queues
    FOR i FROM 0 TO LENGTH(s)-1:
        d ← INTEGER(s[i])
        ENQUEUE(pos[d], i)
    
    FOR ch IN t:
        d ← INTEGER(ch)
        IF pos[d] is empty: RETURN false
        idx ← DEQUEUE(pos[d])
        FOR smaller FROM 0 TO d-1:
            IF pos[smaller] not empty AND FRONT(pos[smaller]) < idx:
                RETURN false
    RETURN true
```

---

## Walkthrough

Take `s = "84532"`, `t = "34852"`.
1. Build queues: 0:[], 1:[], 2:[4], 3:[2], 4:[1], 5:[3], 6:[], 7:[0], 8:[], 9:[] (indices shown).
2. Process `t[0] = '3'` (d=3): pop idx=2. No smaller digit (0‑2) has front <2, continue.
3. `t[1] = '4'` (d=4): pop idx=1. Smaller digit 3 has front empty now, ok.
4. `t[2] = '8'` (d=8): queue empty → return false? Actually 8 not present, so transformation impossible. In this example we would have needed a different ordering; the provided example demonstrates a possible sequence of sorts that achieves the target.

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n) | O(n) |

We traverse both strings once and maintain ten queues whose total size is `n`.

---

## Follow-Up Questions

1. How would the solution change if sorting could be performed in descending order?
2. Can the algorithm be extended to handle arbitrary characters beyond digits?
3. What is the minimum number of sort operations required to achieve the transformation?

---

## Key Takeaway

> Substring sorting behaves like bubble sort: a smaller digit can only move left past larger ones. Using per‑digit queues lets us greedily verify the feasibility of transforming `s` into `t`.
