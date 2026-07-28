# 1181. Before and After Puzzle

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/before-and-after-puzzle](https://leetcode.com/problems/before-and-after-puzzle)
**Companies:** Clutter

---

## 1. Problem Description

Given a list of phrases, find all "Before and After puzzles": merge two phrases where the **last word** of one equals the **first word** of another.

---

## 2. Examples

**Example 1:**
```
Input: phrases = ["writing code", "code rocks", "rocks and roll"]
Output: ["writing code rocks", "code rocks and roll"]
Explanation: "code" is the last word of the first phrase and the first word of the second, so they merge. Similarly for the second and third.
```

**Example 2:**
```
Input: phrases = ["a b", "c d", "e f"]
Output: []
Explanation: No adjacent phrases share a matching word.
```

---

## 3. Approach: Hash Map — O(n²) ✅

```
FUNCTION beforeAndAfterPuzzles(phrases):
    n ← LENGTH(phrases)
    result ← SET()
    FOR i ← 0 TO n-1:
        FOR j ← 0 TO n-1:
            IF i = j: CONTINUE
            lastWord_i ← LAST( SPLIT(phrases[i], " ") )
            firstWord_j ← FIRST( SPLIT(phrases[j], " ") )
            IF lastWord_i = firstWord_j:
                merged ← phrases[i] + " " + JOIN( SPLIT(phrases[j], " ")[1:], " " )
                result.ADD(merged)
    RETURN SORTED(result)
```

---

## 4. Walkthrough

Consider `phrases = ["writing code", "code rocks", "rocks and roll"]`.

| i | phrase | last word |
|---|--------|-----------|
| 0 | writing code | code |
| 1 | code rocks   | rocks |
| 2 | rocks and roll | roll |

* Pair (0,1): last word of 0 (`code`) equals first word of 1 (`code`). Merge → `"writing code rocks"`.
* Pair (1,2): last word of 1 (`rocks`) equals first word of 2 (`rocks`). Merge → `"code rocks and roll"`.
* All other pairs do not match.

The set now contains the two merged strings, which are returned sorted.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n² × L) | O(k) |

`n` is the number of phrases, `L` the average length of a phrase, and `k` the number of unique merged results stored in the set.

---

## 6. Follow-Up Questions

1. How would you improve the time complexity if the list is very large?
2. Can you adapt the solution to handle case‑insensitive word matching?
3. What changes are needed if a phrase can be used multiple times in different merges?

---

## Key Takeaway

> For each pair (i, j), check if last word of phrase i matches first word of phrase j. Merge by appending the rest of phrase j. Use a set for deduplication.
