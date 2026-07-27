# 1023. Camelcase Matching

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/camelcase-matching](https://leetcode.com/problems/camelcase-matching)
**Companies:** Compass, Google

---

## 1. Problem Description

Given a list of queries and a pattern, check if each query matches the pattern by inserting **only lowercase** letters. Uppercase letters must match exactly in order.

---

## 2. Approach: Two Pointer — O(n × L) ✅

```
FUNCTION camelMatch(queries, pattern):
    FUNCTION matches(query, pattern):
        j = 0
        FOR ch IN query:
            IF j < len(pattern) AND ch == pattern[j]:
                j += 1
            ELSE IF ch.isupper():
                RETURN false    // extra uppercase = no match
        RETURN j == len(pattern)
    
    RETURN [matches(q, pattern) for q in queries]
```

| Time | Space |
|------|-------|
| O(n × L) | O(1) extra |

---

## Key Takeaway

> Subsequence matching with a constraint: unmatched uppercase letters are forbidden. Two-pointer scan where lowercase mismatches are fine but uppercase mismatches fail.
