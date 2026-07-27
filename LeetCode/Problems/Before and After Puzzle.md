# 1181. Before and After Puzzle

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/before-and-after-puzzle](https://leetcode.com/problems/before-and-after-puzzle)
**Companies:** Clutter

---

## 1. Problem Description

Given a list of phrases, find all "Before and After puzzles": merge two phrases where the **last word** of one equals the **first word** of another.

---

## 2. Approach: Hash Map — O(n²) ✅

```
FUNCTION beforeAndAfterPuzzles(phrases):
    result = set()
    FOR i ← 0 TO n-1:
        FOR j ← 0 TO n-1:
            IF i == j: CONTINUE
            lastWord_i = phrases[i].split()[-1]
            firstWord_j = phrases[j].split()[0]
            IF lastWord_i == firstWord_j:
                merged = phrases[i] + " " + " ".join(phrases[j].split()[1:])
                result.ADD(merged)
    RETURN sorted(result)
```

| Time | Space |
|------|-------|
| O(n² × L) | O(n²) |

---

## Key Takeaway

> For each pair (i, j), check if last word of phrase i matches first word of phrase j. Merge by appending the rest of phrase j. Use a set for deduplication.
