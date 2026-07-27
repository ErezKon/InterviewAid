# 1079. Letter Tile Possibilities

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/letter-tile-possibilities](https://leetcode.com/problems/letter-tile-possibilities)
**Companies:** Bloomberg, Google, Meta, Microsoft, Oracle

---

## 1. Problem Description

Given a string of uppercase letters (tiles), return the number of distinct non-empty sequences that can be formed.

---

## 2. Approach: Backtracking on Counts — O(n!) ✅

```
FUNCTION numTilePossibilities(tiles):
    count = Counter(tiles)

    FUNCTION backtrack():
        total = 0
        FOR c IN count:
            IF count[c] > 0:
                count[c] -= 1
                total += 1 + backtrack()
                count[c] += 1
        RETURN total

    RETURN backtrack()
```

| Time | Space |
|------|-------|
| O(n!) worst case | O(n) recursion |

---

## 3. Key Takeaway

> Backtrack on character frequencies instead of indices to naturally avoid duplicates. Each choice uses one instance of a character, +1 for the current sequence plus recursive extensions.
