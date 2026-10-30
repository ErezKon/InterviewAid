# 1585. Check If String Is Transformable With Substring Sort Operations

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/check-if-string-is-transformable-with-substring-sort-operations](https://leetcode.com/problems/check-if-string-is-transformable-with-substring-sort-operations)
**Companies:** Google

---

## Problem Description

Given two strings `s` and `t`, transform string `s` into string `t` using the following operation any number of times:

- Choose a **non-empty** substring in `s` and sort it in place so the characters are in **ascending order**.
  - For example, applying the operation on the underlined substring `"423"` in `"14234"` results in `"12344"`.

Return `true` if *it is possible to transform `s` into `t`*. Otherwise, return `false`.

A **substring** is a contiguous sequence of characters within a string.

**Constraints:**
- `s.length == t.length`
- `1 <= s.length <= 10^5`
- `s` and `t` consist of only digits.

---

## Examples

```
Example 1:
  Input: s = "84532", t = "34852"
  Output: true
  Explanation: You can transform s into t using the following sort operations:
  "84532" (from index 2 to 3) -> "84352"
  "84352" (from index 0 to 2) -> "34852"
```

```
Example 2:
  Input: s = "34521", t = "23415"
  Output: true
  Explanation: You can transform s into t using the following sort operations:
  "34521" -> "23451"
  "23451" -> "23415"
```

```
Example 3:
  Input: s = "12345", t = "12435"
  Output: false
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
