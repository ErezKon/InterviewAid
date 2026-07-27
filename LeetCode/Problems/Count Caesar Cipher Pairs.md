# 3805. Count Caesar Cipher Pairs

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-caesar-cipher-pairs](https://leetcode.com/problems/count-caesar-cipher-pairs)
**Companies:** Google

---

## 1. Problem Description

Given an array of strings, count pairs `(i, j)` where one string can be transformed into the other via a Caesar cipher shift (uniform character rotation by some amount).

---

## 2. Key Insight

> Two strings are Caesar cipher pairs if their "difference signature" (differences between consecutive characters mod 26) are identical. Normalize each string by this signature and group.

---

## 3. Approach: Canonical Form Grouping — O(n × L) ✅

```
FUNCTION countCaesarPairs(words):
    FUNCTION normalize(word):
        // Convert to difference-based canonical form
        diffs = []
        FOR i FROM 1 TO len(word)-1:
            diffs.ADD((ord(word[i]) - ord(word[i-1])) % 26)
        RETURN (len(word), tuple(diffs))
    
    groups = Counter()
    FOR word IN words:
        groups[normalize(word)] += 1
    
    count = 0
    FOR g, c IN groups.items():
        count += c * (c - 1) / 2
    RETURN count
```

| Time | Space |
|------|-------|
| O(n × L) | O(n × L) |

---

## Key Takeaway

> Caesar cipher preserves the relative differences between characters. Normalize strings by their difference sequence and count pairs within each group using `C(n,2)`.
