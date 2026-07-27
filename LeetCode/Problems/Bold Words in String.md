# 758. Bold Words in String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/bold-words-in-string](https://leetcode.com/problems/bold-words-in-string)
**Companies:** Google

---

## 1. Problem Description

Given a string `s` and a list of `words`, bold all substrings of `s` that match any word. Merge overlapping/adjacent bold regions and wrap them with `<b>` and `</b>` tags.

---

## 2. Key Insight

> Mark each character position as bold or not. For each word, find all occurrences in `s` and mark those ranges. Then scan the boolean array to insert tags around contiguous bold regions.

---

## 3. Approach: Boolean Marking — O(n × w × l) ✅

```
FUNCTION boldWords(words, s):
    bold = [false] * len(s)
    FOR word IN words:
        FOR i FROM 0 TO len(s) - len(word):
            IF s[i:i+len(word)] == word:
                mark bold[i..i+len(word)-1] = true
    
    result = []
    i = 0
    WHILE i < len(s):
        IF bold[i]:
            result.ADD("<b>")
            WHILE i < len(s) AND bold[i]:
                result.ADD(s[i])
                i += 1
            result.ADD("</b>")
        ELSE:
            result.ADD(s[i])
            i += 1
    RETURN "".JOIN(result)
```

| Time | Space |
|------|-------|
| O(n × w × l) | O(n) |

---

## Key Takeaway

> Boolean array marking for bold regions, then a single pass to insert tags. Same pattern as "Add Bold Tag in String" (LC 616).
