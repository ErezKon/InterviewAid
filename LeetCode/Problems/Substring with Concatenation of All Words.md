# 30. Substring with Concatenation of All Words

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/substring-with-concatenation-of-all-words](https://leetcode.com/problems/substring-with-concatenation-of-all-words)
**Companies:** Amazon, Apple, Bloomberg, Google, Infosys, Meta, Microsoft, Samsung, Texas Instruments

---

## Approach: Sliding Window of Word Chunks — O(n·w) ✅

```
FUNCTION findSubstring(s, words):
    wordLen = len(words[0])
    totalLen = wordLen * len(words)
    wordCount = Counter(words)
    result = []

    FOR offset ← 0 TO wordLen - 1:
        left = offset
        window = Counter()
        count = 0

        FOR right ← offset TO len(s) - wordLen STEP wordLen:
            word = s[right : right + wordLen]
            IF word IN wordCount:
                window[word] += 1
                count += 1
                WHILE window[word] > wordCount[word]:
                    leftWord = s[left : left + wordLen]
                    window[leftWord] -= 1
                    count -= 1
                    left += wordLen
                IF count == len(words):
                    result.ADD(left)
            ELSE:
                window.clear()
                count = 0
                left = right + wordLen

    RETURN result
```
