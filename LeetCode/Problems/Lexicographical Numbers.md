# 386. Lexicographical Numbers

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/lexicographical-numbers](https://leetcode.com/problems/lexicographical-numbers)
**Companies:** Amazon, Barclays, Bloomberg, Google, Meta, Microsoft

---

## 1. Problem Description

Return all integers from 1 to n in lexicographical order.

---

## 2. Approach: DFS on Number Trie — O(n) ✅

```
FUNCTION lexicalOrder(n):
    result = []
    curr = 1
    FOR _ ← 0 TO n - 1:
        result.ADD(curr)
        IF curr * 10 <= n:
            curr *= 10
        ELSE:
            IF curr >= n: curr /= 10
            curr += 1
            WHILE curr % 10 == 0: curr /= 10
    RETURN result
```

| Time | Space |
|------|-------|
| O(n) | O(1) extra (excluding output) |

---

## 3. Key Takeaway

> Simulate a pre-order DFS on a virtual trie of numbers. Go deeper (×10) when possible, otherwise go to next sibling (+1) or backtrack (÷10). O(1) space, O(n) time.
