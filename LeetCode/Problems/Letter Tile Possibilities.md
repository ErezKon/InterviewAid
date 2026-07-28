# 1079. Letter Tile Possibilities

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/letter-tile-possibilities](https://leetcode.com/problems/letter-tile-possibilities)
**Companies:** Bloomberg, Google, Meta, Microsoft, Oracle

---

## 1. Problem Description

Given a string of uppercase letters (tiles), return the number of distinct non-empty sequences that can be formed.

---

## 2. Examples

| Tiles | Output |
|-------|--------|
| "AAB" | 8 |
| "AAABBC" | 188 |

*Explanation*: All possible non‑empty permutations respecting tile counts are counted.

---

## 3. Approach: Backtracking on Counts — O(n!) ✅

```text
FUNCTION numTilePossibilities(tiles):
    SET count ← Counter(tiles)

    FUNCTION backtrack():
        SET total ← 0
        FOR c IN count:
            IF count[c] > 0:
                count[c] -= 1
                total += 1 + backtrack()
                count[c] += 1
        RETURN total

    RETURN backtrack()
```

---

## 4. Walkthrough

Consider "AAB":
1. Start with empty sequence, counts {A:2, B:1}.
2. Choose 'A' → sequence "A", counts {A:1, B:1}. Recurse adds 1 + further combos.
3. From "A", choose another 'A' → "AA", counts {A:0, B:1}.
4. From "AA", choose 'B' → "AAB" (leaf).
5. Backtrack, from "A" choose 'B' → "AB", then choose remaining 'A' → "ABA".
6. Also start with 'B' directly, then add 'A's.
All 8 distinct strings are generated.

---

## 5. Complexity Analysis

- **Time:** O(n!) in the worst case where n is the number of tiles (all distinct).
- **Space:** O(n) recursion stack plus O(Alphabet) for the counter.

---

## 6. Follow-Up Questions

- How would you modify the algorithm to return the actual list of sequences?
- Can you compute the result modulo a large prime for very long strings?
- How does the solution change if tiles can be lowercase as well?

---

## 3. Key Takeaway

> Backtrack on character frequencies instead of indices to naturally avoid duplicates. Each choice uses one instance of a character, +1 for the current sequence plus recursive extensions.
