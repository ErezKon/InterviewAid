# 758. Bold Words in String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/bold-words-in-string](https://leetcode.com/problems/bold-words-in-string)
**Companies:** Google

---

## 1. Problem Description

Given an array of keywords `words` and a string `s`, make all appearances of all keywords `words[i]` in `s` bold. Any letters between `<b>` and `</b>` tags become bold.

Return `s` *after adding the bold tags*. The returned string should use the least number of tags possible, and the tags should form a valid combination.

**Constraints:**
- `1 ≤ s.length ≤ 500`
- `0 ≤ words.length ≤ 50`
- `1 ≤ words[i].length ≤ 10`
- `s` and `words[i]` consist of lowercase English letters.

**Note:** This question is the same as 616. Add Bold Tag in String.

---

## Examples

```
Example 1:
  Input: words = ["ab","bc"], s = "aabcd"
  Output: "a<b>abc</b>d"
  Explanation: Note that returning "a<b>a<b>b</b>c</b>d" would use more tags, so it is incorrect.

Example 2:
  Input: words = ["ab","cb"], s = "aabcd"
  Output: "a<b>ab</b>cd"
```

---

## 2. Key Insight

> Mark each character position as bold or not. For each word, find all occurrences in `s` and mark those ranges. Then scan the boolean array to insert tags around contiguous bold regions.

---

## Approach: Boolean Marking — O(n × w × l) ✅

```text
FUNCTION boldWords(words, s):
    // step 1: mark bold positions
    SET n ← LENGTH(s)
    SET bold ← ARRAY of FALSE size n
    FOR each word IN words:
        SET wlen ← LENGTH(word)
        FOR i FROM 0 TO n - wlen:
            IF s[i : i + wlen] == word:
                FOR j FROM i TO i + wlen - 1:
                    SET bold[j] ← TRUE
    // step 2: build result with tags
    SET result ← []
    SET i ← 0
    WHILE i < n:
        IF bold[i]:
            APPEND "<b>" TO result
            WHILE i < n AND bold[i]:
                APPEND s[i] TO result
                SET i ← i + 1
            APPEND "</b>" TO result
        ELSE:
            APPEND s[i] TO result
            SET i ← i + 1
    RETURN JOIN(result)
```

---

## Walkthrough

For `s = "abcxyz123"` and `words = ["abc","123"]`:
1. Initialize `bold = [F,F,F,F,F,F,F,F,F]`.
2. Find "abc" at index 0 → set `bold[0..2]=T`.
3. Find "123" at index 6 → set `bold[6..8]=T`.
4. Scan: at i=0 bold → add `<b>`, output `abc`, close tag; continue non‑bold chars `xyz`; at i=6 bold → add `<b>123</b>`.
Result: `<b>abc</b>xyz<b>123</b>`.

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n × w × l) | O(n) |

---

## Follow-Up Questions

* How would you improve the time complexity using a Trie for the word list?
* Can you adapt the solution to return the bolded string without using extra boolean array?
* How would you handle very large strings that cannot fit entirely in memory?

---

## Key Takeaway

> Boolean array marking for bold regions, then a single pass to insert tags. Same pattern as "Add Bold Tag in String" (LC 616).
