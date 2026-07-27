# 1585. Check If String Is Transformable With Substring Sort Operations

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/check-if-string-is-transformable-with-substring-sort-operations](https://leetcode.com/problems/check-if-string-is-transformable-with-substring-sort-operations)
**Companies:** Google

---

## 1. Problem Description

Given two strings `s` and `t` of same length (digits only), you can sort any substring of `s`. Determine if `s` can be transformed into `t`.

---

## 2. Key Insight

> Sorting a substring is equivalent to bubble sort — you can only move a smaller digit left past larger digits. So for each digit `d` needed in `t`, check that no smaller digit appears before `d`'s position in `s`.

Track positions of each digit 0–9 in `s` using queues. Process `t` left to right: for each character, pop from the corresponding queue and verify no smaller digit's front position comes before it.

---

## 3. Approach: Queues per Digit — O(n) ✅

```
FUNCTION isTransformable(s, t):
    pos = [deque() for _ in range(10)]
    FOR i, ch IN enumerate(s):
        pos[int(ch)].APPEND(i)
    
    FOR ch IN t:
        d = int(ch)
        IF pos[d] is empty: RETURN false
        idx = pos[d][0]
        // check no smaller digit appears before idx
        FOR smaller FROM 0 TO d-1:
            IF pos[smaller] not empty AND pos[smaller][0] < idx:
                RETURN false
        pos[d].POPLEFT()
    
    RETURN true
```

| Time | Space |
|------|-------|
| O(10n) = O(n) | O(n) |

---

## Key Takeaway

> Substring sort = bubble sort freedom. A smaller digit can't jump over a larger one to its right. Use per-digit queues to track available positions and verify no blocking smaller digit exists.
