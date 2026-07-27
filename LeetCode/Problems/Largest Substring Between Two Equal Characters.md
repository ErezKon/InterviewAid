# 1624. Largest Substring Between Two Equal Characters

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/largest-substring-between-two-equal-characters](https://leetcode.com/problems/largest-substring-between-two-equal-characters)
**Companies:** Microsoft

---

## 1. Problem Description

Return the length of the longest substring between two equal characters (exclusive). Return -1 if no such substring exists.

---

## 2. Approach: First Occurrence Map — O(n) ✅

```
FUNCTION maxLengthBetweenEqualCharacters(s):
    first = {}
    result = -1
    FOR i, c IN enumerate(s):
        IF c IN first:
            result = MAX(result, i - first[c] - 1)
        ELSE:
            first[c] = i
    RETURN result
```

| Time | Space |
|------|-------|
| O(n) | O(26) = O(1) |

---

## 3. Key Takeaway

> Track the first occurrence of each character. For each subsequent occurrence, the distance minus 1 is the substring length between them.
