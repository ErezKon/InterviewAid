# 809. Expressive Words

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/expressive-words](https://leetcode.com/problems/expressive-words)
**Companies:** Cisco, Google

---

## Problem Description

A string `s` was formed by stretching some letters (repeating them 3+ times). Given a list of `words`, count how many words could have been stretched to form `s`.

A word matches `s` if their character groups align and for each group: either the counts are equal, or `s`'s count ≥ 3 and ≥ the word's count.

---

## Examples

**Example 1:**
```text
Input: s = "heeellooo", words = ["hello","hi","heello"]
Output: 1
Explanation: Only "hello" can be stretched to become "heeellooo".
```

**Example 2:**
```text
Input: s = "zzzzzyyyyy", words = ["zzyy","zy","zzzzzy"]
Output: 2
Explanation: "zzyy" and "zzzzzy" are stretchy; "zy" is not because groups differ.
```

---

## Key Insight

> Run-length encode both `s` and each word. Compare group-by-group: same character, and either same count or s's count ≥ 3 and ≥ word's count.

---

## Approach: Group Comparison — O(n × L) ✅

```
FUNCTION expressiveWords(s, words):
    FUNCTION encode(word):
        groups = []
        i = 0
        WHILE i < len(word):
            char = word[i]; count = 0
            WHILE i < len(word) AND word[i] == char:
                i += 1; count += 1
            groups.ADD((char, count))
        RETURN groups

    FUNCTION isStretchy(word):
        sGroups = encode(s)
        wGroups = encode(word)
        IF len(sGroups) != len(wGroups): RETURN false
        FOR i ← 0 TO len(sGroups) - 1:
            sc, sn = sGroups[i]; wc, wn = wGroups[i]
            IF sc != wc: RETURN false
            IF sn != wn AND (sn < 3 OR sn < wn): RETURN false
        RETURN true

    RETURN COUNT(word IN words WHERE isStretchy(word))
```

---

## Walkthrough

```
s = "heeellooo", word = "hello"
s groups: [('h',1), ('e',3), ('l',2), ('o',3)]
w groups: [('h',1), ('e',1), ('l',2), ('o',1)]

h: 1==1 ✅ | e: 3≥3 and 3≥1 ✅ | l: 2==2 ✅ | o: 3≥3 and 3≥1 ✅
→ stretchy ✅
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| **Time** | O(n × L) — n words, L = max length |
| **Space** | O(L) — group storage |

---

## Key Takeaway

> **Run-length encoding + group comparison. A character group in `s` can represent a stretch if its count ≥ 3 and ≥ the word's group count.**