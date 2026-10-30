# 809. Expressive Words

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/expressive-words](https://leetcode.com/problems/expressive-words)
**Companies:** Cisco, Google

---

## Problem Description

Sometimes people repeat letters to represent extra feeling. For example:

- `"hello" -> "heeellooo"`
- `"hi" -> "hiiii"`

In these strings like `"heeellooo"`, we have groups of adjacent letters that are all the same: `"h"`, `"eee"`, `"ll"`, `"ooo"`.

You are given a string `s` and an array of query strings `words`. A query word is **stretchy** if it can be made to be equal to `s` by any number of applications of the following extension operation: choose a group consisting of characters `c`, and add some number of characters `c` to the group so that the size of the group is **three or more**.

- For example, starting with `"hello"`, we could do an extension on the group `"o"` to get `"hellooo"`, but we cannot get `"helloo"` since the group `"oo"` has a size less than three. Also, we could do another extension like `"ll" -> "lllll"` to get `"helllllooo"`. If `s = "helllllooo"`, then the query word `"hello"` would be **stretchy** because of these two extension operations: `query = "hello" -> "hellooo" -> "helllllooo" = s`.

Given a list of query strings `words`, return *the number of query strings that are **stretchy***.

**Constraints:**
- `1 <= s.length, words.length <= 100`
- `1 <= words[i].length <= 100`
- `s` and `words[i]` consist of lowercase letters.

---

## Examples

```
Example 1:
  Input: s = "heeellooo", words = ["hello", "hi", "helo"]
  Output: 1
  Explanation:
  We can extend "e" and "o" in the word "hello" to get "heeellooo".
  We can't extend "helo" to get "heeellooo" because the group "ll" is not size 3 or more.
```

```
Example 2:
  Input: s = "zzzzzyyyyy", words = ["zzyy","zy","zyy"]
  Output: 3
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