# 3216. Lexicographically Smallest String After a Swap

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/lexicographically-smallest-string-after-a-swap](https://leetcode.com/problems/lexicographically-smallest-string-after-a-swap)
**Companies:** Jpmorgan

---

## 1. Problem Description

Swap at most one pair of adjacent digits with the same parity to make the number as small as possible.

---

## 2. Approach: Greedy — O(n) ✅

```
FUNCTION getSmallestString(s):
    s = list(s)
    FOR i ← 0 TO len(s) - 2:
        a, b = int(s[i]), int(s[i+1])
        IF a % 2 == b % 2 AND a > b:
            SWAP(s[i], s[i+1])
            BREAK
    RETURN JOIN(s)
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 3. Key Takeaway

> Find the first adjacent pair with same parity where swapping decreases the number. Only one swap allowed — take the leftmost improvement.
