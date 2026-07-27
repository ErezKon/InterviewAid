# 3106. Lexicographically Smallest String After Operations With Constraint

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/lexicographically-smallest-string-after-operations-with-constraint](https://leetcode.com/problems/lexicographically-smallest-string-after-operations-with-constraint)
**Companies:** Servicenow

---

## 1. Problem Description

Given string `s` and budget `k`, you can change each character by at most some distance (circular on 'a'-'z'). Minimize the string lexicographically using at most `k` total distance.

---

## 2. Approach: Greedy Left to Right — O(n) ✅

```
FUNCTION getSmallestString(s, k):
    result = list(s)
    FOR i ← 0 TO len(s) - 1:
        dist = MIN(ord(s[i]) - ord('a'), 26 - (ord(s[i]) - ord('a')))
        IF dist <= k:
            result[i] = 'a'; k -= dist
        ELSE:
            result[i] = chr(ord(s[i]) - k); k = 0
    RETURN JOIN(result)
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 3. Key Takeaway

> Greedily make each character as small as possible (ideally 'a') from left to right, spending budget on the cheapest reductions first.
