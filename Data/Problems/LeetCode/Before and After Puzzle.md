# 1181. Before and After Puzzle

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/before-and-after-puzzle](https://leetcode.com/problems/before-and-after-puzzle)
**Companies:** Clutter

---

## 1. Problem Description

Given a list of `phrases`, generate a list of Before and After puzzles.

A *phrase* is a string that consists of lowercase English letters and spaces only. No space appears in the start or the end of a phrase. There are no consecutive spaces in a phrase.

*Before and After puzzles* are phrases that are formed by merging two phrases where the **last word of the first phrase** is the same as the **first word of the second phrase**. Note that only the *last word of the first phrase* and the *first word of the second phrase* are merged in this process.

Return the Before and After puzzles that can be formed by every two phrases `phrases[i]` and `phrases[j]` where `i != j`. Note that the order of matching two phrases matters, we want to consider both orders.

You should return a list of **distinct** strings **sorted lexicographically**, after removing all *duplicate* phrases in the generated Before and After puzzles.

**Constraints:**
- `1 ≤ phrases.length ≤ 100`
- `1 ≤ phrases[i].length ≤ 100`

---

## 2. Examples

```
Example 1:
  Input: phrases = ["writing code","code rocks"]
  Output: ["writing code rocks"]

Example 2:
  Input: phrases = ["mission statement","a quick bite to eat","a chip off the old block","chocolate bar","mission impossible","a man on a mission","block party","eat my words","bar of soap"]
  Output: ["a chip off the old block party","a man on a mission impossible","a man on a mission statement","a quick bite to eat my words","chocolate bar of soap"]

Example 3:
  Input: phrases = ["a","b","a"]
  Output: ["a"]

Example 4:
  Input: phrases = ["ab ba","ba ab","ab ba"]
  Output: ["ab ba ab","ba ab ba"]
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
2. Can you adapt the solution to handle case-insensitive word matching?
3. What changes are needed if a phrase can be used multiple times in different merges?

---

## Key Takeaway

> For each pair (i, j), check if last word of phrase i matches first word of phrase j. Merge by appending the rest of phrase j. Use a set for deduplication.
