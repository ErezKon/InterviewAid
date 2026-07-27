# 1105. Filling Bookcase Shelves

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/filling-bookcase-shelves](https://leetcode.com/problems/filling-bookcase-shelves)
**Companies:** 6Sense, Amazon, Bloomberg, Flipkart, Google

---

## Problem Description

Place books in order on shelves of width `shelfWidth`. Each shelf's height = tallest book on it. Minimize total bookcase height. Books must maintain order.

---

## Key Insight

> `dp[i]` = min height for first `i` books. For each book `i`, try placing books `j..i` on the same shelf (as long as total width fits). Shelf height = max height among books `j..i`.

---

## Approach: DP — O(n × W) ✅

```
FUNCTION minHeightShelves(books, shelfWidth):
    n = len(books)
    dp = [infinity] * (n + 1)
    dp[0] = 0

    FOR i ← 1 TO n:
        width = 0; height = 0
        FOR j ← i DOWN TO 1:
            width += books[j-1][0]
            IF width > shelfWidth: BREAK
            height = MAX(height, books[j-1][1])
            dp[i] = MIN(dp[i], dp[j-1] + height)

    RETURN dp[n]
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| **Time** | O(n × W) — inner loop bounded by shelf width |
| **Space** | O(n) |

---

## Key Takeaway

> **DP where for each book, we try extending the current shelf backward. Total width constraint limits the inner loop. Classic 1D DP with variable-length grouping.**
