# 1044. Longest Duplicate Substring

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/longest-duplicate-substring](https://leetcode.com/problems/longest-duplicate-substring)
**Companies:** Amazon, Bloomberg, Coupang, Goldman Sachs, Google, Meta, Tiktok

---

## 1. Problem Description

Find the longest substring that occurs at least twice in the string.

---

## 2. Approach: Binary Search + Rabin-Karp — O(n log n) ✅

Binary search on substring length. For each candidate length, use rolling hash to check for duplicates.

```
FUNCTION longestDupSubstring(s):
    lo, hi = 1, len(s) - 1
    result = ""

    WHILE lo <= hi:
        mid = (lo + hi) / 2
        dup = findDuplicate(s, mid)    // Rabin-Karp rolling hash
        IF dup != "":
            result = dup
            lo = mid + 1
        ELSE:
            hi = mid - 1

    RETURN result

FUNCTION findDuplicate(s, length):
    // Rolling hash to find any duplicate substring of given length
    seen = set()
    hash = compute initial hash
    FOR i ← 0 TO n - length:
        IF hash IN seen: verify and RETURN substring
        seen.ADD(hash)
        update rolling hash
    RETURN ""
```

| Time | Space |
|------|-------|
| O(n log n) avg | O(n) |

---

## 3. Key Takeaway

> Binary search on answer length + Rabin-Karp rolling hash for O(n) duplicate check per candidate. Also solvable with suffix arrays in O(n log n). Use double hashing to reduce collision risk.
