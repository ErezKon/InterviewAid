# 884. Uncommon Words from Two Sentences

**Difficulty:** 🟢 Easy

**Companies:** Amazon, Google
---

## Problem Description
Given two sentences `s1` and `s2`, each consisting of lowercase English words separated by spaces, return a list of all words that appear exactly once across both sentences. The order of words in the output does not matter.

## Examples
**Example 1**
```
Input: s1 = "this apple is sweet", s2 = "this apple is sour"
Output: ["sweet", "sour"]
Explanation: "sweet" and "sour" each appear only once across the two sentences.
```
**Example 2**
```
Input: s1 = "apple", s2 = "banana"
Output: ["apple", "banana"]
Explanation: Both words are unique.
```

## Approach
Use a hash map to count occurrences of each word in the concatenated sentences, then collect words with a count of one.

```text
FUNCTION UncommonWords(s1, s2):
    SET words ← SPLIT(s1, ' ') + SPLIT(s2, ' ')
    SET freqMap ← EMPTY MAP
    FOR w IN words:
        IF w IN freqMap:
            SET freqMap[w] ← freqMap[w] + 1
        ELSE:
            SET freqMap[w] ← 1
    SET result ← []
    FOR (word, cnt) IN freqMap:
        IF cnt = 1:
            APPEND word TO result
    RETURN result
```

## Walkthrough
| Step | Action | freqMap | result |
|------|--------|---------|--------|
| 1 | Split sentences and combine words | {"this":2, "apple":2, "is":2, "sweet":1, "sour":1} | [] |
| 2 | Iterate map, add words with count 1 | — | ["sweet", "sour"] |

## Complexity Analysis
- **Time:** O(n) where n is the total number of words in both sentences.
- **Space:** O(m) for the hash map storing each distinct word.

## Follow-Up Questions
1. How would you modify the solution if the sentences could contain punctuation?
2. Can you return the result in the order the words appear in the original sentences?
3. How would you handle case‑insensitive comparisons?

## Key Takeaway
Counting word frequencies with a hash map lets you identify uniquely occurring words in linear time.
