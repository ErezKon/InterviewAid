# 2490. Circular Sentence

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/circular-sentence](https://leetcode.com/problems/circular-sentence)
**Companies:** Bloomberg

---

## 1. Problem Description

A sentence is **circular** if the last character of each word equals the first character of the next word, and the last character of the last word equals the first character of the first word. Given a string `sentence`, return whether it is circular.

---

## 2. Approach: Check Adjacent Words — O(n) ✅

```
FUNCTION isCircularSentence(sentence):
    words = sentence.SPLIT(" ")
    FOR i FROM 0 TO len(words) - 1:
        IF words[i][-1] != words[(i+1) % len(words)][0]:
            RETURN false
    RETURN true
```

Alternatively, scan for spaces and check `sentence[i-1] != sentence[i+1]` at each space, plus check `sentence[0] == sentence[-1]`.

| Time | Space |
|------|-------|
| O(n) | O(1) with the scan approach |

---

## Key Takeaway

> For circular sentence checks, either split and compare word boundaries, or scan for spaces in-place for O(1) extra space.
